import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'DnD Companion';
  sideBar: boolean = false;
  url = '';

  constructor( private accountService: AccountService,private router: Router ){
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.setSideBar();
        this.url = this.router.url;
      }
      
    });
  }

  ngOnInit(): void {
    this.setCurrentUser();
    
  } 


  setSideBar(){
    if (this.router.url.includes('campaign/')){
      this.sideBar = true;
    }
    else{
      this.sideBar =false;
    }
  }


  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user:User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
