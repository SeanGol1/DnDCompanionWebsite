import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/_models/note';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {
  @Input() note : Note  | undefined;
  @Input() isAdmin : Boolean  | undefined;

  constructor(private campaignService:CampaignService,private toastr:ToastrService){}

  deleteNote(id:number){
    console.log("Delete");
    this.campaignService.deleteNote(id).subscribe({
      next: () =>  { 
        this.toastr.success('Quest Deleted Successfully');
        window.location.reload();
      }
    });
  }

  editNote(id:number){}
  
  toggleNoteVisibility(id:number){
    console.log("Vis");
  }
}
