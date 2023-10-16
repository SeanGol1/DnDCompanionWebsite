import { Component, Input, OnInit } from '@angular/core';
import { Quest } from 'src/app/_models/quest';

@Component({
  selector: 'app-campaign-quest-list',
  templateUrl: './campaign-quest-list.component.html',
  styleUrls: ['./campaign-quest-list.component.css']
})
export class CampaignQuestListComponent implements OnInit{
  private _quests: Quest[] = [];

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

  constructor(){
    
  }

  ngOnInit(): void {
    this.getMainDmQuests();
    this.getSideDmQuests();
    this.getMainQuests();
    this.getSideQuests(); 
  }

  getMainQuests(){
    this.mainQuests = this.mainDmQuests.filter((quest:Quest)=> quest.isVisible == true);
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
