import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, MapPin, Users } from "lucide-react";

interface BannerPost {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  display_order: number;
  created_at: string;
}

export function BannerSection() {
  // Mock banner posts - these would come from admin/owner posts
  const bannerPosts: BannerPost[] = [
    {
      id: "1",
      title: "Welcome to CommunityHub!",
      content: "Connect with fellow Indians in the USA. Find accommodation, travel companions, share experiences, and access professional services all in one place.",
      display_order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: "2", 
      title: "New Services Available",
      content: "We've expanded our platform to include professional health, legal, and insurance services. Connect with verified providers in your area.",
      display_order: 2,
      created_at: new Date().toISOString(),
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Community Updates</h2>
        <Badge variant="outline" className="text-xs">
          Admin Posts Only
        </Badge>
      </div>
      
      <ScrollArea className="h-64">
        <div className="space-y-4 pr-4">
          {bannerPosts.map((post) => (
            <Card key={post.id} className="bg-gradient-card border-community-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-community-primary">
                    {post.title}
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.created_at)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {post.image_url && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(post.created_at)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    Community Admin
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}