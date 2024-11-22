import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as KexCoreActions from "../actions/kex-core.actions";
import {catchError, last, map, mergeMap, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {KexProfileConnectorService} from "../../../modules/profile/services/kex-profile-connector.service";
import {KexCoreService} from "../../services/kex-core.service";
import {KexCoreConnectorService} from "../../services/kex-core-connector.service";
import {kexWidgetSettingsConfig} from "../kex-widget-settings.config";
import {KexWidgetSetting} from "../../../modules/settings/models/kex-settings.model";
import {
  KexWidgetSkillsComponent
} from "../../../modules/home/components/widgets/kex-widget-skills/kex-widget-skills.component";
import {
  KexWidgetExperienceComponent
} from "../../../modules/home/components/widgets/kex-widget-experience/kex-widget-experience.component";
import {
  KexWidgetContactDataComponent
} from "../../../modules/home/components/widgets/kex-widget-contact-data/kex-widget-contact-data.component";
import {
  KexWidgetFeedbackComponent
} from "../../../modules/home/components/widgets/kex-widget-feedback/kex-widget-feedback.component";
import {
  KexWidgetFavoriteUserComponent
} from "../../../modules/home/components/widgets/kex-widget-favorite-user/kex-widget-favorite-user.component";

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
        map((data) => KexCoreActions.GetFavoriteUserList.success({users: data})),
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

  loadWidgetSetting = createEffect(() => this.actions$.pipe(
    ofType(KexCoreActions.loadWidgetSettings.do),
    switchMap(action =>
      this.connector.loadKexWidgetSettings().pipe(
        map((data) => KexCoreActions.loadWidgetSettings.success({widgetSettings : data})),
        catchError(() => of(KexCoreActions.loadWidgetSettings.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  saveWidgetSetting = createEffect(() => this.actions$.pipe(
    ofType(KexCoreActions.saveWidgetSettings.do),
    switchMap(action =>
      this.connector.saveKexWidgetSettings(action.widgetSettings).pipe(
        map((data) => KexCoreActions.saveWidgetSettings.success()),
        catchError(() => of(KexCoreActions.saveWidgetSettings.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  constructor(
    private actions$: Actions,
    private connector: KexCoreConnectorService
  ) {
  }

}
