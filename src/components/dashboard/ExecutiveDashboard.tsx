import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KPICard from "./KPICard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Building2, Users, AlertTriangle, TrendingUp } from "lucide-react";

// Mock data - in real app this would come from APIs
const regionalData = [
  { region: "Chennai", collectionRate: 95.1, portfolio: 850000, riskGap: 4.2 },
  { region: "Mumbai", collectionRate: 96.3, portfolio: 950000, riskGap: 3.1 },
  { region: "Delhi", collectionRate: 94.8, portfolio: 720000, riskGap: 5.4 }
];

const channelData = [
  { channel: "SBI", volume: 1200000, collectionRate: 95.8, policies: 2450 },
  { channel: "RETAIL", volume: 1320000, collectionRate: 94.9, policies: 3280 }
];

const productData = [
  { name: "ULIP-A", revenue: 580000, performance: 96.2, risk: "Low" },
  { name: "ULIP-B", revenue: 420000, performance: 94.1, risk: "Medium" },
  { name: "Term-A", revenue: 380000, performance: 97.3, risk: "Low" },
  { name: "Term-B", revenue: 290000, performance: 93.8, risk: "Medium" },
  { name: "Endow-A", revenue: 480000, performance: 95.6, risk: "Low" },
  { name: "Endow-B", revenue: 370000, performance: 92.4, risk: "High" }
];

const riskDistribution = [
  { name: "Low Risk", value: 68, amount: 1750000, color: "hsl(var(--kpi-low-risk))" },
  { name: "Medium Risk", value: 22, amount: 580000, color: "hsl(var(--kpi-medium-risk))" },
  { name: "High Risk", value: 10, amount: 190000, color: "hsl(var(--kpi-high-risk))" }
];

const monthlyTrend = [
  { month: "Jan", collection: 420000, target: 450000 },
  { month: "Feb", collection: 445000, target: 460000 },
  { month: "Mar", collection: 465000, target: 470000 },
  { month: "Apr", collection: 448000, target: 465000 },
  { month: "May", collection: 472000, target: 475000 },
  { month: "Jun", collection: 458000, target: 480000 },
  { month: "Jul", collection: 0, target: 485000 }
];

const ExecutiveDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Primary KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Portfolio Value"
          value="₹2.3M+"
          subtitle="All regions & channels"
          variant="primary"
          size="lg"
          change={{ value: "+12.3%", type: "positive", period: "last quarter" }}
        />
        <KPICard
          title="Collection Efficiency"
          value="95.2%"
          subtitle="Historical average"
          variant="success"
          size="lg"
          change={{ value: "+2.1%", type: "positive", period: "last month" }}
        />
        <KPICard
          title="Current Month Target"
          value="₹485K"
          subtitle="July 2025"
          variant="warning"
          size="lg"
          change={{ value: "In Progress", type: "neutral" }}
        />
        <KPICard
          title="Forecast Risk Gap"
          value="8.5%"
          subtitle="Prediction shortfall"
          variant="danger"
          size="lg"
          change={{ value: "-1.2%", type: "positive", period: "last forecast" }}
        />
      </div>

      {/* Analysis Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span>Regional Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Collection Rate"]} />
                  <Bar dataKey="collectionRate" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {regionalData.map((region) => (
                  <div key={region.region} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{region.region}</span>
                    <div className="flex space-x-4">
                      <span className="text-muted-foreground">₹{(region.portfolio / 1000).toFixed(0)}K</span>
                      <span className={`font-medium ${region.riskGap > 4 ? 'text-kpi-negative' : 'text-kpi-positive'}`}>
                        {region.riskGap}% gap
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Channel Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-chart-2" />
              <span>Channel Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="volume"
                    nameKey="channel"
                  >
                    <Cell fill="hsl(var(--chart-1))" />
                    <Cell fill="hsl(var(--chart-2))" />
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, "Volume"]} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {channelData.map((channel, index) => (
                  <div key={channel.channel} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-chart-1' : 'bg-chart-2'}`} />
                        <span>{channel.channel}</span>
                      </span>
                      <span className="text-sm text-muted-foreground">{channel.collectionRate}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>₹{(channel.volume / 1000).toFixed(0)}K volume</span>
                      <span>{channel.policies} policies</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Portfolio */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Product Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productData
                .sort((a, b) => b.revenue - a.revenue)
                .map((product, index) => (
                  <div key={product.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{product.name}</span>
                      <span className="text-xs text-muted-foreground">₹{(product.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">{product.performance}% performance</span>
                      <span className={`px-2 py-1 rounded-full ${
                        product.risk === "Low" ? "bg-success/10 text-kpi-positive" :
                        product.risk === "Medium" ? "bg-warning/10 text-kpi-medium-risk" :
                        "bg-danger/10 text-kpi-negative"
                      }`}>
                        {product.risk}
                      </span>
                    </div>
                    {index < productData.length - 1 && <div className="border-b" />}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk & Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span>Risk Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    dataKey="value"
                    nameKey="name"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Distribution"]} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {riskDistribution.map((risk) => (
                  <div key={risk.name} className="flex justify-between items-center text-sm">
                    <span className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }} />
                      <span>{risk.name}</span>
                    </span>
                    <div className="text-right">
                      <div className="font-medium">{risk.value}%</div>
                      <div className="text-xs text-muted-foreground">₹{(risk.amount / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                <Line 
                  type="monotone" 
                  dataKey="collection" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  name="Collection"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--chart-3))" 
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="space-y-4">
          <KPICard
            title="Active Branches"
            value="58"
            subtitle="Across 3 regions"
            size="sm"
          />
          <KPICard
            title="Revenue at Risk"
            value="₹190K"
            subtitle="High risk policies"
            variant="danger"
            size="sm"
            change={{ value: "-5.2%", type: "positive", period: "last month" }}
          />
          <KPICard
            title="Prediction Accuracy"
            value="94.3%"
            subtitle="Historical average"
            variant="success"
            size="sm"
            change={{ value: "+1.8%", type: "positive", period: "last quarter" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;