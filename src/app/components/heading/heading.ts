import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../environments/environments';
import { Utils } from '../../services/utils';
import { LangSelector } from '../lang-selector/lang-selector';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'heading',
  styleUrl: './heading.css',
  templateUrl: './heading.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, LangSelector, TranslatePipe, SearchInputComponent],
})
export class Heading {
  private readonly utils = inject(Utils);
  private readonly router = inject(Router);
  //
  public readonly title = input(environment.title);
  //
  protected readonly currentUrl = this.utils.currentUrl;
  protected readonly previousUrl = this.utils.previousUrl;
  protected readonly showSearchInput = computed(() => {
    const currentUrl = this.currentUrl();
    return currentUrl && currentUrl.includes('search');
  });
  protected readonly showRouterLink = computed(() => {
    const currentUrl = this.currentUrl();
    return currentUrl && currentUrl.includes('works');
  });
  /**
   *
   */
  protected navigate() {
    this.router.navigateByUrl(this.previousUrl());
  }
  /**
   *
   * @param params
   */
  protected onSearch(params: string): void {
    if (params.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: params } });
    }
  }
}
