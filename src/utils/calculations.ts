import { Stock, PortfolioSummary, SectorSummary } from '../types/portfolio';

export const calculateInvestment = (stock: Stock): number => {
  return stock.investment;
};

export const calculatePresentValue = (stock: Stock): number => {
  return stock.presentValue;
};

export const calculateGainLoss = (stock: Stock): number => {
  return stock.gainLoss;
};

export const calculateGainLossPercentage = (stock: Stock): number => {
  return stock.gainLossPercentage;
};

export const calculatePortfolioPercentage = (stock: Stock, totalInvestment: number): number => {
  return stock.portfolioPercentage;
};

export const calculatePortfolioSummary = (stocks: Stock[]): PortfolioSummary => {
  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.investment, 0);
  const totalPresentValue = stocks.reduce((sum, stock) => sum + stock.presentValue, 0);
  const totalGainLoss = stocks.reduce((sum, stock) => sum + stock.gainLoss, 0);
  const totalGainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    totalGainLossPercentage
  };
};

export const groupBySector = (stocks: Stock[]): SectorSummary[] => {
  const sectorMap = new Map<string, Stock[]>();
  
  stocks.forEach(stock => {
    if (!sectorMap.has(stock.sector)) {
      sectorMap.set(stock.sector, []);
    }
    sectorMap.get(stock.sector)!.push(stock);
  });

  return Array.from(sectorMap.entries()).map(([sector, sectorStocks]) => {
    const totalInvestment = sectorStocks.reduce((sum, stock) => sum + stock.investment, 0);
    const totalPresentValue = sectorStocks.reduce((sum, stock) => sum + stock.presentValue, 0);
    const totalGainLoss = sectorStocks.reduce((sum, stock) => sum + stock.gainLoss, 0);
    const gainLossPercentage = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

    return {
      sector,
      stocks: sectorStocks,
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
      gainLossPercentage
    };
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};