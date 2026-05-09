import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'search-input',
  styleUrl: './search-input.component.css',
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class SearchInputComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  //
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly voiceEnabled = input(false);
  readonly type = input<'text' | 'email' | 'password'>('text');
  //
  readonly valueChange = output<string>();
  readonly search = output<string>();
  //
  protected readonly value = signal('');
  protected readonly listening = signal(false);
  //
  private recognition: any = null;
  //
  constructor() {
    this.route.queryParams
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        map((params) => params['q']),
      )
      .subscribe((param) => this.value.update(() => param));
    if (
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    ) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'es-ES';

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.value.set(transcript);
        this.valueChange.emit(transcript);
        this.search.emit(transcript);
        this.listening.set(false);
      };

      this.recognition.onerror = () => {
        this.listening.set(false);
      };

      this.recognition.onend = () => {
        this.listening.set(false);
      };
    }
  }
  /**
   *
   */
  onInput(): void {
    this.valueChange.emit(this.value());
  }
  /**
   *
   */
  onEnter(): void {
    this.search.emit(this.value());
  }
  /**
   *
   * @returns
   */
  toggleVoice(): void {
    if (!this.recognition) return;

    if (this.listening()) {
      this.recognition.stop();
      this.listening.set(false);
    } else {
      this.recognition.start();
      this.listening.set(true);
    }
  }
}
