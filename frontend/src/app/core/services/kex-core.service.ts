import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {KexLoadState, KexNotificationType} from "../models/kex-core.models";
import {KexNotificationComponent} from "../../shared/components/kex-notification/kex-notification.component";

@Injectable({
  providedIn: 'root'
})
export class KexCoreService {

  constructor(private _snackBar: MatSnackBar) {
  }

  handleRequestState(loadState : KexLoadState, textSuccess? : string, textError?: string, onSuccess?: Function, onError? : Function){
    if(loadState === KexLoadState.SUCCESS){
      if(textSuccess) this.openNotification(textSuccess, KexNotificationType.SUCCESS);
      if(onSuccess) onSuccess();
    }else if (loadState === KexLoadState.FAILURE) {
      if(textError) this.openNotification(textError, KexNotificationType.ERROR);
      if(onError) onError();
    }
  }

  openNotification(message: string, type: KexNotificationType = KexNotificationType.INFO) {
    this._snackBar.openFromComponent(KexNotificationComponent, {
      duration: 3000,
      data: {message: message, type: type},
      horizontalPosition : "end"
    });
  }
}
