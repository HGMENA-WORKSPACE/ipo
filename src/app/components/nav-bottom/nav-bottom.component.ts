import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'nav-bottom',
  styleUrl: './nav-bottom.component.css',
  templateUrl: './nav-bottom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class NavBottomComponent {
  readonly activeRoute = input('');
}
