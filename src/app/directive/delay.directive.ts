import { TemplateRef, ViewContainerRef, Directive, Input} from '@angular/core';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective {

  constructor(
    private vc: ViewContainerRef,
    private tr: TemplateRef<any>
  ) { }

  @Input() set appDelay(time: number) {
    let delayTimeout = setTimeout(() => {
      clearTimeout(delayTimeout);
      this.vc.createEmbeddedView(this.tr);
    }, time);
  }

}
