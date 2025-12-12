import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QrCode, Smartphone, CreditCard, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Payment</span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Make Payment
              </h1>
              <p className="text-muted-foreground">
                Scan the QR code with any UPI app to complete your payment
              </p>
            </div>

            {/* Payment Options */}
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-card mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  variant={showQR ? "hero" : "outline"}
                  onClick={() => setShowQR(true)}
                  className="flex-1"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  UPI QR Code
                </Button>
                <Button
                  variant={!showQR ? "hero" : "outline"}
                  onClick={() => setShowQR(false)}
                  className="flex-1"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  UPI ID
                </Button>
              </div>

              {showQR ? (
                <div className="text-center">
                  <div className="bg-white rounded-xl p-6 md:p-8 inline-block shadow-lg mb-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="text-blue-600 font-bold text-lg">Bank of India</div>
                      </div>
                      <p className="text-blue-600 font-semibold text-sm mb-1">BHIM BOI UPI QR</p>
                      <p className="text-blue-600 text-xs mb-4">SCAN HERE TO PAY WITH ANY BHIM UPI APP</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg inline-block mb-4">
                      <img
                        src="/qr-code.png"
                        alt="UPI QR Code"
                        className="w-64 h-64 md:w-80 md:h-80 mx-auto"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'w-64 h-64 md:w-80 md:h-80 mx-auto bg-gray-200 rounded-lg flex items-center justify-center';
                          fallback.innerHTML = '<p class="text-gray-500 text-sm">QR Code Image<br/>Please upload qr-code.png<br/>to /public folder</p>';
                          target.parentNode?.appendChild(fallback);
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground mb-1">MANU HOMEOPATHY CLINIC</p>
                      <p className="text-sm text-muted-foreground">boism-9901225074@boi</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">UPI</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xs">BHIM</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-green-600 text-sm font-medium">
                    Payment Through Any UPI APP Accepted Here
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-primary/5 rounded-xl p-6 md:p-8 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Smartphone className="w-6 h-6 text-primary" />
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        Pay via UPI ID
                      </h3>
                    </div>
                    <div className="bg-card rounded-lg p-4 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">UPI ID</p>
                      <p className="text-2xl font-bold text-foreground font-mono">
                        boism-9901225074@boi
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use this UPI ID in any UPI app (Google Pay, PhonePe, Paytm, etc.)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-secondary/30 rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                How to Pay
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Open any UPI app on your phone (Google Pay, PhonePe, Paytm, BHIM, etc.)</li>
                <li>{showQR ? "Scan the QR code above" : "Enter the UPI ID shown above"}</li>
                <li>Enter the payment amount</li>
                <li>Complete the payment</li>
                <li>Save the payment receipt for your records</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;

