import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  players: User[] = [];
  currentUser: User  |  undefined;

  constructor(private campaignService:CampaignService,public accountService:AccountService){}
  ngOnInit(): void {
    this.loadCampaigns();
    this.loadPlayers();
  }

  loadPlayers(){
    
  }

  loadCampaigns(){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> {
        if(user){
          this.currentUser = user;
          console.log(this.currentUser);
          this.campaignService.getCampaignsByUserId(this.currentUser.username).subscribe({
            next: campaigns=> this.campaigns = campaigns
          })
        }
      }
    });
    
    }

}
