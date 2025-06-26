import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { SectorSummary as SectorSummaryType } from '../types/portfolio';
import { formatCurrency, formatNumber } from '../utils/calculations';

interface SectorSummaryProps {
  sectorSummary: SectorSummaryType;
}

const SectorSummary: React.FC<SectorSummaryProps> = ({ sectorSummary }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isPositive = sectorSummary.totalGainLoss >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
            <h3 className="text-lg font-semibold text-gray-900">{sectorSummary.sector}</h3>
            <span className="text-sm text-gray-500">({sectorSummary.stocks.length} stocks)</span>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <p className="text-sm text-gray-500">Investment</p>
              <p className="font-semibold">{formatCurrency(sectorSummary.totalInvestment)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Present Value</p>
              <p className="font-semibold">{formatCurrency(sectorSummary.totalPresentValue)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-gray-500">Gain/Loss</p>
                <p className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(sectorSummary.totalGainLoss)}
                </p>
              </div>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-0">
          {/* This will be where the PortfolioTable component renders the stocks */}
        </div>
      )}
    </div>
  );
};

export default SectorSummary;