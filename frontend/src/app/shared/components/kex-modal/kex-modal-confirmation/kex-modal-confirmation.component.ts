import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KexDialogData} from "../../../../core/models/kex-core.models";

@Component({
  selector: 'kex-modal-confirmation',
  templateUrl: './kex-modal-confirmation.component.html',
  styleUrl: './kex-modal-confirmation.component.scss'
})
export class KexModalConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<KexModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KexDialogData,
  ) {}

}
