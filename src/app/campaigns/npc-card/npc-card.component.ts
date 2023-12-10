import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Npc } from 'src/app/_models/npc';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-npc-card',
  templateUrl: './npc-card.component.html',
  styleUrls: ['./npc-card.component.css']
})
export class NpcCardComponent implements OnInit{
  @Input() npc : Npc  | undefined;
  @Input() isAdmin : Boolean  | undefined;

  constructor(private campaignService: CampaignService,private toastr:ToastrService){}
  
  ngOnInit(): void {
    
  }

  toggleNpcVisibility(id:number){
    // TODO: Toggle noc visibility 
    this.campaignService.toggleNpcVisibility(id).subscribe({
      next: () =>  {      
        if(this.npc){
          if(this.npc?.isVisible)
            this.npc.isVisible = false;
          else
            this.npc.isVisible = true;
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
        this.toastr.success('Npc Deleted Successfully');
        //TODO: Remove the component.
        window.location.reload();
      }
    });
  }

  setVisButton(){
    var btn = document.getElementById("btn-npc-vis-"+ this.npc?.id);
    if(btn){
      if(this.npc?.isVisible){
        btn.className = 'btn btn-warning'
        btn.title = 'Make NPC Invisible to Players'
        btn.innerHTML = '<i class="fa fa-eye-slash"></i>';
      }       
      else {
        btn.className = 'btn btn-success'
        btn.title = 'Make NPC Invisible to Players'
        btn.innerHTML = '<i class="fa fa-eye"></i>';
      }      
    }
  }


}
