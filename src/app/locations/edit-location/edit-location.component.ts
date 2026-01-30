import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/_services/campaign.service';
import { Location } from 'src/app/_models/location';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  standalone: false,
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ['$event']) unloadedNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  local:Location | undefined;


  constructor( private campaignService: CampaignService,private route: ActivatedRoute, private toastr:ToastrService){
  }

  ngOnInit():void{
    this.loadLocations();
  }

  loadLocations(){
    var local = Number(this.route.snapshot.paramMap.get('id'));
    this.campaignService.getLocationById(local).subscribe({
      next: local => this.local = local
    })
  }

  updateLocation(){
    var local = Number(this.route.snapshot.paramMap.get('id'));
    this.campaignService.updateLocation(this.editForm?.value,local).subscribe({
      next: _ => {
        this.toastr.success('Location updated successfully');
        this.editForm?.reset(this.local);
      }
    });
    
  }
}
