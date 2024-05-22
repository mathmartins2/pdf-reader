import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { PdfService } from '../pdf/pdf.service';
import { CreateInvoiceDto } from './dto/create-invoce.dto';
import { InvoiceQuery } from './interfaces';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly db: PrismaService,
    private readonly pdfService: PdfService,
  ) {}

  async create(dto: CreateInvoiceDto[]) {
    await this.db.invoice.createMany({
      data: dto,
    });
  }

  async getAndSaveInvoices() {
    const data = await this.pdfService.extractPdf();
    const invoiceDtos: CreateInvoiceDto[] = data.map((item) => ({
      clientNumber: item.clientNumber,
      referenceMonth: item.referenceMonth,
      electricEnergyQuantity: item.electricEnergy?.quantityKWh || null,
      electricEnergyValue: item.electricEnergy?.valueRS || null,
      electricSceeQuantity: item.electricScee?.quantityKWh || null,
      electricSceeValue: item.electricScee?.valueRS || null,
      electricCompensadaGdQuantity:
        item.electricCompensadaGd?.quantityKWh || null,
      electricCompensadaGdValue: item.electricCompensadaGd?.valueRS || null,
      contribIlumPublicaMunicipal: item.contribIlumPublicaMunicipal || null,
      code: item.code,
    }));
    await this.create(invoiceDtos);
  }

  async findInvoices(query: InvoiceQuery) {
    return await this.db.invoice.findMany({
      where: {
        clientNumber: query?.clientNumber,
        referenceMonth: query?.referenceMonth,
      },
    });
  }
}
