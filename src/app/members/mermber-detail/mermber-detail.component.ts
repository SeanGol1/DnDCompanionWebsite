import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-mermber-detail',
  templateUrl: './mermber-detail.component.html',
  styleUrls: ['./mermber-detail.component.css']
})
export class MermberDetailComponent implements OnInit{
  member: Member  |  undefined;
  constructor(private memberService:MembersService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadMember();
  }


  loadMember(){
    var username = this.route.snapshot.paramMap.get('username');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: member=> this.member = member
    })
  }
}
