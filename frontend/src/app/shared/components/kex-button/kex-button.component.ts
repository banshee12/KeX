import {Component, Input} from '@angular/core';
import {KexLoadState} from "../../../core/models/kex-core.models";

@Component({
  selector: 'kex-button',
  templateUrl: './kex-button.component.html',
  styleUrl: './kex-button.component.scss'
})
export class KexButtonComponent {
  public KexLoadState = KexLoadState;
  @Input() loadingState : KexLoadState | null = KexLoadState.NONE;
  @Input() color = 'primary';
  @Input() icon : string | undefined;
  @Input() tooltip = '';

}
