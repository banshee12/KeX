import * as KexProfileActions from '../actions/kex-profile.actions';
import {Injectable} from "@angular/core";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {KexProfileConnectorService} from "../../services/kex-profile-connector.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';

@Injectable()
export class KexProfileEffects {

  getSkills = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.GetSkillsActions.do),
    switchMap(action =>
      this.connector.getSkillsFromCurrentUser().pipe(
        map((data) => KexProfileActions.GetSkillsActions.success({skills: data})),
        catchError(() => of(KexProfileActions.GetSkillsActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  addSkill = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.AddSkillActions.do),
    switchMap(action =>
      this.connector.addSkill(action).pipe(
        map((data) => KexProfileActions.AddSkillActions.success()),
        catchError(() => of(KexProfileActions.AddSkillActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  deleteSkill = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.DeleteSkillActions.do),
    switchMap(action =>
      this.connector.deleteSkill(action).pipe(
        map((data) => KexProfileActions.DeleteSkillActions.success()),
        catchError(() => of(KexProfileActions.DeleteSkillActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  editSkill = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.EditSkillActions.do),
    switchMap(action =>
      this.connector.editSkill(action).pipe(
        map((data) => KexProfileActions.EditSkillActions.success()),
        catchError(() => of(KexProfileActions.EditSkillActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));


  constructor(
    private actions$: Actions,
    private connector : KexProfileConnectorService
  ) {
  }
}
