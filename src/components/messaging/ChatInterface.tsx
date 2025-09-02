import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, Paperclip, Mic } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  is_read: boolean;
}

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

interface ChatInterfaceProps {
  conversation: Conversation;
  onBack: () => void;
}

export function ChatInterface({ conversation, onBack }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages for display
  const mockMessages: Message[] = [
    {
      id: "1",
      content: "Hi! I saw your post about accommodation in NYC. Is it still available?",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sender_id: conversation.other_user.id,
      is_read: true
    },
    {
      id: "2", 
      content: "Yes, it's still available! Would you like to know more details?",
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      sender_id: user?.id || "",
      is_read: true
    },
    {
      id: "3",
      content: "That would be great! Could you tell me about the rent and amenities?",
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      sender_id: conversation.other_user.id,
      is_read: false
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, [conversation.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const messageData: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      created_at: new Date().toISOString(),
      sender_id: user.id,
      is_read: false
    };

    setMessages(prev => [...prev, messageData]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <Card className="rounded-none border-l-0 border-r-0 border-t-0">
        <CardHeader className="py-3">
          <CardTitle className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={conversation.other_user.avatar_url} />
              <AvatarFallback className="bg-gradient-primary text-white text-xs">
                {`${conversation.other_user.first_name[0]}${conversation.other_user.last_name[0]}`}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-base">
                {`${conversation.other_user.first_name} ${conversation.other_user.last_name}`}
              </h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.sender_id === user?.id;
            const showDate = index === 0 || 
              formatDate(messages[index - 1].created_at) !== formatDate(message.created_at);

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center my-4">
                    <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border">
                      {formatDate(message.created_at)}
                    </span>
                  </div>
                )}
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!isCurrentUser && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={conversation.other_user.avatar_url} />
                        <AvatarFallback className="bg-gradient-primary text-white text-xs">
                          {`${conversation.other_user.first_name[0]}${conversation.other_user.last_name[0]}`}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-community-primary text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <Card className="rounded-none border-l-0 border-r-0 border-b-0">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
              disabled={loading}
            />
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Mic className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || loading}
              size="icon"
              className="h-9 w-9"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}