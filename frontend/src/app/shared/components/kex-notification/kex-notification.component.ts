import {Component, Inject} from '@angular/core';
import {KexNotificationData} from "../../../core/models/kex-core.models";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'kex-notification',
  templateUrl: './kex-notification.component.html',
  styleUrl: './kex-notification.component.scss'
})
export class KexNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: KexNotificationData) { }
}
