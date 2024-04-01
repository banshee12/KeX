import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {KexSearchState} from "../../../search/store/kex-search.state";
import {KexSearchSelector} from "../../../search/store/selectors/kex-search.selectors";
import {GetSkillsActions} from "../../../profile/store/actions/kex-profile.actions";
import {SearchUserActions} from "../../../search/store/actions/kex-search.actions";

@Component({
  selector: 'kex-home',
  templateUrl: './kex-home.component.html',
  styleUrl: './kex-home.component.scss'
})
export class KexHomeComponent {

}
