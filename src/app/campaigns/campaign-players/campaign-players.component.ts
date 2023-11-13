import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/_models/player';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-players',
  templateUrl: './campaign-players.component.html',
  styleUrls: ['./campaign-players.component.css']
})
export class CampaignPlayersComponent implements OnInit{
  @Input() player : Player  | undefined;
  @Input() isAdmin : Boolean  | undefined;
  constructor(private campaignService:CampaignService, private route: ActivatedRoute){}

  ngOnInit(): void {
    
  }

  getDmName(){
    
  }

  deletePlayer(id:number){
    var player = Number(this.route.snapshot.paramMap.get('id'));
    if(player) {
      this.campaignService.deletePlayer(id).subscribe({
        next: () =>  { 
          window.location.reload()
        }
      });
    }
  }
  
}
