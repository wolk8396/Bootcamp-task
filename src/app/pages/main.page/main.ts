import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  isShowCart: boolean = false;
  isLoad: number = 0;
  isNextPage!: string;

  @ViewChildren('nav') nav!: QueryList<any>;

  constructor(
    private getCharacter: ApiService

    ) { }

  ngOnInit(): void {
    this.onGetDate(this.page);

    fromEvent(document, 'scroll')
      .pipe(throttleTime(20))
      .subscribe({
        next: res => {
          this.isLoad = Math.round(this.getScrollWidth());
          this.onUploadCart(this.isLoad);
        },
    });
  }

  onUploadCart(loadingCart: number): void {
    (loadingCart > 95) ? this.onNextCartList(): null;
  }

  onNextCartList(): void {
    if (!!this.isNextPage) {
      this.getCharacter.characterNext(this.isNextPage).subscribe({
        next: character => {
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
        console.log(character);

        this.isShowCart = true;
        this.onRenderCharacter(character);
      }

    })
  }

  onRenderCharacter(character:Information): void {
    const {results, info} = character;
    this.isResults.push(...results);
    this.isNextPage = info.next;
  }

  ngOnDestroy(): void {

  }
}
