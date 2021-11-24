import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParallaxHeader]'
})
export class ParallaxHeaderDirective {
  header: any;
  headerHeight: number;
  moveImage: number;
  scaleImage: number;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {

  }

  @HostListener('ionScroll', ['$event']) onScrollEvent($event) {
    let content: HTMLElement = this.element.nativeElement;
    this.header = content.getElementsByClassName('parallax')[0];

    this.domCtrl.read(() => {
      this.headerHeight = this.header.clientHeight;
    });
    const scrollTop: number = $event.detail.scrollTop;

    this.domCtrl.write(() => {
      if (scrollTop > 0) {
        this.moveImage = scrollTop / 5;
        this.scaleImage = 1;
      } else {
        this.moveImage = scrollTop / 1.4;
        this.scaleImage = -scrollTop / this.headerHeight + 1;
      }

      this.renderer.setStyle(
        this.header,
        'webkitTransform',
        'translate3d(0, '  + this.moveImage + 'px, 0) scale(' + this.scaleImage + ',' + this.scaleImage + ')'
      );
    });
  }

}
