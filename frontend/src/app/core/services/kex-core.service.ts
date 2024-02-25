import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {KexNotificationType} from "../models/kex-core.models";
import {KexNotificationComponent} from "../../shared/components/kex-notification/kex-notification.component";

@Injectable({
  providedIn: 'root'
})
export class KexCoreService {

  constructor(private _snackBar: MatSnackBar) {
  }

  openNotification(message: string, type: KexNotificationType = KexNotificationType.INFO) {
    this._snackBar.openFromComponent(KexNotificationComponent, {
      duration: 3000,
      data: {message: message, type: type},
      horizontalPosition : "end"
    });
  }
}
