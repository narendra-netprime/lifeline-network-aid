-- Create service providers table
CREATE TABLE public.service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN ('auto', 'health', 'legal')),
  provider_type TEXT NOT NULL, -- 'insurance_agent', 'doctor', 'attorney', 'mechanic', etc.
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  bio TEXT,
  experience_years INTEGER,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  profile_image TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create pricing plans table
CREATE TABLE public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  duration_minutes INTEGER NOT NULL,
  price_usd DECIMAL(10,2) NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create specializations table
CREATE TABLE public.provider_specializations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.service_providers(id) ON DELETE CASCADE,
  specialization TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_specializations ENABLE ROW LEVEL SECURITY;

-- Create policies for service providers
CREATE POLICY "Everyone can view service providers" ON public.service_providers
  FOR SELECT USING (true);

CREATE POLICY "Providers can update own profile" ON public.service_providers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create provider profile" ON public.service_providers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for pricing plans
CREATE POLICY "Everyone can view pricing plans" ON public.pricing_plans
  FOR SELECT USING (true);

CREATE POLICY "Providers can manage own pricing" ON public.pricing_plans
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.service_providers 
    WHERE id = provider_id AND user_id = auth.uid()
  ));

-- Create policies for specializations
CREATE POLICY "Everyone can view specializations" ON public.provider_specializations
  FOR SELECT USING (true);

CREATE POLICY "Providers can manage own specializations" ON public.provider_specializations
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.service_providers 
    WHERE id = provider_id AND user_id = auth.uid()
  ));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_service_providers_updated_at
  BEFORE UPDATE ON public.service_providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at
  BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.service_providers (service_type, provider_type, full_name, title, company, bio, experience_years, rating, total_reviews, phone, email, location) VALUES
('auto', 'insurance_agent', 'Sarah Johnson', 'Senior Auto Insurance Agent', 'Progressive Insurance', 'Specializing in comprehensive auto coverage for new immigrants and H1B holders', 8, 4.8, 127, '+1-555-0123', 'sarah.j@progressive.com', 'San Jose, CA'),
('auto', 'insurance_agent', 'Mike Chen', 'Auto Insurance Specialist', 'State Farm', 'Expert in finding affordable auto insurance solutions', 12, 4.9, 203, '+1-555-0124', 'mike.c@statefarm.com', 'Austin, TX'),
('health', 'insurance_agent', 'Dr. Priya Patel', 'Health Insurance Consultant', 'Anthem Blue Cross', 'Helping families navigate health insurance options', 10, 4.7, 189, '+1-555-0125', 'priya.p@anthem.com', 'Los Angeles, CA'),
('health', 'doctor', 'Dr. Amit Singh', 'Primary Care Physician', 'Community Health Center', 'Board-certified family medicine with cultural sensitivity', 15, 4.9, 312, '+1-555-0126', 'amit.s@chc.org', 'San Francisco, CA'),
('legal', 'attorney', 'Jennifer Rodriguez', 'Immigration Attorney', 'Rodriguez Law Firm', 'Specializing in H1B, EB-2, and family-based immigration', 18, 4.8, 156, '+1-555-0127', 'j.rodriguez@lawfirm.com', 'New York, NY'),
('legal', 'attorney', 'David Kim', 'Employment Law Attorney', 'Kim & Associates', 'Expert in workplace rights and visa-related employment issues', 14, 4.6, 98, '+1-555-0128', 'd.kim@associates.com', 'Seattle, WA');

-- Insert sample pricing plans
INSERT INTO public.pricing_plans (provider_id, duration_minutes, price_usd, description) VALUES
((SELECT id FROM public.service_providers WHERE full_name = 'Sarah Johnson'), 30, 50.00, 'Initial consultation'),
((SELECT id FROM public.service_providers WHERE full_name = 'Sarah Johnson'), 60, 90.00, 'Comprehensive policy review'),
((SELECT id FROM public.service_providers WHERE full_name = 'Mike Chen'), 30, 45.00, 'Quick consultation'),
((SELECT id FROM public.service_providers WHERE full_name = 'Mike Chen'), 60, 80.00, 'Full insurance assessment'),
((SELECT id FROM public.service_providers WHERE full_name = 'Dr. Priya Patel'), 30, 60.00, 'Health plan consultation'),
((SELECT id FROM public.service_providers WHERE full_name = 'Dr. Priya Patel'), 45, 85.00, 'Family coverage planning'),
((SELECT id FROM public.service_providers WHERE full_name = 'Dr. Amit Singh'), 30, 75.00, 'Telemedicine consultation'),
((SELECT id FROM public.service_providers WHERE full_name = 'Dr. Amit Singh'), 60, 120.00, 'Comprehensive health assessment'),
((SELECT id FROM public.service_providers WHERE full_name = 'Jennifer Rodriguez'), 30, 150.00, 'Immigration case review'),
((SELECT id FROM public.service_providers WHERE full_name = 'Jennifer Rodriguez'), 60, 250.00, 'Full legal consultation'),
((SELECT id FROM public.service_providers WHERE full_name = 'David Kim'), 30, 120.00, 'Employment law consultation'),
((SELECT id FROM public.service_providers WHERE full_name = 'David Kim'), 60, 200.00, 'Detailed case analysis');