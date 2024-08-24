import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {KexButtonType, KexLoadState} from "../../../../core/models/kex-core.models";
import {
  KexModalConfirmationComponent
} from "../../../../shared/components/kex-modal/kex-modal-confirmation/kex-modal-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {KexProfileService} from "../../services/kex-profile.service";
import {EditSkillActions} from "../../store/actions/kex-profile.actions";
import {Observable, Subscription} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {KexCoreService} from "../../../../core/services/kex-core.service";

@Component({
  selector: 'kex-profile',
  templateUrl: './kex-profile.component.html',
  styleUrl: './kex-profile.component.scss'
})
export class KexProfileComponent implements OnInit, OnDestroy{

  public selectedTab = 0;
  private subscriptions : Subscription[] = [];

  constructor(private route : ActivatedRoute,
              private router : Router,
              private dialog : MatDialog,
              private profileService : KexProfileService,
              private keycloakService : KeycloakService,
              private coreService : KexCoreService) {
  }

  get $deleteLoadState() : Observable<KexLoadState> {
    return this.profileService.$deleteProfileLoadState;
  }

  ngOnDestroy(): void {
       this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  changeTab($event: number) {
    const queryParams: Params = { tab: $event };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams  => {
      let param = queryParams['tab'];
      this.selectedTab = param ? param : 0;
    });
    this.observeDelete();
  }

  deleteProfile() {
    const dialogRef = this.dialog.open(KexModalConfirmationComponent, {
      data: {labelAction: 'Löschen',
        labelHeadline: 'Profile löschen',
        labelDescription: 'Willst du dein Profil wirklich löschen? Nachdem die Löschung erfolgreich war, wirst du automatisch ausgeloggt.' +
          'Du kannst dich nicht mehr anmelden. Deine gesamten Daten werden gelöscht und können nicht wiederhergestellt werden.'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.profileService.deleteProfile();
      }
    });
  }

  observeDelete() {
    this.subscriptions.push(
      this.profileService.$deleteProfileLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
          undefined,
          'Es ist ein Fehler aufgetreten. Profile konnte nicht gelöscht werden',
          () => this.keycloakService.logout().then(),
          () => {},
          () => this.profileService.resetDeleteProfile()
        )
      ));
  }

  protected readonly KexButtonType = KexButtonType;
}
