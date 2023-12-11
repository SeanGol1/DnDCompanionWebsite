import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Player } from 'src/app/_models/player';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  player:Player | undefined;


  constructor( private campaignService: CampaignService,private route: ActivatedRoute, private toastr:ToastrService){
  }

  ngOnInit():void{
    this.loadPlayer();
  }
  loadPlayer(){
    var player = Number(this.route.snapshot.paramMap.get('id'));
    //if (!this.player) return;
    this.campaignService.getPlayersById(player).subscribe({
      next: player => this.player = player
    })
  }

  updatePlayer(){
    var player = Number(this.route.snapshot.paramMap.get('id'));
    this.campaignService.updatePlayer(this.editForm?.value,player).subscribe({
      next: _ => {
        this.toastr.success('Player updated successfully');
        this.editForm?.reset(this.player);
      }
    });
    
  }
}
