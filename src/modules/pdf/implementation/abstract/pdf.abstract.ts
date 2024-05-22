export abstract class PdfAbstract {
  abstract parse(dataBuffer: Buffer): Promise<string>;
}
