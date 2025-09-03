import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Filter, Tag, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DealsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "All Categories",
    "Electronics", 
    "Clothing",
    "Shoes",
    "Home & Garden",
    "Food & Grocery",
    "Books",
    "Health & Beauty"
  ];

  const deals = [
    {
      id: 1,
      title: "50% Off on Traditional Indian Clothing",
      description: "Amazing deals on authentic Indian wear - sarees, kurtas, and more",
      category: "Clothing",
      discount: "50%",
      originalPrice: "$100",
      salePrice: "$50",
      link: "#",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 2,
      title: "Electronics Sale - Laptops & Phones",
      description: "Best deals on latest electronics with warranty",
      category: "Electronics",
      discount: "30%",
      originalPrice: "$1000",
      salePrice: "$700",
      link: "#",
      image: "https://via.placeholder.com/300x200"
    }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All Categories" || deal.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
          <h1 className="text-3xl font-bold mb-2">Deals & Offers</h1>
          <p className="text-muted-foreground">
            Discover exclusive deals and offers curated for the Indian community.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Tag className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{deal.title}</CardTitle>
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                    {deal.discount} OFF
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary">{deal.salePrice}</span>
                  <span className="text-sm text-muted-foreground line-through">{deal.originalPrice}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    View Deal
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No deals found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}