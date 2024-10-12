import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../store/kex-profile.state";
import {KexProfileSelector} from "../../../../store/selectors/kex-profile.selectors";
import {SetContactOptions} from "../../../../store/actions/kex-profile.actions";
import {User} from "../../../../../../core/models/kex-core.models";
import {KexCoreSelector} from "../../../../../../core/store/selectors/kex-core.selectors";

@Component({
  selector: 'kex-profile-contact-option',
  templateUrl: './kex-profile-contact-option.component.html',
  styleUrl: './kex-profile-contact-option.component.scss'
})
export class KexProfileContactOptionComponent implements OnInit, OnDestroy{
  editMode = false;
  subscriptions : Subscription[] = [];
  contactOptionPhone : boolean = false;
  contactOptionMail : boolean = false;
  contactOptionAppointment : boolean = false;
  contactOptionPhoneInitial : boolean = false;
  contactOptionMailInitial : boolean = false;
  contactOptionAppointmentInitial : boolean = false;
  userSub = '';

  constructor(private store : Store<KexProfileState>) { }
  ngOnInit(): void {
    this.subscriptions.push(this.store.select(KexCoreSelector.getCurrentUser).pipe().subscribe(
      user => {
        this.userSub = user?.userSub || '';
        this.contactOptionPhone = user?.contactOptionPhone || false;
        this.contactOptionAppointment = user?.contactOptionAppointment || false;
        this.contactOptionMail = user?.contactOptionMail || false;
        this.contactOptionPhoneInitial = user?.contactOptionPhone || false;
        this.contactOptionAppointmentInitial = user?.contactOptionAppointment || false;
        this.contactOptionMailInitial = user?.contactOptionMail || false;
      }
    ))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  saveContactOption() : void {
    let data : User = {
      userSub : this.userSub,
      contactOptionPhone : this.contactOptionPhone,
      contactOptionMail : this.contactOptionMail,
      contactOptionAppointment : this.contactOptionAppointment,
    }
    this.store.dispatch(SetContactOptions.do({user : data}));
    this.editMode = false;
  }

  cancel() {
    this.editMode = false;
    this.contactOptionMail = this.contactOptionMailInitial;
    this.contactOptionPhone = this.contactOptionPhoneInitial;
    this.contactOptionAppointment = this.contactOptionAppointmentInitial;
  }
}
