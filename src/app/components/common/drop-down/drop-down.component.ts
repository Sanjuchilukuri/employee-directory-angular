import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Options } from '../../../interfaces/options';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit{
  @Input() options: { [key: string]: Options[] } = {};
  @Input() allfilters: { [key: string]: string } = {};
  @Output() filterEvent = new EventEmitter<any>();

  isDisabled: boolean;
  filtersCopy: any;

  constructor() {
    console.log('dropdown constructor');
    this.isDisabled = true;
  }
  ngOnInit(): void {
    this.filtersCopy = this.allfilters;
  }

  handlechangefilter(event: Event) {
    this.filtersCopy[(event.target as HTMLSelectElement).id] = (
      event.target as HTMLSelectElement
    ).value;
    this.isDisabled = false;
  }

  applyfilters() {
    this.allfilters = this.filtersCopy;
    this.filterEvent.emit(this.allfilters);
  }

  resetfilters() {
    for (const filter in this.filtersCopy) {
      if (
        Object.prototype.hasOwnProperty.call(this.filtersCopy, filter) &&
        filter != 'alphabet'
      ) {
        this.filtersCopy[filter] = '';
      }
    }
    this.allfilters = this.filtersCopy;
    this.filterEvent.emit(this.allfilters);
    this.isDisabled = true;
  }
}
