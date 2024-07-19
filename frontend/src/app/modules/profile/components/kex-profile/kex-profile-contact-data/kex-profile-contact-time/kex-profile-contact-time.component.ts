import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, take, timeInterval} from "rxjs";
import {ContactTimeSlot} from "../../../../models/kex-profile.model";
import {KexProfileSelector} from "../../../../store/selectors/kex-profile.selectors";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../store/kex-profile.state";
import {KexLoadState} from "../../../../../../core/models/kex-core.models";
import {SetContactTimes} from "../../../../store/actions/kex-profile.actions";
import {KexCoreService} from "../../../../../../core/services/kex-core.service";
import {KexCoreSelector} from "../../../../../../core/store/selectors/kex-core.selectors";
import {KexCoreState} from "../../../../../../core/store/kex-core.state";
import {GetCurrentUser} from "../../../../../../core/store/actions/kex-core.actions";

@Component({
  selector: 'kex-profile-contact-time',
  templateUrl: './kex-profile-contact-time.component.html',
  styleUrl: './kex-profile-contact-time.component.scss'
})
export class KexProfileContactTimeComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  contactTimeSlotsEdit: ContactTimeSlot[] = [];
  subscriptions : Subscription[] = [];

  constructor(private store: Store<KexProfileState>,
              private coreStore: Store<KexCoreState>,
              private coreService : KexCoreService) {
  }

  get $contactTime(): Observable<ContactTimeSlot[] | undefined> {
    return this.store.select(KexCoreSelector.getContactTime);
  }

  get $setContactTimeLoadState(): Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.setContactTimeLoadState);
  }


  cancel() {
      this.editMode = false;
  }

  saveContactTime() {
    let requestTimeSlots: ContactTimeSlot[] = [];
    this.contactTimeSlotsEdit.forEach(
      slot => {
        if (slot.fromTimeDisplayed && slot.toTimeDisplayed) {
          let fromTimeDate = this.getDateFromDisplayedTime(slot.fromTimeDisplayed);
          fromTimeDate.setHours(fromTimeDate.getHours() + 2);
          let toTimeDate = this.getDateFromDisplayedTime(slot.toTimeDisplayed);
          toTimeDate.setHours(toTimeDate.getHours() + 2);
          requestTimeSlots.push(
            {
              day: slot.day,
              fromTime: fromTimeDate,
              toTime: toTimeDate
            }
          )
        }
      }
    );
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
    return date;
  }

  addTimeSlot() {
    this.contactTimeSlotsEdit.push(this.newTimeSlot);
  }

  ngOnInit(): void {
    this.observeSetContactTimes();
  }

  createContactSlotsEdit() {
    this.$contactTime.pipe(take(1)).subscribe(
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

  observeSetContactTimes() {
    this.subscriptions.push(
      this.$setContactTimeLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
          'Kontaktzeiten erfolgreich gespeichert',
          'Es ist ein Fehler aufgetreten. Änderungen wurden nicht gespeichert',
          () => this.leaveEditMode(),
          () => {},
          () => this.store.dispatch(SetContactTimes.reset())
        )
      ));
  }

  deleteTimeSlot(timeSlotIndex: number) {
    this.contactTimeSlotsEdit.splice(timeSlotIndex, 1);
  }

  private leaveEditMode() {
    this.editMode = false;
    this.coreStore.dispatch(GetCurrentUser.do());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  goToEditMode() {
    this.createContactSlotsEdit();
    this.editMode = true;
  }
}
