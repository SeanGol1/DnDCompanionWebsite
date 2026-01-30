import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Quest } from 'src/app/_models/quest';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-quest',
  templateUrl: './campaign-quest.component.html',
  standalone: false,
  styleUrls: ['./campaign-quest.component.css']
})
export class CampaignQuestComponent implements OnInit{
  @Input() quest : Quest  | undefined;
  @Input() isAdmin : Boolean  | undefined;


  constructor(private campaignService:CampaignService,private toastr:ToastrService){}
  ngOnInit(): void {
    
  }

  deleteQuest(id:number){
    this.campaignService.deleteQuest(id).subscribe({
      next: () =>  { 
        this.toastr.success('Quest Deleted Successfully');
        //TODO: Remove the component.
        window.location.reload();
      }
    });
  }
  
  toggleQuestVisibility(id:number){
    this.campaignService.toggleQuestVisibility(id).subscribe({
      next: () =>  {      
        if(this.quest){
          if(this.quest?.isVisible)
            this.quest.isVisible = false;
          else
            this.quest.isVisible = true;
        }
        //this.quest?.isVisible == !this.quest?.isVisible; 
        this.toastr.success('Changed Visibility Successfully');  
        this.setVisButton();      
      }
    });
  }

  toggleQuestCompleted(id:number){
    this.campaignService.toggleQuestCompleted(id).subscribe({
      next: () =>  {      
        if(this.quest){
          if(this.quest?.isCompleted)
            this.quest.isCompleted = false;
          else
            this.quest.isCompleted = true;
        }
        //this.quest?.isVisible == !this.quest?.isVisible; 
        this.toastr.success('Changed Quest Status Successfully');  
        //this.setVisButton();      
      }
    });
  }

  editQuest(id:number){}

  setVisButton(){
    var btn = document.getElementById("btn-quest-vis-"+ this.quest?.id);
    if(btn){
      if(this.quest?.isVisible){
        btn.className = 'btn btn-warning';
        btn.title = 'Make Quest Visible to Players';
        btn.innerHTML = '<i class="fa fa-eye-slash"></i>';
        //div.innerHTML += '<button class="btn btn-warning" id="btn-vis-'+this.quest.id+'" ng-click="toggleQuestVisibility('+this.quest?.id+')"><i class="fa fa-eye-slash"></i></button>';
      }       
      else {
        btn.className = 'btn btn-success';
        btn.title = 'Make Quest Invisible to Players';
        btn.innerHTML = '<i class="fa fa-eye"></i>';
        //div.innerHTML += '<button class="btn btn-success" id="btn-vis-'+this.quest.id+'" ng-click="toggleQuestVisibility('+this.quest?.id+')"><i class="fa fa-eye"></i></button>';
      }      
    }
  }

  setCompButton(){
    var btn = document.getElementById("btn-quest-comp-"+ this.quest?.id);
    if(btn){
      if(this.quest?.isCompleted){
        btn.className = 'btn btn-warning';
        btn.title = 'Mark Quest Complete';
        btn.innerHTML = '<i class="fa fa-times"></i>';
        //div.innerHTML += '<button class="btn btn-warning" id="btn-vis-'+this.quest.id+'" ng-click="toggleQuestVisibility('+this.quest?.id+')"><i class="fa fa-eye-slash"></i></button>';
      }       
      else {
        btn.className = 'btn btn-success';
        btn.title = 'Mark Quest Uncomplete';
        btn.innerHTML = '<i class="fa fa-check"></i>';
        //div.innerHTML += '<button class="btn btn-success" id="btn-vis-'+this.quest.id+'" ng-click="toggleQuestVisibility('+this.quest?.id+')"><i class="fa fa-eye"></i></button>';
      }      
    }
  }
}
