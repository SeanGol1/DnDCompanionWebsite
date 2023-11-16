import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Player } from 'src/app/_models/player';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-players',
  templateUrl: './campaign-players.component.html',
  styleUrls: ['./campaign-players.component.css']
})
export class CampaignPlayersComponent implements OnInit{
  @Input() player : Player  | undefined;
  isAdmin : Boolean  | undefined;
  user : User  | null = null;

  constructor(private campaignService:CampaignService,private accountService:AccountService, private route: ActivatedRoute){}

  ngOnInit(): void {
    
    this.isCreator();
  }

  isCreator(){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> {
        this.user = user;
        if(this.player?.userName == this.user?.username){
          this.isAdmin = true;
        } 
        else{
          this.isAdmin = false;      
        }
      }
    });
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
