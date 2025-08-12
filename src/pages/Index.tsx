import { useState } from "react";
import { Header } from "@/components/Header";
import { NotificationsSidebar } from "@/components/NotificationsSidebar";
import { ServiceCard } from "@/components/ServiceCard";
import { LocationFilter } from "@/components/LocationFilter";
import { ServiceInterface } from "@/components/ServiceInterface";
import {
  Car,
  Home,
  Plane,
  DollarSign,
  Heart,
  Scale,
  Package,
  Tag,
  Gift
} from "lucide-react";

interface LocationFilters {
  country: string;
  state: string;
  city: string;
  distance: string;
}

type ViewState = 'home' | 'locationFilter' | 'serviceInterface';

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
    id: "rides",
    title: "Rides",
    icon: Car,
    color: "services-rides",
    description: "Find ride shares and carpools in your area",
    type: "chat"
  },
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
    id: "remittance",
    title: "Remittance", 
    icon: DollarSign,
    color: "services-remittance",
    description: "Safe money exchange and transfer services",
    type: "chat"
  },
  {
    id: "fundraise",
    title: "Fund Raise",
    icon: Heart,
    color: "services-fundraise", 
    description: "Create and support emergency fundraisers",
    type: "forum"
  },
  {
    id: "querypedia",
    title: "Querypedia",
    icon: Scale,
    color: "services-querypedia",
    description: "Ask questions and get community answers",
    type: "forum" 
  },
  {
    id: "parcel",
    title: "Parcel",
    icon: Package,
    color: "services-parcel",
    description: "Package delivery and transport services",
    type: "chat"
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
    id: "freeitems",
    title: "Free Items",
    icon: Gift,
    color: "services-freeitems",
    description: "Give away and find free items in your community", 
    type: "chat"
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<LocationFilters>({
    country: "",
    state: "", 
    city: "",
    distance: ""
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setCurrentView('locationFilter');
  };

  const handleFiltersApplied = (filters: LocationFilters) => {
    setAppliedFilters(filters);
    setCurrentView('serviceInterface');
  };

  const handleBack = () => {
    if (currentView === 'serviceInterface') {
      setCurrentView('locationFilter');
    } else {
      setCurrentView('home');
      setSelectedService(null);
      setAppliedFilters({ country: "", state: "", city: "", distance: "" });
    }
  };

  if (currentView === 'locationFilter' && selectedService) {
    return (
      <LocationFilter
        serviceName={selectedService.title}
        onBack={handleBack}
        onApplyFilters={handleFiltersApplied}
      />
    );
  }

  if (currentView === 'serviceInterface' && selectedService) {
    return (
      <ServiceInterface
        serviceName={selectedService.title}
        serviceType={selectedService.type}
        onBack={handleBack}
        appliedFilters={appliedFilters}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
                Connect, share, and support your local community
              </p>
            </div>

            {/* Services Grid */}
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
