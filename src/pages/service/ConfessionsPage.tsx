import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ConfessionsPage() {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) {
      toast.error("Please write something before posting");
      return;
    }
    toast.success("Confession posted anonymously!");
    setNewPost("");
  };

  // Sample confessions
  const confessions = [
    {
      id: 1,
      content: "Moving to a new country is harder than I thought. Sometimes I feel so lonely even though I'm surrounded by people.",
      likes: 15,
      comments: 8,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      content: "I miss home-cooked food so much. I've been surviving on takeout for months and I don't know how to cook Indian food properly.",
      likes: 23,
      comments: 12,
      timestamp: "5 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Confessions</h1>
          <p className="text-muted-foreground">
            Share your thoughts anonymously and get support from the community. Express yourself freely.
          </p>
        </div>

        {/* Post new confession */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Share Anonymous Confession
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Share your thoughts anonymously..."
              rows={4}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Your confession will be posted anonymously
              </p>
              <Button onClick={handlePost}>
                Post Confession
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confessions feed */}
        <div className="space-y-4">
          {confessions.map((confession) => (
            <Card key={confession.id}>
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">{confession.timestamp}</p>
                  <p className="text-base leading-relaxed">{confession.content}</p>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>{confession.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>{confession.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}