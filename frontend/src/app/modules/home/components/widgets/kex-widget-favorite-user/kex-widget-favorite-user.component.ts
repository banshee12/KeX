import {Component, OnInit} from '@angular/core';
import {KexCoreService} from "../../../../../core/services/kex-core.service";
import {Observable} from "rxjs";
import {KexLoadState, User} from "../../../../../core/models/kex-core.models";
import {Store} from "@ngrx/store";
import {KexCoreState} from "../../../../../core/store/kex-core.state";
import {KexCoreSelector} from "../../../../../core/store/selectors/kex-core.selectors";
import {GetFavoriteUserList, RemoveFavoriteUser} from "../../../../../core/store/actions/kex-core.actions";

@Component({
  selector: 'kex-widget-favorite-user',
  templateUrl: './kex-widget-favorite-user.component.html',
  styleUrl: './kex-widget-favorite-user.component.scss'
})
export class KexWidgetFavoriteUserComponent implements OnInit{

  constructor(private coreService : KexCoreService,
              private store: Store<KexCoreState>) {
  }
  ngOnInit(): void {
    this.store.dispatch(GetFavoriteUserList.do());
  }

  get favoriteUsers$() : Observable<User[]>{
    return this.store.select(KexCoreSelector.getFavoriteUserList);
  }

  get favoriteUsersLoadState$() : Observable<KexLoadState>{
    return this.store.select(KexCoreSelector.getFavoriteUserListLoadState);
  }


}
