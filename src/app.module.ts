import { Module } from '@nestjs/common';
import { PdfModule } from './modules/pdf/pdf.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { EnvModule } from './modules/env/env.module';
import { envSchema } from './modules/env/env.validator';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (env) => envSchema.parse(env),
    }),
    PdfModule,
    EnvModule,
    InvoiceModule,
  ],
})
export class AppModule {}
