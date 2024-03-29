import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Skill} from "../../../../models/kex-profile.model";
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
  @Input() skill: Skill | undefined;
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
    if (this.skill) {
      this.profileService.deleteSkill(this.skill);
    }
  }

  leaveEditMode() {
    if (this.skill) {
      this.editMode = false;
    } else {
      this.leaveNewSkillMode.emit(true);
    }
  }

  setVisibility(): void {
    this.visible = !this.visible;
    if (this.skill && !this.editMode) {
      const skill: Skill = {...this.skill, visible: this.visible};
      this.profileService.saveSkill(skill);
    }
  }

  saveSkill(): void {
    if (this.skill) {
      const skill: Skill = {...this.skill, title: this.title, level: this.level, visible: this.visible};
      this.profileService.saveSkill(skill);
    } else {
      const skill: Skill = {id: 0, title: this.title, level: this.level, visible: this.visible};
      this.profileService.addSkill(skill);
    }
  }

  ngOnInit(): void {
    if (this.skill) {
      this.title = this.skill.title;
      this.level = this.skill.level;
      this.visible = this.skill.visible;
    } else {
      this.editMode = true;
    }
    this.observeEditSkill();
    this.observeDeleteSkill();
    this.observeAddSkill();
  }

  get $deleteSkillLoadState() : Observable<KexLoadState>{
    return this.profileService.$deleteSkillLoadState;
  }

  observeEditSkill() {
    this.subscriptions.push(
      this.profileService.$editSkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state, 'Fähigkeit erfolgreich gespeichert', 'Es ist ein Fehler aufgetreten. Änderungen wurden nicht gespeichert')));
  }

  observeDeleteSkill() {
    this.subscriptions.push(
      this.$deleteSkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state, 'Fähigkeit wurde gelöscht', 'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht gelöscht.')));
  }

  observeAddSkill() {
    this.subscriptions.push(
      this.profileService.$addSkillLoadState.pipe(
      ).subscribe(state => this.coreService.handleRequestState(state, 'Fähigkeit wurde erfolgreich hinzugefügt', 'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht hinzugefügt.',
        () => {this.leaveNewSkillMode.emit(true); this.profileService.loadSkills();}
      )));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
