import { Directive, Input, Renderer2, HostListener } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective {
  @Input('header') header: any;
  @Input('isList') isList: boolean;
  private toolbarHeight: number;
  private lastY: number = 60;
  private playButton: Element | undefined;
  // private isScrollingToTop: boolean = false;
  // private scrollingToTopStartingHeight: number;

  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  ngOnInit() {
    this.domCtrl.read(() => {
      this.header = this.header.el;
      this.playButton = document.getElementsByClassName('postPlayButton').length ? document.getElementsByClassName('postPlayButton')[0] : undefined;
      this.toolbarHeight = 60;
    });
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    const scrollTop: number = $event.detail.scrollTop - (this.isList ? 60 : 0);
    if (scrollTop > 0) {
      if ($event.detail.scrollTop > this.lastY) {
        // this.isScrollingToTop = false;
        let newPosition: number = -(scrollTop / 5);

        if (newPosition < -this.toolbarHeight) {
          newPosition = -this.toolbarHeight;
        }

        let newOpacity = 1 - newPosition / -this.toolbarHeight;

        this.domCtrl.write(() => {
          this.renderer.setStyle(this.header, 'top', `${newPosition}px`);
          this.renderer.setStyle(this.header, 'opacity', newOpacity);
          if (this.playButton) {
            this.renderer.setStyle(this.playButton, 'opacity', newOpacity);
          }
        });
      } else {
        this.domCtrl.write(() => {
          this.renderer.setStyle(this.header, 'top', '0px');
          this.renderer.setStyle(this.header, 'opacity', 1);
          if (this.playButton) {
            this.renderer.setStyle(this.playButton, 'opacity', 1);
          }
        });
        // if (!this.isScrollingToTop) {
        //   this.isScrollingToTop = true;
        //   this.scrollingToTopStartingHeight = $event.detail.scrollTop;
        // }
        // let newPosition: number = (this.scrollingToTopStartingHeight - $event.detail.scrollTop) / 5;
        // newPosition -= this.toolbarHeight;

        // if (newPosition > 0) {
        //   newPosition = 0;
        // }

        // let newOpacity = newPosition === 0 ? 1 : 1 - (-newPosition / this.toolbarHeight);

        // this.domCtrl.write(() => {
        //   this.renderer.setStyle(this.header, 'top', `${newPosition > 0 ? 0 : newPosition}px`);
        //   this.renderer.setStyle(this.header, 'opacity', newOpacity > 1 ? 1 : newOpacity);
        // });
      }
    } else {
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.header, 'top', '0px');
        this.renderer.setStyle(this.header, 'opacity', 1);
        if (this.playButton) {
          this.renderer.setStyle(this.playButton, 'opacity', 1);
        }
      });
    }

    this.lastY = $event.detail.scrollTop;
  }
}
