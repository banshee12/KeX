import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {KexLoadState, User} from "../../../../../core/models/kex-core.models";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {KexCoreState} from "../../../../../core/store/kex-core.state";
import {GetCurrentUser} from "../../../../../core/store/actions/kex-core.actions";
import {KexCoreSelector} from "../../../../../core/store/selectors/kex-core.selectors";

@Component({
  selector: 'kex-widget-contact-data',
  templateUrl: './kex-widget-contact-data.component.html',
  styleUrl: './kex-widget-contact-data.component.scss'
})
export class KexWidgetContactDataComponent implements OnInit{

  constructor(private store : Store<KexCoreState>, private router : Router){

  }

  goToProfile() {
    this.router.navigate(['profile'], {queryParams : {tab : '2'}}).then();
  }


  get currentUser$() : Observable<User | undefined>{
    return this.store.select(KexCoreSelector.getCurrentUser);
  }

  get currentUserLoadState$() : Observable<KexLoadState | undefined>{
    return this.store.select(KexCoreSelector.getCurrentUserLoadState);
  }

  ngOnInit(): void {
    this.store.dispatch(GetCurrentUser.do());
    this.currentUser$.subscribe(user => console.log(user));
  }

}
