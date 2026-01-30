import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Route, Router } from '@angular/router';
import { Campaign } from 'src/app/_models/campaign';
import { Quest } from 'src/app/_models/quest';
import { CampaignService } from 'src/app/_services/campaign.service';

@Component({
  selector: 'app-campaign-quest-list',
  templateUrl: './campaign-quest-list.component.html',
  standalone: false,
  styleUrls: ['./campaign-quest-list.component.css']
})
export class CampaignQuestListComponent implements OnInit{
  private _quests: Quest[] = [];
  public questList: Quest[] = [];
  @Input() set quest(quest: Quest[]) {
    if(quest) {
     this._quests = quest;
    }
  }

  get data(): Quest[] {
    return this._quests;
  }

  mainQuests : Quest[] = [];
  sideQuests : Quest[] = [];
  mainDmQuests : Quest[] = [];
  sideDmQuests : Quest[] = [];

  constructor(private campaignService:CampaignService,private route: ActivatedRoute,private router:Router){
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
          // Function you want to call here
          console.log('running lists');
          //this.populateLists();
      }
   });
  }

  ngOnInit(): void {
    this.populateLists();
  }

  populateLists(){
    this.getQuests();
    this.getMainDmQuests();
    this.getSideDmQuests();
    this.getMainQuests();
    this.getSideQuests(); 
  }

  getQuests(){
    var campaign = Number(this.route.snapshot.paramMap.get('id'));
    if(campaign){
      this.campaignService.getQuestsByCampaignId(campaign).subscribe({
        next: questList =>  this.questList = questList
      });
    }
    console.log(campaign);
    console.log(this.questList)
    console.log(this._quests)
  }

  getMainQuests(){
    this.mainQuests = this.data.filter((quest:Quest) => quest.questType == 1).filter((quest:Quest)=> quest.isVisible == true); //this.mainDmQuests.filter((quest:Quest)=> quest.isVisible == true);
  }

  getSideQuests(){
    this.sideQuests = this.sideDmQuests.filter((quest:Quest)=> quest.isVisible == true);
  }

  getMainDmQuests(){
    this.mainDmQuests = this._quests.filter((quest:Quest) => quest.questType == 1);
  }
  getSideDmQuests(){
    this.sideDmQuests = this._quests.filter((quest:Quest) => quest.questType == 2);
  }
}
