import {Component, OnInit} from '@angular/core';
import {Observable, timeInterval} from "rxjs";
import {ContactTimeSlot} from "../../../../models/kex-profile.model";
import {KexProfileSelector} from "../../../../store/selectors/kex-profile.selectors";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../store/kex-profile.state";
import {KexLoadState} from "../../../../../../core/models/kex-core.models";
import {SetContactTimes} from "../../../../store/actions/kex-profile.actions";

@Component({
  selector: 'kex-profile-contact-time',
  templateUrl: './kex-profile-contact-time.component.html',
  styleUrl: './kex-profile-contact-time.component.scss'
})
export class KexProfileContactTimeComponent implements OnInit {
  editMode: boolean = false;
  contactTimeSlotsEdit: ContactTimeSlot[] = [];

  constructor(private store: Store<KexProfileState>) {
  }

  get $contactTime(): Observable<ContactTimeSlot[] | undefined> {
    return this.store.select(KexProfileSelector.getContactTime);
  }

  get $setContactTimeLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.setContactTimeLoadState);
  }


  cancel() {

  }

  saveContactTime() {
    let requestTimeSlots: ContactTimeSlot[] = [];
    this.contactTimeSlotsEdit.forEach(
      slot => {
        if (slot.fromTimeDisplayed && slot.toTimeDisplayed) {
          requestTimeSlots.push(
            {
              day: slot.day,
              fromTime: this.getDateFromDisplayedTime(slot.fromTimeDisplayed),
              toTime: this.getDateFromDisplayedTime(slot.toTimeDisplayed)
            }
          )
        }
      }
    );
    console.log(requestTimeSlots);
    this.store.dispatch(SetContactTimes.do({contactTimeSlots: requestTimeSlots}));
  }

  get newTimeSlot(): ContactTimeSlot {
    let date = new Date();
    date.setHours(8);
    date.setMinutes(0);
    let result: ContactTimeSlot = {
      day: 'MONDAY',
      fromTime: date,
      toTime: date,
      fromTimeDisplayed: this.getDisplayedTime(date),
      toTimeDisplayed: this.getDisplayedTime(date),
    }
    return result;
  }

  getDisplayedTime(date: Date): string {
    let dateDate = new Date(date);
    if (dateDate != date) {
      dateDate.setHours(dateDate.getHours() + 2)
    }
    let hours = dateDate.getHours();
    let hoursString = hours < 10 ? '0' + hours : hours.toString();
    let minutes = dateDate.getMinutes();
    let minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    return hoursString + ':' + minutesString;
  }

  getDateFromDisplayedTime(timeDisplayed: string): Date {
    let timeDisplayedParts = timeDisplayed.split(':');
    let date = new Date();
    date.setHours(+timeDisplayedParts[0]);
    date.setMinutes(+timeDisplayedParts[1]);
    console.log(date);
    return date;
  }

  addTimeSlot() {
    this.contactTimeSlotsEdit.push(this.newTimeSlot);
  }

  ngOnInit(): void {
    this.$contactTime.pipe().subscribe(
      timeSlots => {
        this.contactTimeSlotsEdit = [];
        if (timeSlots) {
          timeSlots.forEach(
            slot => {
              this.contactTimeSlotsEdit.push({
                toTimeDisplayed: this.getDisplayedTime(slot.toTime),
                fromTimeDisplayed: this.getDisplayedTime(slot.fromTime),
                toTime: slot.toTime,
                fromTime: slot.fromTime,
                day: slot.day
              })
            }
          )
        }
        if (this.contactTimeSlotsEdit.length === 0) {
          this.addTimeSlot();
        }
      }
    )
  }

  deleteTimeSlot(timeSlotIndex: number) {
    this.contactTimeSlotsEdit.splice(timeSlotIndex, 1);
  }
}
