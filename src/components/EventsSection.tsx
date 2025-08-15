import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Calendar, Users, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  price: string;
  category: string;
  capacity: number;
  registered: number;
  organizer: string;
  fullDescription?: string;
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Diwali Festival Celebration 2024",
    description: "Join us for the grandest Diwali celebration with traditional food, cultural performances, and community bonding.",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&h=400&fit=crop",
    venue: "Community Center Hall",
    location: "San Francisco, CA",
    date: "Nov 15, 2024",
    time: "6:00 PM - 11:00 PM",
    price: "$25",
    category: "Cultural",
    capacity: 500,
    registered: 342,
    organizer: "Indian Cultural Association",
    fullDescription: "Celebrate the festival of lights with the entire Indian community! This year's Diwali celebration promises to be our biggest yet, featuring authentic Indian cuisine, traditional dance performances, live music, and a spectacular fireworks display. Bring your family and friends for an evening filled with joy, culture, and community spirit."
  },
  {
    id: "2",
    title: "H1B Visa Workshop & Networking",
    description: "Expert guidance on H1B processes, application tips, and networking opportunities with immigration attorneys.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=400&fit=crop",
    venue: "Tech Hub Conference Room",
    location: "Seattle, WA",
    date: "Dec 2, 2024",
    time: "2:00 PM - 5:00 PM",
    price: "Free",
    category: "Professional",
    capacity: 150,
    registered: 89,
    organizer: "Indian Professionals Network",
    fullDescription: "Navigate the complex H1B visa process with confidence! Join leading immigration attorneys and HR professionals for an in-depth workshop covering application strategies, common pitfalls, and recent policy changes. Includes Q&A session and networking opportunities."
  },
  {
    id: "3",
    title: "Indian Cricket League Finals",
    description: "Cheer for your favorite teams in the annual Indian Cricket League championship match.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop",
    venue: "Sports Complex Stadium",
    location: "Dallas, TX",
    date: "Dec 10, 2024",
    time: "10:00 AM - 6:00 PM",
    price: "$15",
    category: "Sports",
    capacity: 1000,
    registered: 567,
    organizer: "Indian Sports Club",
    fullDescription: "The most anticipated cricket event of the year! Watch as the top 4 teams compete for the championship title. Food stalls, live commentary, and fan activities throughout the day. Perfect family entertainment with authentic Indian snacks and beverages available."
  },
  {
    id: "4",
    title: "Indian Startup Pitch Competition",
    description: "Watch innovative startups pitch their ideas to top investors and venture capitalists.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    venue: "Innovation Center",
    location: "Austin, TX",
    date: "Jan 20, 2025",
    time: "9:00 AM - 7:00 PM",
    price: "$50",
    category: "Business",
    capacity: 300,
    registered: 178,
    organizer: "Indian Entrepreneurs Association",
    fullDescription: "Witness the future of innovation! Top Indian-American startups will present their groundbreaking ideas to a panel of renowned investors. Categories include FinTech, HealthTech, AI/ML, and Sustainability. Networking lunch and investor meetups included."
  }
];

export function EventsSection() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handlePrevious = () => {
    setCurrentEventIndex((prev) => (prev - 1 + sampleEvents.length) % sampleEvents.length);
  };

  const handleNext = () => {
    setCurrentEventIndex((prev) => (prev + 1) % sampleEvents.length);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
  };

  // Full screen event view
  if (selectedEvent) {
    const otherEvents = sampleEvents.filter(event => event.id !== selectedEvent.id);
    
    return (
      <div className="mb-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToEvents}
            className="hover:bg-community-primary hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>

        <Card className="bg-gradient-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="text-sm">
                {selectedEvent.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {selectedEvent.date}
              </div>
            </div>
            <CardTitle className="text-3xl leading-tight mb-4">
              {selectedEvent.title}
            </CardTitle>
            
            {/* Event Image */}
            <div className="mb-6">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-community-primary" />
                  <div>
                    <p className="font-medium">{selectedEvent.venue}</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-community-primary" />
                  <div>
                    <p className="font-medium">{selectedEvent.date}</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-community-primary" />
                  <div>
                    <p className="font-medium">{selectedEvent.registered}/{selectedEvent.capacity} Registered</p>
                    <p className="text-sm text-muted-foreground">Organized by {selectedEvent.organizer}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Ticket Price</h4>
                  <p className="text-2xl font-bold text-community-primary">{selectedEvent.price}</p>
                </div>
                
                <Button className="w-full bg-community-primary hover:bg-community-primary-hover">
                  Register for Event
                </Button>
              </div>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h4 className="text-lg font-semibold mb-3">About This Event</h4>
              <p className="text-base leading-relaxed">
                {selectedEvent.fullDescription || selectedEvent.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Other Upcoming Events */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Other Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherEvents.slice(0, 3).map((event) => (
              <Card 
                key={event.id} 
                className="bg-gradient-card hover:shadow-card transition-all duration-300 group cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <CardHeader className="pb-3">
                  <div className="mb-3">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {event.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {event.date}
                    </div>
                  </div>
                  <CardTitle className="text-sm leading-tight group-hover:text-community-primary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))
            }
          </div>
        </div>
      </div>
    );
  }

  // Carousel view
  const currentEvent = sampleEvents[currentEventIndex];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Upcoming Events & Tickets
          </h2>
          <p className="text-muted-foreground mt-1">
            Cultural festivals, professional workshops & community gatherings
          </p>
        </div>
      </div>

      {/* Single Event Carousel */}
      <Card className="bg-gradient-card hover:shadow-card transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-community-primary/5 to-transparent pointer-events-none" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="text-sm">
              {currentEvent.category}
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {currentEvent.date}
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="h-8 w-8 hover:bg-community-primary hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="h-8 w-8 hover:bg-community-primary hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <CardTitle 
                className="text-2xl leading-tight hover:text-community-primary transition-colors cursor-pointer mb-3"
                onClick={() => handleEventClick(currentEvent)}
              >
                {currentEvent.title}
              </CardTitle>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-community-primary" />
                  <span>{currentEvent.venue}, {currentEvent.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-community-primary" />
                  <span>{currentEvent.registered}/{currentEvent.capacity} registered</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                {currentEvent.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-community-primary">
                  {currentEvent.price}
                </div>
                <Button 
                  onClick={() => handleEventClick(currentEvent)}
                  className="bg-community-primary hover:bg-community-primary-hover"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
            
            <div>
              <img 
                src={currentEvent.image} 
                alt={currentEvent.title}
                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                onClick={() => handleEventClick(currentEvent)}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 relative z-10">
          <div className="flex items-center justify-center">
            {/* Progress indicators */}
            <div className="flex space-x-1">
              {sampleEvents.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentEventIndex 
                      ? 'bg-community-primary' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentEventIndex(index)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
