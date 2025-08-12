import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, MessageCircle, Users, DollarSign, Package } from "lucide-react";

interface Notification {
  id: string;
  type: 'message' | 'ride' | 'fundraise' | 'parcel';
  title: string;
  message: string;
  user: {
    name: string;
    avatar?: string;
  };
  time: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New Message",
    message: "Hey, I'm interested in your ride share to NYC!",
    user: { name: "Sarah Chen" },
    time: "2 min ago",
    unread: true
  },
  {
    id: "2",
    type: "ride",
    title: "Ride Request",
    message: "Someone joined your LA to Vegas trip",
    user: { name: "Mike Johnson" },
    time: "1 hour ago",
    unread: true
  },
  {
    id: "3",
    type: "fundraise",
    title: "Donation Received",
    message: "You received $25 for your fundraiser",
    user: { name: "Anonymous" },
    time: "3 hours ago",
    unread: false
  },
  {
    id: "4",
    type: "parcel",
    title: "Parcel Request",
    message: "Package delivery request from Miami to Orlando",
    user: { name: "Emma Davis" },
    time: "1 day ago",
    unread: false
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'message': return MessageCircle;
    case 'ride': return Users;
    case 'fundraise': return DollarSign;
    case 'parcel': return Package;
    default: return MessageCircle;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'message': return 'text-services-rides';
    case 'ride': return 'text-services-travel';
    case 'fundraise': return 'text-services-fundraise';
    case 'parcel': return 'text-services-parcel';
    default: return 'text-community-primary';
  }
};

export function NotificationsSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <div className={`relative transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'} flex-shrink-0`}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
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
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </>
            )}
            {isCollapsed && (
              <div className="w-full flex justify-center">
                <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {unreadCount}
                </Badge>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        
        {!isCollapsed && (
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-1 p-3 pt-0">
                {mockNotifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const iconColor = getNotificationColor(notification.type);
                  
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent/50 ${
                        notification.unread ? 'bg-community-primary/5 border-community-primary/20' : 'bg-background/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={notification.user.avatar} />
                            <AvatarFallback className="bg-gradient-primary text-white text-xs">
                              {notification.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background flex items-center justify-center ${iconColor}`}>
                            <IconComponent className="h-2.5 w-2.5" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="h-2 w-2 rounded-full bg-community-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        )}
      </Card>
    </div>
  );
}