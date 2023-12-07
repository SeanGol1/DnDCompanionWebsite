import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { Npc } from 'src/app/_models/npc';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-add-npc',
  templateUrl: './add-npc.component.html',
  styleUrls: ['./add-npc.component.css']
})
export class AddNpcComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  npc: Npc | undefined = {id:0,characterName:"",campaignId:0,campaignName:"",photoUrl:"",
  description:"",strength:"",dexterity:"",constitution:"",intelligence:"",wisdom:"",charisma:"",race:"",class:"",isVisible:false,livesIn:""};
  user: User | null = null;
  campaign: Campaign  |  undefined;
  campaignId : number = 0;
  
  constructor(private accountService:AccountService, private toastr:ToastrService,private campaignService:CampaignService, private route: ActivatedRoute, private router:Router){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user => this.user = user
    })
  }
  
  ngOnInit(): void {
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
  }

  addNpc(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(this.user){
      console.log(this.editForm?.value);
      this.campaignService.addNpc(this.editForm?.value,campaign,this.user).subscribe({
        next: _ => {          
          this.toastr.success('profile updated successfully');
          this.editForm?.reset(this.npc);
          this.router.navigateByUrl('/campaign/' + campaign);
        },
        error: _ => {
          this.toastr.error(_);
        }
        
        
      });
    }
  }  
}
