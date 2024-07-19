import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {KexLoadState, KexNotificationType, User} from "../models/kex-core.models";
import {KexNotificationComponent} from "../../shared/components/kex-notification/kex-notification.component";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class KexCoreService {
  private API_URL= environment.API_URL;

  constructor(private _snackBar: MatSnackBar,
              private http : HttpClient,
              private store: Store) {
  }

  handleRequestState(loadState : KexLoadState, textSuccess? : string, textError?: string, onSuccess?: Function, onError? : Function, clearAction?: Function){
    if(loadState === KexLoadState.SUCCESS){
      if(textSuccess) this.openNotification(textSuccess, KexNotificationType.SUCCESS);
      if(onSuccess) onSuccess();
    }else if (loadState === KexLoadState.FAILURE) {
      if(textError) this.openNotification(textError, KexNotificationType.ERROR);
      if(onError) onError();
    }
    if(clearAction && (loadState === KexLoadState.SUCCESS || KexLoadState.FAILURE)) clearAction();
  }

  getCurrentUser() : Observable<User> {
    return this.http.get<User>(this.API_URL + '/user');
  }

  openNotification(message: string, type: KexNotificationType = KexNotificationType.INFO) {
    this._snackBar.openFromComponent(KexNotificationComponent, {
      duration: 3000,
      data: {message: message, type: type},
      horizontalPosition : "end"
    });
  }
}
