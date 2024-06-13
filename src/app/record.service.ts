import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = 'http://127.0.0.1:8000/api/records';

  constructor(private http: HttpClient) { }

  createRecord(record: { player_name: string, difficulty: string, time: number }): Observable<any> {
    return this.http.post(this.apiUrl, record);
  }
}
