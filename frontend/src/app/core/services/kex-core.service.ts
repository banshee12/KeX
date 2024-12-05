import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {KexLoadState, KexNotificationType} from "../models/kex-core.models";
import {KexNotificationComponent} from "../../shared/components/kex-notification/kex-notification.component";
import {KexCoreState} from "../store/kex-core.state";
import {Store} from "@ngrx/store";
import {KexCoreSelector} from "../store/selectors/kex-core.selectors";
import {map} from "rxjs/operators";
import {kexWidgetSettingsConfig} from "../store/kex-widget-settings.config";
import {filter, Observable, take} from "rxjs";
import {KexWidgetSetting} from "../../modules/settings/models/kex-settings.model";
import {loadWidgetSettings, saveWidgetSettings} from "../store/actions/kex-core.actions";


@Injectable({
  providedIn: 'root'
})
export class KexCoreService {
  constructor(private _snackBar: MatSnackBar,
              private store: Store<KexCoreState>) {
  }

  handleRequestState(loadState: KexLoadState, textSuccess?: string, textError?: string, onSuccess?: Function, onError?: Function, clearAction?: Function) {
    if (loadState === KexLoadState.SUCCESS) {
      if (textSuccess) this.openNotification(textSuccess, KexNotificationType.SUCCESS);
      if (onSuccess) onSuccess();
    } else if (loadState === KexLoadState.FAILURE) {
      if (textError) this.openNotification(textError, KexNotificationType.ERROR);
      if (onError) onError();
    }
    if (clearAction && (loadState === KexLoadState.SUCCESS || KexLoadState.FAILURE)) clearAction();
  }

  openNotification(message: string, type: KexNotificationType = KexNotificationType.INFO) {
    this._snackBar.openFromComponent(KexNotificationComponent, {
      duration: 3000,
      data: {message: message, type: type},
      horizontalPosition: "end"
    });
  }

  getWidgetSettings() : Observable<KexWidgetSetting[]>{
    return this.store.select(KexCoreSelector.getWidgetSettings).pipe(map(data => {
      let widgetSettings = kexWidgetSettingsConfig;
      let lastNumber = data.length + 1;
      if (data.length > 0) {
        widgetSettings.forEach(setting => {
          let orderNumber = data.findIndex(value => value === setting.name);
          if (orderNumber == -1) {
            orderNumber = lastNumber;
            lastNumber = lastNumber + 1;
          } else {
            orderNumber = orderNumber + 1;
          }
          setting.order = orderNumber;
        })
      }
      widgetSettings.sort((component1, component2) => component1.order - component2.order);
      return widgetSettings;
    }));
  }

  loadWidgetSettings() {
    this.saveWidgetSettingDataLoadState$.pipe(
      filter(state => state !== KexLoadState.LOADING), take(1)).subscribe(data => {
      this.store.dispatch(saveWidgetSettings.reset());
      this.store.dispatch(loadWidgetSettings.do());
    })
  }

  saveWidgetSetting(setting : string[]) {
    this.store.dispatch(saveWidgetSettings.do({widgetSettings : setting}));
  }

  get widgetSettingDataLoadState$() : Observable<KexLoadState> {
    return this.store.select(KexCoreSelector.getWidgetSettingsLoadState);
  }

  get saveWidgetSettingDataLoadState$() : Observable<KexLoadState> {
    return this.store.select(KexCoreSelector.getSaveWidgetSettingsLoadState);
  }
}
