import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Campaign } from 'src/app/_models/campaign';
import { Note } from 'src/app/_models/note';
import { Npc } from 'src/app/_models/npc';
import { Player } from 'src/app/_models/player';
import { Quest } from 'src/app/_models/quest';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})

export class CampaignDetailComponent implements OnInit{
  campaign : Campaign  | undefined;
  user: User |  null = null;
  players: Player[] = []; 
  notes: Note[] = []; 
  quests: Quest[] = [];
  npcs: Npc[]=[];
  mainQuests : Quest[] = [];
  sideQuests : Quest[] = [];
  isAdmin: boolean = false;
  isDm: boolean = false;
  isCreator: boolean = false;
  activeTab: string = "about";

  constructor(private campaignService:CampaignService, private accountService:AccountService,private route: ActivatedRoute,private elementRef: ElementRef){
  }

  

  ngOnInit(): void {  
    
    if(this.campaign){
      if(this.campaign.id != Number(this.route.snapshot.paramMap.get('id'))){
        location.reload();
      }
    }
    this.loadCampaign();    
    this.loadPlayers();
    this.loadNotes();
  }

  ngOnDestroy(): void{
    console.log("Destoy");
    this.clearLists();
    location.reload();
  }


  tabChange(tab:string){
    this.activeTab = tab;
  }
  
  loadCampaign(){      
    var campaignid = Number(this.route.snapshot.paramMap.get('id'));    
    if(campaignid) {
      this.campaignService.getCampaignById(campaignid).pipe(take(1)).subscribe({
        next: campaign=> {
          this.campaign = campaign         
          this.loadQuests(campaign);
          this.loadNpcs(campaign);
        }
      });
    }
  }

  clearLists(){
    console.log("Clearing lists");
    this.elementRef.nativeElement.remove();
    this.quests = [];
    this.mainQuests = [];
    this.sideQuests = [];
  }



  loadPlayers(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign){
      this.campaignService.getPlayersByCampaignId(campaign).subscribe({
        next: players=> {this.players = players
          
        
        }
      });
    }
  }

  loadNotes(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign){
      this.campaignService.getNotesByCampaignId(campaign).subscribe({
        next: notes=> this.notes = notes
      });
    }
  }

  loadNpcs(campaign:Campaign){
    if(campaign){
      this.campaignService.getNPCsByCampaignId(campaign.id).subscribe({
        next: npcs=>  {
          //this.npcs = npcs   
          this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user=> {
              this.user = user
              if(this.campaign?.adminUser === this.user?.username ){
                this.isDm = true;
                this.npcs = npcs;
              } 
              else{
                this.isDm = false;
                this.npcs = npcs.filter((npc:Npc) => npc.isVisible == true);       
              }

            }
          });
    

        }
      });
    }
  }

  loadQuests(campaign:Campaign){
    var campaignId = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign){      
      this.campaignService.getQuestsByCampaignId(campaign.id).subscribe({
        next: quests=>  {
          this.quests = quests
          this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user=> {
              this.user = user
              if(this.campaign?.adminUser === this.user?.username ){
                this.isDm = true;
                this.getDmQuests();        
              } 
              else{
                this.isDm = false;
                this.getQuests();        
              }
            }
          });
        }
      });

    }
  }

  getQuests(){
    this.mainQuests = this.quests.filter((quest:Quest) => quest.questType == 1).filter((quest:Quest)=> quest.isVisible == true); 
    this.sideQuests = this.quests.filter((quest:Quest) => quest.questType == 2).filter((quest:Quest)=> quest.isVisible == true);
  }

  getDmQuests(){
    this.mainQuests = this.quests.filter((quest:Quest) => quest.questType == 1);
    this.sideQuests = this.quests.filter((quest:Quest) => quest.questType == 2);
  }
}
