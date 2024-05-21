export const electricEnergyRegex =
  /Energia Elétrica\s*kWh\s*([\d,.]+)\s+[\d,.]+\s+([\d,.]+)/i;

export const electricEnergyFallbackRegex =
  /Energia Elétrica\s*kWh\s*([\d,.]+)\s+\d+,\d+\s+([\d,.]+)/i;
