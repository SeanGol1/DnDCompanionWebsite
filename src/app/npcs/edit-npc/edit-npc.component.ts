import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Npc } from 'src/app/_models/npc';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-edit-npc',
  templateUrl: './edit-npc.component.html',
  standalone: false,
  styleUrls: ['./edit-npc.component.css']
})
export class EditNpcComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  npc:Npc | undefined;


  constructor( private campaignService: CampaignService,private route: ActivatedRoute, private toastr:ToastrService){
  }

  ngOnInit():void{
    this.loadNpc();
  }

  loadNpc(){
    var npc = Number(this.route.snapshot.paramMap.get('id'));
    this.campaignService.getNpcById(npc).subscribe({
      next: npc => this.npc = npc
    })
  }

  updateNpc(){
    var npc = Number(this.route.snapshot.paramMap.get('id'));
    this.campaignService.updateNpc(this.editForm?.value,npc).subscribe({
      next: _ => {
        this.toastr.success('NPC updated successfully');
        this.editForm?.reset(this.npc);
      }
    });
    
  }
}
