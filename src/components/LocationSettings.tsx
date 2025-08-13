import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Save } from "lucide-react";

interface LocationPreferences {
  state: string;
  city: string;
  distance: string;
}

interface LocationSettingsProps {
  onSave: (preferences: LocationPreferences) => void;
  currentPreferences?: LocationPreferences;
}

// US States
const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

// Mock cities for selected states
const mockCities: Record<string, string[]> = {
  "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
  "New York": ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany"],
  "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"]
};

const distanceOptions = ["25 miles", "50 miles", "100 miles", "200 miles", "State-wide"];

export function LocationSettings({ onSave, currentPreferences }: LocationSettingsProps) {
  const [preferences, setPreferences] = useState<LocationPreferences>(
    currentPreferences || {
      state: "",
      city: "",
      distance: ""
    }
  );

  const handleSave = () => {
    onSave(preferences);
  };

  const availableCities = preferences.state ? mockCities[preferences.state] || [] : [];

  return (
    <Card className="bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-community-primary" />
          <span>Location Preferences</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Set your location to see relevant posts and services in your area
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* State */}
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Select 
              value={preferences.state} 
              onValueChange={(value) => setPreferences({...preferences, state: value, city: ""})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {usStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Select 
              value={preferences.city} 
              onValueChange={(value) => setPreferences({...preferences, city: value})}
              disabled={!preferences.state}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Distance Range</label>
          <div className="flex flex-wrap gap-2">
            {distanceOptions.map((distance) => (
              <Badge
                key={distance}
                variant={preferences.distance === distance ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  preferences.distance === distance 
                    ? "bg-community-primary hover:bg-community-primary-hover" 
                    : "hover:bg-community-primary/10"
                }`}
                onClick={() => setPreferences({...preferences, distance: distance})}
              >
                {distance}
              </Badge>
            ))}
          </div>
        </div>

        {/* Current Settings Preview */}
        {(preferences.state || preferences.city || preferences.distance) && (
          <div className="p-4 bg-community-primary/5 rounded-lg border border-community-primary/20">
            <h4 className="text-sm font-medium mb-2">Current Settings:</h4>
            <div className="flex flex-wrap gap-2">
              {preferences.state && (
                <Badge variant="secondary" className="bg-community-primary/10 text-community-primary">
                  State: {preferences.state}
                </Badge>
              )}
              {preferences.city && (
                <Badge variant="secondary" className="bg-community-primary/10 text-community-primary">
                  City: {preferences.city}
                </Badge>
              )}
              {preferences.distance && (
                <Badge variant="secondary" className="bg-community-primary/10 text-community-primary">
                  Range: {preferences.distance}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full bg-community-primary hover:bg-community-primary-hover"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Location Preferences
        </Button>
      </CardContent>
    </Card>
  );
}