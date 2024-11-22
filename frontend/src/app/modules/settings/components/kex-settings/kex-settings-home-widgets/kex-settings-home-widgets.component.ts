import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {KexCoreService} from "../../../../../core/services/kex-core.service";
import {Observable, Subscription} from "rxjs";
import {KexWidgetSetting} from "../../../models/kex-settings.model";
import {KexLoadState} from "../../../../../core/models/kex-core.models";

@Component({
  selector: 'kex-settings-home-widgets',
  templateUrl: './kex-settings-home-widgets.component.html',
  styleUrl: './kex-settings-home-widgets.component.scss',
})


export class KexSettingsHomeWidgetsComponent implements OnDestroy, OnInit{

  public items : KexWidgetSetting[] = [];
  private subscriptions : Subscription[] = [];
  constructor(private coreService : KexCoreService) {
    this.coreService.loadWidgetSettings();
  }
  drop(event: CdkDragDrop<string[]>, items : KexWidgetSetting[]) {
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.items = items;
  }

  get widgetItems$() : Observable<KexWidgetSetting[]> {
    return this.coreService.getWidgetSettings();
  }

  get loadState$() : Observable<KexLoadState> {
    return this.coreService.widgetSettingDataLoadState$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    let widgetSetting : string[] = [];
    this.items.forEach(item => widgetSetting.push(item.name));
    this.coreService.saveWidgetSetting(widgetSetting);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.widgetItems$.pipe().subscribe(items => {
      this.items = items;
      }
    ));
  }

}
