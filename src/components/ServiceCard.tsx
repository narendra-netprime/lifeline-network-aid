import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  onClick: () => void;
}

export function ServiceCard({ title, icon: Icon, color, description, onClick }: ServiceCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-service bg-gradient-card border-border/50 hover:border-community-primary/50"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center h-full">
        <div 
          className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}
          style={{ backgroundColor: `hsl(var(--${color.replace('services-', '')}-color) / 0.1)` }}
        >
          <Icon 
            className={`h-8 w-8 transition-all duration-300 group-hover:scale-110`}
            style={{ color: `hsl(var(--${color.replace('services-', '')}-color))` }}
          />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-community-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {description}
        </p>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full group-hover:bg-community-primary group-hover:text-white group-hover:border-community-primary transition-colors"
        >
          Explore
        </Button>
      </CardContent>
    </Card>
  );
}