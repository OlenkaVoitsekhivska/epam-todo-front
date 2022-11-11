import { Component, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'disableScroll');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'disableScroll');
  }
}
