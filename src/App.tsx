import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Profile Pages
import Profile from "./pages/Profile";
import Password from "./pages/Password";
import PaymentMethods from "./pages/PaymentMethods";
import Referrals from "./pages/Referrals";
import ContactUs from "./pages/ContactUs";

// Service Pages
import NewsPage from "./pages/service/NewsPage";
import AccommodationsPage from "./pages/service/AccommodationsPage";
import TravelPage from "./pages/service/TravelPage";
import ConfessionsPage from "./pages/service/ConfessionsPage";
import DealsPage from "./pages/service/DealsPage";
import EventsPage from "./pages/service/EventsPage";
import SecurePage from "./pages/service/SecurePage";
import MarketplacePage from "./pages/service/MarketplacePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Profile Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/contact-us" element={<ContactUs />} />
          
          {/* Service Routes */}
          <Route path="/service/news" element={<NewsPage />} />
          <Route path="/service/accommodations" element={<AccommodationsPage />} />
          <Route path="/service/travel" element={<TravelPage />} />
          <Route path="/service/confessions" element={<ConfessionsPage />} />
          <Route path="/service/deals" element={<DealsPage />} />
          <Route path="/service/events" element={<EventsPage />} />
          <Route path="/service/secure" element={<SecurePage />} />
          <Route path="/service/marketplace" element={<MarketplacePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
