import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Player } from 'src/app/_models/player';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit{
  player: Player | undefined;
  user: User | null = null;
  isCreator: Boolean | undefined;


  constructor(private campaignService:CampaignService, private route:ActivatedRoute,private accountService:AccountService){}
  
  ngOnInit(): void {
    this.loadPlayer();
  }



  loadPlayer(){       
    var playerid = Number(this.route.snapshot.paramMap.get('id'));
    if(playerid) {
      this.campaignService.getPlayersById(playerid).pipe(take(1)).subscribe({
        next: player=>{ 
          this.player = player
      
          this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user=> this.user = user
          });
          console.log(this.player?.userName + " " +  this.user?.username)
          if(this.player?.userName == this.user?.username ){
            this.isCreator = true;
          } 
          else{
            this.isCreator = false;  
          }
        }});
    }    
  }

  editPlayer(id:number){}


  deletePlayer(id:number){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign) {
      this.campaignService.deletePlayer(id).subscribe({
        next: () =>  { 
          window.location.reload()
        }
      });
    }
  }

  updatePlayer(id:number){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign) {
      this.campaignService.updatePlayer(id).subscribe({
        next: player =>  { 
          this.player = player
          console.log(this.player)
          //window.location.reload()
        }
      });
    }
  }
}
