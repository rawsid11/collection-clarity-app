import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, RotateCcw, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterOptions {
  regions: string[];
  channels: string[];
  products: string[];
  branches: string[];
}

interface AdvancedFiltersProps {
  options: FilterOptions;
  onFiltersChange: (filters: any) => void;
  onExport?: (format: 'pdf' | 'excel') => void;
}

const AdvancedFilters = ({ options, onFiltersChange, onExport }: AdvancedFiltersProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = () => {
    const filters = {
      region: selectedRegion === 'all' ? null : selectedRegion,
      channel: selectedChannel === 'all' ? null : selectedChannel,
      product: selectedProduct === 'all' ? null : selectedProduct,
      branch: selectedBranch === 'all' ? null : selectedBranch,
      dateFrom,
      dateTo
    };
    onFiltersChange(filters);
  };

  const resetFilters = () => {
    setSelectedRegion('all');
    setSelectedChannel('all');
    setSelectedProduct('all');
    setSelectedBranch('all');
    setDateFrom(undefined);
    setDateTo(undefined);
    onFiltersChange({
      region: null,
      channel: null,
      product: null,
      branch: null,
      dateFrom: null,
      dateTo: null
    });
  };

  const availableBranches = selectedRegion === 'all' ? 
    options.branches : 
    options.branches.filter(branch => branch.includes(selectedRegion));

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {options.regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Channel</label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  {options.channels.map(channel => (
                    <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Product</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {options.products.map(product => (
                    <SelectItem key={product} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Branch</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {availableBranches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button onClick={handleFilterChange} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Apply Filters
            </Button>
            
            {onExport && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Export:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport('pdf')}
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport('excel')}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Excel
                </Button>
              </div>
            )}
          </div>

          {/* Applied Filters Summary */}
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Active filters:</span>
            {[
              selectedRegion !== 'all' && `Region: ${selectedRegion}`,
              selectedChannel !== 'all' && `Channel: ${selectedChannel}`,
              selectedProduct !== 'all' && `Product: ${selectedProduct}`,
              selectedBranch !== 'all' && `Branch: ${selectedBranch}`,
              dateFrom && `From: ${format(dateFrom, "MMM dd")}`,
              dateTo && `To: ${format(dateTo, "MMM dd")}`
            ].filter(Boolean).join(' • ') || 'None'}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AdvancedFilters;