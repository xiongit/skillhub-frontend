import { create } from 'zustand';
import { Course, Coupon } from '../types';

interface CartState {
  course: Course | null;
  coupon: Coupon | null;
  selectedGateway: 'bkash' | 'nagad' | 'sslcommerz' | 'stripe';
  setCourse: (course: Course) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  setSelectedGateway: (gateway: 'bkash' | 'nagad' | 'sslcommerz' | 'stripe') => void;
  calculateTotal: () => { subtotal: number; discount: number; finalTotal: number };
}

export const useCartStore = create<CartState>((set, get) => ({
  course: null,
  coupon: null,
  selectedGateway: 'bkash',

  setCourse: (course) => set({ course }),
  applyCoupon: (coupon) => set({ coupon }),
  removeCoupon: () => set({ coupon: null }),
  setSelectedGateway: (selectedGateway) => set({ selectedGateway }),

  calculateTotal: () => {
    const { course, coupon } = get();
    if (!course) return { subtotal: 0, discount: 0, finalTotal: 0 };

    const subtotal = course.pricing?.effective_price || 0;
    let discount = 0;

    if (coupon) {
      if (coupon.type === 'percentage') {
        discount = Math.round((subtotal * coupon.value) / 100);
      } else {
        discount = coupon.value;
      }
    }

    const finalTotal = Math.max(0, subtotal - discount);
    return { subtotal, discount, finalTotal };
  },
}));
