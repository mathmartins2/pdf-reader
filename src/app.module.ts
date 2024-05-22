import { Module } from '@nestjs/common';
import { PdfModule } from './modules/pdf/pdf.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

@Module({
  imports: [PdfModule, InvoiceModule],
})
export class AppModule {}
