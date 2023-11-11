import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign } from '../_models/campaign';
import { Player } from '../_models/player';
import { Quest } from '../_models/quest';
import { BehaviorSubject, map, of, take } from 'rxjs';
import { Npc } from '../_models/npc';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  baseUrl = environment.apiUrl;
  campaigns: Campaign[] = [];
  quests:Quest[] = [];
  npcs:Npc[]=[];
  model:any;
  user:User| null = null;
  private isAdminSource = new BehaviorSubject<boolean | null>(null);
  isAdmin$ = this.isAdminSource.asObservable();

  constructor(private http:HttpClient, private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user => this.user = user
    })
   }

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

  deleteCampaign(id:number){
    return this.http.delete(this.baseUrl + 'campaign/delete/' + id);
  }

  getPlayersByCampaignId(id:number){
    return this.http.get<Player[]>(this.baseUrl + 'campaign/playercharacters/' + id);
  }

  getPlayersById(id:number){
    return this.http.get<Player>(this.baseUrl + 'campaign/player/' + id);
  }

  deletePlayer(id:number){
    return this.http.delete(this.baseUrl + 'campaign/player/delete/' + id);
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

  joinCampaign(id:number, username:string){
    this.model  = {
      id: id,
      userName: username
    }
    return this.http.post<any>(this.baseUrl + 'campaign/join', this.model)
  }

  createCampaign(name:string, username:string, description:string){
    console.log("creating: "+ name + " " +username)
    this.model  = {
      name: name,
      adminUser: username,
      description: description
    }
    return this.http.post<Campaign>(this.baseUrl + 'campaign/create', this.model)
  }

  checkIsAdmin(campaign:Campaign){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user=> {
        if(user?.username == campaign?.adminUser){
          this.isAdminSource.next(true);
        }
        else return this.isAdminSource.next(false);
      }
    });
  }


  addPlayer(player:Player,campaign:number,user: User){
    player.campaignId = campaign;
    player.userName = user.username;
    return this.http.post(this.baseUrl + 'campaign/addpc', player).pipe();
  }

  deleteNote(quest:Quest){
    return this.http.post(this.baseUrl + 'quests/delete',quest);
  }

  toggleNoteVisibility(quest:Quest){
    return this.http.post(this.baseUrl + 'quest/toggleVisibility' ,quest);
  }


}
