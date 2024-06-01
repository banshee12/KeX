import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KexLoadState} from "../../../../../core/models/kex-core.models";


@Component({
  selector: 'kex-widget-base',
  templateUrl: './kex-widget-base.component.html',
  styleUrl: './kex-widget-base.component.scss'
})
export class KexWidgetBaseComponent {
@Input() actionLabel : string = '';
@Input() title : string = '';
@Input() loadState : KexLoadState | null = KexLoadState.SUCCESS;

@Output() actionClicked = new EventEmitter();

  protected readonly KexLoadState = KexLoadState;

  clickButton() {
    this.actionClicked.emit();
  }
}
