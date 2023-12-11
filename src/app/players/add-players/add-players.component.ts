import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { Player } from 'src/app/_models/player';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent implements OnInit {  
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  player: Player | undefined = {id:0,userName:"",characterName:"",campaignId:0,campaignName:"",characterSheetLink:"",dndBeyondPcId:"",photoUrl:"",
  description:"",strength:"",dexterity:"",constitution:"",intelligence:"",wisdom:"",charisma:"",race:"",class:"",secondaryClass:"",backgroundDescription:"",backgroundName:"",photos:[]};
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

  addPlayer(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(this.user){
      console.log(this.editForm?.value);
      this.campaignService.addPlayer(this.editForm?.value,campaign,this.user).subscribe({
        next: _ => {          
          this.toastr.success('profile updated successfully');
          this.editForm?.reset(this.player);
          this.router.navigateByUrl('/campaign/' + campaign);
        },
        error: _ => {
          this.toastr.error(_);
        }
        
        
      });
    }
  }  
}
