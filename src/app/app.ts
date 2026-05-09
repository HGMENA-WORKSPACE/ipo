import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { environment } from '../environments/environments';
import { NavBottomComponent, NavSidebarComponent, ToastComponent } from './components';
import { Utils } from './services/utils';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [RouterOutlet, TranslateModule, NavBottomComponent, NavSidebarComponent, ToastComponent],
})
export class App {
  private readonly utils = inject(Utils);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  //
  constructor() {
    this.title.setTitle(environment.title)
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event: NavigationEnd) => {
        this.utils.previousUrl.update(() => this.utils.currentUrl());
        this.utils.currentUrl.update(() => event.url);
      });
  }
}
