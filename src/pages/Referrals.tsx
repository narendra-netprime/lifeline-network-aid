import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Share2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function Referrals() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const referralCode = user?.id?.slice(0, 8).toUpperCase() || "USER1234";
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Your Referral Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Referral Code</label>
                <div className="flex gap-2 mt-1">
                  <Input value={referralCode} readOnly />
                  <Button size="icon" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Referral Link</label>
                <div className="flex gap-2 mt-1">
                  <Input value={referralLink} readOnly className="text-xs" />
                  <Button size="icon" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">0</div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$0</div>
                <p className="text-sm text-muted-foreground">Earnings</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}