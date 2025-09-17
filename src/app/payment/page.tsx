'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState('stripe');
  const [needInvoice, setNeedInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    companyName: '',
    taxId: '',
    billingEmail: '',
    billingAddress: ''
  });

  return (
    <div className="min-h-screen bg-[rgb(0,52,50)]">
      {/* Navigation Bar */}
      <nav className="bg-[rgb(0,52,50)] bg-opacity-95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 sm:h-24">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-white">Climate Seal</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#home" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300">
                Home
              </Link>
              <Link href="/#products" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300">
                Product
              </Link>
              <Link href="/#pricing" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300">
                Pricing
              </Link>
              <Link href="/#about" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300">
                About
              </Link>
              <Link href="/#contact" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-lg font-medium transition duration-300">
                Contact Us
              </Link>
              {/* User Login Button */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👤</span>
                </div>
                <span className="text-white text-lg">login</span>
              </div>
            </div>

            {/* Mobile Back Button */}
            <div className="md:hidden flex items-center">
              <Link href="/" className="text-white hover:text-yellow-400 transition duration-300">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-4 sm:mb-12">
          <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-xs sm:text-lg text-white opacity-90">
            Standard Plan - $98/month
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12">
          {/* Left Column - Payment Information */}
          <div className="bg-[#98a2f8] bg-opacity-20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-8 border border-[#98a2f8] border-opacity-30">
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-6">Payment Information</h2>
            
            {/* Payment Method Selection */}
            <div className="mb-4 sm:mb-8">
              <h3 className="text-sm sm:text-lg font-semibold text-white mb-2 sm:mb-4">Choose Payment Method</h3>
              <div className="space-y-2 sm:space-y-3">
                {/* Credit Card */}
                <label className="flex items-center p-2 sm:p-4 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={selectedPayment === 'credit-card'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-2 sm:mr-3 text-yellow-400"
                  />
                  <span className="text-black font-semibold text-sm sm:text-base">Credit / Debit Card</span>
                </label>

                {/* Stripe */}
                <label className="flex items-center p-2 sm:p-4 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={selectedPayment === 'stripe'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-2 sm:mr-3 text-yellow-400"
                  />
                  <span className="text-black font-semibold text-sm sm:text-base">Stripe</span>
                </label>

                {/* PayPal */}
                <label className="flex items-center p-2 sm:p-4 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={selectedPayment === 'paypal'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-2 sm:mr-3 text-yellow-400"
                  />
                  <span className="text-black font-semibold text-sm sm:text-base">PayPal</span>
                </label>

                {/* WeChat Pay */}
                <label className="flex items-center p-2 sm:p-4 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300">
                  <input
                    type="radio"
                    name="payment"
                    value="wechat"
                    checked={selectedPayment === 'wechat'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-2 sm:mr-3 text-yellow-400"
                  />
                  <span className="text-black font-semibold text-sm sm:text-base">WeChat Pay</span>
                </label>

                {/* Alipay */}
                <label className="flex items-center p-2 sm:p-4 bg-white bg-opacity-30 hover:bg-opacity-40 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300">
                  <input
                    type="radio"
                    name="payment"
                    value="alipay"
                    checked={selectedPayment === 'alipay'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-2 sm:mr-3 text-yellow-400"
                  />
                  <span className="text-black font-semibold text-sm sm:text-base">Alipay</span>
                </label>
              </div>
            </div>

            {/* Payment Form Based on Selection */}
            {selectedPayment === 'stripe' && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-lg font-semibold text-white mb-2 sm:mb-4">Stripe Payment</h3>
                <div className="p-3 sm:p-4 bg-white bg-opacity-50 rounded-lg">
                  <p className="text-black text-center text-xs sm:text-base">
                    Stripe integration is ready! <br/>
                    To complete setup, add your Stripe keys to .env.local
                  </p>
                </div>
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-[rgb(0,52,50)] py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-lg transition duration-300">
                  Pay with Stripe - $98
                </button>
                <p className="text-white opacity-70 text-xs text-center">
                  🔒 Secure payment powered by Stripe
                </p>
              </div>
            )}

            {selectedPayment === 'credit-card' && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-lg font-semibold text-black mb-2 sm:mb-4">Card Details</h3>
                <div>
                  <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none text-xs sm:text-base"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none text-xs sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none text-xs sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-50 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none text-xs sm:text-base"
                  />
                </div>
              </div>
            )}

            {selectedPayment === 'paypal' && (
              <div className="text-center p-4 sm:p-8">
                <div className="mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-6xl">🅿️</span>
                </div>
                <p className="text-black mb-3 sm:mb-4 text-xs sm:text-base">You will be redirected to PayPal to complete your payment</p>
                <button className="bg-[#0070ba] hover:bg-[#005ea6] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition duration-300 text-xs sm:text-base">
                  Continue with PayPal
                </button>
              </div>
            )}

            {selectedPayment === 'wechat' && (
              <div className="text-center p-4 sm:p-8">
                <h3 className="text-sm sm:text-lg font-semibold text-white mb-3 sm:mb-4">Scan QR Code to Pay</h3>
                <div className="w-32 sm:w-48 h-32 sm:h-48 bg-[#9ef894] rounded-lg mx-auto flex items-center justify-center mb-3 sm:mb-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">📱</div>
                    <span className="text-gray-800 text-xs sm:text-sm font-semibold">WeChat Pay QR</span>
                  </div>
                </div>
                <p className="text-black text-xs sm:text-sm">Open WeChat and scan to pay $98</p>
              </div>
            )}

            {selectedPayment === 'alipay' && (
              <div className="text-center p-4 sm:p-8">
                <h3 className="text-sm sm:text-lg font-semibold text-white mb-3 sm:mb-4">Scan QR Code to Pay</h3>
                <div className="w-32 sm:w-48 h-32 sm:h-48 bg-[#c2f5f7] rounded-lg mx-auto flex items-center justify-center mb-3 sm:mb-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">📱</div>
                    <span className="text-gray-800 text-xs sm:text-sm font-semibold">Alipay QR Code</span>
                  </div>
                </div>
                <p className="text-black text-xs sm:text-sm">Open Alipay and scan to pay $98</p>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-[#9ef894] bg-opacity-15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-8 border border-[#9ef894] border-opacity-25">
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-6">Order Summary</h2>
            
            {/* Product Details */}
            <div className="bg-white bg-opacity-40 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-black mb-1 sm:mb-2">Standard Plan</h3>
              <ul className="text-black text-xs sm:text-sm space-y-0.5 sm:space-y-1 opacity-90">
                <li>✓ 200 factor matching per month</li>
                <li>✓ Equivalent to 3-5 reports</li>
                <li>✓ Email support</li>
                <li>✓ Monthly billing</li>
              </ul>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between items-center">
                <span className="text-black text-xs sm:text-base">Standard Plan (Monthly)</span>
                <span className="text-black text-xs sm:text-base">$98.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black text-xs sm:text-base">Setup Fee</span>
                <span className="text-black text-xs sm:text-base">$0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black text-xs sm:text-base">Tax</span>
                <span className="text-black text-xs sm:text-base">$0.00</span>
              </div>
              <hr className="border-black border-opacity-30" />
              <div className="flex justify-between items-center font-bold text-sm sm:text-lg">
                <span className="text-black">Total</span>
                <span className="text-[rgb(0,52,50)] font-bold">$98.00</span>
              </div>
              <p className="text-black text-xs sm:text-sm opacity-70">Recurring monthly charge</p>
            </div>

            {/* Invoice Option */}
            <div className="mb-4 sm:mb-6">
              <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needInvoice}
                  onChange={(e) => setNeedInvoice(e.target.checked)}
                  className="mt-1 text-yellow-400"
                />
                <div>
                  <span className="text-black font-semibold text-xs sm:text-base">I need an invoice</span>
                  <p className="text-black text-xs sm:text-sm opacity-70">We&apos;ll send you a formal invoice for your records</p>
                </div>
              </label>
            </div>

            {/* Invoice Form */}
            {needInvoice && (
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-white bg-opacity-30 rounded-lg sm:rounded-xl">
                <h3 className="text-sm sm:text-lg font-semibold text-black">Invoice Details</h3>
                <div>
                  <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="Your Company Ltd."
                    value={invoiceData.companyName}
                    onChange={(e) => setInvoiceData(prev => ({...prev, companyName: e.target.value}))}
                    className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-60 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none text-xs sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">Tax ID / VAT Number</label>
                  <input
                    type="text"
                    placeholder="123456789"
                    value={invoiceData.taxId}
                    onChange={(e) => setInvoiceData(prev => ({...prev, taxId: e.target.value}))}
                    className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-60 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none text-xs sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">Billing Email</label>
                  <input
                    type="email"
                    placeholder="billing@company.com"
                    value={invoiceData.billingEmail}
                    onChange={(e) => setInvoiceData(prev => ({...prev, billingEmail: e.target.value}))}
                    className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-60 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none text-xs sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-black text-xs sm:text-sm font-medium mb-1 sm:mb-2">Billing Address</label>
                  <textarea
                    rows={2}
                    placeholder="123 Business St, City, Country"
                    value={invoiceData.billingAddress}
                    onChange={(e) => setInvoiceData(prev => ({...prev, billingAddress: e.target.value}))}
                    className="w-full p-2 sm:p-3 rounded-lg bg-white bg-opacity-60 text-black placeholder-gray-600 border border-black border-opacity-20 focus:border-yellow-600 focus:outline-none resize-none text-xs sm:text-base"
                  />
                </div>
              </div>
            )}

            {/* Payment Button */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-[rgb(0,52,50)] py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-lg transition duration-300 mb-3 sm:mb-4">
              {selectedPayment === 'credit-card' && 'Complete Payment'}
              {selectedPayment === 'stripe' && 'Pay with Stripe'}
              {selectedPayment === 'paypal' && 'Pay with PayPal'}
              {selectedPayment === 'wechat' && 'Pay with WeChat'}
              {selectedPayment === 'alipay' && 'Pay with Alipay'}
            </button>

            {/* Security Notice */}
            <p className="text-black opacity-70 text-xs sm:text-xs text-center">
              🔒 Secure payment powered by industry-leading encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}