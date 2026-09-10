import { create } from 'zustand';

type LanguageState = {
  lang: 'en' | 'bn';
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'bn') => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: 'en',
  toggleLanguage: () => set((state) => ({ lang: state.lang === 'en' ? 'bn' : 'en' })),
  setLanguage: (lang) => set({ lang }),
}));
