import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign } from '../_models/campaign';
import { Player } from '../_models/player';
import { Quest } from '../_models/quest';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getCampaigns(){
    return this.http.get<Campaign[]>(this.baseUrl + 'campaign');
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
    return this.http.get<Quest[]>(this.baseUrl + 'quests/' + id);
  }

  joinCampaign(id:number){
    //return this.http.post<Number>(this.baseUrl + 'campaign/' + id)
  }


}
