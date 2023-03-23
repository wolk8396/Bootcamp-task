import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Results } from "../models/results.module";

@Injectable({
  providedIn: 'root'
})

export class ResultService {
  result$ = new Subject<Results>();

  onResult(result: Results): void {
    this.result$.next(result);
  }
}
