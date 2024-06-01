import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {KexSkill, KexUserSkill} from "../../../../models/kex-profile.model";
import {KexCoreService} from "../../../../../../core/services/kex-core.service";
import {KexProfileService} from "../../../../services/kex-profile.service";
import {debounceTime, distinctUntilChanged, filter, Observable, of, Subscription, switchMap} from "rxjs";
import {state} from "@angular/animations";
import {KexLoadState} from "../../../../../../core/models/kex-core.models";
import {FormControl} from "@angular/forms";
import {KexProfileConnectorService} from "../../../../services/kex-profile-connector.service";
import {Store} from "@ngrx/store";
import {KexProfileState} from "../../../../store/kex-profile.state";
import {
  AddSkillActions,
  DeleteSkillActions,
  EditSkillActions,
  UpdateVisibilitySkillActions
} from "../../../../store/actions/kex-profile.actions";
import {MatDialog} from "@angular/material/dialog";
import {
  KexModalConfirmationComponent
} from "../../../../../../shared/components/kex-modal/kex-modal-confirmation/kex-modal-confirmation.component";

@Component({
  selector: 'kex-profile-skill',
  templateUrl: './kex-profile-skill.component.html',
  styleUrl: './kex-profile-skill.component.scss'
})
export class KexProfileSkillComponent implements OnInit, OnDestroy {
  @Input() userSkill: KexUserSkill | undefined;
  @Output() leaveNewSkillMode = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];
  level = 1;
  visible = false;
  editMode = false;
  controlTitle = new FormControl('');
  suggestionSkillList: KexSkill[] = [];
  addNewSkill = false;

  constructor(private coreService: KexCoreService,
              private profileService: KexProfileService,
              private profileConnectorService: KexProfileConnectorService,
              private store : Store<KexProfileState>,
              public dialog: MatDialog) {
  }

  get color() {
    return this.editMode ? this.visible ? 'primary' : 'accent' : '';
  }

  get title(): string {
    return this.userSkill?.skill.title || '';
  }

  observeSuggestionForTitle() {
    this.controlTitle.valueChanges.pipe(
      filter(data => data != null && data.trim().length > 2),
      debounceTime(100),
      switchMap((value) => {
        return value ? this.profileConnectorService.getSkillSuggestions(value) : of([]);
      })
    ).subscribe(data => {
      this.suggestionSkillList = data;
    })
  }

  ratingUpdated(rating: number) {
    this.level = rating;
  }

  goToEditMode() {
    this.editMode = true;
  }

  deleteSkill() {

        const dialogRef = this.dialog.open(KexModalConfirmationComponent, {
          data: {labelAction: 'Löschen',
            labelHeadline: 'Fähigkeit löschen',
            labelDescription: 'Soll die Fähigkeit wirklich gelöscht werden? Die Aktion kann nicht wieder rückgängig gemacht werden.'},
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result && this.userSkill){
            this.profileService.deleteSkill(this.userSkill);
          }
        });
  }

  leaveEditMode() {
    if (!this.addNewSkill) {
      this.editMode = false;
    } else {
      this.leaveNewSkillMode.emit(true);
    }
  }

  setVisibility(): void {
    this.visible = !this.visible;
    if (this.userSkill && !this.editMode) {
      const skill: KexUserSkill = {...this.userSkill, visible: this.visible};
      this.profileService.updateVisibilitySkill(skill);
    }
  }

  saveSkill(): void {
    let titleNew: string | null = this.controlTitle.value;
    if (titleNew != null) {
      let skillId: number = this.userSkill && this.userSkill.skill.title == titleNew ? this.userSkill.skill.id || 0 : 0;
      if (this.userSkill) {
        const skill: KexUserSkill = {
          ...this.userSkill,
          skill: {id: skillId, title: titleNew},
          level: this.level,
          visible: this.visible
        };
        this.userSkill = skill;
        this.profileService.saveSkill(skill);
      } else {
        const skill: KexUserSkill = {
          id: 0,
          skill: {id: skillId, title: titleNew},
          level: this.level,
          visible: this.visible
        };
        this.userSkill = skill;
        this.profileService.addSkill(skill);
      }
    }
  }

  ngOnInit(): void {
    if (this.userSkill) {
      this.controlTitle.patchValue(this.userSkill.skill.title);
      this.level = this.userSkill.level;
      this.visible = this.userSkill.visible;
    } else {
      this.addNewSkill = true;
      this.editMode = true;
    }
    this.observeEditSkill();
    this.observeDeleteSkill();
    this.observeAddSkill();
    this.observeUpdateVisibilitySkill();
    this.observeSuggestionForTitle();
  }

  get $deleteSkillLoadState(): Observable<KexLoadState> {
    return this.profileService.$deleteSkillLoadState;
  }

  observeEditSkill() {
    this.subscriptions.push(
      this.profileService.$editSkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
          'Fähigkeit erfolgreich gespeichert',
          'Es ist ein Fehler aufgetreten. Änderungen wurden nicht gespeichert',
          () => this.leaveEditMode(),
        () => {},
        () => this.store.dispatch(EditSkillActions.reset())
        )
      ));
  }

  observeDeleteSkill() {
    this.subscriptions.push(
      this.$deleteSkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
        'Fähigkeit wurde gelöscht',
        'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht gelöscht.',
        () => this.profileService.loadSkills(),
        () => {},
        () => this.store.dispatch(DeleteSkillActions.reset())
        )

      ));
  }

  observeAddSkill() {
    this.subscriptions.push(
      this.profileService.$addSkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
          'Fähigkeit wurde erfolgreich hinzugefügt',
          'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht hinzugefügt.',
          () => {
            this.leaveEditMode();
            this.profileService.loadSkills();
          },
        () => {},
        () => this.store.dispatch(AddSkillActions.reset())
        )
      ));
  }

  observeUpdateVisibilitySkill() {
    this.subscriptions.push(
      this.profileService.$updateVisibilitySkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
        '',
        'Es ist ein Fehler aufgetreten. Sichtbarkeit wurde nicht aktualisiert',
        () => {},
        () => {},
        () => this.store.dispatch(UpdateVisibilitySkillActions.reset())
        )
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
