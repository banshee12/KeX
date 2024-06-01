import { Component, Input } from '@angular/core';
import {ContactTimeSlot} from "../../../modules/profile/models/kex-profile.model";

@Component({
  selector: 'kex-contact-times',
  templateUrl: './kex-contact-times.component.html',
  styleUrl: './kex-contact-times.component.scss'
})
export class KexContactTimesComponent {

  @Input() userContactTimes : ContactTimeSlot[] = [];
  get showContactTimes() : boolean {
    return this.userContactTimes?.length > 0;
  }
}
