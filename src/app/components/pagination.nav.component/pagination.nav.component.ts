import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild } from "@angular/core";

@Component({
  selector: 'app-nav-pagination',
  templateUrl: './pagination.nav.component.html',
  styleUrls: ['./pagination.nav.component.scss']
})
export class PaginationNavComponent implements OnInit, OnChanges, AfterViewInit {
  pages!: number[];
  isNumberPage: number = 1;

  @ViewChild('nav') nav!:ElementRef;

  @Input() pagesBtn!: number[];
  @Output() page = new EventEmitter<number>();

  constructor(
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = this.pagesBtn;
  }

  ngAfterViewInit(): void {
    this.onSetActivePage();
  }

  onSetActivePage(): void {
    const  arrayElement = this.onGetElement();

    arrayElement.forEach((item, i, arr) => {
      if (i < 6 || i === arr.length-2 || i === arr.length-1) {
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
      if (item.textContent === String(num)) {
        item.nextElementSibling?.classList.add("isActive");
      } else if(num - 4 === i ) {
        item.classList.remove('isActive');
      } else if(this.pages.length === num) {
        (i > 36 || i === 1) ? item.classList.add('isActive'):
        item.classList.remove('isActive');
      } else if(num === 1) {
       ( i < 6 || i === arr.length-2 || i === arr.length-1) ?
       item.classList.add('isActive'):  item.classList.remove('isActive');
      } else if (num + 3 === i) {
        item.nextElementSibling?.classList.remove("isActive");
      } else if (num === i + 1) {
        item.classList.add("isActive")
      }
    })

  }

  onChangPaginatorNav(el: Element, indexEl: number, num: number): void {
    switch (true) {
      case el.textContent === String(num):
        el.nextElementSibling?.classList.add("isActive");
        break;
      case num - 4 === indexEl:
        el.classList.remove('isActive');
        break;
      case this.pages.length === num :
        (indexEl > 36 ||  indexEl === 1) ? el.classList.add('isActive'):
        el.classList.remove('isActive')
        break;
      case num === 1:

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

    (!!this.isNumberPage) ?
        this.page.emit(this.isNumberPage): null;

    this.onSetPage(this.isNumberPage);
  }

  onPrev(): void {
    --this.isNumberPage;
    (this.isNumberPage === 0) ?
      this.isNumberPage = 1: null;

      (!!this.isNumberPage) ?
        this.page.emit(this.isNumberPage): null;

  }

  ngOnInit(): void {

  }

}
