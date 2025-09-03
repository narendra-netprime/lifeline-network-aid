import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Search, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function TravelPage() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    startingState: "",
    destinationCountry: "",
    destinationCity: ""
  });

  const [travelerData, setTravelerData] = useState({
    startingState: "",
    destinationCountry: "",
    destinationCity: "",
    message: ""
  });

  const usStates = ["California", "New York", "Texas", "Florida", "Illinois"]; // Simplified list
  const countries = ["India", "Canada", "United Kingdom", "Germany", "Australia"]; // Sample countries

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
          <h1 className="text-3xl font-bold mb-2">Travel Companion</h1>
          <p className="text-muted-foreground">
            Find travel buddies or offer to travel with others. Share your journey and make new connections.
          </p>
        </div>

        <Tabs defaultValue="find-companion" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find-companion">Find Companion</TabsTrigger>
            <TabsTrigger value="traveler">Traveler</TabsTrigger>
          </TabsList>

          <TabsContent value="find-companion">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Travel Companion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Starting Point (US State)</Label>
                    <Select value={searchData.startingState} onValueChange={(value) => 
                      setSearchData({...searchData, startingState: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Destination Country</Label>
                    <Select value={searchData.destinationCountry} onValueChange={(value) => 
                      setSearchData({...searchData, destinationCountry: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Destination City</Label>
                    <Input
                      placeholder="Enter city name"
                      value={searchData.destinationCity}
                      onChange={(e) => setSearchData({...searchData, destinationCity: e.target.value})}
                    />
                  </div>
                </div>

                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Find Travel Companions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traveler">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Post Your Travel Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Starting Point (US State)</Label>
                    <Select value={travelerData.startingState} onValueChange={(value) => 
                      setTravelerData({...travelerData, startingState: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Destination Country</Label>
                    <Select value={travelerData.destinationCountry} onValueChange={(value) => 
                      setTravelerData({...travelerData, destinationCountry: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Destination City</Label>
                    <Input
                      placeholder="Enter city name"
                      value={travelerData.destinationCity}
                      onChange={(e) => setTravelerData({...travelerData, destinationCity: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Additional Message (Optional)</Label>
                  <Textarea
                    placeholder="Tell us about your travel plans..."
                    rows={3}
                    value={travelerData.message}
                    onChange={(e) => setTravelerData({...travelerData, message: e.target.value})}
                  />
                </div>

                <Button className="w-full">
                  Post Travel Plan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}