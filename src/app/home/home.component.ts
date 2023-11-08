import { Component, ViewChild } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { CampaignService } from '../_services/campaign.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Campaign } from '../_models/campaign';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;
  users: any;
  model:any;
  user: User | null = null;
  id: number | null = null;
  name: string | null = null;
  description: string | null = null;
  campaign: Campaign| null = null;

  constructor(public accountService: AccountService,private campaignService:CampaignService, private router: Router,private toastr: ToastrService){}

  ngOnInit():void{
  }

  getUser(){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> this.user = user
      });

      return this.user;
  }
  
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }

  join(){
    this.user = this.getUser();
    console.log("Made to Join: " + this.id +" "+ this.user?.username);
    if(this.user && this.id){
      console.log("!!!Made to Join: " + this.id +" "+ this.user.username);
      this.campaignService.joinCampaign(this.id,this.user.username).subscribe({
        next: () =>  this.router.navigateByUrl('/campaign/'+ this.id)
      });
    }
  }

  create(){
    this.user = this.getUser();
    console.log("Made to Join: " + this.name +" "+ this.user?.username);
    if(this.user && this.name && this.description){
      console.log("!!!Made to Join: " + this.name +" "+ this.user.username);
      this.campaignService.createCampaign(this.name,this.user.username,this.description).subscribe({
        next: campaign =>  this.router.navigateByUrl('/campaign/'+ campaign.id)
      });
    }
  }
}
