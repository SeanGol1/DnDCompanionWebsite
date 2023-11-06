import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign } from '../_models/campaign';
import { Player } from '../_models/player';
import { Quest } from '../_models/quest';
import { map, of } from 'rxjs';
import { Npc } from '../_models/npc';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  baseUrl = environment.apiUrl;
  campaigns: Campaign[] = [];
  quests:Quest[] = [];
  npcs:Npc[]=[];

  constructor(private http:HttpClient) { }

  getCampaigns(){
    if(this.campaigns.length > 0) return of(this.campaigns);
    return this.http.get<Campaign[]>(this.baseUrl + 'campaign').pipe(
      map(campaigns => {
        this.campaigns = campaigns;
        return campaigns;
      })
    );
  }
  
  getCampaignsByUserId(username:string){
    return this.http.get<Campaign[]>(this.baseUrl + 'campaign/list/' + username);
  }

  getCampaignById(id:number){
    return this.http.get<Campaign>(this.baseUrl + 'campaign/' + id);
  }

  getPlayersByCampaignId(id:number){
    return this.http.get<Player[]>(this.baseUrl + 'campaign/players/' + id);
  }

  getQuestsByCampaignId(id:number){
    if(this.quests.length > 0) return of(this.quests);
    return this.http.get<Quest[]>(this.baseUrl + 'quests/' + id).pipe(
      map(quests => {
        this.quests = quests;
        return quests;
      })
    );
  }

  getNPCsByCampaignId(id:number){
    if(this.npcs.length > 0) return of(this.npcs);
    return this.http.get<Npc[]>(this.baseUrl + 'campaign/npcs/' + id).pipe(
      map(npcs => {
        this.npcs = npcs;
        return npcs;
      })
    );
  }

  joinCampaign(id:number){
    //return this.http.post<Number>(this.baseUrl + 'campaign/' + id)
  }


}
