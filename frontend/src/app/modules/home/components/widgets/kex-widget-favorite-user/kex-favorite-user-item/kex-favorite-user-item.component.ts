import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {KexButtonType, KexLoadState, User} from "../../../../../../core/models/kex-core.models";
import {GetFavoriteUserList, RemoveFavoriteUser} from "../../../../../../core/store/actions/kex-core.actions";
import {KexCoreState} from "../../../../../../core/store/kex-core.state";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {KexCoreSelector} from "../../../../../../core/store/selectors/kex-core.selectors";
import {KexCoreService} from "../../../../../../core/services/kex-core.service";
import {state} from "@angular/animations";

@Component({
  selector: 'kex-favorite-user-item',
  templateUrl: './kex-favorite-user-item.component.html',
  styleUrl: './kex-favorite-user-item.component.scss'
})
export class KexFavoriteUserItemComponent implements OnInit, OnDestroy{
  @Input() user: User | undefined;

  removeLoading = KexLoadState.NONE;
  private subscriptions: Subscription[] = [];
  protected readonly KexLoadState = KexLoadState;
  protected readonly KexButtonType = KexButtonType;

  constructor(private store: Store<KexCoreState>,
              private router: Router,
              private coreService: KexCoreService) {
  }

  get removeFavoriteLoadState$(): Observable<KexLoadState> {
    return this.store.select(KexCoreSelector.getRemoveFavoriteLoadState);
  }

  removeUser() {
    this.removeLoading = KexLoadState.LOADING;
    let userSub = this.user?.userSub;
    if (userSub) this.store.dispatch(RemoveFavoriteUser.do({userSub: userSub}));
  }

  observeRemoveFavorite() {
    this.subscriptions.push(
      this.removeFavoriteLoadState$.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state, 'Benutzer wurde erfolgreich als Favorit entfernt', 'Es ist ein Fehler aufgetreten. Benutzer konnte als Favorit entfernt werden',
          () => {
            this.removeLoading = KexLoadState.NONE;
            this.store.dispatch(GetFavoriteUserList.do());
          },
          () => {
          },
          () => {
            this.removeLoading = KexLoadState.NONE;
            this.store.dispatch(RemoveFavoriteUser.reset());
          }
        )
      ));
  }

  openUserPage() {
    let userSub = this.user?.userSub;
    if (userSub) this.router.navigate(['user/' + userSub]).then();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.observeRemoveFavorite();
  }

}
