import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Utils {
  //
  public readonly currentUrl = signal('');
  public readonly previousUrl = signal('/');
}
