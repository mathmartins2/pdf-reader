import { Module } from '@nestjs/common';
import { PdfModule } from './modules/pdf/pdf.module';

@Module({
  imports: [PdfModule],
})
export class AppModule {}
