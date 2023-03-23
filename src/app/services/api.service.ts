import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Information } from "../models/character.module";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
constructor(
  private http: HttpClient
  )
  { }

  character(page: number | string): Observable<Information> {
    return this.http.get<Information>(`https://rickandmortyapi.com/api/character?page=${page}`);
  }

  characterNext(url:string): Observable<Information> {
    return this.http.get<Information>(url);
  }


}
