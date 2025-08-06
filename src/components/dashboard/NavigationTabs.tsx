import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, TrendingUp } from "lucide-react";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
        <TabsTrigger 
          value="executive" 
          className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Executive View</span>
        </TabsTrigger>
        <TabsTrigger 
          value="manager" 
          className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Users className="h-4 w-4" />
          <span>Manager View</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default NavigationTabs;