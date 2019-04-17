import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIsVisible]'
})
export class IsVisibleDirective {
	constructor(private element: ElementRef,
	private render2: Renderer2) {
		console.log("step1");
		render2.setStyle(element.nativeElement,"display","none");
		render2.setStyle(element.nativeElement, "backgroundColor","gray");
		console.log(element.nativeElement);
		console.log("step3");
	}
}