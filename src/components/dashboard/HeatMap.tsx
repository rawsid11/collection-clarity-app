import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { useState } from "react";

interface HeatMapData {
  row: string;
  col: string;
  value: number;
  displayValue?: string;
}

interface HeatMapProps {
  title: string;
  data: HeatMapData[];
  rowLabel: string;
  colLabel: string;
  onCellClick?: (row: string, col: string) => void;
}

const HeatMap = ({ title, data, rowLabel, colLabel, onCellClick }: HeatMapProps) => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Get unique rows and columns
  const rows = Array.from(new Set(data.map(d => d.row))).sort();
  const cols = Array.from(new Set(data.map(d => d.col))).sort();
  
  // Create data matrix
  const matrix = rows.map(row => 
    cols.map(col => {
      const cell = data.find(d => d.row === row && d.col === col);
      return cell || { row, col, value: 0 };
    })
  );

  // Get min/max for color scaling
  const values = data.map(d => d.value).filter(v => v > 0);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Color intensity based on value
  const getIntensity = (value: number) => {
    if (value === 0) return 0;
    return (value - minValue) / (maxValue - minValue);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <div className="grid gap-1 p-4" style={{ 
            gridTemplateColumns: `auto repeat(${cols.length}, 1fr)`,
            minWidth: `${(cols.length + 1) * 100}px`
          }}>
            {/* Header */}
            <div className="text-sm font-medium text-muted-foreground p-2"></div>
            {cols.map(col => (
              <div key={col} className="text-xs font-medium text-center p-2 text-muted-foreground">
                {col}
              </div>
            ))}
            
            {/* Rows */}
            {matrix.map((row, rowIndex) => (
              <div key={rows[rowIndex]} className="contents">
                <div className="text-xs font-medium p-2 text-muted-foreground">
                  {rows[rowIndex]}
                </div>
                {row.map((cell, colIndex) => {
                  const intensity = getIntensity(cell.value);
                  const cellKey = `${cell.row}-${cell.col}`;
                  
                  return (
                    <div
                      key={cellKey}
                      className="relative h-12 w-full border border-border/50 cursor-pointer hover:border-primary/50 transition-all duration-200"
                      style={{
                        backgroundColor: intensity > 0 ? `hsl(var(--primary) / ${0.1 + intensity * 0.7})` : 'hsl(var(--muted))'
                      }}
                      onClick={() => onCellClick?.(cell.row, cell.col)}
                      onMouseEnter={() => setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {cell.displayValue || (cell.value > 0 ? cell.value.toFixed(1) : '')}
                        </span>
                      </div>
                      
                      {hoveredCell === cellKey && (
                        <div className="absolute z-10 -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg border">
                          {cell.row} × {cell.col}: {cell.value.toFixed(2)}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>{rowLabel}</span>
          <div className="flex items-center gap-2">
            <span>Low</span>
            <div className="flex h-3 w-20 rounded">
              {[0, 0.25, 0.5, 0.75, 1].map(intensity => (
                <div 
                  key={intensity}
                  className="flex-1"
                  style={{ backgroundColor: `hsl(var(--primary) / ${0.1 + intensity * 0.7})` }}
                />
              ))}
            </div>
            <span>High</span>
          </div>
          <span>{colLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatMap;