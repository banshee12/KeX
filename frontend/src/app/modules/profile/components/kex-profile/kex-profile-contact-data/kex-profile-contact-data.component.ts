import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../store/kex-profile.state";
import {KexProfileSelector} from "../../../store/selectors/kex-profile.selectors";
import {Observable} from "rxjs";
import {KexLoadState} from "../../../../../core/models/kex-core.models";
import {KexCoreSelector} from "../../../../../core/store/selectors/kex-core.selectors";

@Component({
  selector: 'kex-profile-contact-data',
  templateUrl: './kex-profile-contact-data.component.html',
  styleUrl: './kex-profile-contact-data.component.scss'
})
export class KexProfileContactDataComponent implements OnInit{

  constructor(private store : Store<KexProfileState>) { }

  get $loadState() : Observable<KexLoadState> {
    return this.store.select(KexCoreSelector.getCurrentUserLoadState);
  }

  get $setContactOptionLoadState() : Observable<KexLoadState> {
    return this.store.select(KexProfileSelector.setContactOptionLoadState);
  }

  ngOnInit(): void {

  }

  saveContactOptions() {

  }


  protected readonly KexLoadState = KexLoadState;
}
