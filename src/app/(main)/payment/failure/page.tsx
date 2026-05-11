'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason') || 'Your payment could not be processed';

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-8">{reason}</p>

          <div className="bg-red-50 p-4 rounded-lg mb-8 border border-red-200">
            <p className="text-sm text-red-600">
              Your transaction was not completed. Please check your eSewa account
              or try again with a different payment method.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link href="/checkout" className="w-full sm:w-auto">
              <Button className="bg-[#97A87A] hover:bg-[#7a8d60] text-white w-full">
                Try Again
              </Button>
            </Link>
            <Link href="/products" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            If you continue to experience issues, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
