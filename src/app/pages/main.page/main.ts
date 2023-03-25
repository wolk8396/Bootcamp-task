import { Component, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Information } from 'src/app/models/character.module';
import { Results } from 'src/app/models/results.module';
import { ApiService } from 'src/app/services/api.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime} from 'rxjs/operators';
import { StopInfiniteLoadingService } from 'src/app/services/infinite.loading.service';

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
  isChecked: boolean = false;
  isStopLoading: boolean = true;
  isShowSpinner: boolean = false;

  private scrollDes$ = new Subject<void>();
  private getCharacterDes$ = new Subject<void>();
  private characterNextDes$ =  new Subject<void>();

  @ViewChildren('cart') cart!: QueryList<any>;

  constructor(
    private getCharacter: ApiService,
    public stopLoading: StopInfiniteLoadingService,
    public renderer: Renderer2,
    ) { }

  ngOnInit(): void {
    this.onGetDate(this.page);

    this.stopLoading.stopLoading$.subscribe(res => {
      this.isStopLoading = res
    });

    fromEvent(document, 'scroll')
      .pipe(throttleTime(20), takeUntil(this.scrollDes$))
      .subscribe({
        next: res => {
          this.isLoad = Math.round(this.getScrollWidth());
          !this.isChecked && this.isStopLoading ?
            this.onUploadCart(this.isLoad): null;
        },
    });
  }

  onUploadCart(loadingCart: number): void {
    (loadingCart > 95) ? this.onNextCartList(this.isNextPage): null;
  }

  onNextCartList(url: string | null): void {
    this.isShowSpinner = true;
    if (!!url) {
      this.getCharacter.characterNext(url).pipe(takeUntil(this.getCharacterDes$))
          .subscribe({
            next: character => {
              this.onRenderCharacter(character);
            },
            error: (error) => {
              this.isShowSpinner = false;
            },
            complete: () => {
              this.isShowSpinner = false;
            }
          })
    } else  this.isShowSpinner = false;
  }

  getScrollWidth (): number {
    const doc = document.documentElement;
    const winScroll = doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    return (winScroll / height) * 100;
  };

  onGetDate(page: number): void {
    this.isShowSpinner = true;

    this.getCharacter.character(page).pipe(takeUntil(this.characterNextDes$))
        .subscribe({
          next: character => {
            this.isShowCart = true;
            this.onCreatePagePaginator(character.info.pages)
            this.onRenderCharacter(character);
          },
          error: (error) => {
            this.isShowSpinner = false;
          },
          complete: () => {
            this.isShowSpinner = false;
          }
        })
  }

  onClearPage(): void {
    const nodeList: HTMLElement[] = this.cart.first.nativeElement.children;
    const parent = (this.cart.first.nativeElement as HTMLElement);
    const arrayCart = Array.from(nodeList);
    let heightEl = parent.clientHeight + 'px';
    this.isResults = [];

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

  checkCheckBoxvalue(event: Event): void {
   this.isChecked = !this.isChecked;

   if(this.isChecked) {
    this.onClearPage();
    this.onGetDate(1)
   }
  }

  ngOnDestroy(): void {
    this.scrollDes$.next();
    this.scrollDes$.complete();

    this.getCharacterDes$.next();
    this.getCharacterDes$.complete();

    this.characterNextDes$.next();
    this.characterNextDes$.complete();
  }
}
