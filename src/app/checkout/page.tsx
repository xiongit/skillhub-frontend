'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Tag,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Lock,
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { paymentService } from '../../services/paymentService';
import { mockCourses } from '../../services/courseService';
import { Badge } from '../../components/common/Badge';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    course: storeCourse,
    coupon,
    applyCoupon,
    removeCoupon,
    selectedGateway,
    setSelectedGateway,
    calculateTotal,
  } = useCartStore();

  const course = storeCourse || mockCourses[0];
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const { subtotal, discount, finalTotal } = calculateTotal();
  const effectiveSubtotal = subtotal || course.pricing?.effective_price || 4999;
  const netTotal = Math.max(0, effectiveSubtotal - (discount || 0));

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const verified = await paymentService.verifyCoupon(couponInput);
    if (verified) {
      applyCoupon(verified);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try "SKILLHUB500"');
    }
  };

  const handlePay = async () => {
    setIsProcessing(true);
    await paymentService.processCheckout(course.id, selectedGateway, coupon?.code);
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-elevated text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Payment Successful!</h2>
          <p className="text-xs text-slate-500">
            You are officially enrolled in <strong className="text-slate-800">{course.title}</strong>. Access is active immediately.
          </p>
          <div className="pt-2">
            <Link
              href={`/learn/${course.slug}/server-components-layouts`}
              className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-600/20 flex items-center justify-center"
            >
              Start Learning First Lesson
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to course details
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout & Instant Enrollment
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Automated access granted immediately upon confirmation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Payment Gateways Selection (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Select Payment Method
            </span>

            <div className="space-y-3">
              {/* bKash */}
              <label
                onClick={() => setSelectedGateway('bkash')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedGateway === 'bkash'
                    ? 'border-pink-500 bg-pink-50/40 text-pink-900 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'bkash'}
                    onChange={() => {}}
                    className="text-pink-600 focus:ring-0"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">bKash Merchant Payment</span>
                    <span className="text-[11px] text-slate-500">Auto-redirect or bKash PIN verification</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-pink-600 bg-pink-100 px-2 py-0.5 rounded">
                  bKash
                </span>
              </label>

              {/* Nagad */}
              <label
                onClick={() => setSelectedGateway('nagad')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedGateway === 'nagad'
                    ? 'border-orange-500 bg-orange-50/40 text-orange-900 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'nagad'}
                    onChange={() => {}}
                    className="text-orange-600 focus:ring-0"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">Nagad Direct MFS</span>
                    <span className="text-[11px] text-slate-500">Instant OTP payment</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                  Nagad
                </span>
              </label>

              {/* SSLCommerz (Cards & Net Banking) */}
              <label
                onClick={() => setSelectedGateway('sslcommerz')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedGateway === 'sslcommerz'
                    ? 'border-blue-500 bg-blue-50/40 text-blue-900 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'sslcommerz'}
                    onChange={() => {}}
                    className="text-blue-600 focus:ring-0"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">SSLCommerz Gateway</span>
                    <span className="text-[11px] text-slate-500">Visa, Mastercard, City Bank, Brac Bank</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  Cards
                </span>
              </label>

              {/* Stripe (International) */}
              <label
                onClick={() => setSelectedGateway('stripe')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedGateway === 'stripe'
                    ? 'border-purple-500 bg-purple-50/40 text-purple-900 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="gateway"
                    checked={selectedGateway === 'stripe'}
                    onChange={() => {}}
                    className="text-purple-600 focus:ring-0"
                  />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">Stripe International</span>
                    <span className="text-[11px] text-slate-500">Pay from anywhere outside Bangladesh</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                  Stripe
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary & Coupon (1 col) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Order Summary
            </span>

            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-16 h-12 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 line-clamp-1 block">
                  {course.title}
                </span>
                <span className="text-[10px] text-slate-500">Lifetime Masterclass</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo Code (e.g. SKILLHUB500)"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono focus:outline-none focus:border-primary-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[10px] text-rose-600">{couponError}</p>}
              {coupon && (
                <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold pt-1">
                  <span>Coupon {coupon.code} Applied</span>
                  <button type="button" onClick={removeCoupon} className="text-slate-400 hover:text-rose-600">
                    ✕
                  </button>
                </div>
              )}
            </form>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>৳{effectiveSubtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-৳{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Amount</span>
                <span>৳{netTotal.toLocaleString()} BDT</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-600/20 transition-all flex items-center justify-center cursor-pointer disabled:opacity-70"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Pay ৳{netTotal.toLocaleString()} & Enroll
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
