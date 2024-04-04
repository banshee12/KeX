import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {KexSearchState} from "../../../modules/search/store/kex-search.state";
import {SearchUserActions} from "../../../modules/search/store/actions/kex-search.actions";

@Component({
  selector: 'kex-search-field',
  templateUrl: './kex-search-field.component.html',
  styleUrl: './kex-search-field.component.scss'
})
export class KexSearchFieldComponent {

  public searchValue = '';

  constructor(private store: Store<KexSearchState>) {
  }

  onSearch() {
    this.store.dispatch(SearchUserActions.do({value: this.searchValue}));
  }

}