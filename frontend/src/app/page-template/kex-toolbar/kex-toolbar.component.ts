import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'kex-toolbar',
  templateUrl: './kex-toolbar.component.html',
  styleUrl: './kex-toolbar.component.scss'
})
export class KexToolbarComponent {

  constructor(private keycloakService : KeycloakService) {
  }
  onLogout() {
    this.keycloakService.logout().then()
  }
}
