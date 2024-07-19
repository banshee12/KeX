import {Component, Input} from '@angular/core';
import {KexButtonType, KexLoadState} from "../../../core/models/kex-core.models";

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
  @Input() label = '';
  @Input() disabled = false;
  @Input() type = KexButtonType.ICON_ONLY

  protected readonly KexButtonType = KexButtonType;
}
