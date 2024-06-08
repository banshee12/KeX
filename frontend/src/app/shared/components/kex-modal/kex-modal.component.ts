import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KexDialogData} from "../../../core/models/kex-core.models";

@Component({
  selector: 'kex-modal',
  templateUrl: './kex-modal.component.html',
  styleUrl: './kex-modal.component.scss'
})
export class KexModalComponent {

  constructor(
    public dialogRef: MatDialogRef<KexModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KexDialogData,
  ) {}

}
