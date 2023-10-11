import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-mermber-list',
  templateUrl: './mermber-list.component.html',
  styleUrls: ['./mermber-list.component.css']
})
export class MermberListComponent implements OnInit{
  members: Member[] = [];

  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next: members=> this.members = members
    })
  }

}
