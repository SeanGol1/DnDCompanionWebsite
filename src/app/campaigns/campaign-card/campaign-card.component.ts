import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  standalone: false,
  styleUrls: ['./campaign-card.component.css']
})

export class CampaignCardComponent implements OnInit {
  @Input() campaign : Campaign  | undefined;
  isAdmin: boolean | undefined = false; 
  constructor(public accountService:AccountService, private campaignService:CampaignService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.checkIsAdmin();
  }

  checkIsAdmin(){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> {
        if(user?.username === this.campaign?.adminUser){
          this.isAdmin = true;          
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

  leaveCampaign(id:number){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> {
        if (user){
          this.campaignService.leaveCampaign(id,user?.username).subscribe({
            next: () =>  { 
              window.location.reload();
            }
          })
        }
      }
    });
    
  }

}
