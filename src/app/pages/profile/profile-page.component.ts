import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Heading, LangSelector } from '../../components';
import { UserService } from '../../services';

@Component({
  selector: 'profile-page',
  styleUrl: './profile-page.component.css',
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Heading, CommonModule, RouterModule, TranslateModule, LangSelector],
})
export class ProfilePageComponent {
  private readonly userService = inject(UserService);
  //
  protected readonly currentUser = this.userService.currentUser;
  protected readonly preferredLanguage = this.userService.preferredLanguage;
  protected readonly favorites = computed(() => this.currentUser().favorites.length);
  protected readonly readingPosition = computed(
    () => Object.keys(this.currentUser().readingPosition).length,
  );
}
