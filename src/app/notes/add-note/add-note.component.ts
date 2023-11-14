import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/_models/note';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }

  note: Note | undefined = {id:0,title:"",description:"",campaignId:0,sessionDate:"",createDate:"",updateDate:""};

  constructor(private route:ActivatedRoute, private toastr:ToastrService,private campaignService:CampaignService, private router:Router){

  }
  ngOnInit(): void {

  }

  addNote(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(this.note){
      this.campaignService.addNote(this.editForm?.value,campaign).subscribe({
        next: () => {
          this.toastr.success('Note Added Successfully');
          this.editForm?.reset(this.note);
          this.router.navigateByUrl('/campaign/' + campaign);
        }
      });
    }
  }
}
