import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

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
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Auto-scroll news every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % mockNews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + mockNews.length) % mockNews.length);
  };

  const handleNext = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % mockNews.length);
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const handleBackToNews = () => {
    setSelectedNews(null);
  };

  // Full screen news view
  if (selectedNews) {
    const otherNews = mockNews.filter(news => news.id !== selectedNews.id);
    
    return (
      <div className="mb-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToNews}
            className="hover:bg-community-primary hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>
        </div>

        <Card className="bg-gradient-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="text-sm">
                {selectedNews.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {selectedNews.timestamp}
              </div>
            </div>
            <CardTitle className="text-3xl leading-tight mb-4">
              {selectedNews.title}
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              {selectedNews.summary}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-base leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p className="text-base leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                Source: {selectedNews.source}
              </span>
              <Button 
                variant="outline" 
                className="hover:bg-community-primary hover:text-white"
                onClick={() => window.open(selectedNews.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Original
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Other Recent News */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Other Recent News</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherNews.slice(0, 4).map((news) => (
              <Card 
                key={news.id} 
                className="bg-gradient-card hover:shadow-card transition-all duration-300 group cursor-pointer"
                onClick={() => handleNewsClick(news)}
              >
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
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {news.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Carousel view
  const currentNews = mockNews[currentNewsIndex];

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
      </div>

      {/* Single News Carousel */}
      <Card className="bg-gradient-card hover:shadow-card transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-community-primary/5 to-transparent pointer-events-none" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="text-sm">
              {currentNews.category}
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {currentNews.timestamp}
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="h-8 w-8 hover:bg-community-primary hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="h-8 w-8 hover:bg-community-primary hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <CardTitle 
            className="text-2xl leading-tight hover:text-community-primary transition-colors cursor-pointer"
            onClick={() => handleNewsClick(currentNews)}
          >
            {currentNews.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0 relative z-10">
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            {currentNews.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Source: {currentNews.source}
            </span>
            <div className="flex items-center space-x-3">
              {/* Progress indicators */}
              <div className="flex space-x-1">
                {mockNews.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentNewsIndex 
                        ? 'bg-community-primary' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    onClick={() => setCurrentNewsIndex(index)}
                  />
                ))}
              </div>
              <Button 
                onClick={() => handleNewsClick(currentNews)}
                className="bg-community-primary hover:bg-community-primary-hover"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Full Story
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}