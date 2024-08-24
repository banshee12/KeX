import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {KexButtonType, KexLoadState} from "../../../../../core/models/kex-core.models";
import {AddFavoriteUser, RemoveFavoriteUser} from "../../../../../core/store/actions/kex-core.actions";
import {Store} from "@ngrx/store";
import {KexCoreState} from "../../../../../core/store/kex-core.state";
import {KexCoreService} from "../../../../../core/services/kex-core.service";
import {Observable, Subscription} from "rxjs";
import {KexCoreSelector} from "../../../../../core/store/selectors/kex-core.selectors";

@Component({
  selector: 'kex-search-user-profile-favorite-button',
  templateUrl: './kex-search-user-profile-favorite-button.component.html',
  styleUrl: './kex-search-user-profile-favorite-button.component.scss'
})
export class KexSearchUserProfileFavoriteButtonComponent implements OnInit, OnDestroy {
  @Input() userSub: string = '';
  @Input() isFavorite = false;
  loadingState = KexLoadState.NONE;

  protected readonly KexButtonType = KexButtonType;
  private subscriptions: Subscription[] = [];

  constructor(private coreStore: Store<KexCoreState>,
              private coreService: KexCoreService) {
  }

  get addFavoriteLoadState$(): Observable<KexLoadState> {
    return this.coreStore.select(KexCoreSelector.getAddFavoriteLoadState);
  }

  get removeFavoriteLoadState$(): Observable<KexLoadState> {
    return this.coreStore.select(KexCoreSelector.getRemoveFavoriteLoadState);
  }

  ngOnInit(): void {
    this.observeAddFavorite();
    this.observeRemoveFavorite();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getFavoriteIcon(): string {
    return this.isFavorite ? 'bookmark_remove' : 'bookmark_add';
  }

  getFavoriteLabel(): string {
    return this.isFavorite ? 'Benutzer nicht mehr merken' : 'Benutzer merken';
  }

  editUserFavorite() {
    this.loadingState = KexLoadState.LOADING;
    if (this.isFavorite) {
      this.coreStore.dispatch(RemoveFavoriteUser.do({userSub: this.userSub}));
    } else {
      this.coreStore.dispatch(AddFavoriteUser.do({userSub: this.userSub}));
    }
  }

  observeAddFavorite() {
    this.subscriptions.push(
      this.addFavoriteLoadState$.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state, 'Benutzer wurde erfolgreich zu deinen Favoriten hinzugefügt', 'Es ist ein Fehler aufgetreten. Benutzer konnte nicht zu deinen Favoriten hinzugefügt werden',
          () => {
            this.isFavorite = true;
          },
          () => {
          },
          () => {
            this.loadingState = KexLoadState.NONE;
            this.coreStore.dispatch(AddFavoriteUser.reset())
          }
        )
      ));
  }

  observeRemoveFavorite() {
    this.subscriptions.push(
      this.removeFavoriteLoadState$.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state, 'Benutzer wurde erfolgreich als Favorit entfernt', 'Es ist ein Fehler aufgetreten. Benutzer konnte als Favorit entfernt werden',
          () => {
            this.isFavorite = false;
          },
          () => {
          },
          () => {
            this.loadingState = KexLoadState.NONE;
            this.coreStore.dispatch(RemoveFavoriteUser.reset())
          }
        )
      ));
  }
}
