import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/_models/player';

@Component({
  selector: 'app-campaign-players',
  templateUrl: './campaign-players.component.html',
  styleUrls: ['./campaign-players.component.css']
})
export class CampaignPlayersComponent implements OnInit{
  @Input() player : Player  | undefined;
  constructor(){}

  ngOnInit(): void {
    
  }
  
}
