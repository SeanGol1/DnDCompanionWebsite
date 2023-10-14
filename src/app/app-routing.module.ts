import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MermberListComponent } from './members/mermber-list/mermber-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MermberDetailComponent } from './members/mermber-detail/mermber-detail.component';
import { CampaignListComponent } from './campaigns/campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './campaigns/campaign-detail/campaign-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', runGuardsAndResolvers: 'always', canActivate:[AuthGuard],
children:[
  {path: 'members', component: MermberListComponent},
  {path: 'members/:username', component: MermberDetailComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'campaign', component: CampaignListComponent},
  {path: 'campaign/:id', component: CampaignDetailComponent}

]},  

  {path:'errors',component:TestErrorComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path: '**', component: NotFoundComponent,pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
