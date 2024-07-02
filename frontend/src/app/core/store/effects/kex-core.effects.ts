import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as KexCoreActions from "../actions/kex-core.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {KexProfileConnectorService} from "../../../modules/profile/services/kex-profile-connector.service";
import {KexCoreService} from "../../services/kex-core.service";

@Injectable()
export class KexCoreEffects {

getCurrentUser = createEffect(() => this.actions$.pipe(
  ofType(KexCoreActions.GetCurrentUser.do),
  switchMap(action =>
    this.coreService.getCurrentUser().pipe(
      map((data) => KexCoreActions.GetCurrentUser.success({user: data})),
      catchError(() => of(KexCoreActions.GetCurrentUser.fail()).pipe(tap(error => console.log(error))))
    ))
));

  constructor(
    private actions$: Actions,
    private coreService : KexCoreService
  ) {
  }

}
