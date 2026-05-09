import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'lang-selector',
  styleUrl: './lang-selector.css',
  templateUrl: './lang-selector.html',
  imports: [],
})
export class LangSelector {
  private readonly userService = inject(UserService);
  //
  protected readonly currentLang = this.userService.currentLang;
  protected readonly availableLanguages = computed(() => {
    return this.userService.availableLanguages().map((lang) => ({
      ...lang,
      selected: lang.label === this.currentLang().label,
    }));
  });
  /**
   *
   * @param event
   */
  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newLang = select.value as 'es' | 'en';
    this.userService.setLanguage(newLang);
  }
}
