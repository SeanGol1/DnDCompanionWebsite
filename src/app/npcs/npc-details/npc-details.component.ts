import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Npc } from 'src/app/_models/npc';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-npc-details',
  templateUrl: './npc-details.component.html',
  standalone: false,
  styleUrls: ['./npc-details.component.css']
})
export class NpcDetailsComponent implements OnInit{
  npc: Npc | undefined;
  user: User | null = null;
  isAdmin: Boolean | undefined = false;


  constructor(private campaignService:CampaignService, private route:ActivatedRoute, private router: Router,private accountService: AccountService,private toastr:ToastrService){}
  
  ngOnInit(): void {
    this.loadNpc();
  }



  loadNpc(){       
    var npcid = Number(this.route.snapshot.paramMap.get('id'));
    if(npcid) {
      this.campaignService.getNpcById(npcid).pipe(take(1)).subscribe({
        next: npc=>{ 
          this.npc = npc
      
          this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user=> {
              if(user?.username === this.npc?.adminUser){
                this.isAdmin = true;          
              }
            }
          });
        }
      })
    }
  }    
  

  editNpc(id:number){}


  deleteNpc(id:number){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign) {
      this.campaignService.deleteNpc(id).subscribe({
        next: () =>  { 
          this.toastr.success('Npc Deleted Successfully');
          //TODO: Remove the component.
          this.router.navigateByUrl('/campaign/'+id); 
        }
      });
    }
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
        btn.title = 'Make NPC Visible to Players'
        btn.innerHTML = '<i class="fa fa-eye"></i>';
      }      
    }
  }

}
