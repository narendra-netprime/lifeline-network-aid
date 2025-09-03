import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NewsPage() {
  const navigate = useNavigate();

  // Sample news articles - in the future this will be fetched from API
  const newsArticles = [
    {
      id: 1,
      title: "New H1B Visa Guidelines Announced for 2024",
      summary: "The latest updates include changes to the application process and increased quotas for skilled workers.",
      content: "The United States Citizenship and Immigration Services (USCIS) has announced significant changes to the H1B visa program...",
      source: "Immigration News Today",
      sourceUrl: "#",
      publishedAt: "2024-01-15",
      trending: true,
    },
    {
      id: 2,
      title: "OPT Extension Rules Updated",
      summary: "International students can now apply for extended Optional Practical Training under new guidelines.",
      content: "Recent changes to OPT regulations provide more flexibility for international students...",
      source: "Student Immigration Portal",
      sourceUrl: "#",
      publishedAt: "2024-01-14",
      trending: false,
    },
  ];

  const handleReadMore = (articleId: number) => {
    navigate(`/news/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Immigration News</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest immigration news, H1B updates, and community information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                  {article.trending && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm mb-4 flex-1">{article.summary}</p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReadMore(article.id)}
                  >
                    Read Full Story
                  </Button>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    {article.source}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}