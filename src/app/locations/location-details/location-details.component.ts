import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';
import { Location } from 'src/app/_models/location';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  local: Location | undefined;
  user: User | null = null;
  isAdmin: Boolean | undefined = false;


  constructor(private campaignService:CampaignService, private route:ActivatedRoute, private router: Router,private accountService: AccountService,private toastr:ToastrService){}
  
  ngOnInit(): void {
    this.loadLocation();
  }



  loadLocation(){       
    var localid = Number(this.route.snapshot.paramMap.get('id'));
    if(localid) {
      this.campaignService.getLocationById(localid).pipe(take(1)).subscribe({
        next: local=>{ 
          this.local = local
      
          this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user=> {
              if(user?.username === this.local?.adminUser){
                this.isAdmin = true;          
              }
            }
          });
        }
      })
    }
  }    
  

  editLocation(id:number){}


  deleteLocation(id:number){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign) {
      this.campaignService.deleteLocation(id).subscribe({
        next: () =>  { 
          this.toastr.success('Location Deleted Successfully');
          //TODO: Remove the component.
          this.router.navigateByUrl('/campaign/'+id); 
        }
      });
    }
  }

  toggleLocationVisibility(id:number){
    // TODO: Toggle noc visibility 
    this.campaignService.toggleLocationVisibility(id).subscribe({
      next: () =>  {      
        if(this.local){
          if(this.local?.isVisible)
            this.local.isVisible = false;
          else
            this.local.isVisible = true;
        }
        //this.quest?.isVisible == !this.quest?.isVisible; 
        this.toastr.success('Changed Visibility Successfully');  
        this.setVisButton();      
      }
    });
  }

  setVisButton(){
    var btn = document.getElementById("btn-local-vis-"+ this.local?.id);
    if(btn){
      if(this.local?.isVisible){
        btn.className = 'btn btn-warning'
        btn.title = 'Make Location Invisible to Players'
        btn.innerHTML = '<i class="fa fa-eye-slash"></i>';
      }       
      else {
        btn.className = 'btn btn-success'
        btn.title = 'Make Location Visible to Players'
        btn.innerHTML = '<i class="fa fa-eye"></i>';
      }      
    }
  }
}
