import { useState } from "react";
import { Header } from "@/components/Header";
import { NotificationsSidebar } from "@/components/NotificationsSidebar";
import { ServiceCard } from "@/components/ServiceCard";
import { NewsSection } from "@/components/NewsSection";
import { ServiceInterface } from "@/components/ServiceInterface";
import { LocationSettings } from "@/components/LocationSettings";
import {
  Home,
  Plane,
  Scale,
  Tag,
  Gift,
  Shield
} from "lucide-react";

interface LocationPreferences {
  state: string;
  city: string;
  distance: string;
}

type ViewState = 'home' | 'serviceInterface' | 'locationSettings';

interface Service {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  type: 'chat' | 'forum' | 'deals';
}

const services: Service[] = [
  {
    id: "accommodations", 
    title: "Accommodations",
    icon: Home,
    color: "services-accommodations", 
    description: "Discover housing help and temporary stays",
    type: "chat"
  },
  {
    id: "travel",
    title: "Travel Companion",
    icon: Plane,
    color: "services-travel",
    description: "Find travel buddies for your next adventure", 
    type: "chat"
  },
  {
    id: "confessions",
    title: "Confessions",
    icon: Scale,
    color: "services-querypedia",
    description: "Share your thoughts and get community support",
    type: "forum" 
  },
  {
    id: "deals",
    title: "Deals", 
    icon: Tag,
    color: "services-deals",
    description: "Exclusive deals and offers from partners",
    type: "deals"
  },
  {
    id: "marketplace",
    title: "Market Place",
    icon: Gift,
    color: "services-freeitems",
    description: "Buy, sell, and trade items within your community", 
    type: "chat"
  },
  {
    id: "healthservices",
    title: "Health & Legal Services",
    icon: Shield,
    color: "services-health",
    description: "Health insurance, auto services, and attorney consultations",
    type: "forum"
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [locationPreferences, setLocationPreferences] = useState<LocationPreferences>({
    state: "", 
    city: "",
    distance: ""
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setCurrentView('serviceInterface');
  };

  const handleLocationSettings = () => {
    setCurrentView('locationSettings');
  };

  const handleLocationSave = (preferences: LocationPreferences) => {
    setLocationPreferences(preferences);
    setCurrentView('home');
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedService(null);
  };

  if (currentView === 'locationSettings') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-6 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <button 
                onClick={handleBack}
                className="text-community-primary hover:underline mb-4"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold">Location Settings</h1>
              <p className="text-muted-foreground">Manage your location preferences for all services</p>
            </div>
            <LocationSettings 
              onSave={handleLocationSave}
              currentPreferences={locationPreferences}
            />
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'serviceInterface' && selectedService) {
    return (
      <ServiceInterface
        serviceName={selectedService.title}
        serviceType={selectedService.type}
        onBack={handleBack}
        appliedFilters={locationPreferences}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLocationSettings={handleLocationSettings} />
      
      <div className="flex">
        <NotificationsSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Welcome to CommunityHub
              </h1>
              <p className="text-muted-foreground">
                Connect, share, and support your Indian community in the USA
              </p>
            </div>

            {/* News Section */}
            <NewsSection />

            {/* Services Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Community Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    icon={service.icon}
                    color={service.color}
                    description={service.description}
                    onClick={() => handleServiceClick(service)}
                  />
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-12 p-6 bg-gradient-card rounded-lg border">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This is a beautiful prototype of your community platform! 
                To enable full functionality like real-time chat, user authentication, file uploads, 
                and payment processing, connect to Supabase using the green button in the top right.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
