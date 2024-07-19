import {Component, Input, OnInit} from '@angular/core';
import {Experience} from "../../../../../profile/models/kex-profile.model";

@Component({
  selector: 'kex-user-details-experience',
  templateUrl: './kex-user-details-experience.component.html',
  styleUrl: './kex-user-details-experience.component.scss'
})
export class KexUserDetailsExperienceComponent implements OnInit{

  @Input() experience : Experience | undefined;

  ngOnInit(): void {

  }
}
