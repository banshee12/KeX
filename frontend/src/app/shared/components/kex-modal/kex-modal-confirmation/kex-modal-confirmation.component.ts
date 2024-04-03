import {Component, Input} from '@angular/core';

@Component({
  selector: 'kex-modal-confirmation',
  templateUrl: './kex-modal-confirmation.component.html',
  styleUrl: './kex-modal-confirmation.component.scss'
})
export class KexModalConfirmationComponent {

  @Input() labelAction: string = 'Weiter';
  @Input() labelHeadline: string = '';
  @Input() labelDescription: string = '';

}
