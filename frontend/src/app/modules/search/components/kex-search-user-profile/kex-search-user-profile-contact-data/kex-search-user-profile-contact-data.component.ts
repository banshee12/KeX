import {Component, Input} from '@angular/core';
import {Experience} from "../../../../profile/models/kex-profile.model";
import {User} from "../../../../../core/models/kex-core.models";

@Component({
  selector: 'kex-search-user-profile-contact-data',
  templateUrl: './kex-search-user-profile-contact-data.component.html',
  styleUrl: './kex-search-user-profile-contact-data.component.scss'
})
export class KexSearchUserProfileContactDataComponent {
  @Input() user : User | undefined;

}
