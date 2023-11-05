import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-mermber-list',
  templateUrl: './mermber-list.component.html',
  styleUrls: ['./mermber-list.component.css']
})
export class MermberListComponent implements OnInit{
  members$: Observable<Member[]> | undefined;

  constructor(private memberService:MembersService){}

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }



}
