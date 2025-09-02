import { ServiceCard } from "@/components/ServiceCard";
import { 
  Home, 
  Plane, 
  MessageSquare, 
  Tag, 
  Calendar, 
  Shield, 
  ShoppingBag,
  Newspaper 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  type: 'accommodation' | 'travel' | 'confessions' | 'deals' | 'events' | 'secure' | 'marketplace' | 'news';
}

const services: Service[] = [
  {
    id: "accommodations",
    title: "Accommodations", 
    icon: Home,
    color: "services-accommodations",
    description: "Find housing or offer accommodation. Connect with people in your area for short-term or long-term stays.",
    type: "accommodation"
  },
  {
    id: "travel",
    title: "Travel Companion",
    icon: Plane,
    color: "services-travel", 
    description: "Find travel buddies or offer to travel with others. Share your journey and make new connections.",
    type: "travel"
  },
  {
    id: "news",
    title: "News",
    icon: Newspaper,
    color: "services-news",
    description: "Stay updated with the latest immigration news, H1B updates, and Indian community news in the USA.",
    type: "news"
  },
  {
    id: "confessions", 
    title: "Confessions",
    icon: MessageSquare,
    color: "services-confessions",
    description: "Share your thoughts anonymously and get support from the community. Express yourself freely.",
    type: "confessions"
  },
  {
    id: "deals",
    title: "Deals",
    icon: Tag,
    color: "services-deals", 
    description: "Discover exclusive deals and offers curated for the Indian community. Save money on daily essentials.",
    type: "deals"
  },
  {
    id: "events",
    title: "Events",
    icon: Calendar,
    color: "services-events",
    description: "Discover and book community events. From cultural celebrations to networking meetups.",
    type: "events"
  },
  {
    id: "secure",
    title: "Secure Services",
    icon: Shield,
    color: "services-secure",
    description: "Access professional health, legal, and insurance services from verified providers.",
    type: "secure"
  },
  {
    id: "marketplace",
    title: "Marketplace", 
    icon: ShoppingBag,
    color: "services-marketplace",
    description: "Buy, sell, and trade items within your local community. Find great deals nearby.",
    type: "marketplace"
  }
];

export function ServicesSection() {
  const navigate = useNavigate();

  const handleServiceClick = (service: Service) => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Community Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  );
}