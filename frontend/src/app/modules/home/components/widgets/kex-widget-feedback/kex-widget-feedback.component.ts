import { Component } from '@angular/core';
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'kex-widget-feedback',
  templateUrl: './kex-widget-feedback.component.html',
  styleUrl: './kex-widget-feedback.component.scss'
})
export class KexWidgetFeedbackComponent {

  openFeedbackForm() {
    window.open(environment.feedbackFormUrl, "_blank");
  }
}
