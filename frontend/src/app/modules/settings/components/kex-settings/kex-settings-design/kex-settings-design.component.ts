import {Component, OnInit} from '@angular/core';
import {DarkModeToggleService} from "../../../services/dark-mode-toggle.service";

@Component({
  selector: 'kex-settings-design',
  templateUrl: './kex-settings-design.component.html',
  styleUrl: './kex-settings-design.component.scss'
})
export class KexSettingsDesignComponent implements OnInit{
  isDarkMode : boolean;

  constructor(private themeService: DarkModeToggleService) {
    this.isDarkMode = this.themeService.isDarkMode()
  }

  toggleTheme() {
    localStorage.setItem('isDarkMode', this.isDarkMode.toString())
    this.themeService.setDarkMode(this.isDarkMode);
  }

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
