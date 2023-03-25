import { Component, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { Information } from 'src/app/models/character.module';
import { Results } from 'src/app/models/results.module';
import { ApiService } from 'src/app/services/api.service';
import { fromEvent } from 'rxjs';
import { throttleTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  page: number = 1;
  isResults: Results[] = [];
  ArrayNumbersPage!: number[];
  isShowCart: boolean = false;
  isLoad: number = 0;
  isNextPage!: string | null;
  prevPage!: string | null;

  @ViewChildren('cart') cart!: QueryList<any>;

  constructor(
    private getCharacter: ApiService,
    public renderer: Renderer2,
    ) { }

  ngOnInit(): void {
    this.onGetDate(this.page);

    fromEvent(document, 'scroll')
      .pipe(throttleTime(20))
      .subscribe({
        next: res => {
          this.isLoad = Math.round(this.getScrollWidth());
        },
    });
  }

  onUploadCart(loadingCart: number): void {
    (loadingCart > 95) ? this.onNextCartList(this.isNextPage): null;
  }

  onNextCartList(url: string | null): void {
    if (!!url) {
      this.getCharacter.characterNext(url).subscribe({
        next: character => {
          console.log(character);
          this.onRenderCharacter(character);
        }
      })
    }
  }

  getScrollWidth (): number {
    const doc = document.documentElement;
    const winScroll = doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    return (winScroll / height) * 100;
  };

  onGetDate(page: number): void {

    this.getCharacter.character(page).subscribe({
      next: character => {
        this.isShowCart = true;
        this.onCreatePagePaginator(character.info.pages)
        this.onRenderCharacter(character);
      },
    })
  }

  onClearPage(): void {
    const nodeList: HTMLElement[] = this.cart.first.nativeElement.children;
    const parent = (this.cart.first.nativeElement as HTMLElement);
    const arrayCart = Array.from(nodeList);
    let heightEl = parent.clientHeight + 'px';
    this.isResults = [];
    console.log(heightEl);

    this.renderer.setStyle(parent, 'height', heightEl);

    for(let el of arrayCart) {
      this.renderer.removeChild(parent, el);
    }

    setTimeout(() => {
      this.renderer.removeStyle(parent, 'height');

    }, 0);
  }

  onGetPage(number: number): void {
    this.onClearPage();
    this.onGetDate(number);
  }

  onCreatePagePaginator(lastPage: number): void {
    this.ArrayNumbersPage = [...Array(lastPage).keys()].map(num => num + 1);
  }

  onRenderCharacter(character:Information): void {
    const {results, info} = character;
    this.isResults.push(...results);
    this.isNextPage = info.next;
    this.prevPage = info.prev;
  }


  onNext(): void {
    this.onClearPage();
    this.onNextCartList(this.isNextPage);
  }

  onPrev(): void {
    this.onClearPage();
    this.onNextCartList(this.prevPage);
  }

  ngOnDestroy(): void {

  }
}
