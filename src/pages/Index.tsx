import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import NavigationTabs from "@/components/dashboard/NavigationTabs";
import ExecutiveDashboard from "@/components/dashboard/ExecutiveDashboard";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import { BarChart3, Calendar, Filter } from "lucide-react";
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
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Renewal Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Premium Collection & Risk Analytics</p>
                </div>
              </div>
              <Badge variant="secondary" className="ml-4">
                Live Data
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>July 2025</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-6">
        <TabsContent value="executive" className={activeTab === "executive" ? "block" : "hidden"}>
          <ExecutiveDashboard />
        </TabsContent>
        
        <TabsContent value="manager" className={activeTab === "manager" ? "block" : "hidden"}>
          <ManagerDashboard />
        </TabsContent>
      </div>
    </div>
  );
};

export default Index;
