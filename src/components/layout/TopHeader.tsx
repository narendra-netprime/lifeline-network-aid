import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Bell, 
  User, 
  Settings, 
  CreditCard, 
  Users, 
  MessageCircle, 
  LogOut,
  Phone
} from "lucide-react";

interface TopHeaderProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export function TopHeader({ notificationCount = 0, onNotificationClick }: TopHeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const userInitials = user?.user_metadata?.first_name && user?.user_metadata?.last_name 
    ? `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`
    : user?.email?.[0]?.toUpperCase() || "U";

  const userName = user?.user_metadata?.first_name && user?.user_metadata?.last_name
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
    : user?.email || "User";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Home Tab and Logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost" 
            onClick={handleHomeClick}
            className="flex items-center space-x-2 hover:bg-accent"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-sm font-bold text-white">CH</span>
            </div>
            <button 
              onClick={handleHomeClick}
              className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              CommunityHub
            </button>
          </div>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Notifications Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={onNotificationClick}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </Badge>
                )}
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 ring-2 ring-community-primary/20">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={userName} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={userName} />
                      <AvatarFallback className="bg-gradient-primary text-white text-sm">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Information
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/password")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Password Settings
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/payment-methods")}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Payment Methods
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/referrals")}>
                    <Users className="mr-2 h-4 w-4" />
                    Referral Section
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate("/contact-us")}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Us
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}