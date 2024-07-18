import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alphabets } from '../../../constants/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alphabet-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alphabet-filter.component.html',
  styleUrl: './alphabet-filter.component.scss',
})
export class AlphabetFilterComponent {
  @Input() allFilters: any;
  @Output() alphabetEvent = new EventEmitter<any>();

  prevAlphabet!: HTMLInputElement;
  currentAlphabet!: HTMLInputElement;
  alphabets: string[] = Alphabets;

  alphabetClickHandler(event: Event) {
    this.currentAlphabet = event.target as HTMLInputElement;
    if (this.prevAlphabet === this.currentAlphabet) {
      this.currentAlphabet.classList.remove('alphabet-active');
      this.prevAlphabet = null!;
      this.allFilters.alphabet = '';
      this.alphabetEvent.emit(this.allFilters);
    } else {
      if (this.prevAlphabet) {
        this.prevAlphabet.classList.remove('alphabet-active');
      }
      this.currentAlphabet.classList.add('alphabet-active');
      this.prevAlphabet = this.currentAlphabet;
      this.allFilters.alphabet = this.currentAlphabet.id;
      this.alphabetEvent.emit(this.allFilters);
    }
  }

  resetAlphabetFilter() {
    if (this.currentAlphabet) {
      this.currentAlphabet.classList.remove('alphabet-active');
    }
    this.allFilters.alphabet = '';
    this.alphabetEvent.emit(this.allFilters);
    this.prevAlphabet = null!;
    this.currentAlphabet = null!;
  }
}
