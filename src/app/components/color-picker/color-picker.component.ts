import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  colors: string[] = [
    '#8758ff',
    '#208eed',
    '#009886',
    '#e92c64',
    '#2c4ac9',
    '#ff772a',
    '#4a5e86',
    '#86724a',
  ];

  @Output() colorSelected = new EventEmitter<string>();

  changeColor = (color: string) => this.colorSelected.emit(color);
}
