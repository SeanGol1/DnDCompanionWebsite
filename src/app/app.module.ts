import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MermberListComponent } from './members/mermber-list/mermber-list.component';
import { MermberDetailComponent } from './members/mermber-detail/mermber-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_inteceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { CampaignListComponent } from './campaigns/campaign-list/campaign-list.component';
import { CampaignCardComponent } from './campaigns/campaign-card/campaign-card.component';
import { CampaignDetailComponent } from './campaigns/campaign-detail/campaign-detail.component';
import { CampaignPlayersComponent } from './campaigns/campaign-players/campaign-players.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CampaignQuestComponent } from './campaigns/campaign-quest/campaign-quest.component';
import { CampaignQuestListComponent } from './campaigns/campaign-quest-list/campaign-quest-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NpcCardComponent } from './campaigns/npc-card/npc-card.component';
import { AddPlayersComponent } from './players/add-players/add-players.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MermberListComponent,
    MermberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    CampaignListComponent,
    CampaignCardComponent,
    CampaignDetailComponent,
    CampaignPlayersComponent,
    SideBarComponent,
    CampaignQuestComponent,
    CampaignQuestListComponent,
    MemberEditComponent,
    NpcCardComponent,
    AddPlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS,useClass:JwtInterceptor, multi:true} ,
    {provide: HTTP_INTERCEPTORS,useClass:LoadingInterceptor, multi:true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
