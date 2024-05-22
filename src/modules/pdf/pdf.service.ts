import { Injectable, Logger } from '@nestjs/common';
import { readFile, readdir } from 'fs/promises';
import * as path from 'path';
import { clientLineRegex } from './regex/client-line.regex';
import { referenceMonthRegex } from './regex/reference-month.regex';
import {
  electricEnergyFallbackRegex,
  electricEnergyRegex,
} from './regex/electric-energy.regex';
import {
  electricSceeFallbackRegex,
  electricSceeRegex,
} from './regex/eletrict-scee.regex';
import {
  electricCompensadaGdFallbackRegex,
  electricCompensadaGdRegex,
} from './regex/electric-compensada-gd.regex';
import { contribIlumPublicaMunicipalRegex } from './regex/contrib-ilum-publica-municipal.regex';
import { InvoiceData } from '../invoice/interfaces';
import { PdfAbstract } from './implementation/abstract/pdf.abstract';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  constructor(private readonly pdfAbstract: PdfAbstract) {}

  async extractPdf(): Promise<InvoiceData[]> {
    const files = await this.getAllPdfFiles('faturas');
    const results: InvoiceData[] = [];
    for (const file of files) {
      const data = await this.processPdf(file);
      results.push({ ...data });
    }
    return results;
  }

  async getAllPdfFiles(dir: string): Promise<string[]> {
    let files: string[] = [];
    const items = await readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory())
        files = files.concat(await this.getAllPdfFiles(fullPath));
      if (item.isFile() && item.name.endsWith('.pdf')) files.push(fullPath);
    }
    return files;
  }

  async processPdf(filePath: string) {
    const buffer = await readFile(filePath);
    const text = await this.pdfAbstract.parse(buffer);
    const normalizedText = text.replace(/\s+/g, ' ');
    this.logger.log(`Processing file: ${filePath}`);
    return {
      clientNumber: this.extractClientLine(normalizedText),
      referenceMonth: this.extractReferenceMonth(normalizedText),
      electricEnergy: this.extractElectricEnergy(normalizedText),
      electricScee: this.extractElectricScee(normalizedText),
      electricCompensadaGd: this.extractElectricCompensadaGd(normalizedText),
      contribIlumPublicaMunicipal:
        this.extractContribIlumPublicaMunicipal(normalizedText),
      code: filePath.split('/')[2],
    };
  }

  extractClientLine(text: string) {
    const clientLineMatches = clientLineRegex.exec(text);
    const clientLine = clientLineMatches?.[1]?.trim();
    return clientLine?.split(/\s+/)?.filter((part) => /^\d+$/.test(part))?.[0];
  }

  extractReferenceMonth(text: string) {
    const referenceMonthMatches = referenceMonthRegex.exec(text);
    return referenceMonthMatches?.[1]?.trim();
  }

  extractElectricEnergy(text: string) {
    const primaryRegex = electricEnergyRegex;
    const fallbackRegex = electricEnergyFallbackRegex;
    let matches = primaryRegex.exec(text);
    if (!matches) matches = fallbackRegex.exec(text);
    if (!matches) return null;
    const quantityKWh = matches[1].replace(',', '.');
    const valueRS = matches[2].replace('.', '').replace(',', '.');
    return {
      quantityKWh: +quantityKWh,
      valueRS: +valueRS,
    };
  }

  extractElectricScee(text: string) {
    const primaryRegex = electricSceeRegex;
    const fallbackRegex = electricSceeFallbackRegex;
    let matches = primaryRegex.exec(text);
    if (!matches) matches = fallbackRegex.exec(text);
    if (!matches) return null;
    const quantityKWh = matches[1].replace(',', '.');
    const valueRS = matches[2].replace('.', '').replace(',', '.');
    return {
      quantityKWh: +quantityKWh,
      valueRS: +valueRS,
    };
  }

  extractElectricCompensadaGd(text: string) {
    const primaryRegex = electricCompensadaGdRegex;
    const fallbackRegex = electricCompensadaGdFallbackRegex;
    let matches = primaryRegex.exec(text);
    if (!matches) matches = fallbackRegex.exec(text);
    if (!matches) return null;
    const quantityKWh = matches[1].replace(',', '.');
    const valueRS = matches[2].replace('.', '').replace(',', '.');
    return {
      quantityKWh: +quantityKWh,
      valueRS: +valueRS,
    };
  }

  extractContribIlumPublicaMunicipal(text: string) {
    const contribIlumPublicaMunicipalMatches =
      contribIlumPublicaMunicipalRegex.exec(text);
    if (!contribIlumPublicaMunicipalMatches) return null;
    const valueRS = contribIlumPublicaMunicipalMatches[1].replace(',', '.');
    return +valueRS;
  }
}
