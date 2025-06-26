import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertCircle, BarChart3, RefreshCw } from 'lucide-react';
import { Stock } from '../types/portfolio';
import { getPortfolioData, updateStockPrices } from '../services/stockService';
import { calculatePortfolioSummary, groupBySector } from '../utils/calculations';
import LoadingSpinner from './LoadingSpinner';
import UpdateIndicator from './UpdateIndicator';
import PortfolioSummaryCard from './PortfolioSummaryCard';
import SectorSummary from './SectorSummary';
import PortfolioTable from './PortfolioTable';

const PortfolioDashboard: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'table' | 'sector'>('sector');
  const stocksRef = useRef<Stock[]>([]);

  // Keep stocks ref updated
  useEffect(() => {
    stocksRef.current = stocks;
  }, [stocks]);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const portfolioData = await getPortfolioData();
        setStocks(portfolioData);
        setLastUpdated(new Date());
      } catch (err) {
        setError('Failed to load portfolio data. Please try again.');
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Update stock prices periodically
  const updatePrices = useCallback(async () => {
    if (stocksRef.current.length === 0) return;

    try {
      setUpdating(true);
      setError(null);
      const updatedStocks = await updateStockPrices(stocksRef.current);
      setStocks(updatedStocks);
      setLastUpdated(new Date());
      console.log('Portfolio data updated at:', new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to update stock prices.');
      console.error('Error updating stock prices:', err);
    } finally {
      setUpdating(false);
    }
  }, []);

  // Manual refresh function
  const handleManualRefresh = async () => {
    if (updating) return; // Prevent multiple simultaneous updates
    await updatePrices();
  };

  // Set up periodic updates - start after initial load
  useEffect(() => {
    if (loading) return; // Don't start interval until initial load is complete

    console.log('Starting 15-second update interval');
    const interval = setInterval(updatePrices, 15000); // Update every 15 seconds
    
    // Initial update after 15 seconds
    const initialUpdate = setTimeout(updatePrices, 15000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialUpdate);
      console.log('Cleared update interval');
    };
  }, [loading, updatePrices]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (error && stocks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Portfolio</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const portfolioSummary = calculatePortfolioSummary(stocks);
  const sectorSummaries = groupBySector(stocks);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <UpdateIndicator lastUpdated={lastUpdated} isUpdating={updating} />
              <button
                onClick={handleManualRefresh}
                disabled={updating}
                className={`p-2 rounded-lg transition-colors ${
                  updating 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
                title="Refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${updating ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Portfolio Summary */}
        <PortfolioSummaryCard summary={portfolioSummary} />

        {/* View Mode Toggle */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('sector')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'sector'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Sector View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Portfolio Content */}
        {viewMode === 'sector' ? (
          <div className="space-y-4">
            {sectorSummaries.map((sectorSummary) => (
              <div key={sectorSummary.sector}>
                <SectorSummary sectorSummary={sectorSummary} />
                <div className="bg-white border-l border-r border-b border-gray-200 rounded-b-xl">
                  <PortfolioTable 
                    stocks={sectorSummary.stocks} 
                    totalInvestment={portfolioSummary.totalInvestment}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <PortfolioTable 
              stocks={stocks} 
              totalInvestment={portfolioSummary.totalInvestment}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default PortfolioDashboard;