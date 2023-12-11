import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/_models/location';

@Component({
  selector: 'app-location-photo-editor',
  templateUrl: './location-photo-editor.component.html',
  styleUrls: ['./location-photo-editor.component.css']
})
export class LocationPhotoEditorComponent implements OnInit{  
  @Input() local : Location | undefined;

  constructor() {
    
  }
  ngOnInit(): void {
    
  }

}
