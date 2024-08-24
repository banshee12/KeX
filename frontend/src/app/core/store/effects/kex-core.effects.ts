import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as KexCoreActions from "../actions/kex-core.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {KexProfileConnectorService} from "../../../modules/profile/services/kex-profile-connector.service";
import {KexCoreService} from "../../services/kex-core.service";
import {KexCoreConnectorService} from "../../services/kex-core-connector.service";

@Injectable()
export class KexCoreEffects {

getCurrentUser = createEffect(() => this.actions$.pipe(
  ofType(KexCoreActions.GetCurrentUser.do),
  switchMap(action =>
    this.connector.getCurrentUser().pipe(
      map((data) => KexCoreActions.GetCurrentUser.success({user: data})),
      catchError(() => of(KexCoreActions.GetCurrentUser.fail()).pipe(tap(error => console.log(error))))
    ))
));

  GetFavoriteUserList = createEffect(() => this.actions$.pipe(
    ofType(KexCoreActions.GetFavoriteUserList.do),
    switchMap(action =>
      this.connector.getFavoriteUserList().pipe(
        map((data) => KexCoreActions.GetFavoriteUserList.success({users : data})),
        catchError(() => of(KexCoreActions.GetFavoriteUserList.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  addFavoriteUser = createEffect(() => this.actions$.pipe(
    ofType(KexCoreActions.AddFavoriteUser.do),
    switchMap(action =>
      this.connector.editFavoriteUser(action.userSub, false).pipe(
        map((data) => KexCoreActions.AddFavoriteUser.success()),
        catchError(() => of(KexCoreActions.AddFavoriteUser.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  removeFavoriteUser = createEffect(() => this.actions$.pipe(
    ofType(KexCoreActions.RemoveFavoriteUser.do),
    switchMap(action =>
      this.connector.editFavoriteUser(action.userSub, true).pipe(
        map((data) => KexCoreActions.RemoveFavoriteUser.success()),
        catchError(() => of(KexCoreActions.RemoveFavoriteUser.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  constructor(
    private actions$: Actions,
    private connector : KexCoreConnectorService
  ) {
  }

}
