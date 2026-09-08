import { create } from 'zustand';
import { StudentNote, Bookmark } from '../types';

interface LearningState {
  currentVideoTime: number;
  completedLessonIds: number[];
  notes: StudentNote[];
  bookmarks: Bookmark[];
  isSidebarOpen: boolean;
  setCurrentVideoTime: (seconds: number) => void;
  markLessonCompleted: (lessonId: number) => void;
  addNote: (lessonId: number, content: string) => void;
  deleteNote: (noteId: string) => void;
  toggleBookmark: (courseId: number, courseTitle: string, lessonId: number, lessonTitle: string) => void;
  toggleSidebar: () => void;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  currentVideoTime: 0,
  completedLessonIds: [101],
  isSidebarOpen: true,
  notes: [
    {
      id: 'n-1',
      lesson_id: 101,
      timestamp_seconds: 145,
      content: 'Server components execute exclusively on the Node/Edge server runtime, meaning 0 client bundle overhead.',
      created_at: '2 hours ago',
    },
    {
      id: 'n-2',
      lesson_id: 101,
      timestamp_seconds: 320,
      content: 'Remember: add "use client" only when using hooks (useState, useEffect) or browser events.',
      created_at: '1 hour ago',
    },
  ],
  bookmarks: [
    {
      id: 'b-1',
      course_id: 1,
      lesson_id: 101,
      lesson_title: 'Introduction to Server Components & Layouts',
      course_title: 'Full-Stack Web Development with Next.js & Laravel',
      created_at: 'Yesterday',
    },
  ],

  setCurrentVideoTime: (seconds) => set({ currentVideoTime: seconds }),

  markLessonCompleted: (lessonId) =>
    set((state) => ({
      completedLessonIds: state.completedLessonIds.includes(lessonId)
        ? state.completedLessonIds
        : [...state.completedLessonIds, lessonId],
    })),

  addNote: (lessonId, content) => {
    const newNote: StudentNote = {
      id: `n-${Date.now()}`,
      lesson_id: lessonId,
      timestamp_seconds: Math.floor(get().currentVideoTime),
      content,
      created_at: 'Just now',
    };
    set((state) => ({ notes: [newNote, ...state.notes] }));
  },

  deleteNote: (noteId) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== noteId) })),

  toggleBookmark: (courseId, courseTitle, lessonId, lessonTitle) => {
    const existing = get().bookmarks.find((b) => b.lesson_id === lessonId);
    if (existing) {
      set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.lesson_id !== lessonId) }));
    } else {
      const newBookmark: Bookmark = {
        id: `b-${Date.now()}`,
        course_id: courseId,
        course_title: courseTitle,
        lesson_id: lessonId,
        lesson_title: lessonTitle,
        created_at: 'Just now',
      };
      set((state) => ({ bookmarks: [newBookmark, ...state.bookmarks] }));
    }
  },

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
