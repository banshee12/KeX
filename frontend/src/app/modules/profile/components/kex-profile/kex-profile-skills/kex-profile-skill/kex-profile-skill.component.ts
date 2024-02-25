import {Component, Input} from '@angular/core';
import {Skill} from "../../../../models/kex-profile.model";
import {KexCoreService} from "../../../../../../core/services/kex-core.service";

@Component({
  selector: 'kex-profile-skill',
  templateUrl: './kex-profile-skill.component.html',
  styleUrl: './kex-profile-skill.component.scss'
})
export class KexProfileSkillComponent {
  @Input() skill: Skill | undefined;

  constructor(private coreService: KexCoreService) {
  }

  test() {
    this.coreService.openNotification('test');
  }
}
