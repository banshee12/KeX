import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {KexUserSkill} from "../../../models/kex-profile.model";
import { KexLoadState } from '../../../../../core/models/kex-core.models';
import {KexProfileService} from "../../../services/kex-profile.service";

@Component({
  selector: 'kex-profile-skills',
  templateUrl: './kex-profile-skills.component.html',
  styleUrl: './kex-profile-skills.component.scss'
})
export class KexProfileSkillsComponent {

  public KexLoadState = KexLoadState;
  public newSkill = false;
  constructor(private profileService : KexProfileService) {
  }
  ngOnInit(): void {
    this.profileService.loadSkills();
  }

  onAddSkill() {
    this.newSkill = true;
  }

  leaveAddSkillMode() {
    this.newSkill = false;
  }

  get $skills() : Observable<KexUserSkill[]>{
    return this.profileService.$skills;
  }

  get $skillsLoadState() : Observable<KexLoadState>{
    return this.profileService.$skillsLoadState;
  }

}
