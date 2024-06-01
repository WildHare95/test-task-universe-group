import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env }  from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PDFService {
  private historyKey = 'pdfConversionHistory';
  constructor(private _http: HttpClient) { }

  public generatePDFFromText(text: string) {
    return this._http.post(env.url, {text}, {responseType: 'blob'})
  }

  public savePDFEntry(fileName: string, file: Blob) {
    this._saveBlobToLocalStorage(file, fileName)
  }

  getHistory(): any[] {
    const history = localStorage.getItem(this.historyKey);
    return history ? JSON.parse(history) : [];
  }

  saveToHistory(item: any) {
    const history = this.getHistory();
    history.push(item);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  private _blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject('Blob conversion failed');
        }
      };
    });
  }

  private async _saveBlobToLocalStorage(blob: Blob, fileName: string) {
    try {
      const base64Data = await this._blobToBase64(blob);
      localStorage.setItem(fileName, base64Data);
      console.log(`Saved ${fileName} to local storage`);
    } catch (error) {
      console.error('Error saving blob to local storage', error);
    }
  }
}

