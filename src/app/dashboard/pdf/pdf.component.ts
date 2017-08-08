import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  private content: any;

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.content = {
      content: 'Hello world Привет'
    };
  }

  public download() {
    pdfMake.createPdf(this.content).download();
  }
}
