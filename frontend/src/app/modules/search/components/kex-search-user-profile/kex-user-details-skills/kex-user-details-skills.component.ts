import {Component, Input} from '@angular/core';
import {KexUserSkill} from "../../../../profile/models/kex-profile.model";

@Component({
  selector: 'kex-user-details-skills',
  templateUrl: './kex-user-details-skills.component.html',
  styleUrl: './kex-user-details-skills.component.scss'
})
export class KexUserDetailsSkillsComponent {

  @Input() skillList : KexUserSkill[] = [];


}
