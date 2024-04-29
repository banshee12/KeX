import {Component, Input} from '@angular/core';
import {Experience} from "../../../../profile/models/kex-profile.model";

@Component({
  selector: 'kex-user-details-experiences',
  templateUrl: './kex-user-details-experiences.component.html',
  styleUrl: './kex-user-details-experiences.component.scss'
})
export class KexUserDetailsExperiencesComponent {

  @Input() experienceList : Experience[] = [];
}
