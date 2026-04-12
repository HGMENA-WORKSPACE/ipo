import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  userService = inject(UserService);

  onLanguageChange(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value as 'es' | 'en';
    this.userService.setLanguage(lang);
  }

  protected readonly Object = Object;
}