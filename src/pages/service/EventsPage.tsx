import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Diwali Celebration 2024",
      description: "Join us for a grand Diwali celebration with traditional music, dance, and authentic Indian food.",
      date: "2024-11-01",
      time: "6:00 PM",
      location: "Community Center, San Francisco",
      price: "Free",
      capacity: 200,
      registered: 125,
      image: "https://via.placeholder.com/400x200",
      type: "free"
    },
    {
      id: 2,
      title: "Bollywood Night Live Concert",
      description: "Experience the magic of Bollywood with live performances by renowned artists.",
      date: "2024-11-15",
      time: "7:00 PM", 
      location: "Grand Theater, Los Angeles",
      price: "$45",
      capacity: 500,
      registered: 234,
      image: "https://via.placeholder.com/400x200",
      type: "paid"
    },
    {
      id: 3,
      title: "Indian Cooking Workshop",
      description: "Learn to cook authentic Indian dishes with professional chefs.",
      date: "2024-11-20",
      time: "2:00 PM",
      location: "Cooking Studio, New York",
      price: "$75",
      capacity: 30,
      registered: 18,
      image: "https://via.placeholder.com/400x200",
      type: "paid"
    }
  ];

  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Community Events</h1>
          <p className="text-muted-foreground">
            Discover and book community events. From cultural celebrations to networking meetups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge variant={event.type === "free" ? "secondary" : "default"}>
                    {event.price}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.registered}/{event.capacity} registered</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleEventClick(event.id)}
                >
                  {event.type === "free" ? "Register Now" : "Book Tickets"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}