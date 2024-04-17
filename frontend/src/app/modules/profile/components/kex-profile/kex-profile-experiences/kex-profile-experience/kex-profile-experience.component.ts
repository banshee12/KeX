import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Experience, KexUserSkill } from "../../../../models/kex-profile.model";
import { KexCoreService } from "../../../../../../core/services/kex-core.service";
import { KexProfileService } from "../../../../services/kex-profile.service";
import {KexLoadState} from "../../../../../../core/models/kex-core.models";
import { Subscription } from "rxjs";
import { state } from "@angular/animations";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatDialog} from "@angular/material/dialog";
import {KexProfileConnectorService} from "../../../../services/kex-profile-connector.service";
import {KexProfileState} from "../../../../store/kex-profile.state";
import {Store} from "@ngrx/store";
import {
  AddExperienceActions,
  DeleteExperienceActions,
  EditExperienceActions,
  UpdateVisibilitySkillActions
} from "../../../../store/actions/kex-profile.actions";

import {
  KexModalConfirmationComponent
} from "../../../../../../shared/components/kex-modal/kex-modal-confirmation/kex-modal-confirmation.component";


@Component({
  selector: 'kex-profile-experience',
  templateUrl: './kex-profile-experience.component.html',
  styleUrl: './kex-profile-experience.component.scss',
})

export class KexProfileExperienceComponent implements OnInit, OnDestroy {
  @Input() experience: Experience | undefined;
  @Output() leaveNewExperienceMode = new EventEmitter<boolean>();
  @ViewChild('skillInput') skillInput!: ElementRef<HTMLInputElement>;

    // Variablen für das Auto-Complete Chip Set
    separatorKeysCodes: number[] = [ENTER, COMMA];
    skillCtrl = new FormControl();
    allProfileSkills: Observable<KexUserSkill[]> = new Observable<KexUserSkill[]>();



  constructor(private coreService: KexCoreService,
                            private profileService: KexProfileService,
                            private profileConnectorService: KexProfileConnectorService,
                            private store : Store<KexProfileState>,
                            public dialog: MatDialog) {

  var temp = this.profileService.$skills
  this.allProfileSkills = temp;
  }

  get color() {
        return this.visible ? 'primary' : 'accent';
  }

  goToEditMode() {
        this.editMode = true;
    }

   // Weitere vorhandene Variablen und Methoden
   title = '';
   visible = false;
   description = '';
   linkedSkills: KexUserSkill[] = []; // Array für ausgewählte Fähigkeiten
   editMode = false;
   addNewExperience=false;

  private subscriptions: Subscription[] = [];

    ngOnInit(): void {
      if (this.experience) {
        this.title = this.experience.title;
        this.visible = this.experience.visible;
        this.description = this.experience.description;
        this.linkedSkills= this.experience.skill;
      } else {
        this.addNewExperience = true;
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
  this.visible = !this.visible;
  if(this.experience && !this.editMode){
  const experienceTemp : Experience = {...this.experience,visible:this.visible};
  this.profileService.updateVisibilityExperience(experienceTemp);
  }
  }

  deleteExperience():void{
          const dialogRef = this.dialog.open(KexModalConfirmationComponent, {
            data: {labelAction: 'Löschen',
              labelHeadline: 'Erfahrung löschen',
              labelDescription: 'Soll die Erfahrung wirklich gelöscht werden? Die Aktion kann nicht wieder rückgängig gemacht werden.'},
          });
          dialogRef.afterClosed().subscribe(result => {
                    if(result && this.experience){
                      this.profileService.deleteExperience(this.experience);
                    }
                  });
  }

    get $deleteExperienceLoadState(): Observable<KexLoadState> {
      return this.profileService.$deleteExperienceLoadState;
    }


  leaveEditMode(){
  if (!this.addNewExperience) {
        this.editMode = false;
      } else {
        this.leaveNewExperienceMode.emit(true);
      }
  }


  saveExperience(){
  if (this.experience) {
        const experience: Experience = {...this.experience, title: this.title, visible: this.visible, description: this.description,skill:this.linkedSkills};
        this.profileService.saveExperience(experience);
      } else {
        const experience: Experience = {id: 1, title: this.title, visible: this.visible, description: this.description,skill:this.linkedSkills};
        this.profileService.addExperience(experience);
      }
  }

  observeEditExperience() {
      this.subscriptions.push(
        this.profileService.$editExperienceLoadState.pipe(
        ).subscribe(state => this.coreService.handleRequestState(state, 'Fähigkeit erfolgreich gespeichert', 'Es ist ein Fehler aufgetreten. Änderungen wurden nicht gespeichert',
        ()=> this.leaveEditMode(),
        ()=>{},
        ()=>this.store.dispatch(EditExperienceActions.reset())
        )
      ));
    }

    observeDeleteExperience() {
      this.subscriptions.push(
        this.profileService.$deleteExperienceLoadState.pipe(
        ).subscribe(state => this.coreService.handleRequestState(state, 'Fähigkeit wurde gelöscht', 'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht gelöscht.',
        ()=>this.profileService.loadExperiences(),
        ()=>{},
        ()=>this.store.dispatch(DeleteExperienceActions.reset())
        )
        )
        );
    }

    observeAddExperience() {
    this.subscriptions.push(this.profileService.$addExperienceLoadState.pipe(
    ).subscribe(state=>this.coreService.handleRequestState(state,'Fähigkeit wurde hinzugefügt', 'Es ist ein Fehler aufgetreten',
    () => {
                this.leaveEditMode();
                this.profileService.loadExperiences();
                },
                 () => {},
                 () => this.store.dispatch(AddExperienceActions.reset())
    )));
    }

      // Methode zum Filtern von Fähigkeiten für Autovervollständigung
      private _filterSkills(value: string): KexUserSkill[] {
        const filterValue = value.toLowerCase();
        return this.linkedSkills.filter(skill => skill.skill.title.toLowerCase().includes(filterValue));
      }

      // Methode zum Hinzufügen einer Fähigkeit
        addNewSkill(event: MatChipInputEvent): void {
          const input = event.input;
          const value = event.value;

          if ((value || '').trim()) {
            //TODO
            //this.linkedSkills.push({title:value.trim() });
          }

          if (input) {
            input.value = '';
          }

          this.skillCtrl.setValue(null);
        }

      // Methode zum Entfernen einer Fähigkeit
       removeSkill(skill: KexUserSkill): void {
          const index = this.linkedSkills.indexOf(skill);
          if (index >= 0) {
            this.linkedSkills.splice(index, 1);
          }
       }

       // Methode zur Auswahl einer Fähigkeit aus der Autovervollständigungsliste
       selectExistingSkill(event: MatAutocompleteSelectedEvent): void {
          //TODO
          //this.linkedSkills.push({ title: event.option.viewValue });
          this.skillInput.nativeElement.value = '';
          this.skillCtrl.setValue(null);
       }
}
