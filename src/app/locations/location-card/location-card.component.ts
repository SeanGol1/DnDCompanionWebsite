import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/_services/campaign.service';
import { Location } from 'src/app/_models/location';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit{
  @Input() local : Location  | undefined;
  @Input() isAdmin : Boolean  | undefined;

  constructor(private campaignService: CampaignService,private toastr:ToastrService){}
  
  ngOnInit(): void {
    
  }

  toggleLocationVisibility(id:number){
    
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

  deleteNpc(id:number){
    this.campaignService.deleteNpc(id).subscribe({
      next: () =>  { 
        this.toastr.success('Location Deleted Successfully');
        //TODO: Remove the component.
        window.location.reload();
      }
    });
  }

  setVisButton(){
    var btn = document.getElementById("btn-local-vis-"+ this.local?.id);
    if(btn){
      if(this.local?.isVisible){
        btn.className = 'btn btn-warning'
        btn.title = 'Make Location Visible to Players'
        btn.innerHTML = '<i class="fa fa-eye-slash"></i>';
      }       
      else {
        btn.className = 'btn btn-success'
        btn.title = 'Make Location Invisible to Players'
        btn.innerHTML = '<i class="fa fa-eye"></i>';
      }      
    }
  }
}
