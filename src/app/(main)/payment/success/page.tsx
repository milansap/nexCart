'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { decodeESewaResponse, verifyESewaSignature } from '@/lib/esewa';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const data = searchParams.get('data');

        if (!data) {
          setError('No payment data received');
          setIsVerifying(false);
          return;
        }

        // Decode the response
        const decodedData = decodeESewaResponse(data);

        // Verify signature
        const isValid = verifyESewaSignature(decodedData);

        if (!isValid) {
          setError('Payment signature verification failed');
          setIsVerifying(false);
          return;
        }

        // Verify with backend
        const verifyResponse = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        });

        const result = await verifyResponse.json();

        if (result.success) {
          setPaymentData(result);
        } else {
          setError(result.message || 'Payment verification failed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (isVerifying) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#97A87A]"></div>
            <p className="mt-4 text-gray-600">Verifying your payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-red-600 mb-4">⚠️</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/checkout">
              <Button className="bg-[#97A87A] hover:bg-[#7a8d60] text-white">
                Try Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Your payment has been completed successfully.
          </p>

          {paymentData && (
            <div className="bg-gray-50 p-4 rounded-lg mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">
                Transaction Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Code:</span>
                  <span className="font-mono font-semibold">
                    {paymentData.transactionCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">
                    Rs. {paymentData.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">
                    {paymentData.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-[#97A87A] hover:bg-[#7a8d60] text-white">
                View Order
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
