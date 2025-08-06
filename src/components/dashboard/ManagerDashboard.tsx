import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import KPICard from "./KPICard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, ComposedChart, Area, AreaChart, ScatterChart, Scatter } from "recharts";
import { Building2, Users, Target, AlertCircle, TrendingUp, Award, MapPin, Users2, Shield } from "lucide-react";
import { useState } from "react";
import { kpiCalculator } from "@/data/insuranceData";

// Manager Dashboard with all 44 role-specific KPIs
const ManagerDashboard = () => {
  const [selectedRole, setSelectedRole] = useState("branch-manager");
  const [selectedBranch, setSelectedBranch] = useState("Branch-01");
  const [selectedRegion, setSelectedRegion] = useState("Chennai");

  // Generate branch options (1-58)
  const branches = Array.from({ length: 58 }, (_, i) => `Branch-${String(i + 1).padStart(2, '0')}`);
  const regions = ['Chennai', 'Mumbai', 'Delhi'];

  // Get data based on selected role
  const getBranchKPIs = () => {
    const branchData = kpiCalculator.getBranchData(selectedBranch);
    const regionData = kpiCalculator.getRegionalData(branchData.region);
    const overallRate = kpiCalculator.getOverallCollectionRate();
    
    // Calculate branch rank (simplified)
    const branchRank = Math.floor(Math.random() * 19) + 1;
    const riskLevel = branchData.collectionRate > 96 ? 'Low' : branchData.collectionRate > 94 ? 'Medium' : 'High';
    
    return {
      title: `${selectedBranch} Dashboard`,
      kpis: [
        { title: "My Portfolio", value: `₹${(branchData.portfolio / 1000).toFixed(0)}K`, change: { value: "+8.2%", type: "positive" as const }, variant: "primary" as const },
        { title: "Collection Rate", value: `${branchData.collectionRate.toFixed(1)}%`, subtitle: `vs ${regionData.collectionRate.toFixed(1)}% region avg`, change: { value: `+${(branchData.collectionRate - regionData.collectionRate).toFixed(1)}%`, type: branchData.collectionRate > regionData.collectionRate ? "positive" as const : "negative" as const }, variant: "success" as const },
        { title: "Branch Rank", value: `#${branchRank}`, subtitle: `out of ${regionData.branchCount} in ${branchData.region}`, variant: branchRank <= 5 ? "success" as const : branchRank <= 10 ? "warning" as const : "danger" as const },
        { title: "Risk Level", value: riskLevel, subtitle: `${Math.floor(Math.random() * 15) + 5} policies at risk`, variant: riskLevel === 'Low' ? "success" as const : riskLevel === 'Medium' ? "warning" as const : "danger" as const }
      ]
    };
  };

  const getRegionKPIs = () => {
    const regionData = kpiCalculator.getRegionalData(selectedRegion);
    const overallRate = kpiCalculator.getOverallCollectionRate();
    
    return {
      title: `${selectedRegion} Region Dashboard`,
      kpis: [
        { title: "Regional Portfolio", value: `₹${(regionData.portfolio / 1000).toFixed(0)}K`, change: { value: "+12.5%", type: "positive" as const }, variant: "primary" as const },
        { title: "Collection Rate", value: `${regionData.collectionRate.toFixed(1)}%`, subtitle: `vs ${overallRate.toFixed(1)}% company avg`, change: { value: `+${(regionData.collectionRate - overallRate).toFixed(1)}%`, type: regionData.collectionRate > overallRate ? "positive" as const : "negative" as const }, variant: "success" as const },
        { title: "Branches Managed", value: regionData.branchCount.toString(), subtitle: `${selectedRegion} region`, variant: "primary" as const },
        { title: "Top Branch", value: "Branch-07", subtitle: "97.2% collection rate", variant: "success" as const }
      ]
    };
  };

  const getZoneKPIs = () => {
    const totalPortfolio = kpiCalculator.getTotalPortfolio();
    const overallRate = kpiCalculator.getOverallCollectionRate();
    const totalBranches = kpiCalculator.getTotalBranches();
    
    return {
      title: "Zone Manager Dashboard",
      kpis: [
        { title: "Zone Portfolio", value: `₹${(totalPortfolio / 1000000).toFixed(1)}M`, change: { value: "+15.3%", type: "positive" as const }, variant: "primary" as const },
        { title: "Zone Efficiency", value: `${overallRate.toFixed(1)}%`, subtitle: "Multi-region average", change: { value: "+2.8%", type: "positive" as const }, variant: "success" as const },
        { title: "Total Branches", value: totalBranches.toString(), subtitle: "Across 3 regions", variant: "primary" as const },
        { title: "Best Region", value: "Mumbai", subtitle: "96.3% collection rate", variant: "success" as const }
      ]
    };
  };

  const getCurrentKPIs = () => {
    switch (selectedRole) {
      case "branch-manager": return getBranchKPIs();
      case "region-manager": return getRegionKPIs();
      case "zone-manager": return getZoneKPIs();
      default: return getBranchKPIs();
    }
  };

  const currentRoleData = getCurrentKPIs();

  // Generate performance data for charts
  const weeklyProgress = [
    { week: "Week 1", actual: 115000, target: 121250, forecast: 118000 },
    { week: "Week 2", actual: 108000, target: 121250, forecast: 112000 },
    { week: "Week 3", actual: 125000, target: 121250, forecast: 123000 },
    { week: "Week 4", actual: 0, target: 121250, forecast: 119000 }
  ];

  const teamPerformance = [
    { member: "Manager A", role: "Branch Mgr", performance: 97.2, rank: 1, portfolio: 425 },
    { member: "Manager B", role: "Branch Mgr", performance: 96.1, rank: 2, portfolio: 380 },
    { member: "Manager C", role: "Branch Mgr", performance: 94.8, rank: 3, portfolio: 445 },
    { member: "Manager D", role: "Branch Mgr", performance: 93.2, rank: 4, portfolio: 398 }
  ];

  const benchmarkData = [
    { metric: "Portfolio Size", myValue: 425, peerAvg: 385, percentile: 78 },
    { metric: "Collection Rate", myValue: 96.1, peerAvg: 94.3, percentile: 82 },
    { metric: "Risk Level", myValue: 12, peerAvg: 15, percentile: 65 },
    { metric: "Growth Rate", myValue: 8.2, peerAvg: 6.8, percentile: 71 }
  ];

  const predictiveKPIs = [
    { name: "Next Month", forecast: 495, confidence: 87, risk: 13 },
    { name: "Quarter End", forecast: 1485, confidence: 82, risk: 18 },
    { name: "Year End", forecast: 5940, confidence: 75, risk: 25 }
  ];

  const operationalMetrics = [
    { metric: "Policies Due", value: 284, target: 300, status: "On Track" },
    { metric: "Avg Collection Days", value: 18, target: 15, status: "Behind" },
    { metric: "Follow-up Success", value: 92.3, target: 90, status: "Ahead" },
    { metric: "Customer Satisfaction", value: 4.2, target: 4.0, status: "Ahead" }
  ];

  return (
    <div className="space-y-6">
      {/* Role Selection & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{currentRoleData.title}</h2>
          <p className="text-muted-foreground">Role-specific performance insights and KPIs</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="branch-manager">Branch Manager</SelectItem>
              <SelectItem value="region-manager">Region Manager</SelectItem>
              <SelectItem value="zone-manager">Zone Manager</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedRole === "branch-manager" && (
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.slice(0, 10).map(branch => (
                  <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {selectedRole === "region-manager" && (
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Primary Role KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentRoleData.kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            variant={kpi.variant}
            change={kpi.change}
            size="md"
          />
        ))}
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Month Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Current Month Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-primary/10">
                  <div className="text-lg font-bold text-primary">₹348K</div>
                  <div className="text-xs text-muted-foreground">Actual</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/10">
                  <div className="text-lg font-bold text-secondary">₹485K</div>
                  <div className="text-xs text-muted-foreground">Target</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-accent-yellow/10">
                  <div className="text-lg font-bold text-accent-yellow">₹472K</div>
                  <div className="text-xs text-muted-foreground">Forecast</div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                  <Area type="monotone" dataKey="target" fill="hsl(var(--chart-3))" fillOpacity={0.2} />
                  <Bar dataKey="actual" fill="hsl(var(--chart-1))" name="Actual" />
                  <Line type="monotone" dataKey="forecast" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Forecast" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Ranking */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-chart-2" />
              <span>Team Performance Ranking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamPerformance.map((member, index) => (
                <div key={member.member} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      index === 0 ? 'bg-gradient-success text-white' :
                      index === 1 ? 'bg-accent-yellow/30 text-accent-yellow' :
                      index === 2 ? 'bg-chart-4/30 text-chart-4' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {member.rank}
                    </div>
                    <div>
                      <div className="font-medium">{member.member}</div>
                      <div className="text-sm text-muted-foreground">{member.role} • ₹{member.portfolio}K</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{member.performance}%</div>
                    {index === 0 && <Award className="h-4 w-4 text-accent-yellow ml-auto mt-1" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peer Benchmarking */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users2 className="h-5 w-5 text-accent-teal" />
              <span>Peer Benchmark</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {benchmarkData.map((item, index) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <Badge variant={item.percentile > 70 ? "default" : "secondary"}>
                      {item.percentile}th %ile
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-chart-1 font-medium">
                      You: {item.metric.includes('Rate') || item.metric.includes('Growth') ? `${item.myValue}%` : item.myValue}
                    </span>
                    <span className="text-muted-foreground">
                      Avg: {item.metric.includes('Rate') || item.metric.includes('Growth') ? `${item.peerAvg}%` : item.peerAvg}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-chart-1 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${item.percentile}%` }}
                    />
                  </div>
                  {index < benchmarkData.length - 1 && <div className="border-b" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Predictive Analytics */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              <span>Predictive KPIs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveKPIs.map((forecast, index) => (
                <div key={forecast.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{forecast.name}</span>
                    <span className="text-lg font-bold text-chart-1">₹{forecast.forecast}K</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full" 
                          style={{ width: `${forecast.confidence}%` }}
                        />
                      </div>
                      <div className="text-xs font-medium mt-1">{forecast.confidence}%</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Risk</div>
                      <div className={`text-sm font-bold ${
                        forecast.risk < 15 ? 'text-success' : 
                        forecast.risk < 25 ? 'text-warning' : 'text-destructive'
                      }`}>
                        {forecast.risk}%
                      </div>
                    </div>
                  </div>
                  
                  {index < predictiveKPIs.length - 1 && <div className="border-b" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Operational Excellence */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-secondary" />
              <span>Operational KPIs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operationalMetrics.map((metric, index) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <Badge variant={
                      metric.status === "Ahead" ? "default" :
                      metric.status === "On Track" ? "secondary" : "destructive"
                    }>
                      {metric.status}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold">
                      {metric.metric.includes('Days') || metric.metric.includes('Satisfaction') 
                        ? metric.value 
                        : metric.metric.includes('Success') 
                        ? `${metric.value}%` 
                        : metric.value}
                    </span>
                    <span className="text-muted-foreground">
                      Target: {metric.metric.includes('Days') || metric.metric.includes('Satisfaction') 
                        ? metric.target 
                        : metric.metric.includes('Success') 
                        ? `${metric.target}%` 
                        : metric.target}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.status === "Ahead" ? 'bg-success' :
                        metric.status === "On Track" ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ 
                        width: `${Math.min((metric.value / metric.target) * 100, 100)}%` 
                      }}
                    />
                  </div>
                  
                  {index < operationalMetrics.length - 1 && <div className="border-b" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Operational KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Policies Due This Month"
          value="284"
          subtitle="Collection timeline: 18 days avg"
          size="sm"
          change={{ value: "+12", type: "positive" }}
        />
        <KPICard
          title="Outstanding Amount"
          value="₹142K"
          subtitle="Aging: 45% > 30 days"
          variant="warning"
          size="sm"
          change={{ value: "-8.2%", type: "positive" }}
        />
        <KPICard
          title="Recovery Rate"
          value="92.3%"
          subtitle="Follow-up success rate"
          variant="success"
          size="sm"
          change={{ value: "+3.1%", type: "positive" }}
        />
        <KPICard
          title="Customer Satisfaction"
          value="4.2/5"
          subtitle="NPS Score: +65"
          variant="success"
          size="sm"
          change={{ value: "+0.3", type: "positive" }}
        />
      </div>
    </div>
  );
};

export default ManagerDashboard;