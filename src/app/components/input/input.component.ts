import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly placeholder = input('');
  readonly disabled = input(false);
  readonly voiceEnabled = input(false);
  
  readonly valueChange = output<string>();
  readonly search = output<string>();

  value = signal('');
  listening = signal(false);

  private recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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

  onInput(): void {
    this.valueChange.emit(this.value());
  }

  onEnter(): void {
    this.search.emit(this.value());
  }

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