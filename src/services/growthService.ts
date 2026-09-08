import {
  BiExecutiveMetrics,
  CohortItem,
  SalesFunnelMetrics,
  AbandonedCartSummary,
  CrmLead,
  SupportTicketItem,
} from '../types';

export const growthService = {
  getBiKpis: async (): Promise<BiExecutiveMetrics> => {
    return {
      mrr: 2450000,
      arr: 29400000,
      active_subscribers: 1630,
      arpu: 1503,
      monthly_churn_rate_percentage: 2.4,
      customer_lifetime_value_ltv: 62625,
      customer_acquisition_cost_cac: 1850,
      ltv_to_cac_ratio: 33.8,
      net_revenue_retention_nrr: 108.5,
    };
  },

  getCohorts: async (): Promise<CohortItem[]> => {
    return [
      { cohort: '2026-03', size: 420, retention: [100, 78, 64, 58, 52, 49] },
      { cohort: '2026-04', size: 510, retention: [100, 81, 68, 61, 56] },
      { cohort: '2026-05', size: 580, retention: [100, 84, 71, 65] },
      { cohort: '2026-06', size: 640, retention: [100, 86, 74] },
      { cohort: '2026-07', size: 720, retention: [100, 88] },
      { cohort: '2026-08', size: 850, retention: [100] },
    ];
  },

  getFunnelMetrics: async (): Promise<SalesFunnelMetrics> => {
    return {
      total_visitors: 45000,
      overall_visitor_to_purchase_rate: 3.0,
      gross_funnel_revenue: 6748650,
      stages: [
        { stage: '1. Visitors', count: 45000, percentage_of_top: 100, drop_off_percentage: 0 },
        { stage: '2. Leads Captured', count: 9000, percentage_of_top: 20, drop_off_percentage: 80 },
        { stage: '3. Registrations', count: 4500, percentage_of_top: 10, drop_off_percentage: 50 },
        { stage: '4. Course Views', count: 3150, percentage_of_top: 7, drop_off_percentage: 30 },
        { stage: '5. Initiated Checkout', count: 1800, percentage_of_top: 4, drop_off_percentage: 42.8 },
        { stage: '6. Paid Customers', count: 1350, percentage_of_top: 3, drop_off_percentage: 25 },
      ],
    };
  },

  getCartRecoveryStats: async (): Promise<AbandonedCartSummary> => {
    return {
      total_abandoned_carts: 320,
      nudges_dispatched: 280,
      discounts_offered: 195,
      successfully_recovered_carts: 88,
      recovery_rate_percentage: 27.5,
      total_recovered_revenue_bdt: 439912,
    };
  },

  getLeads: async (): Promise<CrmLead[]> => {
    return [
      { id: 1, name: 'Shahadat Hossain', email: 'shahadat@test.com', phone: '01711223344', course_name: 'Full-Stack Web Development Masterclass', status: 'new_lead', lead_score: 85, created_at: '2 hours ago' },
      { id: 2, name: 'Farzana Rimi', email: 'farzana@test.com', phone: '01899112233', course_name: 'PostgreSQL Database Architecture', status: 'contacted', lead_score: 90, created_at: '4 hours ago' },
      { id: 3, name: 'Mahmudul Hasan', email: 'mahmud@test.com', phone: '01555112233', course_name: 'Full-Stack Web Development Masterclass', status: 'trial', lead_score: 95, created_at: '1 day ago' },
      { id: 4, name: 'Kazi Tanvir', email: 'kazi@test.com', phone: '01333112233', course_name: 'Modern DevOps & Cloud Architect', status: 'purchased', lead_score: 100, created_at: '2 days ago' },
    ];
  },

  getSupportTickets: async (): Promise<SupportTicketItem[]> => {
    return [
      {
        id: 1,
        ticket_number: 'TCK-88120',
        subject: 'bKash Transaction Completed but Course Unlocked Late',
        category: 'billing',
        priority: 'high',
        status: 'resolved',
        ai_suggested_reply: 'Automated reconciliation script confirmed bKash TrxID #8X992. Course enrollment has been immediately activated.',
        created_at: 'Yesterday',
      },
    ];
  },
};
