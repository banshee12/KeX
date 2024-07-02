import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {User} from "../../core/models/kex-core.models";
import {Store} from "@ngrx/store";
import {KexCoreState} from "../../core/store/kex-core.state";
import {KexCoreSelector} from "../../core/store/selectors/kex-core.selectors";

@Component({
  selector: 'kex-toolbar',
  templateUrl: './kex-toolbar.component.html',
  styleUrl: './kex-toolbar.component.scss'
})
export class KexToolbarComponent {

  constructor(private keycloakService : KeycloakService, private store : Store<KexCoreState>) {
  }
  onLogout() {
    this.keycloakService.logout().then()
  }

  get currentUser$(): Observable<User | undefined> {
    return this.store.select(KexCoreSelector.getCurrentUser)
  }
}
