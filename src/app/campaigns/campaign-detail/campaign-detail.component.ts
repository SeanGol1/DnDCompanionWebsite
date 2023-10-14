import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { Player } from 'src/app/_models/player';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit{
  campaign: Campaign  |  undefined;
  players: Player[] = []; 

  constructor(private campaignService:CampaignService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadCampaign();
    this.loadPlayers();
  }

  loadCampaign(){   
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign) {
    this.campaignService.getCampaignById(campaign).subscribe({
      next: campaign=> this.campaign = campaign
    });
  }
  }

  loadPlayers(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign){
      this.campaignService.getPlayersByCampaignId(campaign).subscribe({
        next: players=>  this.players = players
      });
    }
  }
}
