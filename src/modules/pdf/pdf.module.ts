import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfAbstract } from './implementation/abstract/pdf.abstract';
import { PdfParse } from './implementation/strategies/pdf-parse.strategy';

@Module({
  providers: [
    PdfService,
    {
      provide: PdfAbstract,
      useClass: PdfParse,
    },
  ],
  exports: [PdfService],
})
export class PdfModule {}
