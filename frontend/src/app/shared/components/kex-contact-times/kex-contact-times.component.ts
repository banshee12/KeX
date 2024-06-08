import {Component, Input} from '@angular/core';
import {ContactTimeSlot} from "../../../modules/profile/models/kex-profile.model";

@Component({
  selector: 'kex-contact-times',
  templateUrl: './kex-contact-times.component.html',
  styleUrl: './kex-contact-times.component.scss'
})
export class KexContactTimesComponent {

  @Input() userContactTimes: ContactTimeSlot[] = [];
  @Input() showHeadline = true;

  get showContactTimes(): boolean {
    return this.userContactTimes?.length > 0;
  }

  getDay(day: string) : string {
    switch (day) {
      case 'MONDAY' :
        return 'Montag';
      case 'TUESDAY' :
        return 'Dienstag';
      case 'WEDNESDAY' :
        return 'Mittwoch';
      case 'THURSDAY' :
        return 'Donnerstag';
      case 'FRIDAY' :
        return 'Freitag';
      default:
        return '';
    }
  }
}
