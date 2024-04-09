import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {KexLoadState, KexNotificationType} from "../models/kex-core.models";
import {KexNotificationComponent} from "../../shared/components/kex-notification/kex-notification.component";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class KexCoreService {

  constructor(private _snackBar: MatSnackBar,
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

  openNotification(message: string, type: KexNotificationType = KexNotificationType.INFO) {
    this._snackBar.openFromComponent(KexNotificationComponent, {
      duration: 3000,
      data: {message: message, type: type},
      horizontalPosition : "end"
    });
  }
}
