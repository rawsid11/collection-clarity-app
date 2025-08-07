import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TrendPoint {
  period: string;
  actual?: number;
  forecast?: number;
  confidence?: number;
  isHistorical: boolean;
}

interface TrendForecastProps {
  title: string;
  data: TrendPoint[];
  metric: string;
  forecastPeriods: number;
}

const TrendForecast = ({ title, data, metric, forecastPeriods }: TrendForecastProps) => {
  const historicalData = data.filter(d => d.isHistorical);
  const forecastData = data.filter(d => !d.isHistorical);
  
  // Calculate trend
  const recentValues = historicalData.slice(-3).map(d => d.actual || 0);
  const trend = recentValues.length >= 2 ? 
    (recentValues[recentValues.length - 1] - recentValues[0]) / recentValues.length : 0;
  
  const trendDirection = trend > 0 ? 'up' : trend < 0 ? 'down' : 'stable';
  const trendPercent = Math.abs(trend);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg border shadow-lg">
          <p className="font-medium">{label}</p>
          {data.actual && (
            <p className="text-sm">
              <span className="text-muted-foreground">Actual:</span> {data.actual.toFixed(1)}%
            </p>
          )}
          {data.forecast && (
            <p className="text-sm">
              <span className="text-muted-foreground">Forecast:</span> {data.forecast.toFixed(1)}%
            </p>
          )}
          {data.confidence && (
            <p className="text-sm">
              <span className="text-muted-foreground">Confidence:</span> {data.confidence.toFixed(0)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {trendDirection === 'up' ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : trendDirection === 'down' ? (
              <TrendingDown className="h-4 w-4 text-destructive" />
            ) : null}
            <span className="text-sm text-muted-foreground">
              {trendDirection === 'stable' ? 'Stable' : `${trendPercent.toFixed(1)}% ${trendDirection}`}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="period" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Historical Line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              
              {/* Forecast Line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 3 }}
                connectNulls={false}
              />
              
              {/* Confidence Band */}
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeOpacity={0.3}
                dot={false}
                connectNulls={false}
              />
              
              {/* Reference line for current period */}
              <ReferenceLine 
                x={historicalData[historicalData.length - 1]?.period} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="2 2" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend and Stats */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-primary"></div>
                <span>Historical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-secondary border-dashed"></div>
                <span>Forecast</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              {forecastPeriods} period forecast
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-2 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold">
                {historicalData[historicalData.length - 1]?.actual?.toFixed(1) || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {forecastData[0]?.forecast?.toFixed(1) || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Next Period</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {forecastData[0]?.confidence?.toFixed(0) || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Confidence</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendForecast;