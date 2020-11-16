import {Directive, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

@Directive({
  selector: '[appCheckPermission]'
})
export class CheckPermissionDirective implements OnChanges {
  @Input() action: string;
  @Input() permission: string[];
  constructor(private elementRef: ElementRef) {}

  ngOnChanges(): void {
    if (this.action && this.permission) {
      if (this.permission.indexOf(this.action) > -1) {
      } else {
        this.elementRef.nativeElement.remove();
      }
    }
  }
}
