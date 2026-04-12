import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBottomComponent, NavSidebarComponent, ToastComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, NavBottomComponent, NavSidebarComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
