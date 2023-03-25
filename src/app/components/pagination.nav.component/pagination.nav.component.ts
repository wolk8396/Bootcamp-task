import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild } from "@angular/core";
import { TitleStrategy } from "@angular/router";
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-nav-pagination',
  templateUrl: './pagination.nav.component.html',
  styleUrls: ['./pagination.nav.component.scss']
})
export class PaginationNavComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  pages!: number[];
  isNumberPage: number = 1;
  isStartOfList: number = 0;
  isEndOfList: number = 0;
  listStartNext: number = 0;
  isEnd: number = 0;

  private resizeObservable$: Observable<Event> | undefined;
  private resizeSubscription$!: Subscription;

  @ViewChild('nav') nav!:ElementRef;

  @Input() pagesBtn!: number[];
  @Output() page = new EventEmitter<number>();

  constructor(
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = this.pagesBtn;
  }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      let size: number = (evt.target as Window).innerWidth;
      this.onInitScreen(size);
    });
  }

  ngAfterViewInit(): void {
    this.onInitScreen(window.innerWidth);
  }

  onInitScreen(evt: number): void {
    switch (true) {
      case evt > 525:
        this.isEndOfList = 36;
        this.isStartOfList = 6;
        this.listStartNext = 4;
        this.isEnd = 3;
        console.log('1280');

        this.onRemoveActive();
        this.onSetActivePage(6);
        break;
      case evt < 520 :
        this.isEndOfList = 40;
        this.isStartOfList = 2;
        this.listStartNext = 2;
        this.isEnd = 1;
        console.log('520');
        this.onRemoveActive();
        this.onSetActivePage(3);
        break;
    }
  }

  onRemoveActive(): void {
    const  arrayElement = this.onGetElement();
    arrayElement.forEach(item => item.classList.remove('isActive'));
  }

  onSetActivePage(start: number): void {
    const  arrayElement = this.onGetElement();

    arrayElement.forEach((item, i, arr) => {
      if (i < start || i === arr.length-2 || i === arr.length-1) {
        item.classList.add('isActive');
      }
    })
  }

  onGetElement(): Element[] {
    const nodeList = (this.nav.nativeElement as HTMLElement).children;
    return Array.from(nodeList);
  }

  onSetPage(num: number): void {
    const arrayElement = this.onGetElement();

    arrayElement.forEach((item, i, arr)  => {
      this.onChangPaginatorNav(item, i , num, arr);
    })
  }

  onChangPaginatorNav(el: Element, indexEl: number, num: number, arr: Element[]): void {
    switch (true) {
      case el.textContent === String(num):
        el.nextElementSibling?.classList.add("isActive");
        break;
      case num - this.listStartNext === indexEl:
        el.classList.remove('isActive');
        break;
      case this.pages.length === num :
        (indexEl > this.isEndOfList ||  indexEl === 1) ? el.classList.add('isActive'):
          el.classList.remove('isActive')
        break;
      case num === 1:
        (indexEl < this.isStartOfList || indexEl === arr.length-2 || indexEl === arr.length-1) ?
          el.classList.add('isActive'): el.classList.remove('isActive');
        break;
      case num + this.isEnd === indexEl :
        el.nextElementSibling?.classList.remove("isActive");
        break;
      case num === indexEl + 1:
        el.classList.add("isActive");
        break;
    }
  }

  onUploadPage(number: number): void {
    this.isNumberPage = number;
    this.page.emit(number);
    this.onSetPage(number);
  }

  onNext(): void {
    ++this.isNumberPage;
    if (this.isNumberPage === this.pages.length + 1) {
      this.isNumberPage = 1;
    }
    this.onSentNumber(this.isNumberPage);
  }

  onPrev(): void {
    --this.isNumberPage;
    (this.isNumberPage === 0) ?
      this.isNumberPage = 1: null;

    this.onSentNumber(this.isNumberPage);
  }

  onSentNumber(num: number): void {
    (!!num) ?
      this.page.emit(this.isNumberPage): null;
      this.onSetPage(this.isNumberPage);
  }

  ngOnDestroy(): void {
    this.resizeSubscription$?.unsubscribe();
  }
}
