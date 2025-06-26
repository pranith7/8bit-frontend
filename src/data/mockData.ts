import { Stock } from '../types/portfolio';

export const mockStocks: Stock[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    sector: 'Oil & Gas',
    exchange: 'NSE',
    purchasePrice: 2450.00,
    quantity: 25,
    currentPrice: 2580.50,
    peRatio: 12.8,
    latestEarnings: 15000,
    lastUpdated: new Date()
  },
  {
    id: '2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Information Technology',
    exchange: 'NSE',
    purchasePrice: 3200.00,
    quantity: 15,
    currentPrice: 3350.75,
    peRatio: 24.5,
    latestEarnings: 9500,
    lastUpdated: new Date()
  },
  {
    id: '3',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    sector: 'Financial Services',
    exchange: 'NSE',
    purchasePrice: 1580.00,
    quantity: 40,
    currentPrice: 1625.30,
    peRatio: 18.2,
    latestEarnings: 12000,
    lastUpdated: new Date()
  },
  {
    id: '4',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    sector: 'Information Technology',
    exchange: 'NSE',
    purchasePrice: 1420.00,
    quantity: 30,
    currentPrice: 1380.25,
    peRatio: 22.1,
    latestEarnings: 6200,
    lastUpdated: new Date()
  },
  {
    id: '5',
    symbol: 'ITC',
    name: 'ITC Ltd',
    sector: 'FMCG',
    exchange: 'NSE',
    purchasePrice: 425.00,
    quantity: 100,
    currentPrice: 445.80,
    peRatio: 28.4,
    latestEarnings: 4500,
    lastUpdated: new Date()
  },
  {
    id: '6',
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    sector: 'Telecommunications',
    exchange: 'NSE',
    purchasePrice: 720.00,
    quantity: 50,
    currentPrice: 698.50,
    peRatio: 35.2,
    latestEarnings: 2800,
    lastUpdated: new Date()
  },
  {
    id: '7',
    symbol: 'KOTAKBANK',
    name: 'Kotak Mahindra Bank',
    sector: 'Financial Services',
    exchange: 'NSE',
    purchasePrice: 1890.00,
    quantity: 20,
    currentPrice: 1925.75,
    peRatio: 16.8,
    latestEarnings: 3200,
    lastUpdated: new Date()
  },
  {
    id: '8',
    symbol: 'LT',
    name: 'Larsen & Toubro Ltd',
    sector: 'Construction',
    exchange: 'NSE',
    purchasePrice: 2180.00,
    quantity: 18,
    currentPrice: 2095.40,
    peRatio: 19.5,
    latestEarnings: 7800,
    lastUpdated: new Date()
  }
];