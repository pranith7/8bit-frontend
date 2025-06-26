# Portfolio Dashboard

A real-time portfolio dashboard that displays stock holdings organized by sectors, with live data updates from Yahoo Finance and Google Finance.

## Features

- **Real-time Data**: Fetches live stock prices from Yahoo Finance API
- **Sector-wise Organization**: Stocks are grouped by sectors (Financial, Tech, Consumer, Power, Pipe, Others)
- **Live Updates**: Data refreshes automatically every 15 seconds
- **Dual Views**: Toggle between sector view and table view
- **Financial Metrics**: Displays P/E ratios, earnings, and other key metrics
- **Performance Tracking**: Shows gain/loss calculations and percentages
- **Manual Refresh**: Manual refresh button for immediate updates

## Tech Stack

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **Yahoo Finance API** for stock prices
- **Google Finance** web scraping for P/E ratios
- **Redis** for caching
- **CORS** enabled for frontend communication

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Redis server (optional, will use localhost if not configured)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (optional):
   ```env
   PORT=3001
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will start on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173`

## Data Sources

### Stock Prices
- **Yahoo Finance API**: Real-time stock prices for Indian stocks
- **Fallback**: Static CMP values when live data is unavailable

### Financial Metrics
- **Google Finance**: P/E ratios and earnings data
- **Backend Calculations**: Portfolio percentages, gain/loss calculations

## Portfolio Structure

The portfolio includes stocks from various sectors:

- **Financial Sector**: HDFC Bank, Bajaj Finance, ICICI Bank, Bajaj Housing, Savani Financials
- **Tech Sector**: Affle India, LTI Mindtree, KPIT Tech, Tata Tech, BLS E-Services, Tanla
- **Consumer Sector**: Dmart, Tata Consumer, Pidilite
- **Power Sector**: Tata Power, KPI Green, Suzlon, Gensol
- **Pipe Sector**: Hariom Pipes, Astral, Polycab
- **Others**: Clean Science, Deepak Nitrite, Fine Organic, Gravita, SBI Life

## Update Frequency

- **Automatic Updates**: Every 15 seconds
- **Manual Updates**: Click the refresh button in the header
- **Visual Indicators**: Countdown timer shows time until next update

## API Endpoints

- `GET /api/portfolio` - Get portfolio data with live prices
- `GET /health` - Health check endpoint

## Error Handling

- Graceful fallback to static data when APIs are unavailable
- Error banners display when data fetching fails
- Retry functionality for failed requests

## Development Notes

- The backend uses web scraping for Google Finance data
- Stock prices are cached for 60 seconds to reduce API calls
- CORS is enabled for local development
- Rate limiting is implemented to prevent API abuse

## Troubleshooting

1. **Backend not starting**: Check if port 3001 is available
2. **No data loading**: Ensure the backend is running and accessible
3. **Redis connection issues**: The app will work without Redis, just with reduced caching
4. **API rate limits**: The app includes rate limiting and fallback mechanisms

## Production Considerations

- Set up proper Redis configuration
- Implement proper error monitoring
- Consider using paid API services for production use
- Set up proper CORS configuration for production domains
- Implement user authentication if needed 