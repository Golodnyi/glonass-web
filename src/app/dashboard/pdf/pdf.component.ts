import { Component, Input } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Filter } from '../../shared/models/filter.model';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  @Input() filter: Filter;
  private content: any;

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  public prepare() {
    this.content = {
      content: [
        { text: 'Отчет с ' + this.filter.before + ' по ' + this.filter.after, fontSize: 16, alignment: 'center' },
      ]
    };

    return true;
  }

  public download() {
    if (this.prepare()) {
      pdfMake.createPdf(this.content).download();
    }
  }
}
