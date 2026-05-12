'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ESewaPaymentButton from '@/components/payment/ESewaPaymentButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';

interface CartItem {
  id: number;
  title: string;
  price: number | string;
  quantity: number;
}

export default function CheckoutPage() {
     const { items, cartTotal, cartCount } =
        useCart();
        console.log('Cart Items:', items);

  const router = useRouter();
 
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subtotal = cartTotal
  const taxAmount = Math.round(subtotal * 0.13 * 100) / 100; // 13% VAT
  const deliveryCharge = 0;
  const serviceCharge = 0;
  const totalAmount = subtotal + taxAmount + deliveryCharge + serviceCharge;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#97A87A]"></div>
        </div>
      </div>
    );
  }

  if (items?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Add some products before proceeding to checkout.
          </p>
          <Link href="/products">
            <Button className="bg-[#97A87A] hover:bg-[#7a8d60] text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Billing Information</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">Rs. {(Number(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (13%)</span>
                <span>Rs. {taxAmount.toFixed(2)}</span>
              </div>
              {deliveryCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span>Rs. {deliveryCharge.toFixed(2)}</span>
                </div>
              )}
              {serviceCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Charge</span>
                  <span>Rs. {serviceCharge.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>Rs. {totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <ESewaPaymentButton
                amount={subtotal}
                taxAmount={taxAmount}
                serviceCharge={serviceCharge}
                deliveryCharge={deliveryCharge}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.address ||
                  !formData.city ||
                  !formData.postalCode
                }
              />
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  Back to Cart
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200 text-sm text-blue-700">
              <p className="font-semibold mb-2">Test Payment</p>
              <p className="text-xs">For testing, use eSewa ID: 9806800001</p>
              <p className="text-xs">Password: Nepal@123</p>
              <p className="text-xs">Token: 123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}