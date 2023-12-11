import { Component, Input, OnInit } from '@angular/core';
import { Npc } from 'src/app/_models/npc';

@Component({
  selector: 'app-npc-photo-editor',
  templateUrl: './npc-photo-editor.component.html',
  styleUrls: ['./npc-photo-editor.component.css']
})
export class NpcPhotoEditorComponent implements OnInit{  
  @Input() npc : Npc | undefined;

  constructor() {
    
  }
  ngOnInit(): void {
    
  }

}
