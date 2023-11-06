import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { Player } from 'src/app/_models/player';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent implements OnInit {  
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  player: Player | null = {userName:"",characterName:"",campaignId:0};
  user: User | null = null;
  campaign: Campaign  |  undefined;
  
  constructor(private accountService:AccountService, private toastr:ToastrService,private campaignService:CampaignService, private route: ActivatedRoute){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user => this.user = user
    })
  }
  
  ngOnInit(): void {

  }

  addPlayer(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(this.user){
      this.campaignService.addPlayer(this.editForm?.value,campaign,this.user).subscribe({
        next: _ => {
          this.toastr.success('profile updated successfully');
          this.editForm?.reset(this.player);
        }
      });
    }
  }
  
}