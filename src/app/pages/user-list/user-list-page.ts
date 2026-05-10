import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Heading } from '../../components';
import { RequestService } from '../../services/reques.service';

@Component({
  selector: 'user-list',
  styleUrl: './user-list-page.css',
  templateUrl: './user-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Heading, CommonModule, TranslatePipe],
})
export class UserList {
  private readonly router = inject(Router);
  private readonly requestService = inject(RequestService);
  //
  protected readonly activeTab = signal<string>('currently');
  //
  protected readonly tabs = computed(() =>
    [
      { id: 'currently', label: 'lists.currently' },
      { id: 'want', label: 'lists.want' },
      { id: 'already', label: 'lists.already' },
    ].map((tab) => ({ ...tab, active: tab.id === this.activeTab() })),
  );
  //
  private readonly currentlyResult = resource({
    loader: () =>
      this.requestService
        .get<any>('/people/george08/lists/OL9802L/seeds.json')
        .then((result) => {
          return result.entries;
        })
        .catch(() => []),
  });
  protected readonly currently = computed(() => this.currentlyResult.value());
  private readonly wantResult = resource({
    loader: () =>
      this.requestService
        .get<any>('/people/george08/lists/OL3777L/seeds.json')
        .then((result) => {
          return result.entries;
        })
        .catch(() => []),
  });
  protected readonly want = computed(() => this.wantResult.value());
  private readonly alreadyResult = resource({
    loader: () =>
      this.requestService
        .get<any>('/people/george08/lists/OL20L/seeds.json')
        .then((result) => {
          return result.entries;
        })
        .catch(() => []),
  });
  protected readonly already = computed(() => this.alreadyResult.value());
  protected readonly loading = computed(
    () =>
      this.wantResult.isLoading() ||
      this.currentlyResult.isLoading() ||
      this.alreadyResult.isLoading(),
  );
  protected readonly listSelected = computed(() =>
    this.activeTab() === 'want'
      ? this.want()
      : this.activeTab() === 'currently'
        ? this.currently()
        : this.activeTab() === 'already'
          ? this.already()
          : [],
  );
  /**
   *
   * @param tabId
   */
  protected setActiveTab(tabId: string): void {
    this.activeTab.set(tabId);
  }
  /**
   *
   * @param book
   */
  protected navigateToBook(book: any): void {
    this.router.navigate([book.key]);
  }
}
