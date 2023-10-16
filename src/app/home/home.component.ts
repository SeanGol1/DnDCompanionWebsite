import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { CampaignService } from '../_services/campaign.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  users: any;
  model:any;
  router: any;

  constructor(public accountService: AccountService,private campaignService:CampaignService){}

  ngOnInit():void{
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }

  join(){
    this.model.username = '';
    //this.campaignService.joinCampaign(this.model).subscribe({
     // next: c:campaign =>  this.router.navigateByUrl('/campaign/'+ c.id)
    //});
  }
}
