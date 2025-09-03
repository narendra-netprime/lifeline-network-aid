import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Star, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SecurePage() {
  const navigate = useNavigate();

  const healthProviders = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Internal Medicine",
      rating: 4.8,
      reviews: 124,
      experience: "15 years",
      fee: "$150",
      availability: "Available today",
      image: "https://via.placeholder.com/100x100"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiology",
      rating: 4.9,
      reviews: 89,
      experience: "20 years", 
      fee: "$200",
      availability: "Next available: Tomorrow",
      image: "https://via.placeholder.com/100x100"
    }
  ];

  const legalProviders = [
    {
      id: 1,
      name: "Attorney Sarah Patel",
      specialization: "Immigration Law",
      rating: 4.7,
      reviews: 156,
      experience: "12 years",
      fee: "$300",
      availability: "Available this week",
      image: "https://via.placeholder.com/100x100"
    }
  ];

  const insuranceProviders = [
    {
      id: 1,
      name: "SecureLife Insurance",
      specialization: "Health & Life Insurance",
      rating: 4.6,
      reviews: 234,
      experience: "25 years",
      fee: "Free consultation",
      availability: "Available now",
      image: "https://via.placeholder.com/100x100"
    }
  ];

  const ProviderCard = ({ provider, type }: { provider: any, type: string }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <p className="text-muted-foreground">{provider.specialization}</p>
              </div>
              <Badge variant="secondary">{provider.experience}</Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{provider.rating}</span>
                <span>({provider.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{provider.availability}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">{provider.fee}</span>
              </div>
              
              <Button>Book Appointment</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
          <h1 className="text-3xl font-bold mb-2">Secure Services</h1>
          <p className="text-muted-foreground">
            Access professional health, legal, and insurance services from verified providers.
          </p>
        </div>

        <Tabs defaultValue="health" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="health" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Healthcare Providers</h2>
              <p className="text-muted-foreground">
                Connect with verified doctors and healthcare professionals
              </p>
            </div>
            
            {healthProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} type="health" />
            ))}
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Legal Services</h2>
              <p className="text-muted-foreground">
                Get help from experienced attorneys and legal experts
              </p>
            </div>
            
            {legalProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} type="legal" />
            ))}
          </TabsContent>

          <TabsContent value="insurance" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Insurance Services</h2>
              <p className="text-muted-foreground">
                Find the right insurance coverage for your needs
              </p>
            </div>
            
            {insuranceProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} type="insurance" />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}