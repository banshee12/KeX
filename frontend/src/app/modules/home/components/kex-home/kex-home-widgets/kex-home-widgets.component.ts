import {Component, OnInit, ViewChild} from '@angular/core';
import {KexDynamicHostDirective} from "../../../kex-dynamic-host.directive";
import {Store} from "@ngrx/store";
import {KexCoreState} from "../../../../../core/store/kex-core.state";
import {KexCoreSelector} from "../../../../../core/store/selectors/kex-core.selectors";
import {loadWidgetSettings} from "../../../../../core/store/actions/kex-core.actions";
import {filter, skipUntil, skipWhile, take} from "rxjs";
import {KexLoadState} from "../../../../../core/models/kex-core.models";
import {KexCoreService} from "../../../../../core/services/kex-core.service";

@Component({
  selector: 'kex-home-widgets',
  templateUrl: './kex-home-widgets.component.html',
  styleUrl: './kex-home-widgets.component.scss'
})
export class KexHomeWidgetsComponent implements OnInit {
  @ViewChild(KexDynamicHostDirective, {static: true}) dynamicHost!: KexDynamicHostDirective;

  constructor(private coreStore: Store<KexCoreState>,
              private coreService : KexCoreService) {
  }



  createComponents() {
    this.coreService.getWidgetSettings().pipe(take(1)).subscribe(
      components => {
        components.forEach(
          component => {
            this.dynamicHost.viewContainerRef.createComponent(component.component);
          }
        );
      }
    )
  }

  ngOnInit(): void {
    this.coreService.loadWidgetSettings();
    this.coreStore.select(KexCoreSelector.getWidgetSettingsLoadState).pipe(
      filter(loadState => loadState === KexLoadState.SUCCESS || loadState === KexLoadState.FAILURE)
    ).subscribe(value => {
      this.createComponents();
    });

  }
}
