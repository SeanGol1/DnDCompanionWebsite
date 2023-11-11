import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Quest } from 'src/app/_models/quest';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-add-quest',
  templateUrl: './add-quest.component.html',
  styleUrls: ['./add-quest.component.css']
})
export class AddQuestComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }

  quest: Quest | undefined = {id:0,name:"",description:"",isCompleted:false,isVisible:false,campaignId:0,questType:1};

  constructor(private route:ActivatedRoute, private toastr:ToastrService,private campaignService:CampaignService, private router:Router){

  }
  ngOnInit(): void {

  }

  addQuest(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(this.quest){
      this.campaignService.addQuest(this.editForm?.value,campaign).subscribe({
        next: () => {
          this.toastr.success('Quest Added Successfully');
          this.editForm?.reset(this.quest);
          this.router.navigateByUrl('/campaign/' + campaign);
        }
      });
    }
  }

}
