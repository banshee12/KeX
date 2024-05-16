import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../store/kex-profile.state";
import {GetCurrentUser} from "../../../store/actions/kex-profile.actions";
import {KexProfileSelector} from "../../../store/selectors/kex-profile.selectors";
import {Observable} from "rxjs";
import {ContactTimeSlot} from "../../../models/kex-profile.model";
import {KexLoadState} from "../../../../../core/models/kex-core.models";

@Component({
  selector: 'kex-profile-contact-data',
  templateUrl: './kex-profile-contact-data.component.html',
  styleUrl: './kex-profile-contact-data.component.scss'
})
export class KexProfileContactDataComponent implements OnInit{

  constructor(private store : Store<KexProfileState>) { }

  get $loadState() : Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.getCurrentUserLoadState);
  }

  get $setContactOptionLoadState() : Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.setContactOptionLoadState);
  }

  ngOnInit(): void {
    this.store.dispatch(GetCurrentUser.do());
  }

  saveContactOptions() {

  }


  protected readonly KexLoadState = KexLoadState;
}
