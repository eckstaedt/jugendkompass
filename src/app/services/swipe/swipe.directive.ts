import { AfterViewInit, Directive, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective implements AfterViewInit {

  /** x position at touchstart */
  xDown = null;
  /** y position at touchstart */
  yDown = null;
  /** Timestamp at touchstart */
  time = 0;

  @Output() swipeLeft: EventEmitter<any>;
  @Output() swipeRight: EventEmitter<any>;
  // @Output() swipeUp: EventEmitter<any>;
  // @Output() swipeDown: EventEmitter<any>;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.swipeRight = new EventEmitter<any>();
    this.swipeLeft = new EventEmitter<any>();
    // this.swipeUp = new EventEmitter<any>();
    // this.swipeDown = new EventEmitter<any>();
  }

  ngAfterViewInit() {
    /** Listen for touchstart event on element directive is attached to */
    this.renderer.listen(this.elRef.nativeElement, 'touchstart', (event: TouchEvent) => {
      this.handleTouchStart(event);
    });

    /** Listen for touchend event on element directive is attached to */
    this.renderer.listen(this.elRef.nativeElement, 'touchend', (event: TouchEvent) => {
      this.handleTouchMove(event);
    });
  }

  private handleTouchStart(event: TouchEvent) {
    this.xDown = event.touches[0].pageX;
    this.yDown = event.touches[0].pageY;
    this.time = event.timeStamp;
  }

  handleTouchMove(event: TouchEvent) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    /** @see https://stackblitz.com/edit/angular-swipe-events-with-hostlistner */
    const touch = event.touches[0] || event.changedTouches[0];

    const xUp = touch.pageX;
    const yUp = touch.pageY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;
    const timeDiff = event.timeStamp - this.time;

    // simulate a swipe -> less than 500 ms and more than 60 px
    if (timeDiff < 500) {
      // touch movement lasted less than 500 ms
      if (Math.abs(xDiff) > 60) {
        // delta x is at least 60 pixels
        if (xDiff > 0) {
          this.swipeRight.emit(event);
        } else {
          this.swipeLeft.emit(event);
        }
      }

      /*if (Math.abs(yDiff) > 60) {
        // delta y is at least 60 pixels
        if (yDiff > 0) {
          this.swipeDown.emit(event);
        } else {
          this.swipeUp.emit(event);
        }
      }*/
    }

    // Reset values.
    this.xDown = null;
    this.yDown = null;
  }
}
