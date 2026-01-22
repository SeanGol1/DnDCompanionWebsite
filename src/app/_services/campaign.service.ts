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
import { Note } from '../_models/note';
import { Location } from '../_models/location';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  baseUrl = environment.apiUrl;
  campaigns: Campaign[] = [];
  quests:Quest[] = [];
  npcs:Npc[]=[];
  locals:Location[]=[];
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
    return this.http.get<Player[]>(this.baseUrl + 'player/playercharacters/' + id);
  }

  getPlayersById(id:number){
    return this.http.get<Player>(this.baseUrl + 'player/' + id);
  }

  getNpcById(id:number){
    return this.http.get<Npc>(this.baseUrl + 'npc/' + id);
  }

  getLocationById(id:number){
    return this.http.get<Location>(this.baseUrl + 'location/' + id);
  }

  deletePlayer(id:number){
    return this.http.delete(this.baseUrl + 'player/' + id);
  }

  updatePlayerDndBeyond(id:number){
    return this.http.get<Player>(this.baseUrl + 'player/dndbeyondsync/' + id);
  }

  updatePlayer(player:Player,id:number){
    player.id = id;
    return this.http.put(this.baseUrl + 'player', player);
  }
  updateNpc(npc:Npc,id:number){
    npc.id = id;
    return this.http.put(this.baseUrl + 'npc', npc);
  }

  updateLocation(local:Location,id:number){
    local.id = id;
    return this.http.put(this.baseUrl + 'location', local);
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
    return this.http.get<Npc[]>(this.baseUrl + 'npc/campaign/' + id).pipe(
      map(npcs => {
        this.npcs = npcs;
        return npcs;
      })
    );
  }

  getLocationsByCampaignId(id:number){
    if(this.locals.length > 0) return of(this.locals);
    return this.http.get<Location[]>(this.baseUrl + 'location/campaign/' + id).pipe(
      map(locals => {
        this.locals = locals;
        return locals;
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

  leaveCampaign(id:number, username:string){
    this.model  = {
      id: id,
      userName: username
    }
    console.log("Leave = " + this.model.userName + " " + this.model.id)
    return this.http.post<any>(this.baseUrl + 'campaign/leave', this.model)
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
    return this.http.post<any>(this.baseUrl + 'player', player).pipe();
  }

  addNpc(npc:Npc,campaign:number,user: User){
    npc.campaignId = campaign;
    //npc.userName = user.username;
    return this.http.post<any>(this.baseUrl + 'npc', npc).pipe();
  }

  addLocation(local:Location,campaign:number,user: User){
    local.campaignId = campaign;
    //npc.userName = user.username;
    return this.http.post<any>(this.baseUrl + 'location', local).pipe();
  }

  deleteQuest(id:number){
    return this.http.delete(this.baseUrl + 'quests/delete/' + id);
  }

  deleteNpc(id:number){
    return this.http.delete(this.baseUrl + 'npc/' + id);
  }

  deleteLocation(id:number){
    return this.http.delete(this.baseUrl + 'location/' + id);
  }

  toggleQuestVisibility(id:number){
    return this.http.get(this.baseUrl + 'quests/togglevis/' + id);
  }

  toggleQuestCompleted(id:number){
    return this.http.get(this.baseUrl + 'quests/togglecomp/' + id);
  }

  toggleNpcVisibility(id:number){
    return this.http.get(this.baseUrl + 'npc/togglevis/' + id);
  }

  toggleLocationVisibility(id:number){
    return this.http.get(this.baseUrl + 'location/togglevis/' + id);
  }

  addQuest(quest:Quest,campaign:number){
    quest.campaignId = campaign;
    quest.isVisible= true;
    quest.isCompleted = false;
    quest.questType = 1;
    console.log(quest);
    return this.http.post(this.baseUrl + 'quests', quest).pipe();
  }

  addNote(note:Note,campaign:number){
    note.campaignId = campaign; 
    console.log(note);
    return this.http.post(this.baseUrl + 'notes/create', note).pipe();
  }

  deleteNote(id:number){
    return this.http.delete(this.baseUrl + 'notes/delete/' + id);
  }

  getNotesByCampaignId(id:number){
    return this.http.get<Note[]>(this.baseUrl + 'notes/campaign/' + id);
  }

  
}