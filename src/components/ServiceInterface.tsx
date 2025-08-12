import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  MessageCircle, 
  Heart, 
  Share2,
  Plus,
  Search
} from "lucide-react";

interface ServiceInterfaceProps {
  serviceName: string;
  serviceType: 'chat' | 'forum' | 'deals';
  onBack: () => void;
  appliedFilters: any;
}

interface Post {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isOwn?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: { name: "Alex Rivera" },
    content: "Looking for someone to share a ride from LA to Vegas this weekend. Leaving Friday evening, returning Sunday. Split gas and tolls!",
    timestamp: "2 hours ago",
    likes: 5,
    comments: 3
  },
  {
    id: "2",
    user: { name: "Sarah Kim" },
    content: "Need accommodation in NYC for 3 nights next month. Budget friendly options preferred. Clean and safe area!",
    timestamp: "4 hours ago",
    likes: 8,
    comments: 7,
    image: "/placeholder.svg"
  },
  {
    id: "3",
    user: { name: "Mike Johnson" },
    content: "Emergency fundraiser - My neighbor's house was damaged in the storm. Family of 4 needs help with temporary housing costs.",
    timestamp: "1 day ago",
    likes: 23,
    comments: 12
  }
];

export function ServiceInterface({ serviceName, serviceType, onBack, appliedFilters }: ServiceInterfaceProps) {
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      // Here you would handle posting to the backend
      console.log("Posting:", newPost);
      setNewPost("");
    }
  };

  const openPrivateChat = (userName: string) => {
    // Here you would open a private chat modal/page
    console.log("Opening chat with:", userName);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-card sticky top-0 z-10">
        <div className="container py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{serviceName}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {Object.entries(appliedFilters).map(([key, value]) => 
                    value && (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {key}: {String(value)}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Create Post Card */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Plus className="h-5 w-5 text-community-primary" />
                <span>Create New Post</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`What would you like to share in ${serviceName}?`}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                
                <Button 
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="bg-community-primary hover:bg-community-primary-hover"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <Card key={post.id} className="bg-gradient-card hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start space-x-3 mb-4">
                    <Avatar 
                      className="cursor-pointer hover:ring-2 hover:ring-community-primary/50 transition-all"
                      onClick={() => openPrivateChat(post.user.name)}
                    >
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {post.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 
                          className="font-semibold cursor-pointer hover:text-community-primary transition-colors"
                          onClick={() => openPrivateChat(post.user.name)}
                        >
                          {post.user.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          {post.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-4">
                      <img 
                        src={post.image} 
                        alt="Post content"
                        className="rounded-lg max-w-full h-auto"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-6">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-community-primary">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-community-primary">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openPrivateChat(post.user.name)}
                      className="hover:bg-community-primary hover:text-white"
                    >
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-6">
            <Button variant="outline" className="hover:bg-community-primary hover:text-white">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}