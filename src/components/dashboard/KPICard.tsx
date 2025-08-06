import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: "positive" | "negative" | "neutral";
    period?: string;
  };
  subtitle?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const KPICard = ({ 
  title, 
  value, 
  change, 
  subtitle, 
  variant = "default", 
  size = "md", 
  className 
}: KPICardProps) => {
  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-kpi-positive" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-kpi-negative" />;
      default:
        return <Minus className="h-4 w-4 text-kpi-neutral" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent";
      case "success":
        return "border-l-4 border-l-success bg-gradient-to-r from-success/5 to-transparent";
      case "warning":
        return "border-l-4 border-l-warning bg-gradient-to-r from-warning/5 to-transparent";
      case "danger":
        return "border-l-4 border-l-danger bg-gradient-to-r from-danger/5 to-transparent";
      default:
        return "";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      default:
        return "p-6";
    }
  };

  const getValueTextSize = () => {
    switch (size) {
      case "sm":
        return "text-xl font-bold";
      case "lg":
        return "text-4xl font-bold";
      default:
        return "text-2xl font-bold";
    }
  };

  return (
    <Card className={cn(
      "shadow-kpi transition-all duration-200 hover:shadow-elevated",
      getVariantStyles(),
      className
    )}>
      <CardContent className={getSizeStyles()}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </h3>
            {change && (
              <div className={cn(
                "flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full",
                change.type === "positive" && "bg-success/10 text-kpi-positive",
                change.type === "negative" && "bg-danger/10 text-kpi-negative",
                change.type === "neutral" && "bg-muted text-kpi-neutral"
              )}>
                {getTrendIcon()}
                <span>{change.value}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className={cn("text-foreground", getValueTextSize())}>
              {value}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
            {change?.period && (
              <p className="text-xs text-muted-foreground">
                vs {change.period}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;