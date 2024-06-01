import {Component, Input} from '@angular/core';
import {User} from "../../../../../core/models/kex-core.models";
import {Store} from "@ngrx/store";
import {KexSearchState} from "../../../store/kex-search.state";
import {GetUserProfileActions} from "../../../store/actions/kex-search.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'kex-search-user-list-user',
  templateUrl: './kex-search-user-list-user.component.html',
  styleUrl: './kex-search-user-list-user.component.scss'
})
export class KexSearchUserListUserComponent {
    @Input() user : User | undefined;

  constructor(private store : Store<KexSearchState>, private router : Router) {
  }
  openUserDetails() {
    if(this.user?.userSub){
      if(window.innerWidth >= 768) {
        this.store.dispatch(GetUserProfileActions.do({userId: this.user.userSub}));
      }else{
        this.router.navigate(['user/' + this.user.userSub] , {queryParams : {backToSearch : true}} ).then();
      }

    }
  }
}
