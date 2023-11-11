import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Player } from 'src/app/_models/player';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit{
  player: Player| undefined;


  constructor(private campaignService:CampaignService, private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.loadPlayer();
  }



  loadPlayer(){       
    var playerid = Number(this.route.snapshot.paramMap.get('id'));
    if(playerid) {
      this.campaignService.getPlayersById(playerid).pipe(take(1)).subscribe({
        next: player=> this.player =player
      });
    }
  }
}
