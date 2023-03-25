import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { Results } from "src/app/models/results.module";
import { StopInfiniteLoadingService } from "src/app/services/infinite.loading.service";
import { ResultService } from "src/app/services/modal.service";

@Component({
  selector: 'app-modal-character',
  templateUrl: './modal-character.html',
  styleUrls: ['./modal-character.scss']
})
export class ModalCharacterComponent implements OnInit, OnDestroy {
  isShowModal: boolean = false;
  isResults!:Results;
  isActive: boolean = false;

  private modalWindowCharacterDes$ = new Subject<void>();

  constructor(
    private resultService: ResultService,
    public renderer: Renderer2,
    public stopLoading: StopInfiniteLoadingService
  ) {}

  ngOnInit(): void {
    this.resultService.result$.pipe(takeUntil(this.modalWindowCharacterDes$))
        .subscribe(res => this.onResult(res))
  }

  onCloseModalWindow(): void {
    this.isShowModal = false;
    this.stopLoading.onStopLoading(true);
  }

  onResult(result: Results): void {
    this.isResults = result;
    this.isShowModal = true;
    this.stopLoading.onStopLoading(false);
  }

  getUrl(): string{
    return `url(${this.isResults.image})`;
  }

  ngOnDestroy(): void {
    this.modalWindowCharacterDes$.next();
    this.modalWindowCharacterDes$.complete();
    this.stopLoading.onStopLoading(true);
  }
}
