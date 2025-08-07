import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface RadarDataPoint {
  metric: string;
  entity1: number;
  entity2: number;
  fullMark: number;
}

interface RadarComparisonProps {
  title: string;
  data: RadarDataPoint[];
  entities: { id: string; name: string; color: string }[];
  onEntityChange?: (entity1: string, entity2: string) => void;
}

const RadarComparison = ({ title, data, entities, onEntityChange }: RadarComparisonProps) => {
  const [selectedEntity1, setSelectedEntity1] = useState(entities[0]?.id || '');
  const [selectedEntity2, setSelectedEntity2] = useState(entities[1]?.id || '');

  const handleEntity1Change = (value: string) => {
    setSelectedEntity1(value);
    onEntityChange?.(value, selectedEntity2);
  };

  const handleEntity2Change = (value: string) => {
    setSelectedEntity2(value);
    onEntityChange?.(selectedEntity1, value);
  };

  const entity1Data = entities.find(e => e.id === selectedEntity1);
  const entity2Data = entities.find(e => e.id === selectedEntity2);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg border shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Compare:</span>
            <Select value={selectedEntity1} onValueChange={handleEntity1Change}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {entities.map(entity => (
                  <SelectItem key={entity.id} value={entity.id}>
                    {entity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <span className="text-muted-foreground">vs</span>
          
          <Select value={selectedEntity2} onValueChange={handleEntity2Change}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {entities.map(entity => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="metric" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                className="text-xs"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                tickFormatter={(value) => `${value}%`}
              />
              
              <Radar
                name={entity1Data?.name || 'Entity 1'}
                dataKey="entity1"
                stroke={entity1Data?.color || 'hsl(var(--primary))'}
                fill={entity1Data?.color || 'hsl(var(--primary))'}
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{ r: 4, fill: entity1Data?.color || 'hsl(var(--primary))' }}
              />
              
              <Radar
                name={entity2Data?.name || 'Entity 2'}
                dataKey="entity2"
                stroke={entity2Data?.color || 'hsl(var(--secondary))'}
                fill={entity2Data?.color || 'hsl(var(--secondary))'}
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{ r: 4, fill: entity2Data?.color || 'hsl(var(--secondary))' }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Performance Summary */}
        <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <h4 className="font-medium text-sm" style={{ color: entity1Data?.color }}>
              {entity1Data?.name}
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Avg Score:</span>
                <span className="font-medium">
                  {(data.reduce((sum, d) => sum + d.entity1, 0) / data.length).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Best Metric:</span>
                <span className="font-medium">
                  {data.reduce((max, d) => d.entity1 > max.entity1 ? d : max).metric}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm" style={{ color: entity2Data?.color }}>
              {entity2Data?.name}
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Avg Score:</span>
                <span className="font-medium">
                  {(data.reduce((sum, d) => sum + d.entity2, 0) / data.length).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Best Metric:</span>
                <span className="font-medium">
                  {data.reduce((max, d) => d.entity2 > max.entity2 ? d : max).metric}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadarComparison;