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
      this.connector.getSkillsFromCurrentUser(action).pipe(
        map((data) => KexProfileActions.GetSkillsActions.success({skills: data})),
        catchError(() => of(KexProfileActions.GetSkillsActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  getExperiences = createEffect(() => this.actions$.pipe(
      ofType(KexProfileActions.GetExperiencesActions.do),
      switchMap(action =>
        this.connector.getExperiencesFromCurrentUser(action).pipe(
          map((data) => KexProfileActions.GetExperiencesActions.success({experiences: data})),
          catchError(() => of(KexProfileActions.GetExperiencesActions.fail()).pipe(tap(error => console.log(error))))
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

  updateVisibilitySkill = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.UpdateVisibilitySkillActions.do),
    switchMap(action =>
      this.connector.editSkill(action).pipe(
        map((data) => KexProfileActions.UpdateVisibilitySkillActions.success()),
        catchError(() => of(KexProfileActions.UpdateVisibilitySkillActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  addExperience = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.AddExperienceActions.do),
    switchMap(action =>
      this.connector.addExperience(action).pipe(
        map((data) => KexProfileActions.AddExperienceActions.success()),
        catchError(() => of(KexProfileActions.AddExperienceActions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  deleteExperience = createEffect(()=> this.actions$.pipe(
  ofType(KexProfileActions.DeleteExperienceActions.do),
  switchMap(action=>
    this.connector.deleteExperience(action).pipe(
    map((data)=>KexProfileActions.DeleteExperienceActions.success()),
    catchError(()=>of(KexProfileActions.DeleteExperienceActions.fail()).pipe(tap(error => console.log(error))))
    ))
  ));

  editExperience = createEffect(()=> this.actions$.pipe(
                   ofType(KexProfileActions.EditExperienceActions.do),
                   switchMap(action=>
                     this.connector.editExperience(action).pipe(
                     map((data)=>KexProfileActions.EditExperienceActions.success()),
                     catchError(()=>of(KexProfileActions.EditExperienceActions.fail()).pipe(tap(error => console.log(error))))
                     ))
  ));

  updateVisibilityExperience = createEffect(()=> this.actions$.pipe(
                    ofType(KexProfileActions.UpdateVisibilityExperienceActions.do),
                      switchMap(action=>
                      this.connector.editExperience(action).pipe(
                      map((data)=>KexProfileActions.UpdateVisibilityExperienceActions.success()),
                      catchError(()=>of(KexProfileActions.UpdateVisibilityExperienceActions.fail()).pipe(tap(error => console.log(error))))
                ))
  ));

  setContactOptions = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.SetContactOptions.do),
    switchMap(action =>
      this.connector.setContactOption(action.user).pipe(
        map((data) => KexProfileActions.SetContactOptions.success()),
        catchError(() => of(KexProfileActions.SetContactOptions.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  setContactTime = createEffect(() => this.actions$.pipe(
    ofType(KexProfileActions.SetContactTimes.do),
    switchMap(action =>
      this.connector.saveContactTime(action.contactTimeSlots).pipe(
        map((data) => KexProfileActions.SetContactTimes.success()),
        catchError(() => of(KexProfileActions.SetContactTimes.fail()).pipe(tap(error => console.log(error))))
      ))
  ));

  constructor(
    private actions$: Actions,
    private connector : KexProfileConnectorService
  ) {
  }
}
