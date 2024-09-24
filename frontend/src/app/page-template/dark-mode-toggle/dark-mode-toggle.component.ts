import { Component } from '@angular/core';
import {DarkModeToggleService} from "./service/dark-mode-toggle.service";

@Component({
  selector: 'dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss'
})
export class DarkModeToggleComponent {
  isDarkMode : boolean;

  constructor(private themeService: DarkModeToggleService) {
    this.isDarkMode = this.themeService.isDarkMode()
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode.toString())
    this.themeService.setDarkMode(this.isDarkMode);
  }

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
