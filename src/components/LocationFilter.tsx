import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, X } from "lucide-react";

interface LocationFilterProps {
  serviceName: string;
  onBack: () => void;
  onApplyFilters: (filters: LocationFilters) => void;
}

interface LocationFilters {
  country: string;
  state: string;
  city: string;
  distance: string;
}

const mockCountries = ["United States", "Canada", "United Kingdom"];
const mockStates = ["California", "New York", "Texas", "Florida"];
const mockCities = ["Los Angeles", "San Francisco", "San Diego", "Sacramento"];
const distanceOptions = ["50 miles", "100 miles", "200 miles", "State-wide", "Country-wide"];

export function LocationFilter({ serviceName, onBack, onApplyFilters }: LocationFilterProps) {
  const [filters, setFilters] = useState<LocationFilters>({
    country: "",
    state: "",
    city: "",
    distance: ""
  });

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const clearFilters = () => {
    setFilters({
      country: "",
      state: "",
      city: "",
      distance: ""
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-card">
        <div className="container py-6 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onBack}>
                <X className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">{serviceName}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container py-6 px-6">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-community-primary" />
              <span>Location & Distance Filters</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select value={filters.country} onValueChange={(value) => setFilters({...filters, country: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State */}
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Select value={filters.state} onValueChange={(value) => setFilters({...filters, state: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStates.map((state) => (
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
                <Select value={filters.city} onValueChange={(value) => setFilters({...filters, city: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCities.map((city) => (
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
                    variant={filters.distance === distance ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      filters.distance === distance 
                        ? "bg-community-primary hover:bg-community-primary-hover" 
                        : "hover:bg-community-primary/10"
                    }`}
                    onClick={() => setFilters({...filters, distance: distance})}
                  >
                    {distance}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
              <Button 
                onClick={handleApply}
                className="bg-community-primary hover:bg-community-primary-hover"
              >
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applied Filters Preview */}
        {activeFiltersCount > 0 && (
          <Card className="mt-4 bg-gradient-card">
            <CardContent className="pt-6">
              <h3 className="text-sm font-medium mb-3">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {filters.country && (
                  <Badge variant="secondary" className="bg-community-primary/10 text-community-primary">
                    Country: {filters.country}
                  </Badge>
                )}
                {filters.state && (
                  <Badge variant="secondary" className="bg-community-primary/10 text-community-primary">
                    State: {filters.state}
                  </Badge>
                )}
                {filters.city && (
                  <Badge variant="secondary" className="bg-community-primary/10 text-community-primary">
                    City: {filters.city}
                  </Badge>
                )}
                {filters.distance && (
                  <Badge variant="secondary" className="bg-community-primary/10 text-community-primary">
                    Distance: {filters.distance}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}