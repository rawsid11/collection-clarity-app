import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExecutiveDashboard from "@/components/dashboard/ExecutiveDashboard";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import { BarChart3, Calendar, Filter, Users, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeTab, setActiveTab] = useState("executive");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">RN Insurance Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Premium Collection & Risk Analytics • 124 KPIs</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Activity className="h-3 w-3 mr-1" />
                  Live Data
                </Badge>
                <Badge variant="outline" className="border-accent-teal/30 text-accent-teal">
                  58 Branches
                </Badge>
                <Badge variant="outline" className="border-accent-yellow/30 text-accent-yellow">
                  3 Regions
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-primary/20 hover:bg-primary/5">
                <Calendar className="h-4 w-4" />
                <span>July 2025</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2 border-secondary/20 hover:bg-secondary/5">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 bg-muted/50">
                <TabsTrigger 
                  value="executive" 
                  className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Executive View</span>
                  <Badge variant="secondary" className="ml-2 text-xs bg-white/20">
                    80 KPIs
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="manager" 
                  className="flex items-center space-x-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
                >
                  <Users className="h-4 w-4" />
                  <span>Manager View</span>
                  <Badge variant="secondary" className="ml-2 text-xs bg-white/20">
                    44 KPIs
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="executive" className="mt-0">
            <ExecutiveDashboard />
          </TabsContent>
          
          <TabsContent value="manager" className="mt-0">
            <ManagerDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
