import { Controller, Get, Post, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceQuery } from './interfaces';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('pdf/save')
  async readAndSave() {
    await this.invoiceService.getAndSaveInvoices();
  }

  @Get()
  async findInvoices(@Query() query: InvoiceQuery) {
    return await this.invoiceService.findInvoices(query);
  }
}
