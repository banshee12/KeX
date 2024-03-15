import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {Skill} from "../../../../models/kex-profile.model";
import {Experience} from "../../../../models/kex-profile.model";
import {KexCoreService} from "../../../../../../core/services/kex-core.service";
import {KexProfileService} from "../../../../services/kex-profile.service";
import {Subscription} from "rxjs";
import {state} from "@angular/animations";

@Component({
  selector: 'kex-profile-experience',
  templateUrl: './kex-profile-experience.component.html',
  styleUrl: './kex-profile-experience.component.scss'
})
export class KexProfileExperienceComponent implements OnInit, OnDestroy {
  @Input() experience: Experience | undefined;
  @Output() leaveNewExperienceMode = new EventEmitter<boolean>();
  constructor(private coreService: KexCoreService,
                            private profileService: KexProfileService) {
  }

  get color() {
        return this.visible ? 'primary' : 'accent';
  }

  goToEditMode() {
        this.editMode = true;
    }

  title='';
  visible = false;
  description='';
  linkedSkills=[];
  editMode = false;

  private subscriptions: Subscription[] = [];

    ngOnInit(): void {
      if (this.experience) {
        this.title = this.experience.title;
        this.visible = this.experience.visible;
        this.description = this.experience.description;
      } else {
        this.editMode = true;
      }
      this.observeEditExperience();
      this.observeDeleteExperience();
      this.observeAddExperience();
    }
 ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setVisibility(): void{
  }

  deleteExperience():void{
  if (this.experience) {
        this.profileService.deleteExperience(this.experience);
      }
  }


  leaveEditMode(){
  if (this.experience) {
        this.editMode = false;
      } else {
        this.leaveNewExperienceMode.emit(true);
      }
  }


  saveExperience(){
  if (this.experience) {
        const experience: Experience = {...this.experience, title: this.title, visible: this.visible, description: this.description,linkedSkills:this.linkedSkills};
        this.profileService.saveExperience(experience);
      } else {
        const experience: Experience = {id: 1, title: this.title, visible: this.visible, description: this.description,linkedSkills:this.linkedSkills};
        this.profileService.addExperience(experience);
      }
  }

  observeEditExperience() {
      this.subscriptions.push(
        this.profileService.$editExperienceLoadState.pipe(
        ).subscribe(state => this.coreService.handleRequestState(state, 'Fähigkeit erfolgreich gespeichert', 'Es ist ein Fehler aufgetreten. Änderungen wurden nicht gespeichert')));
    }

    observeDeleteExperience() {
      this.subscriptions.push(
        this.profileService.$deleteExperienceLoadState.pipe(
        ).subscribe(state => this.coreService.handleRequestState(state, 'Fähigkeit wurde gelöscht', 'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht gelöscht.')));
    }

    observeAddExperience() {
    this.subscriptions.push(this.profileService.$addExperienceLoadState.pipe(
    ).subscribe(state=>this.coreService.handleRequestState(state,'Fähigkeit wurde hinzugefügt', 'Es ist ein Fehler aufgetreten')));
    }
}
