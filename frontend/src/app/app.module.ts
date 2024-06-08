import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatButton, MatIconButton} from "@angular/material/button";
import {Action, ActionReducerMap, StoreModule} from '@ngrx/store';
import {KexToolbarComponent} from './page-template/kex-toolbar/kex-toolbar.component';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {KEX_PROFILE_STORE_FEATURE_KEY} from "./modules/profile/store/reducers/kex-profile.reducers";
import {KexProfileEffects} from "./modules/profile/store/effects/kex-profile.effects";
import * as fromKexProfile from './modules/profile/store/reducers/kex-profile.reducers';
import * as fromKexSearch from './modules/search/store/reducers/kex-search.reducers';
import {EffectsModule} from "@ngrx/effects";
import {ProfileModule} from "./modules/profile/profile.module";
import {HomeModule} from "./modules/home/home.module";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {SearchModule} from "./modules/search/search.module";
import {KEX_SEARCH_STORE_FEATURE_KEY} from "./modules/search/store/reducers/kex-search.reducers";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { KexSearchEffects } from './modules/search/store/effects/kex-search.effects';
import {environment} from "../environments/environment";
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

const reducers: ActionReducerMap<unknown, Action> = {
  [KEX_PROFILE_STORE_FEATURE_KEY]: fromKexProfile.kexProfileReducer,
  [KEX_SEARCH_STORE_FEATURE_KEY]: fromKexSearch.kexSearchReducer,
};
const effects = [
  KexProfileEffects,
  KexSearchEffects
];

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOAK_URL,
        realm: environment.KEYCLOAK_REALM,

        clientId: environment.KEYCLOAK_CLIENT_ID
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }

    });
}

@NgModule({
  declarations: [
    AppComponent,
    KexToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButton,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),

    MatIcon,
    MatToolbar,
    MatIconButton,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,

    //Todo Lazy Load
    ProfileModule,
    HomeModule,
    SearchModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatProgressSpinner
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
