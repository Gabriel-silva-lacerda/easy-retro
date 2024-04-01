import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  colors: string[] = [
    'red',
    '#208eed',
    'green',
    'yellow',
    'orange',
    'purple',
    'pink',
    'brown',
  ];

  @Output() colorSelected = new EventEmitter<string>();

  changeColor(color: string) {
    this.colorSelected.emit(color);
  }
}
