import { Component, Input, OnInit } from '@angular/core';
import { Npc } from 'src/app/_models/npc';

@Component({
  selector: 'app-npc-card',
  templateUrl: './npc-card.component.html',
  styleUrls: ['./npc-card.component.css']
})
export class NpcCardComponent implements OnInit{
  @Input() npc : Npc  | undefined;

  constructor(){}
  
  ngOnInit(): void {
    
  }


}
