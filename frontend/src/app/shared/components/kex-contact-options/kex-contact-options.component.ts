import {Component, Input} from '@angular/core';
import {User} from "../../../core/models/kex-core.models";

@Component({
  selector: 'kex-contact-options',
  templateUrl: './kex-contact-options.component.html',
  styleUrl: './kex-contact-options.component.scss'
})
export class KexContactOptionsComponent {

  @Input() user : User | undefined;
  chipColor(optionValue : boolean | undefined) {
    return optionValue === true ? 'primary' : '';
  }
}
