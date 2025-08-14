import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, ChevronLeft, ChevronRight, ArrowLeft, RefreshCw } from "lucide-react";
import { NewsService } from "@/utils/newsService";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  url: string;
  category: string;
  content?: string;
}


export function NewsSection() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load news on component mount
  useEffect(() => {
    loadNews();
  }, []);

  // Auto-scroll news every 3 seconds
  useEffect(() => {
    if (news.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [news]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const fetchedNews = await NewsService.fetchLatestNews();
      setNews(fetchedNews);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const handleNext = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % news.length);
  };

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const handleBackToNews = () => {
    setSelectedNews(null);
  };

  // Full screen news view
  if (selectedNews) {
    const otherNews = news.filter(newsItem => newsItem.id !== selectedNews.id);
    
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
                {selectedNews.content || selectedNews.summary}
              </p>
              {selectedNews.content && selectedNews.content !== selectedNews.summary && (
                <p className="text-base leading-relaxed mt-4">
                  This story continues to develop as immigration policies and community initiatives evolve. 
                  Stay tuned for more updates on how these changes affect the Indian community in the United States.
                </p>
              )}
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
            {otherNews.slice(0, 4).map((newsItem) => (
              <Card 
                key={newsItem.id} 
                className="bg-gradient-card hover:shadow-card transition-all duration-300 group cursor-pointer"
                onClick={() => handleNewsClick(newsItem)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {newsItem.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {newsItem.timestamp}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-community-primary transition-colors">
                    {newsItem.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {newsItem.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Latest News for Indians in USA
            </h2>
            <p className="text-muted-foreground mt-1">
              Loading latest H1B, OPT, and Indian community news...
            </p>
          </div>
        </div>
        <Card className="bg-gradient-card animate-pulse">
          <CardHeader className="pb-4">
            <div className="h-4 bg-muted rounded w-1/4 mb-3"></div>
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No news available
  if (news.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Latest News for Indians in USA
            </h2>
            <p className="text-muted-foreground mt-1">
              No news available at the moment
            </p>
          </div>
          <Button variant="outline" onClick={loadNews}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  // Carousel view
  const currentNews = news[currentNewsIndex];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Latest News for Indians in USA
          </h2>
          <p className="text-muted-foreground mt-1">
            H1B, OPT, Student Visas & Indian Community Updates
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={loadNews}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
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
                {news.map((_, index) => (
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