import {Component, OnInit} from '@angular/core';
import {KexProfileSelector} from "../../../../profile/store/selectors/kex-profile.selectors";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../profile/store/kex-profile.state";
import {KexLoadState, User} from "../../../../../core/models/kex-core.models";
import {Observable} from "rxjs";
import {GetCurrentUser} from "../../../../profile/store/actions/kex-profile.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'kex-widget-contact-data',
  templateUrl: './kex-widget-contact-data.component.html',
  styleUrl: './kex-widget-contact-data.component.scss'
})
export class KexWidgetContactDataComponent implements OnInit{

  constructor(private store : Store<KexProfileState>, private router : Router){

  }

  goToProfile() {
    this.router.navigate(['profile'], {queryParams : {tab : '2'}}).then();
  }


  get currentUser$() : Observable<User | undefined>{
    return this.store.select(KexProfileSelector.getCurrentUser);
  }

  get currentUserLoadState$() : Observable<KexLoadState | undefined>{
    return this.store.select(KexProfileSelector.getCurrentUserLoadState);
  }

  ngOnInit(): void {
    this.store.dispatch(GetCurrentUser.do());
    this.currentUser$.subscribe(user => console.log(user));
  }

}
