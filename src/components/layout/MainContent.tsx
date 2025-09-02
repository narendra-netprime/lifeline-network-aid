import { useState } from "react";
import { BannerSection } from "@/components/sections/BannerSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ChatInterface } from "@/components/messaging/ChatInterface";

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

interface MainContentProps {
  selectedConversation: Conversation | null;
  onBackToHome: () => void;
}

export function MainContent({ selectedConversation, onBackToHome }: MainContentProps) {
  if (selectedConversation) {
    return (
      <ChatInterface 
        conversation={selectedConversation} 
        onBack={onBackToHome}
      />
    );
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Banner/Posts Section */}
        <BannerSection />
        
        {/* Services Section */}
        <ServicesSection />
      </div>
    </main>
  );
}