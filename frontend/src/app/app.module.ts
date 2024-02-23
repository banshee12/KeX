import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButton, MatIconButton} from "@angular/material/button";
import {Action, ActionReducerMap, StoreModule} from '@ngrx/store';
import { KexToolbarComponent } from './page-template/kex-toolbar/kex-toolbar.component';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {KEX_PROFILE_STORE_FEATURE_KEY} from "./modules/profile/store/reducers/kex-profile.reducers";
import {KexProfileEffects} from "./modules/profile/store/effects/kex-profile.effects";
import * as fromKexProfile from './modules/profile/store/reducers/kex-profile.reducers';
import {EffectsModule} from "@ngrx/effects";
import {ProfileModule} from "./modules/profile/profile.module";
import {HomeModule} from "./modules/home/home.module";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";

const reducers: ActionReducerMap<unknown, Action> = {
  [KEX_PROFILE_STORE_FEATURE_KEY]: fromKexProfile.kexProfileReducer,
};
const effects = [
  KexProfileEffects
];
@NgModule({
  declarations: [
    AppComponent,
    KexToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButton,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot(effects),
    MatIcon,
    MatToolbar,
    MatIconButton,
    CoreModule,
    HttpClientModule,

    //Todo Lazy Load
    ProfileModule,
    HomeModule,
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
