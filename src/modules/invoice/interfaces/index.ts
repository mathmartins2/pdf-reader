export interface InvoiceData {
  clientNumber: string;
  referenceMonth: string;
  electricEnergy?: {
    quantityKWh: number;
    valueRS: number;
  } | null;
  electricScee?: {
    quantityKWh: number;
    valueRS: number;
  } | null;
  electricCompensadaGd?: {
    quantityKWh: number;
    valueRS: number;
  } | null;
  contribIlumPublicaMunicipal?: number | null;
  code: string;
}

export interface InvoiceQuery {
  clientNumber?: string;
  referenceMonth?: string;
}
