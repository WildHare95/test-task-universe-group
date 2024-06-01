import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Observable } from "rxjs";
import { IPDFFile } from "../models";
import { environment as env } from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  private _storeKey = env.dbConfig.objectStoresMeta[0].store
  constructor(private dbService: NgxIndexedDBService) { }

  public addFile(file: IPDFFile): Observable<IPDFFile> {
    return this.dbService.add(this._storeKey, file);
  }

  public getFileById(id: number): Observable<IPDFFile> {
    return this.dbService.getByID(this._storeKey, id);
  }

  public getAllFiles(): Observable<(IPDFFile & {id: number})[]> {
    return this.dbService.getAll(this._storeKey);
  }

  public deleteFile(id: number): Observable<unknown[]> {
    return this.dbService.delete(this._storeKey, id);
  }

  public truncateString(str: string, num: number = 20): string {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num).trim() + '...';
  }
}
