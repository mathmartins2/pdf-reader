import { Controller, Get } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  async readPdf() {
    return await this.pdfService.extractPdf();
  }
}
