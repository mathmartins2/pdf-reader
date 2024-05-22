import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaModule } from '../db/prisma/prisma.module';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [PrismaModule, PdfModule],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
