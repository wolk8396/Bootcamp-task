import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StopInfiniteLoadingService {
  stopLoading$ = new Subject<boolean>();

  onStopLoading(value: boolean): void {
    this.stopLoading$.next(value);
  }
}
