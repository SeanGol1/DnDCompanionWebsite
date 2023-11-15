import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Npc } from 'src/app/_models/npc';
import { User } from 'src/app/_models/user';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-npc-details',
  templateUrl: './npc-details.component.html',
  styleUrls: ['./npc-details.component.css']
})
export class NpcDetailsComponent implements OnInit{
  npc: Npc | undefined;
  user: User | null = null;
  isCreator: Boolean | undefined;


  constructor(private campaignService:CampaignService, private route:ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.loadNpc();
  }



  loadNpc(){       
    var npcid = Number(this.route.snapshot.paramMap.get('id'));
    if(npcid) {
      this.campaignService.getNpcById(npcid).pipe(take(1)).subscribe({
        next: npc=>{ 
          this.npc = npc
      
          // this.accountService.currentUser$.pipe(take(1)).subscribe({
          //   next: user=> this.user = user
          // });
          // console.log(this.player?.userName + " " +  this.user?.username)
          // if(this.player?.userName == this.user?.username ){
          //   this.isCreator = true;
          // } 
          // else{
          //   this.isCreator = false;  
          // }
        }});
    }    
  }

  editNpc(id:number){}


  deleteNpc(id:number){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign) {
      // this.campaignService.deleteNpc(id).subscribe({
      //   next: () =>  { 
      //     this.router.navigateByUrl('/campaign/'+id); 
      //   }
      // });
    }
  }

}
