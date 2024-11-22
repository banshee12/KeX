import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[kexDynamicHost]'
})
export class KexDynamicHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
