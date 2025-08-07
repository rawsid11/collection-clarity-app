import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronRight, Home } from "lucide-react";
import { useState } from "react";

interface DrilldownLevel {
  name: string;
  value: number;
  collectionRate: number;
  children?: DrilldownLevel[];
}

interface DrillDownChartProps {
  title: string;
  data: DrilldownLevel[];
  levels: string[];
}

const DrillDownChart = ({ title, data, levels }: DrillDownChartProps) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState(data);

  const handleDrillDown = (item: DrilldownLevel) => {
    if (item.children && item.children.length > 0) {
      setCurrentLevel(currentLevel + 1);
      setCurrentPath([...currentPath, item.name]);
      setCurrentData(item.children);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      // Reset to root
      setCurrentLevel(0);
      setCurrentPath([]);
      setCurrentData(data);
    } else {
      // Navigate to specific level
      let targetData = data;
      const targetPath = currentPath.slice(0, index + 1);
      
      for (const pathItem of targetPath) {
        const found = targetData.find(item => item.name === pathItem);
        if (found && found.children) {
          targetData = found.children;
        }
      }
      
      setCurrentLevel(index + 1);
      setCurrentPath(targetPath);
      setCurrentData(targetData);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg border shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-muted-foreground">Portfolio:</span> ₹{(data.value / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Collection Rate:</span> {data.collectionRate.toFixed(1)}%
          </p>
          {data.children && (
            <p className="text-xs text-muted-foreground mt-1">
              Click to drill down ({data.children.length} items)
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
          <div className="text-sm text-muted-foreground">
            Level: {levels[currentLevel] || 'Unknown'}
          </div>
        </div>
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1 text-sm">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2"
            onClick={() => handleBreadcrumbClick(-1)}
          >
            <Home className="h-3 w-3" />
          </Button>
          
          {currentPath.map((path, index) => (
            <div key={index} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-muted-foreground hover:text-foreground"
                onClick={() => handleBreadcrumbClick(index)}
              >
                {path}
              </Button>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              onClick={(data) => {
                if (data && data.activePayload) {
                  handleDrillDown(data.activePayload[0].payload);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                yAxisId="portfolio"
                orientation="left"
                tickFormatter={(value) => `₹${(value / 1000000).toFixed(0)}M`}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                yAxisId="rate"
                orientation="right"
                tickFormatter={(value) => `${value.toFixed(0)}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Bar
                yAxisId="portfolio"
                dataKey="value"
                fill="hsl(var(--primary))"
                cursor="pointer"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                yAxisId="rate"
                dataKey="collectionRate"
                fill="hsl(var(--secondary))"
                cursor="pointer"
                radius={[2, 2, 0, 0]}
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Statistics */}
        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold">
              {currentData.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {levels[currentLevel] || 'Items'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              ₹{(currentData.reduce((sum, item) => sum + item.value, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Total Portfolio</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {(currentData.reduce((sum, item) => sum + item.collectionRate, 0) / currentData.length).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Avg Collection Rate</div>
          </div>
        </div>
        
        {currentLevel < levels.length - 1 && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Click on bars to drill down to {levels[currentLevel + 1]}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DrillDownChart;