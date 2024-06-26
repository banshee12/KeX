import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from "@ngrx/store";
import {KexSearchState} from "../../../modules/search/store/kex-search.state";
import {SearchUserActions} from "../../../modules/search/store/actions/kex-search.actions";
import {KexSortData} from "../../../core/models/kex-core.models";

@Component({
  selector: 'kex-search-field',
  templateUrl: './kex-search-field.component.html',
  styleUrl: './kex-search-field.component.scss'
})
export class KexSearchFieldComponent {
@Output() searchStart = new EventEmitter<boolean>();
  public searchValue = '';


  constructor(private store: Store<KexSearchState>) {
  }

  onSearch() {
    const sortData : KexSortData = { sortBy : 'lastname', asc : true }
    this.store.dispatch(SearchUserActions.do({searchSkill: this.searchValue, sortData : sortData}));
    this.searchStart.emit(true);
  }

}
