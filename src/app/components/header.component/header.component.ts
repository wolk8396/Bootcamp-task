import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponentApp implements OnInit {
  isActive: boolean = false;
  isPosition: boolean = false;

  @ViewChild('nav') nav!: ElementRef;

  constructor(
    public renderer: Renderer2,
  ) {}

  ngOnInit(): void {}

  onBurgerMenu(): void {
    this.isActive = !this.isActive;

    (this.isActive) ?
      this.renderer.addClass(document.body, 'isActive'):
      this.renderer.removeClass(document.body, 'isActive');
  }

  onPositionPage(position: ScrollLogicalPosition): void {

    document.body.scrollIntoView({
      behavior: "smooth",
      block: position,
      inline: "nearest"
    });
  }
}
