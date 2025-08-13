import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  url: string;
  category: string;
}

// Mock news data for Indian people in USA
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "New H-1B Policy Changes Announced for 2024",
    summary: "USCIS announces significant updates to H-1B visa processing that will affect thousands of Indian professionals in the US.",
    source: "Immigration News",
    timestamp: "2 hours ago",
    url: "#",
    category: "Immigration"
  },
  {
    id: "2", 
    title: "Indian Festival Celebrations Across Major US Cities",
    summary: "Diwali celebrations are planned in New York, California, and Texas with community gatherings and cultural events.",
    source: "Community News",
    timestamp: "5 hours ago",
    url: "#",
    category: "Culture"
  },
  {
    id: "3",
    title: "New Indo-US Trade Agreement Benefits Indian Businesses",
    summary: "The latest trade agreement opens new opportunities for Indian entrepreneurs and small businesses in America.",
    source: "Business Today",
    timestamp: "1 day ago", 
    url: "#",
    category: "Business"
  }
];

export function NewsSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Latest News for Indians in USA
          </h2>
          <p className="text-muted-foreground mt-1">
            Stay updated with community news, immigration updates, and cultural events
          </p>
        </div>
        <Button variant="outline" className="hover:bg-community-primary hover:text-white">
          View All News
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockNews.map((news) => (
          <Card key={news.id} className="bg-gradient-card hover:shadow-card transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {news.category}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {news.timestamp}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-community-primary transition-colors">
                {news.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {news.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {news.source}
                </span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 px-2 hover:bg-community-primary hover:text-white"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Read
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}