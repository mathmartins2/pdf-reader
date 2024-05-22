import { PdfAbstract } from '../abstract/pdf.abstract';
import * as pdf from 'pdf-parse';

export class PdfParse implements PdfAbstract {
  async parse(dataBuffer: Buffer): Promise<string> {
    return (await pdf(dataBuffer)).text;
  }
}
