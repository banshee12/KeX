import {Component, OnInit} from '@angular/core';
import {Observable, timeInterval} from "rxjs";
import {ContactTimeSlot} from "../../../../models/kex-profile.model";
import {KexProfileSelector} from "../../../../store/selectors/kex-profile.selectors";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../store/kex-profile.state";
import {KexLoadState} from "../../../../../../core/models/kex-core.models";

@Component({
  selector: 'kex-profile-contact-time',
  templateUrl: './kex-profile-contact-time.component.html',
  styleUrl: './kex-profile-contact-time.component.scss'
})
export class KexProfileContactTimeComponent implements OnInit{
  editMode: boolean = false;
  contactTimeSlotsEdit : ContactTimeSlot[] = [];

  constructor(private store : Store<KexProfileState>) { }
  get $contactTime() : Observable<ContactTimeSlot[] | undefined> {
    return this.store.select(KexProfileSelector.getContactTime);
  }

  get $setContactTimeLoadState() : Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.setContactTimeLoadState);
  }


  cancel() {

  }

  saveContactTime() {

  }

  get newTimeSlot() : ContactTimeSlot {
    let date = new Date();
    date.setHours(8);
    date.setMinutes(0);

    let result : ContactTimeSlot = {
      day: 'Montag',
      fromTime : date,
      toTime : date
    }
    return result;
  }

  addTimeSlot() {
    this.contactTimeSlotsEdit.push(this.newTimeSlot);
  }

  ngOnInit(): void {
    this.$contactTime.pipe().subscribe(
      timeSlots => {
        this.contactTimeSlotsEdit = timeSlots ? [...timeSlots] : [];
        if(this.contactTimeSlotsEdit.length === 0){
          this.addTimeSlot();
        }
      }
    )
  }

  deleteTimeSlot(timeSlotIndex: number) {
    this.contactTimeSlotsEdit.splice(timeSlotIndex,1);
  }
}
