import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface PlayerState {
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  muted: boolean;
}

@Component({
  selector: 'player',
  styleUrl: './player.component.css',
  templateUrl: './player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class PlayerComponent {
  readonly title = input('');
  readonly author = input('');
  readonly coverUrl = input('');
  //
  readonly onEnded = output<void>();
  readonly onTimeUpdate = output<number>();
  readonly onPlayStateChange = output<boolean>();
  //
  private readonly _playing = signal(false);
  private readonly _currentTime = signal(0);
  private readonly _duration = signal(0);
  private readonly _volume = signal(1);
  private readonly _playbackRate = signal(1);
  private readonly _muted = signal(false);
  //
  readonly muted = this._muted.asReadonly();
  readonly volume = this._volume.asReadonly();
  readonly playing = this._playing.asReadonly();
  readonly duration = this._duration.asReadonly();
  readonly currentTime = this._currentTime.asReadonly();
  readonly playbackRate = this._playbackRate.asReadonly();
  //
  protected readonly rates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  togglePlay(): void {
    this._playing.update((p) => !p);
    this.onPlayStateChange.emit(this._playing());
  }

  toggleMute(): void {
    this._muted.update((m) => !m);
  }

  skip(seconds: number): void {
    const newTime = Math.max(0, Math.min(this._duration(), this._currentTime() + seconds));
    this._currentTime.set(newTime);
    this.onTimeUpdate.emit(newTime);
  }

  onSeek(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this._currentTime.set(value);
    this.onTimeUpdate.emit(value);
  }

  onRateChange(event: Event): void {
    const rate = parseFloat((event.target as HTMLSelectElement).value);
    this._playbackRate.set(rate);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  play(): void {
    this._playing.set(true);
    this.onPlayStateChange.emit(true);
  }

  pause(): void {
    this._playing.set(false);
    this.onPlayStateChange.emit(false);
  }

  setDuration(seconds: number): void {
    this._duration.set(seconds);
  }

  setCurrentTime(seconds: number): void {
    this._currentTime.set(seconds);
  }
}
