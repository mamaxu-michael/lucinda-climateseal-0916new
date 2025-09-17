'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const pi = searchParams.get('payment_intent');
    setPaymentIntent(pi);
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-white opacity-90">
          Thank you for subscribing to Climate Seal Standard Plan
        </p>
      </div>

      {paymentIntent && (
        <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
          <p className="text-white text-sm opacity-80">
            Payment ID: {paymentIntent}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <p className="text-white text-sm opacity-90">
          You will receive a confirmation email shortly with your subscription details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/"
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-[rgb(0,52,50)] py-3 px-6 rounded-lg font-semibold transition duration-300 text-center"
          >
            Back to Home
          </Link>
          <Link 
            href="/#contact"
            className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[rgb(0,52,50)] flex items-center justify-center">
      <Suspense fallback={
        <div className="max-w-md mx-auto p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl text-center">
          <div className="text-white">Loading...</div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}