import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {KexUserSkill} from "../../../../models/kex-profile.model";
import {KexCoreService} from "../../../../../../core/services/kex-core.service";
import {KexProfileService} from "../../../../services/kex-profile.service";
import {Observable, Subscription} from "rxjs";
import {state} from "@angular/animations";
import {KexLoadState} from "../../../../../../core/models/kex-core.models";

@Component({
  selector: 'kex-profile-skill',
  templateUrl: './kex-profile-skill.component.html',
  styleUrl: './kex-profile-skill.component.scss'
})
export class KexProfileSkillComponent implements OnInit, OnDestroy {
  @Input() userSkill: KexUserSkill | undefined;
  @Output() leaveNewSkillMode = new EventEmitter<boolean>();

  title = '';
  level = 1;
  visible = false;

  editMode = false;
  private subscriptions: Subscription[] = [];

  constructor(private coreService: KexCoreService,
              private profileService: KexProfileService) {
  }

  get color() {
    return this.visible ? 'primary' : 'accent';
  }

  ratingUpdated(rating: number) {
    this.level = rating;
  }

  goToEditMode() {
    this.editMode = true;
  }

  deleteSkill() {
    if (this.userSkill) {
      this.profileService.deleteSkill(this.userSkill);
    }
  }

  leaveEditMode() {
    if (this.userSkill) {
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
    if (this.userSkill) {
      const skill: KexUserSkill = {
        ...this.userSkill,
        skill: {id: 1, title: this.title},
        level: this.level,
        visible: this.visible
      };
      this.profileService.saveSkill(skill);
    } else {
      const skill: KexUserSkill = {id: 0, skill: {id: 1, title: this.title}, level: this.level, visible: this.visible};
      this.profileService.addSkill(skill);
    }
  }

  ngOnInit(): void {
    if (this.userSkill) {
      this.title = this.userSkill.skill.title;
      this.level = this.userSkill.level;
      this.visible = this.userSkill.visible;
    } else {
      this.editMode = true;
    }
    this.observeEditSkill();
    this.observeDeleteSkill();
    this.observeAddSkill();
    this.observeUpdateVisibilitySkill();
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
          () => this.leaveEditMode()
        )
      ));
  }

  observeDeleteSkill() {
    this.subscriptions.push(
      this.$deleteSkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
        'Fähigkeit wurde gelöscht',
        'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht gelöscht.')
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
          }
        )
      ));
  }

  observeUpdateVisibilitySkill() {
    this.subscriptions.push(
      this.profileService.$updateVisibilitySkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state,
        '',
        'Es ist ein Fehler aufgetreten. Sichtbarkeit wurde nicht aktualisiert')
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
