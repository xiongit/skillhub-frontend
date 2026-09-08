import { Coupon, Order } from '../types';

export const paymentService = {
  verifyCoupon: async (code: string): Promise<Coupon | null> => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SKILLHUB500') {
      return {
        id: 1,
        code: 'SKILLHUB500',
        type: 'fixed',
        value: 500,
        min_order_amount: 2000,
      };
    }
    if (cleanCode === 'PRODEV20') {
      return {
        id: 2,
        code: 'PRODEV20',
        type: 'percentage',
        value: 20,
        min_order_amount: 3000,
      };
    }
    return null;
  },

  processCheckout: async (
    courseId: number,
    gateway: string,
    couponCode?: string
  ): Promise<Order> => {
    return {
      id: Date.now(),
      uuid: `ord-${Date.now()}`,
      order_number: `ORD-${Date.now()}`,
      total_amount: 4499,
      currency: 'BDT',
      status: 'completed',
      payment_method: gateway as any,
    };
  },
};
