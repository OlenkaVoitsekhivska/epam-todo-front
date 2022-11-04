import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appColorpicker]',
})
export class ColorpickerDirective {
  @Input() bcg = '';
  @HostBinding('style.backgroundColor') color: string = 'transparent';
  constructor() {}

  @HostListener('click') onclick() {
    this.color = this.bcg;
  }
  ngOnInit() {
    this.color = this.bcg;
  }
}
