import { Component, Input } from '@angular/core';
import { Quest } from 'src/app/_models/quest';

@Component({
  selector: 'app-campaign-quest',
  templateUrl: './campaign-quest.component.html',
  styleUrls: ['./campaign-quest.component.css']
})
export class CampaignQuestComponent {
  @Input() quest : Quest  | undefined;
}
