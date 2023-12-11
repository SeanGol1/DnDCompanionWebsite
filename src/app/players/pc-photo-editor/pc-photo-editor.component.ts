import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/_models/player';

@Component({
  selector: 'app-pc-photo-editor',
  templateUrl: './pc-photo-editor.component.html',
  styleUrls: ['./pc-photo-editor.component.css']
})
export class PcPhotoEditorComponent implements OnInit{  
  @Input() pc : Player | undefined;

  constructor() {
    
  }
  ngOnInit(): void {
    
  }
}
