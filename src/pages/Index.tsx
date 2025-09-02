import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopHeader } from "@/components/layout/TopHeader";
import { ActivitySidebar } from "@/components/layout/ActivitySidebar";
import { MainContent } from "@/components/layout/MainContent";
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

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [notificationCount] = useState(3); // Mock notification count

  useEffect(() => {
    // Redirect to auth if not logged in
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToHome = () => {
    setSelectedConversation(null);
  };

  const handleNotificationClick = () => {
    // If sidebar is collapsed, expand it to show notifications
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
            <span className="text-lg font-bold text-white">CH</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <TopHeader 
        notificationCount={notificationCount}
        onNotificationClick={handleNotificationClick}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Sidebar */}
        <ActivitySidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onConversationSelect={handleConversationSelect}
        />
        
        {/* Main Content */}
        <MainContent 
          selectedConversation={selectedConversation}
          onBackToHome={handleBackToHome}
        />
      </div>
    </div>
  );
};

export default Index;