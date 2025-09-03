import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentMethods() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Manage Payment Methods</CardTitle>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Payment Method
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No payment methods added</h3>
              <p className="text-muted-foreground mb-4">
                Add a payment method to make purchases and bookings
              </p>
              <Button>Add Your First Payment Method</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}