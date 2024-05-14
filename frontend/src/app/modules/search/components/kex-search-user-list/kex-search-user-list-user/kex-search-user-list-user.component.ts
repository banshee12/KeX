import {Component, Input} from '@angular/core';
import {User} from "../../../../../core/models/kex-core.models";
import {Store} from "@ngrx/store";
import {KexSearchState} from "../../../store/kex-search.state";
import {GetUserProfileActions} from "../../../store/actions/kex-search.actions";

@Component({
  selector: 'kex-search-user-list-user',
  templateUrl: './kex-search-user-list-user.component.html',
  styleUrl: './kex-search-user-list-user.component.scss'
})
export class KexSearchUserListUserComponent {
    @Input() user : User | undefined;

  constructor(private store : Store<KexSearchState>) {
  }
  openUserDetails() {
    if(this.user?.userSub){
      this.store.dispatch(GetUserProfileActions.do({userId: this.user.userSub}));
    }
  }
}
