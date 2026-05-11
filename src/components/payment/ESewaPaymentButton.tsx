'use client';

import { prepareESewaPayment, ESEWA_CONFIG } from '@/lib/esewa';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ESewaPaymentButtonProps {
  amount: number;
  taxAmount?: number;
  serviceCharge?: number;
  deliveryCharge?: number;
  productName?: string;
  className?: string;
  disabled?: boolean;
}

export default function ESewaPaymentButton({
  amount,
  taxAmount = 0,
  serviceCharge = 0,
  deliveryCharge = 0,
  productName = 'Product',
  className = '',
  disabled = false,
}: ESewaPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);

    const successUrl = `'http://localhost:3000'}/payment/success`;
    const failureUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/payment/failure`;

    const paymentData = prepareESewaPayment(
      amount,
      taxAmount,
      serviceCharge,
      deliveryCharge,
      successUrl,
      failureUrl
    );

    // Create a form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = ESEWA_CONFIG.IS_PRODUCTION
      ? ESEWA_CONFIG.PRODUCTION_URL
      : ESEWA_CONFIG.SANDBOX_URL;

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value.toString();
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading || disabled}
      className="w-full bg-[#97A87A] hover:bg-[#7a8d60] text-white"
    >
      {isLoading ? 'Processing...' : 'Pay with eSewa'}
    </Button>
  );
}
