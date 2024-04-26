import {Injectable} from "@angular/core";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {KexSearchConnectorService} from "../../services/kex-search-connector.service";
import * as KexSearchActions from '../actions/kex-search.actions';

@Injectable()
export class KexSearchEffects {

  getUserList = createEffect(() => this.actions$.pipe(
    ofType(KexSearchActions.SearchUserActions.do),
    switchMap(action =>
      this.connector.searchUsers(action.value).pipe(
        map((data) => KexSearchActions.SearchUserActions.success({userList : data, count : data.length})),
        catchError(() => of(KexSearchActions.SearchUserActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  getDetailsOfUser = createEffect(() => this.actions$.pipe(
    ofType(KexSearchActions.GetUserProfileActions.do),
    switchMap(action =>
      this.connector.getDetailsOfUser(action.userId).pipe(
        map((data) => KexSearchActions.GetUserProfileActions.success(data)),
        catchError(() => of(KexSearchActions.GetUserProfileActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));


  constructor(
    private actions$: Actions,
    private connector : KexSearchConnectorService
  ) {
  }
}
