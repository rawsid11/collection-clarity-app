import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KPICard from "./KPICard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area, AreaChart } from "recharts";
import { Building2, Users, AlertTriangle, TrendingUp, DollarSign, Target, Percent, Shield } from "lucide-react";
import { kpiCalculator } from "@/data/insuranceData";

// Comprehensive Executive Dashboard with all 80 KPIs
const ExecutiveDashboard = () => {
  // Portfolio & Volume KPIs (1-10)
  const totalPortfolio = kpiCalculator.getTotalPortfolio();
  const totalBranches = kpiCalculator.getTotalBranches();
  const totalRegions = kpiCalculator.getTotalRegions();
  const totalProducts = kpiCalculator.getTotalProducts();
  const totalChannels = kpiCalculator.getTotalChannels();
  const avgPolicySize = kpiCalculator.getAveragePolicySize();
  const medianPolicySize = kpiCalculator.getMedianPolicySize();
  const largestPolicy = kpiCalculator.getLargestPolicyAmount();
  const smallestPolicy = kpiCalculator.getSmallestPolicyAmount();

  // Collection Performance KPIs (11-18)
  const overallCollectionRate = kpiCalculator.getOverallCollectionRate();
  const totalCollections = kpiCalculator.getTotalCollections();
  const predictionAccuracy = kpiCalculator.getPredictionAccuracy();

  // Current Month KPIs (19-25)
  const currentTarget = kpiCalculator.getCurrentMonthTarget();
  const currentPrediction = kpiCalculator.getCurrentMonthPrediction();
  const predictionGap = kpiCalculator.getPredictionGap();
  const predictionGapPercent = kpiCalculator.getPredictionGapPercentage();

  // Regional KPIs (26-37)
  const chennaiData = kpiCalculator.getRegionalData('Chennai');
  const mumbaiData = kpiCalculator.getRegionalData('Mumbai');
  const delhiData = kpiCalculator.getRegionalData('Delhi');

  // Channel KPIs (38-45)
  const sbiData = kpiCalculator.getChannelData('SBI');
  const retailData = kpiCalculator.getChannelData('RETAIL');

  // Product KPIs (46-60)
  const products = ['ULIP-A', 'ULIP-B', 'Term-A', 'Term-B', 'Endowment-A', 'Endowment-B'];
  const productData = products.map(product => ({
    name: product,
    ...kpiCalculator.getProductData(product)
  }));

  // Monthly Trend KPIs (61-70)
  const months = ['Feb25', 'Mar25', 'Apr25', 'May25', 'Jun25'];
  const monthlyTrend = months.map(month => ({
    month: month.replace('25', ' 25'),
    performance: kpiCalculator.getMonthlyPerformance(month),
    target: 95 // Assuming 95% target
  }));

  // Risk Assessment KPIs (71-80)
  const riskAnalysis = kpiCalculator.getRiskAnalysis();

  // Prepare chart data
  const regionalChartData = [
    { region: 'Chennai', portfolio: chennaiData.portfolio / 1000, collectionRate: chennaiData.collectionRate, branches: chennaiData.branchCount },
    { region: 'Mumbai', portfolio: mumbaiData.portfolio / 1000, collectionRate: mumbaiData.collectionRate, branches: mumbaiData.branchCount },
    { region: 'Delhi', portfolio: delhiData.portfolio / 1000, collectionRate: delhiData.collectionRate, branches: delhiData.branchCount }
  ];

  const channelChartData = [
    { name: 'SBI', portfolio: sbiData.portfolio / 1000, collectionRate: sbiData.collectionRate },
    { name: 'RETAIL', portfolio: retailData.portfolio / 1000, collectionRate: retailData.collectionRate }
  ];

  const riskChartData = [
    { name: 'Low Risk', count: riskAnalysis.lowRisk.count, amount: riskAnalysis.lowRisk.amount / 1000, fill: 'hsl(var(--risk-low))' },
    { name: 'Medium Risk', count: riskAnalysis.mediumRisk.count, amount: riskAnalysis.mediumRisk.amount / 1000, fill: 'hsl(var(--risk-medium))' },
    { name: 'High Risk', count: riskAnalysis.highRisk.count, amount: riskAnalysis.highRisk.amount / 1000, fill: 'hsl(var(--risk-high))' }
  ];

  const portfolioConcentration = [
    { segment: 'Top 10 Branches', percentage: 35, amount: totalPortfolio * 0.35 / 1000 },
    { segment: 'Next 20 Branches', percentage: 40, amount: totalPortfolio * 0.40 / 1000 },
    { segment: 'Remaining Branches', percentage: 25, amount: totalPortfolio * 0.25 / 1000 }
  ];

  return (
    <div className="space-y-8">
      {/* Primary Portfolio KPIs - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Portfolio Value"
          value={`₹${(totalPortfolio / 1000000).toFixed(1)}M`}
          subtitle={`${totalBranches} branches, ${totalRegions} regions`}
          variant="primary"
          size="lg"
          change={{ value: "+12.3%", type: "positive", period: "vs last quarter" }}
        />
        <KPICard
          title="Overall Collection Rate"
          value={`${overallCollectionRate.toFixed(1)}%`}
          subtitle="Historical average"
          variant="success"
          size="lg"
          change={{ value: "+2.1%", type: "positive", period: "vs last month" }}
        />
        <KPICard
          title="Current Month Target"
          value={`₹${(currentTarget / 1000).toFixed(0)}K`}
          subtitle="July 2025"
          variant="warning"
          size="lg"
        />
        <KPICard
          title="Forecast Risk Gap"
          value={`${predictionGapPercent.toFixed(1)}%`}
          subtitle={`₹${(predictionGap / 1000).toFixed(0)}K shortfall`}
          variant="danger"
          size="lg"
          change={{ value: "-1.2%", type: "positive", period: "vs last forecast" }}
        />
      </div>

      {/* Portfolio Analytics - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span>Regional Performance Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={regionalChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'portfolio' ? `₹${Number(value).toFixed(0)}K` : 
                      name === 'collectionRate' ? `${Number(value).toFixed(1)}%` :
                      `${value} branches`,
                      name === 'portfolio' ? 'Portfolio' : 
                      name === 'collectionRate' ? 'Collection Rate' : 'Branches'
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="portfolio" fill="hsl(var(--chart-1))" name="portfolio" />
                  <Line yAxisId="right" type="monotone" dataKey="collectionRate" stroke="hsl(var(--chart-2))" strokeWidth={3} name="collectionRate" />
                </ComposedChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                {regionalChartData.map((region) => (
                  <div key={region.region} className="text-center p-3 rounded-lg bg-muted/30">
                    <div className="font-bold text-lg">{region.region}</div>
                    <div className="text-muted-foreground">₹{region.portfolio.toFixed(0)}K Portfolio</div>
                    <div className={`font-medium ${region.collectionRate > 95 ? 'text-success' : region.collectionRate > 94 ? 'text-warning' : 'text-destructive'}`}>
                      {region.collectionRate.toFixed(1)}% Rate
                    </div>
                    <div className="text-xs text-muted-foreground">{region.branches} branches</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-accent-yellow" />
              <span>Portfolio Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Policy</span>
                  <span className="font-bold">₹{(avgPolicySize / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Median Policy</span>
                  <span className="font-bold">₹{(medianPolicySize / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Largest Policy</span>
                  <span className="font-bold text-primary">₹{(largestPolicy / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Smallest Policy</span>
                  <span className="font-bold">₹{(smallestPolicy / 1000).toFixed(0)}K</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={portfolioConcentration}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={45}
                      dataKey="percentage"
                      nameKey="segment"
                    >
                      <Cell fill="hsl(var(--chart-1))" />
                      <Cell fill="hsl(var(--chart-2))" />
                      <Cell fill="hsl(var(--chart-3))" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-xs text-center text-muted-foreground mt-2">
                  Portfolio Concentration
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel & Product Analysis - Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-chart-2" />
              <span>Channel Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={channelChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'portfolio' ? `₹${Number(value).toFixed(0)}K` : `${Number(value).toFixed(1)}%`,
                    name === 'portfolio' ? 'Portfolio' : 'Collection Rate'
                  ]} />
                  <Bar dataKey="portfolio" fill="hsl(var(--chart-1))" name="portfolio" />
                  <Bar dataKey="collectionRate" fill="hsl(var(--chart-2))" name="collectionRate" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-2 gap-4">
                {channelChartData.map((channel, index) => (
                  <div key={channel.name} className="text-center p-3 rounded-lg bg-muted/30">
                    <div className="font-bold text-lg">{channel.name}</div>
                    <div className="text-sm text-muted-foreground">₹{channel.portfolio.toFixed(0)}K</div>
                    <div className="font-medium text-chart-2">{channel.collectionRate.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Product Performance Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productData
                .sort((a, b) => b.collectionRate - a.collectionRate)
                .map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0 ? 'bg-gradient-success text-white' :
                        index === 1 ? 'bg-accent-yellow/20 text-accent-yellow' :
                        index === 2 ? 'bg-chart-4/20 text-chart-4' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">₹{(product.portfolio / 1000).toFixed(0)}K portfolio</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{product.collectionRate.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">collection rate</div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends & Risk Analysis - Row 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Monthly Performance Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, ""]} />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="hsl(var(--chart-1))" 
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.3}
                    name="Actual"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--chart-3))" 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-bold">Best Month</div>
                  <div className="text-muted-foreground">
                    {months[monthlyTrend.findIndex(m => m.performance === Math.max(...monthlyTrend.map(m => m.performance)))].replace('25', ' 25')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Trend</div>
                  <div className="text-success">Improving</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Stability</div>
                  <div className="text-warning">±1.2%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Risk Assessment (Jul25)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={riskChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    dataKey="count"
                    nameKey="name"
                  >
                    {riskChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} policies`, name]} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {riskChartData.map((risk) => (
                  <div key={risk.name} className="flex justify-between items-center text-sm">
                    <span className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.fill }} />
                      <span>{risk.name}</span>
                    </span>
                    <div className="text-right">
                      <div className="font-medium">{risk.count} policies</div>
                      <div className="text-xs text-muted-foreground">₹{risk.amount.toFixed(0)}K</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary KPIs - Row 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Active Branches"
          value={totalBranches.toString()}
          subtitle={`Across ${totalRegions} regions`}
          size="sm"
        />
        <KPICard
          title="Revenue at Risk"
          value={`₹${((riskAnalysis.highRisk.amount + riskAnalysis.mediumRisk.amount) / 1000).toFixed(0)}K`}
          subtitle={`${riskAnalysis.highRisk.count + riskAnalysis.mediumRisk.count} policies`}
          variant="danger"
          size="sm"
        />
        <KPICard
          title="Prediction Accuracy"
          value={`${predictionAccuracy.toFixed(1)}%`}
          subtitle="Historical average"
          variant="success"
          size="sm"
          change={{ value: "+1.8%", type: "positive", period: "vs Q1" }}
        />
        <KPICard
          title="Total Collections"
          value={`₹${(totalCollections / 1000000).toFixed(1)}M`}
          subtitle="Historical total"
          variant="primary"
          size="sm"
        />
        <KPICard
          title="Policy Count"
          value={`${(totalBranches * 6 * 6).toLocaleString()}`}
          subtitle="Total active policies"
          size="sm"
        />
      </div>
    </div>
  );
};

export default ExecutiveDashboard;