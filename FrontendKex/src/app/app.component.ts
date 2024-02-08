import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Skill {
  id: number;
  tag: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontendKex';
  selectedSkill: number | null = null;
  skills: Skill[] = [];
  newSkill: string = '';
  text:string='';

  ngOnInit() {
    this.fetchSkills();
  }

  fetchSkills() {
    // Perform actions to fetch skills using Fetch API
    fetch('http://localhost:8080/api/skills')
        .then(response => response.json())
        .then(data => {
           console.log(data)
          this.skills = data;
           console.log(this.skills)
        })
        .catch(error => {
          console.error('Error fetching skills:', error);
        });
  }

  saveSkill() {
    const text = (document.getElementById('textInput') as HTMLInputElement).value;
    const selectedSkill = this.selectedSkill;

    // Perform actions to save text and selected skill using Fetch API
    fetch('http://localhost:8080/api/saveText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, skillId: selectedSkill })
    })
        .then(response => {
          if (response.ok) {
            console.log('Text saved successfully');
          } else {
            console.error('Failed to save text');
          }
        })
        .catch(error => {
          console.error('Error saving text:', error);
        });
  }

  addSkill() {
    const newSkill = this.newSkill;

    // Perform actions to add new skill using Fetch API
    fetch('http://localhost:8080/api/newskills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tag: newSkill })
    })
        .then(response => {
          if (response.ok) {
            console.log('Skill added successfully');
            // After adding the skill, refresh the skills dropdown
            this.fetchSkills();
          } else {
            console.error('Failed to add skill');
          }
        })
        .catch(error => {
          console.error('Error adding skill:', error);
        });
  }
}