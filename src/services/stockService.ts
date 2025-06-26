import { Stock, PortfolioResponse } from '../types/portfolio';

const API_BASE_URL = 'https://eightbit-backend-jdww.onrender.com/api';

// Get portfolio data from backend API
export const getPortfolioData = async (): Promise<Stock[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PortfolioResponse = await response.json();
    return data.portfolio;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw new Error('Failed to fetch portfolio data');
  }
};

// Update stock prices (refetch from API)
export const updateStockPrices = async (stocks: Stock[]): Promise<Stock[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PortfolioResponse = await response.json();
    return data.portfolio;
  } catch (error) {
    console.error('Error updating stock prices:', error);
    throw new Error('Failed to update stock prices');
  }
};

// Health check for API
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};