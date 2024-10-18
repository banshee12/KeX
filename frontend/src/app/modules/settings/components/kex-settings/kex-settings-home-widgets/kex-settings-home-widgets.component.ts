import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'kex-settings-home-widgets',
  templateUrl: './kex-settings-home-widgets.component.html',
  styleUrl: './kex-settings-home-widgets.component.scss',
})
export class KexSettingsHomeWidgetsComponent {

  items = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

}
