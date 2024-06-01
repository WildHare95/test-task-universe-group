import {Component, ViewChild, ViewRef} from '@angular/core';
import {initFlowbite} from "flowbite";
import {PDFService} from "./services/pdf.service";
import {PdfJsViewerComponent} from "ng2-pdfjs-viewer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('pdfJsViewerComponent') pdfJsViewerComponent!: PdfJsViewerComponent;

  constructor(private _pdfService: PDFService) {}

  history = [1,2,3,4,5,6,7,8,9]
  pdfSrc: Blob | null = null;
  pdfString: string = '';

  ngOnInit(): void {
    initFlowbite();


  }

  convertToPDF() {
    if (!!this.pdfString) {
      this._pdfService.generatePDFFromText(this.pdfString).subscribe((pdfAsBlob) => {
        this.pdfJsViewerComponent.pdfSrc = pdfAsBlob
        this.pdfJsViewerComponent.refresh()
        this._pdfService.savePDFEntry(`Document-${new Date().toISOString()}`, pdfAsBlob);
      })
    }
  }
}
