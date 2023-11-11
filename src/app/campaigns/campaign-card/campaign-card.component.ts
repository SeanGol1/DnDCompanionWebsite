import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.css']
})

export class CampaignCardComponent {
  @Input() campaign : Campaign  | undefined;
  isAdmin: boolean = false; 
  constructor(public accountService:AccountService, private campaignService:CampaignService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.checkIsAdmin();
  }

  checkIsAdmin(){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> {
        if(user?.username == this.campaign?.adminUser){
          this.isAdmin == true;
        }
      }
    });
  }

  deleteCampaign(id:number){
    this.campaignService.deleteCampaign(id).subscribe({
      next: () =>  { 
        window.location.reload()
      }
    });
  }

}
