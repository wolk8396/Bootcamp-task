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
    console.log(arrayElement);


    arrayElement.forEach((item, i, arr) => {
      if (i < 8 || i === arr.length-2 || i === arr.length-1) {
        item.classList.add('isActive');
      }
    })

  }

  onGetElement(): Element[] {
    const nodeList = (this.nav.nativeElement as HTMLElement).children;
    console.log(nodeList);

    return Array.from(nodeList);
  }

  onUploadPage(number: number): void {
    ++this.isNumberPage
    this.page.emit(number);
  }

  ngOnInit(): void {

  }

}
