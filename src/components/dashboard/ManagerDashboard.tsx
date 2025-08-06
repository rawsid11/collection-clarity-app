import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import KPICard from "./KPICard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar } from "recharts";
import { Building2, Users, Target, AlertCircle, TrendingUp, Award } from "lucide-react";
import { useState } from "react";

// Mock data for different manager roles
const roleData = {
  "branch-manager": {
    title: "Branch Manager Dashboard",
    kpis: [
      { title: "My Branch Portfolio", value: "₹425K", change: { value: "+8.2%", type: "positive" as const }, variant: "primary" as const },
      { title: "Collection Rate", value: "96.1%", subtitle: "vs 94.5% target", change: { value: "+1.6%", type: "positive" as const }, variant: "success" as const },
      { title: "Branch Rank", value: "#3", subtitle: "out of 19 in region", variant: "warning" as const },
      { title: "Risk Level", value: "Medium", subtitle: "12 high-risk policies", variant: "danger" as const }
    ]
  },
  "region-manager": {
    title: "Region Manager Dashboard",
    kpis: [
      { title: "Regional Portfolio", value: "₹850K", change: { value: "+12.5%", type: "positive" as const }, variant: "primary" as const },
      { title: "Regional Collection", value: "95.1%", subtitle: "vs 94.8% company avg", change: { value: "+0.3%", type: "positive" as const }, variant: "success" as const },
      { title: "Branches Managed", value: "19", subtitle: "Chennai region", variant: "info" as const },
      { title: "Top Performer", value: "Branch-07", subtitle: "97.2% collection rate", variant: "success" as const }
    ]
  },
  "zone-manager": {
    title: "Zone Manager Dashboard", 
    kpis: [
      { title: "Zone Portfolio", value: "₹2.1M", change: { value: "+15.3%", type: "positive" as const }, variant: "primary" as const },
      { title: "Zone Efficiency", value: "95.4%", subtitle: "Multi-region average", change: { value: "+2.8%", type: "positive" as const }, variant: "success" as const },
      { title: "Total Branches", value: "52", subtitle: "Across 3 regions", variant: "info" as const },
      { title: "Best Region", value: "Mumbai", subtitle: "96.3% collection rate", variant: "success" as const }
    ]
  }
};

const branchPerformance = [
  { name: "Branch-01", performance: 97.2, portfolio: 45000, risk: "Low" },
  { name: "Branch-02", performance: 96.8, portfolio: 38000, risk: "Low" },
  { name: "Branch-03", performance: 96.1, portfolio: 42000, risk: "Medium" },
  { name: "Branch-04", performance: 95.4, portfolio: 35000, risk: "Medium" },
  { name: "Branch-05", performance: 94.2, portfolio: 32000, risk: "High" },
  { name: "Branch-06", performance: 93.8, portfolio: 28000, risk: "High" }
];

const monthlyProgress = [
  { week: "Week 1", actual: 115000, target: 121250, forecast: 118000 },
  { week: "Week 2", actual: 108000, target: 121250, forecast: 112000 },
  { week: "Week 3", actual: 125000, target: 121250, forecast: 123000 },
  { week: "Week 4", actual: 0, target: 121250, forecast: 119000 }
];

const riskAlerts = [
  { severity: "High", count: 15, amount: 125000, description: "Require immediate attention" },
  { severity: "Medium", count: 23, amount: 180000, description: "Monitor closely" },
  { severity: "Low", count: 8, amount: 45000, description: "Standard follow-up" }
];

const teamPerformance = [
  { member: "Manager A", role: "Branch Mgr", performance: 97.2, rank: 1 },
  { member: "Manager B", role: "Branch Mgr", performance: 96.1, rank: 2 },
  { member: "Manager C", role: "Branch Mgr", performance: 94.8, rank: 3 },
  { member: "Manager D", role: "Branch Mgr", performance: 93.2, rank: 4 }
];

const forecastData = [
  { name: "Confidence", value: 87, fill: "hsl(var(--chart-1))" },
  { name: "Risk", value: 13, fill: "hsl(var(--chart-4))" }
];

const ManagerDashboard = () => {
  const [selectedRole, setSelectedRole] = useState("branch-manager");
  const currentRoleData = roleData[selectedRole as keyof typeof roleData];

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{currentRoleData.title}</h2>
          <p className="text-muted-foreground">Role-specific performance insights and metrics</p>
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select manager role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="branch-manager">Branch Manager</SelectItem>
            <SelectItem value="region-manager">Region Manager</SelectItem>
            <SelectItem value="zone-manager">Zone Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Role-Specific KPIs */}
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

      {/* Performance Analysis */}
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
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">₹348K</div>
                  <div className="text-xs text-muted-foreground">Actual</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">₹485K</div>
                  <div className="text-xs text-muted-foreground">Target</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-warning">₹472K</div>
                  <div className="text-xs text-muted-foreground">Forecast</div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-2))" strokeDasharray="5 5" name="Target" />
                  <Line type="monotone" dataKey="forecast" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Forecast" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
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
                <div key={member.member} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      index === 0 ? 'bg-gradient-success text-white' :
                      index === 1 ? 'bg-chart-3/20 text-chart-3' :
                      index === 2 ? 'bg-chart-4/20 text-chart-4' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {member.rank}
                    </div>
                    <div>
                      <div className="font-medium">{member.member}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{member.performance}%</div>
                    {index === 0 && <Award className="h-4 w-4 text-warning ml-auto" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk & Operational Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Alerts */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <span>Risk Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAlerts.map((alert) => (
                <div key={alert.severity} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      alert.severity === "High" ? "destructive" :
                      alert.severity === "Medium" ? "default" : "secondary"
                    }>
                      {alert.severity} Risk
                    </Badge>
                    <span className="font-bold">{alert.count}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{(alert.amount / 1000).toFixed(0)}K - {alert.description}
                  </div>
                  {alert !== riskAlerts[riskAlerts.length - 1] && <div className="border-b" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branch Performance (if branch/region manager) */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span>Branch Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={branchPerformance.slice(0, 4)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Performance"]} />
                <Bar dataKey="performance" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Forecast Confidence */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              <span>Forecast Confidence</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={120}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={forecastData}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="hsl(var(--chart-1))" />
                </RadialBarChart>
              </ResponsiveContainer>
              
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">87%</div>
                <div className="text-sm text-muted-foreground">Prediction Reliability</div>
                <div className="text-xs text-muted-foreground">
                  Based on historical accuracy and current trends
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Operational KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Policies Due This Month"
          value="284"
          subtitle="Collection timeline: 18 days avg"
          size="sm"
        />
        <KPICard
          title="Outstanding Amount"
          value="₹142K"
          subtitle="Aging: 45% > 30 days"
          variant="warning"
          size="sm"
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
          title="Next Month Forecast"
          value="₹495K"
          subtitle="Pipeline prediction"
          variant="primary"
          size="sm"
          change={{ value: "+2.1%", type: "positive" }}
        />
      </div>
    </div>
  );
};

export default ManagerDashboard;