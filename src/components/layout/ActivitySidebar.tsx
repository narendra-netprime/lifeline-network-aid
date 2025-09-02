import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  last_message_at: string;
  unread_count: number;
  other_user: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

interface ActivitySidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onConversationSelect: (conversation: Conversation) => void;
}

export function ActivitySidebar({ isCollapsed, onToggle, onConversationSelect }: ActivitySidebarProps) {
  const { user } = useAuth();
  const [conversations] = useState<Conversation[]>([]);
  
  // Mock conversations for display purposes until database is set up
  const mockConversations = [
    {
      id: "1",
      participant_1: "user1",
      participant_2: "user2", 
      last_message_at: new Date().toISOString(),
      unread_count: 2,
      other_user: {
        id: "user2",
        first_name: "John",
        last_name: "Doe",
        avatar_url: undefined,
      }
    }
  ];

  const displayConversations = user ? mockConversations : [];
  const totalUnreadCount = displayConversations.reduce((sum, conv) => sum + conv.unread_count, 0);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!user) {
    return (
      <div className={`relative transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'} flex-shrink-0`}>
        <Card className="h-full border-r border-l-0 rounded-none bg-gradient-card">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">Please sign in to view messages</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`relative transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'} flex-shrink-0`}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border bg-background shadow-md hover:shadow-lg"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Sidebar Content */}
      <Card className="h-full border-r border-l-0 rounded-none bg-gradient-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            {!isCollapsed && (
              <>
                <span>Recent Activity</span>
                {totalUnreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                  </Badge>
                )}
              </>
            )}
            {isCollapsed && (
              <div className="w-full flex justify-center">
                <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                </Badge>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        
        {!isCollapsed && (
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-1 p-3 pt-0">
                {displayConversations.length === 0 ? (
                  <div className="text-center py-4">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">No conversations yet</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Start chatting by messaging someone from the services
                    </p>
                  </div>
                ) : (
                  displayConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent/50 ${
                        conversation.unread_count > 0 
                          ? 'bg-community-primary/5 border-community-primary/20' 
                          : 'bg-background/50'
                      }`}
                      onClick={() => onConversationSelect(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.other_user.avatar_url} />
                            <AvatarFallback className="bg-gradient-primary text-white text-xs">
                              {`${conversation.other_user.first_name[0]}${conversation.other_user.last_name[0]}`}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.unread_count > 0 && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-community-primary flex items-center justify-center">
                              <span className="text-xs text-white font-medium">
                                {conversation.unread_count > 9 ? "9+" : conversation.unread_count}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">
                              {`${conversation.other_user.first_name} ${conversation.other_user.last_name}`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(conversation.last_message_at)}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            Latest message preview...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    </div>
  );
}