import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Quest } from 'src/app/_models/quest';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-quest',
  templateUrl: './campaign-quest.component.html',
  styleUrls: ['./campaign-quest.component.css']
})
export class CampaignQuestComponent {
  @Input() quest : Quest  | undefined;
  @Input() isAdmin : Boolean  | undefined;


  constructor(private campaignService:CampaignService,private toastr:ToastrService){}

  deleteQuest(id:number){
    this.campaignService.deleteQuest(id).subscribe({
      next: () =>  { 
        this.toastr.success('Quest Deleted Successfully');
        window.location.reload();
      }
    });
  }
  
  toggleQuestVisibility(id:number){
    console.log("Vis");
  }
}
