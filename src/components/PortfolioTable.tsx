import React, { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types/portfolio';
import { formatCurrency, formatNumber } from '../utils/calculations';

interface PortfolioTableProps {
  stocks: Stock[];
  totalInvestment: number;
  className?: string;
}

const PortfolioTable: React.FC<PortfolioTableProps> = memo(({ stocks, totalInvestment, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Particulars
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Purchase Price
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Qty
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Investment
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Portfolio %
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exchange
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              CMP
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Present Value
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gain/Loss
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              P/E Ratio
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Latest Earnings
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stage2
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Abhishek
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock, index) => {
            const isPositive = stock.gainLoss >= 0;
            const isSold = stock.salePrice !== null;

            return (
              <tr 
                key={`${stock.no}-${stock.particulars}`} 
                className={`hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                } ${isSold ? 'opacity-60' : ''}`}
              >
                <td className="px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{stock.particulars}</div>
                    <div className="text-xs text-gray-500">{stock.symbol}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-900">
                  {formatCurrency(stock.purchasePrice)}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-900">
                  {formatNumber(stock.quantity, 0)}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                  {formatCurrency(stock.investment)}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-900">
                  {formatNumber(stock.portfolioPercentage)}%
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {stock.exchange}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                  {stock.cmp ? formatCurrency(stock.cmp) : 'N/A'}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                  {formatCurrency(stock.presentValue)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <div className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(stock.gainLoss)}
                    </div>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    ({isPositive ? '+' : ''}{formatNumber(stock.gainLossPercentage)}%)
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-900">
                  {stock.peRatio || 'N/A'}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-900">
                  {stock.latestEarnings || 'N/A'}
                </td>
                <td className="px-4 py-3 text-center">
                  {stock.stage2 && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      stock.stage2 === 'Yes' ? 'bg-green-100 text-green-800' :
                      stock.stage2 === 'No' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {stock.stage2}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {stock.abhishek && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      stock.abhishek.includes('Exit') ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {stock.abhishek}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

PortfolioTable.displayName = 'PortfolioTable';

export default PortfolioTable;