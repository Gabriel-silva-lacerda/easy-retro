import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.scss',
})
export class FilterInputComponent {
  @Input() filterName = '';
  @Output() filterChange = new EventEmitter<string>();

  constructor(private filterService: FilterService) {}

  searchData(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterChange.emit(value);
  }
}
