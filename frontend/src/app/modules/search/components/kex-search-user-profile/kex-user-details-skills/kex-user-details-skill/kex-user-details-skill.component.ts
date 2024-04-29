import {Component, Input} from '@angular/core';
import {KexUserSkill} from "../../../../../profile/models/kex-profile.model";

@Component({
  selector: 'kex-user-details-skill',
  templateUrl: './kex-user-details-skill.component.html',
  styleUrl: './kex-user-details-skill.component.scss'
})
export class KexUserDetailsSkillComponent {

  @Input() userSkill : KexUserSkill | undefined;

}
