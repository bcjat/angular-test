import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[loadMore]',
})
export class LoadMoreDirective {
  debouncer: any; // prevents multiple call
  lastScrollTop = window.scrollY;

  @Output('loadMore') loadmoreEvent: EventEmitter<any> = new EventEmitter();

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // Listen to scroll events in the component
    let tracker = event.target;

    // stores scroll top value to execute only on scroll down.
    let st = tracker.scrollTop || window.scrollY;

    let limit = tracker.scrollHeight - tracker.clientHeight - 100;

    if (tracker.scrollTop >= limit && st > this.lastScrollTop) {
      clearTimeout(this.debouncer);
      this.debouncer = setTimeout(() => {
        this.loadmoreEvent.emit();
        this.lastScrollTop = st <= 0 ? 0 : st;
      }, 300);
    }
  }

  constructor() {}
}
