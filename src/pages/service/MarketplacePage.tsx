import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, MapPin, DollarSign, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = ["All Locations", "San Francisco", "Los Angeles", "New York", "Chicago", "Seattle"];

  const marketplaceItems = [
    {
      id: 1,
      title: "iPhone 13 Pro - Excellent Condition",
      description: "Barely used iPhone 13 Pro, comes with original box and accessories",
      price: "$800",
      location: "San Francisco, CA",
      seller: "John D.",
      postedDate: "2 days ago",
      images: ["https://via.placeholder.com/300x200"],
      category: "Electronics"
    },
    {
      id: 2,
      title: "Traditional Indian Furniture Set",
      description: "Beautiful hand-carved wooden furniture from India. Moving sale!",
      price: "$1200",
      location: "Los Angeles, CA", 
      seller: "Priya S.",
      postedDate: "1 week ago",
      images: ["https://via.placeholder.com/300x200"],
      category: "Furniture"
    },
    {
      id: 3,
      title: "Bollywood DVD Collection",
      description: "Over 100 Bollywood movies, classic and new releases",
      price: "$50",
      location: "New York, NY",
      seller: "Raj K.",
      postedDate: "3 days ago",
      images: ["https://via.placeholder.com/300x200"],
      category: "Entertainment"
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || selectedLocation === "All Locations" || 
                           item.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

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
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">
            Buy, sell, and trade items within your local community. Find great deals nearby.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button>Post Item</Button>
            </div>
          </CardContent>
        </Card>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-muted-foreground text-4xl font-bold">
                  {item.title.charAt(0)}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{item.price}</span>
                  <span className="text-sm text-muted-foreground">{item.postedDate}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{item.location}</span>
                  </div>
                  <div className="text-muted-foreground">
                    Seller: {item.seller}
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or location filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}