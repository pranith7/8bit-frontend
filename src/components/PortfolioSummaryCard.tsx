import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { PortfolioSummary } from '../types/portfolio';
import { formatCurrency, formatNumber } from '../utils/calculations';

interface PortfolioSummaryCardProps {
  summary: PortfolioSummary;
}

const PortfolioSummaryCard: React.FC<PortfolioSummaryCardProps> = ({ summary }) => {
  const isPositive = summary.totalGainLoss >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalInvestment)}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Present Value</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalPresentValue)}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <PieChart className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(summary.totalGainLoss)}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
            {isPositive ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Return %</p>
            <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{formatNumber(summary.totalGainLossPercentage)}%
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
            {isPositive ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;