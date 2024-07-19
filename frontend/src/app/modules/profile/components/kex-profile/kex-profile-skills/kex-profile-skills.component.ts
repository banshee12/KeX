import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {KexUserSkill} from "../../../models/kex-profile.model";
import { KexLoadState } from '../../../../../core/models/kex-core.models';
import {KexProfileService} from "../../../services/kex-profile.service";
import {KexModalComponent} from "../../../../../shared/components/kex-modal/kex-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'kex-profile-skills',
  templateUrl: './kex-profile-skills.component.html',
  styleUrl: './kex-profile-skills.component.scss'
})
export class KexProfileSkillsComponent {

  public KexLoadState = KexLoadState;
  public newSkill = false;
  constructor(private profileService : KexProfileService,
              public dialog: MatDialog) {
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

  openRatingInfo() {
    const dialogRef = this.dialog.open(KexModalComponent, {
      data: {
        labelHeadline: 'Erklärung Level-System',
        labelDescription: 'Die Sterne stellen das Level dar, wie gut du deine Fähigkeiten in diesem Bereich einschätzt. \n\n ' +
          'Jeden Stern kannst du mit etwa 20% gleichsetzen. ' +
          'Wenn du deiner Faähigkeit 3 Sterne gibst, solltest du somit ca. 60% der Fragen, die zu dem Thema gestellt werden könnten, beantworten können. '},
    });
  }

  get $skills() : Observable<KexUserSkill[]>{
    return this.profileService.$skills;
  }

  get $skillsLoadState() : Observable<KexLoadState>{
    return this.profileService.$skillsLoadState;
  }

}
