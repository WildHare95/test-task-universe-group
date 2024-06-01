import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { PdfJsViewerComponent } from "ng2-pdfjs-viewer";
import { BehaviorSubject, exhaustMap, forkJoin, of, tap } from "rxjs";
import { PDFService } from "./services/pdf.service";
import { IndexedDBService } from "./services/indexed-db.service";
import { IPDFFile } from "./models";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('pdfJsViewerComponent') pdfJsViewerComponent!: PdfJsViewerComponent;

  public history = new BehaviorSubject<(IPDFFile & {id: number})[]>([])
  public pdfSrc: Blob | null = null;
  public pdfString: string = '';

  public isLoading = new BehaviorSubject(false)

  constructor(
    private _pdfService: PDFService,
    private _idb: IndexedDBService,
    private _cdr: ChangeDetectorRef
  ) {
    this._idb.getAllFiles().subscribe(allPDFData => {
      this.history.next(allPDFData)
    })
  }

  public convertToPDF(): void {
    if (!!this.pdfString) {
      this._pdfService.generatePDFFromText(this.pdfString)
        .pipe(
          tap(() => {
            this.isLoading.next(true)
          }),
          exhaustMap((pdfAsBlob) => {
            return this._idb.addFile({
              name: `${new Date().toISOString()}`,
              data: pdfAsBlob,
              label: this._idb.truncateString(this.pdfString)
            }).pipe(
              exhaustMap(() => {
                return forkJoin(this._idb.getAllFiles(), of(pdfAsBlob))
              })
            )
          }),
          tap(() => {
            this.isLoading.next(false)
          }),
        ).subscribe(([history, pdfAsBlob]) => {

          this.pdfJsViewerComponent.pdfSrc = pdfAsBlob
          this.pdfJsViewerComponent.refresh()
          this.history.next(history)
      })
    }
  }

  public selectFile(id: number) {
    this._idb.getFileById(id).subscribe(data => {
      this.pdfJsViewerComponent.pdfSrc = data.data
      this._cdr.markForCheck()
      this.pdfJsViewerComponent.refresh()
    })
  }
}
