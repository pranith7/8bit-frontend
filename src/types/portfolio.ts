export interface StockHolding {
  no: number;
  particulars: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  exchange: string;
  yahooSymbol: string;
  staticCMP: number | null;
  sector: string;
  marketCap: number | null;
  revenueTTM: number | null;
  ebitdaTTM: number | null;
  ebitdaPercentage: number | null;
  pat: number | null;
  patPercentage: number | null;
  cfoMarch24: number | null;
  cfo5Years: number | null;
  freeCashFlow5Years: number | null;
  debtToEquity: number | null;
  bookValue: number | null;
  revenueGrowth: number | null;
  ebitdaGrowth: number | null;
  profitGrowth: number | null;
  marketCapGrowth: number | null;
  priceToSales: number | null;
  cfoToEbitda: number | null;
  cfoToPat: number | null;
  priceToBook: number | null;
  stage2: string | null;
  salePrice: number | null;
  abhishek: string | null;
}

export interface StockData {
  symbol: string;
  cmp: number | null;
  peRatio: string | null;
  latestEarnings: string | null;
  presentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
}

export interface Stock extends StockHolding, StockData {}

export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
}

export interface SectorSummary {
  sector: string;
  stocks: Stock[];
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
}

export interface PortfolioResponse {
  portfolio: Stock[];
  sectors: Record<string, {
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
    totalMarketCap: number;
    totalRevenueTTM: number;
    totalEbitdaTTM: number;
    totalPat: number;
  }>;
}