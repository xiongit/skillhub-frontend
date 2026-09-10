import { create } from 'zustand';

export interface SiteSettings {
  site_title: string;
  tagline: string;
  logo_type: 'icon' | 'image';
  logo_icon: string;
  logo_image_url: string;
  logo_bg_color: string;
  footer_desc: string;
  footer_email: string;
  footer_phone: string;
  footer_address: string;
  copyright_text: string;
  terms_url: string;
  privacy_url: string;
  adi_terms_url: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
}

export const defaultSiteSettings: SiteSettings = {
  site_title: 'Theory Pass Master',
  tagline: 'Leading the race to ensure the best possible tuition in driving theory test preparation in London.',
  logo_type: 'icon',
  logo_icon: 'Car',
  logo_image_url: '',
  logo_bg_color: '#2563eb',
  footer_desc: 'Leading the race to ensure the best possible tuition in driving theory test preparation in London.',
  footer_email: 'action@myintensivecourse.com',
  footer_phone: '0333 014 7072',
  footer_address: "London Driving Center\n14 Talbot Road\nSA13 1DH",
  copyright_text: 'Theory Pass Master. All Rights Reserved.',
  terms_url: '/terms',
  privacy_url: '/privacy',
  adi_terms_url: '/adi-terms',
  facebook_url: 'https://facebook.com',
  twitter_url: 'https://twitter.com',
  instagram_url: 'https://instagram.com',
  youtube_url: 'https://youtube.com',
};

interface SettingsStore {
  settings: SiteSettings;
  isLoaded: boolean;
  fetchSettings: () => Promise<void>;
  updateLocalSettings: (newSettings: Partial<SiteSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: defaultSiteSettings,
  isLoaded: false,

  fetchSettings: async () => {
    // 1. Try fetching from Backend API first with cache: 'no-store'
    const endpoints = [
      'http://127.0.0.1:8000/api/v1/settings',
      'http://localhost:8000/api/v1/settings',
    ];

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json?.data) {
            set({ settings: { ...defaultSiteSettings, ...json.data }, isLoaded: true });
            if (typeof window !== 'undefined') {
              localStorage.setItem('skillmaster_site_settings', JSON.stringify(json.data));
            }
            return;
          }
        }
      } catch (err) {
        // try next endpoint
      }
    }

    // 2. Fallback to localStorage cached settings if backend unreachable
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('skillmaster_site_settings');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          set({ settings: { ...defaultSiteSettings, ...parsed }, isLoaded: true });
          return;
        } catch (e) {
          console.error(e);
        }
      }
    }
    set({ isLoaded: true });
  },

  updateLocalSettings: (newSettings) => {
    set((state) => {
      const updated = { ...state.settings, ...newSettings };
      if (typeof window !== 'undefined') {
        localStorage.setItem('skillmaster_site_settings', JSON.stringify(updated));
      }
      return { settings: updated };
    });
  },
}));
