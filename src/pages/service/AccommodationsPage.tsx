import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AccommodationsPage() {
  const navigate = useNavigate();
  const [searchPreferences, setSearchPreferences] = useState({
    state: "",
    city: "",
    range: ""
  });

  const [providerData, setProviderData] = useState({
    state: "",
    city: "",
    description: ""
  });

  const handleSearch = () => {
    if (!searchPreferences.state || !searchPreferences.city || !searchPreferences.range) {
      toast.error("Please fill in all preferences");
      return;
    }
    toast.success("Searching for accommodations...");
  };

  const handlePost = () => {
    if (!providerData.state || !providerData.city) {
      toast.error("Please fill in required fields");
      return;
    }
    toast.success("Accommodation posted successfully!");
    setProviderData({ state: "", city: "", description: "" });
  };

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
  ];

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
          <h1 className="text-3xl font-bold mb-2">Accommodations</h1>
          <p className="text-muted-foreground">
            Find housing or offer accommodation. Connect with people in your area.
          </p>
        </div>

        <Tabs defaultValue="needed" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="needed">Needed</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
          </TabsList>

          <TabsContent value="needed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={searchPreferences.state} onValueChange={(value) => 
                      setSearchPreferences({...searchPreferences, state: value})
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
                    <Label htmlFor="city">City *</Label>
                    <Input
                      placeholder="Enter city name"
                      value={searchPreferences.city}
                      onChange={(e) => setSearchPreferences({...searchPreferences, city: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="range">Range (miles) *</Label>
                    <Select value={searchPreferences.range} onValueChange={(value) => 
                      setSearchPreferences({...searchPreferences, range: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Within 5 miles</SelectItem>
                        <SelectItem value="10">Within 10 miles</SelectItem>
                        <SelectItem value="25">Within 25 miles</SelectItem>
                        <SelectItem value="50">Within 50 miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleSearch}
                  className="w-full"
                  disabled={!searchPreferences.state || !searchPreferences.city || !searchPreferences.range}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Accommodations
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample accommodation listings */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                      JD
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">John Doe</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        San Francisco, CA
                      </p>
                      <p className="text-sm mt-2">Looking for roommate to share 2BR apartment near downtown...</p>
                      <Button size="sm" className="mt-2">Send Message</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="provider" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Your Accommodation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="provider-state">State *</Label>
                    <Select value={providerData.state} onValueChange={(value) => 
                      setProviderData({...providerData, state: value})
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
                    <Label htmlFor="provider-city">City *</Label>
                    <Input
                      placeholder="Enter city name"
                      value={providerData.city}
                      onChange={(e) => setProviderData({...providerData, city: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    placeholder="Describe your accommodation..."
                    rows={4}
                    value={providerData.description}
                    onChange={(e) => setProviderData({...providerData, description: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handlePost}
                  className="w-full"
                  disabled={!providerData.state || !providerData.city}
                >
                  Post Accommodation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}