import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import {Experience, KexSkill, KexUserSkill} from "../../../../models/kex-profile.model";
import { KexCoreService } from "../../../../../../core/services/kex-core.service";
import { KexProfileService } from "../../../../services/kex-profile.service";
import {KexLoadState} from "../../../../../../core/models/kex-core.models";
import { Subscription } from "rxjs";
import { state } from "@angular/animations";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatDialog} from "@angular/material/dialog";
import {MatListModule} from '@angular/material/list';
import {KexProfileConnectorService} from "../../../../services/kex-profile-connector.service";
import {KexProfileState} from "../../../../store/kex-profile.state";
import {Store} from "@ngrx/store";
import {
  AddExperienceActions,
  DeleteExperienceActions,
  EditExperienceActions,
  UpdateVisibilityExperienceActions
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
    allProfileExperiences : Observable<Experience[]> = new Observable<Experience[]>();


  constructor(private coreService: KexCoreService,
                            private profileService: KexProfileService,
                            private profileConnectorService: KexProfileConnectorService,
                            private store : Store<KexProfileState>,
                            public dialog: MatDialog) {

  this.allProfileSkills = this.profileService.$skills;
  this.allProfileExperiences = this.profileService.$experiences;
  }

  get color() {
        return this.visible ? 'primary' : 'accent';
  }

  goToEditMode() {
        this.editMode = true;
    }

   // Weitere vorhandene Variablen und Methoden
   title = '';
   id =-1;
   visible = false;
   description = '';
   linkedSkills: KexSkill[] = []; // Array für ausgewählte Fähigkeiten
   editMode = false;
   addNewExperience=false;

  private subscriptions: Subscription[] = [];

    ngOnInit(): void {
      if (this.experience) {
        this.title = this.experience.title;
        this.id = this.experience.id;
        this.visible = this.experience.visible;
        this.description = this.experience.description;
        this.linkedSkills= this.experience.skill || [];
      } else {
        this.addNewExperience = true;
        this.editMode = true;
      }
      this.observeEditExperience();
      this.observeDeleteExperience();
      this.observeAddExperience();
      this.observeUpdateVisibilityExperience();
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
        this.profileService.loadExperiences();
      } else {
        this.leaveNewExperienceMode.emit(true);
      }
  }


  saveExperience(): void {
  this.title = this.title.trim();
  if(this.title.trim()==""){
    return;
  }
  if (this.experience) {
  let experienceID = this.experience.id;
        this.checkIfExperienceExistsInUser(this.title, this.id).then(experienceExists=>{
        if(experienceExists){
            console.log('Experience exists in user profile');
        }
        else{
          const experience: Experience = {id: experienceID, title: this.title, visible: this.visible, description: this.description,skill:this.linkedSkills};
          this.experience = experience;
          this.profileService.saveExperience(experience);
          this.editMode = false;
        }}).catch(error=>{ console.error('Error checking experience:', error);
       });
      }
  else{
    this.checkIfExperienceExistsInUser(this.title, this.id).then(experienceExists=>{
      if(experienceExists){
          console.log('Experience exists in user profile');
      }
      else {
      console.log('Experience does not exist in user profile');
      const experience: Experience = {id: 1, title: this.title, visible: this.visible, description: this.description,skill:this.linkedSkills};
      this.profileService.addExperience(experience);
      this.editMode = false;
      }
    }).catch(error=> {
         console.error('Error checking experience:', error);
   });
    //else {
    //    const experience: Experience = {id: 1, title: this.title, visible: this.visible, description: this.description,skill:this.linkedSkills};
    //    this.profileService.addExperience(experience);
    //  }
    }
  }

  observeEditExperience() {
      this.subscriptions.push(
        this.profileService.$editExperienceLoadState.pipe(
        ).subscribe(state => this.coreService.handleRequestState(state, 'Erfahrung erfolgreich gespeichert', 'Es ist ein Fehler aufgetreten. Änderungen wurden nicht gespeichert',
        ()=> this.leaveEditMode(),
        ()=>{},
        ()=>this.store.dispatch(EditExperienceActions.reset())
        )
      ));
    }

    observeDeleteExperience() {
      this.subscriptions.push(
        this.profileService.$deleteExperienceLoadState.pipe(
        ).subscribe(state => this.coreService.handleRequestState(state, 'Erfahrung wurde gelöscht', 'Es ist ein Fehler aufgetreten. Fähigkeit wurde nicht gelöscht.',
        ()=>this.profileService.loadExperiences(),
        ()=>{},
        ()=>this.store.dispatch(DeleteExperienceActions.reset())
        )
        )
        );
    }

    observeAddExperience() {
    this.subscriptions.push(this.profileService.$addExperienceLoadState.pipe(
    ).subscribe(state=>this.coreService.handleRequestState(state,'Erfahrung wurde hinzugefügt', 'Es ist ein Fehler aufgetreten',
    () => {
                this.leaveEditMode();
                this.profileService.loadExperiences();
                },
                 () => {},
                 () => this.store.dispatch(AddExperienceActions.reset())
    )));
    }

    observeUpdateVisibilityExperience(){
    this.subscriptions.push(
          this.profileService.$updateVisibilityExperienceLoadState.pipe(
          ).subscribe(state => this.coreService.handleRequestState(state,
            'Sichtbarkeit wurde aktualisiert',
            'Es ist ein Fehler aufgetreten. Sichtbarkeit wurde nicht aktualisiert',
            () => {},
            () => {},
            () => this.store.dispatch(UpdateVisibilityExperienceActions.reset())
            )
          ));
    }

      // Methode zum Filtern von Fähigkeiten für Autovervollständigung
      private _filterSkills(value: string): KexSkill[] {
        const filterValue = value.toLowerCase();
        return this.linkedSkills.filter(skill => skill.title.toLowerCase().includes(filterValue));
      }

      // Methode zum Hinzufügen einer Fähigkeit
        addNewSkill(event: MatChipInputEvent): void {
          const input = event.input;
          const value = event.value;

          if ((value).trim() != '') {
            //TODO
            //Title
            let skillTitle = value.trim();
            //Skill ID :0
            //this.linkedSkills.push({title:value.trim() });
            const skillSkill : KexSkill ={id:0,title:skillTitle};
            const skill: KexUserSkill = {
                                  id: 0,
                                  skill: {id: 0, title: skillTitle},
                                  level: 0,
                                  visible: false
                                };
            this.checkIfSkillExistsInUser(skillTitle).then(skillExists => {
                if (skillExists) {
                        console.log('Skill exists in user profile');
                    } else {
                        console.log('Skill does not exist in user profile');
                       this.profileService.addSkill(skill);
                    }
                }).catch(error => {
                    console.error('Error checking skill:', error);
                });
            if(!this.checkIfSkillIsPresent(skillTitle)){
                 this.linkedSkills = [...this.linkedSkills];
                 this.linkedSkills.push(skillSkill);
            }
          }
          this.skillCtrl.setValue(null);
        }

      // Methode zum Entfernen einer Fähigkeit
       removeSkill(skill: KexSkill): void {
          const index = this.linkedSkills.indexOf(skill);
          if (index >= 0) {
          //Problem: Kann objekt nicht aus dem Array Löschen
            this.linkedSkills = [...this.linkedSkills];
            this.linkedSkills.splice(index, 1);
          }
       }

       // Methode zur Auswahl einer Fähigkeit aus der Autovervollständigungsliste
       selectExistingSkill(event: MatAutocompleteSelectedEvent): void {
          //TODO
          //this.linkedSkills.push({ title: event.option.viewValue });
          console.log('Is Collection Array ' + Array.isArray(this.linkedSkills));
          this.linkedSkills = [...this.linkedSkills];
          console.log('Is Array extentible ' + Object.isExtensible(this.linkedSkills));
          var selectedSkill = event.option.value; //KexUserSkill
          //Umwandlung in KexSkill
          const skillClone = { ...selectedSkill }; // Flache Kopie von selectedSkill

          if(!this.checkIfSkillIsAlreadyAdded(skillClone))
          {
              const skillSkill : KexSkill = {
                      id: skillClone.id,
                      title: skillClone.skill.title
                    };
             this.linkedSkills.push(skillSkill);
          }
          this.skillInput.nativeElement.value = '';
          this.skillCtrl.setValue(null);
          if(!this.editMode){
          this.saveExperience();
          }
       }

        private checkIfSkillIsAlreadyAdded(skillInput: KexUserSkill): boolean {
           for (const skill of this.linkedSkills) {
             if (skillInput.skill.title === skill.title) {
               return true;
             }
           }
           return false;
         }

        private checkIfSkillIsPresent(Skilltitle : string){
            for (const skill of this.linkedSkills) {
              if(skill.title == Skilltitle){
                    return true;
              }
            }
            return false;
        }

        private checkIfExperienceExistsInUser(Experiencetitle : string, ExperienceId : number){
              return new Promise((resolve,reject)=>{
              this.allProfileExperiences.subscribe({
              next:(experiences:any[])=>{
                const experienceExists = experiences.some(userExperience => userExperience.title ===Experiencetitle && userExperience.id != ExperienceId);
                resolve (experienceExists);
              },
              error: (err) => reject(err)
              });
              });
        }

        private checkIfSkillExistsInUser(Skilltitle: string): Promise<boolean> {
            return new Promise((resolve, reject) => {
                this.allProfileSkills.subscribe({
                    next: (skills: any[]) => {  // Typ von `skills` anpassen
                        const skillExists = skills.some(userSkill => userSkill.skill.title === Skilltitle);
                        resolve(skillExists);
                    },
                    error: (err) => reject(err)
                });
            });
        }
}
