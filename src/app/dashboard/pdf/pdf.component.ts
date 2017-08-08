import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const content = {
      content: 'Hello world Привет'
    };
    pdfMake.createPdf(content).download();
  }

  ngOnInit() {
  }

}
