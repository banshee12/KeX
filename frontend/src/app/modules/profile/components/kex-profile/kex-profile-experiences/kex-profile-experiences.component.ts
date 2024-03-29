import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Experience} from "../../../models/kex-profile.model";
import { KexLoadState } from '../../../../../core/models/kex-core.models';
import {KexProfileService} from "../../../services/kex-profile.service";

@Component({
  selector: 'kex-profile-experiences',
  templateUrl: './kex-profile-experiences.component.html',
  styleUrl: './kex-profile-experiences.component.scss'
})
export class KexProfileExperiencesComponent {
    public KexLoadState = KexLoadState;
    public newExperience = false;
  constructor(private profileService : KexProfileService) {
  }
  ngOnInit(): void {
    this.profileService.loadExperiences();
  }

    get $experiences() : Observable<Experience[]>{
      return this.profileService.$experiences;
    }

    get $experiencesLoadState() : Observable<KexLoadState>{
      return this.profileService.$experiencesLoadState;
    }
    leaveAddExperienceMode(){
    this.newExperience=false;
    }
      onAddExperience() {
        this.newExperience = true;
      }
}
