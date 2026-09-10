import { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: 1,
    uuid: 'c-101',
    title: 'London Driving Theory Test Course',
    slug: 'london-driving-theory',
    subtitle: 'The ultimate intensive course to guarantee your pass in the UK Driving Theory Test.',
    description:
      'We are proud to provide a professionally structured all-inclusive, intensive course for your driving theory test training and preparation. What\'s more, if you don\'t pass 1st time we will book and pay for all future resits!',
    level: 'beginner',
    language: 'English/Bangla',
    thumbnail_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop',
    promo_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    status: 'published',
    total_duration_minutes: 240,
    total_lessons_count: 14,
    enrollment_count: 5200,
    average_rating: 4.98,
    reviews_count: 1205,
    category: { id: 1, name: 'Driving Test', slug: 'driving-test' },
    pricing: { price: 99, discount_price: 99, effective_price: 99, is_free: false, currency: '£' },
    instructors: [
      {
        id: 1,
        name: 'Theory Pass Master',
        avatar_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200',
        headline: 'Professional Driving Instructors',
        bio: 'Experts with decades of experience helping students pass their driving theory tests first time.',
        is_primary: true,
      },
    ],
    requirements: [
      'Provisional Driving License',
      'Desire to pass the test on the first try',
    ],
    learning_outcomes: [
      'Master all sections of the UK Driving Theory Test',
      'Understand complex road signs and regulations',
      'Pass the hazard perception test with ease',
      'Guaranteed pass or we pay for your resit',
    ],
    modules: [
      {
        id: 1,
        course_id: 1,
        title: 'Module 1: Vehicle Controls & Basics',
        sort_order: 1,
        lessons: [
          {
            id: 101, module_id: 1, type: 'video', duration_minutes: 12, sort_order: 1, is_free_preview: true, is_completed: true,
            title: '1.1 Automatic Car Driving Basics - Learn in Simple Steps',
            slug: 'automatic-car-basics',
            video_url: 'https://www.youtube.com/watch?v=0Vb4D8HLnKc', video_duration_seconds: 720,
          },
          {
            id: 102, module_id: 1, type: 'video', duration_minutes: 8, sort_order: 2, is_free_preview: true, is_completed: false,
            title: '1.2 How to Use Windshield Wipers/Wiper Controls',
            slug: 'windshield-wipers-controls',
            video_url: 'https://www.youtube.com/watch?v=g2WS0EArA6o', video_duration_seconds: 480,
          },
          {
            id: 103, module_id: 1, type: 'video', duration_minutes: 5, sort_order: 3, is_free_preview: false, is_completed: false,
            title: '1.3 How to Use Hand Signals | Hand Signals Guide',
            slug: 'hand-signals-guide',
            video_url: 'https://www.youtube.com/watch?v=FqBygOM-oQU', video_duration_seconds: 300,
          },
          {
            id: 104, module_id: 1, type: 'video', duration_minutes: 10, sort_order: 4, is_free_preview: false, is_completed: false,
            title: '1.4 Lane Positioning: How to Keep Your Car Centered',
            slug: 'lane-positioning',
            video_url: 'https://www.youtube.com/watch?v=hAfJsmWO-gQ', video_duration_seconds: 600,
          },
          {
            id: 105, module_id: 1, type: 'quiz', duration_minutes: 15, sort_order: 5, is_free_preview: false, is_completed: false,
            title: 'Module 1 Knowledge Check Quiz',
            slug: 'module-1-knowledge-check-quiz',
            quiz: {
              id: 1,
              lesson_id: 105,
              title: 'Module 1 Knowledge Check Quiz',
              passing_score_percentage: 75,
              questions: [
                {
                  id: 1,
                  question_text: "You're turning right onto a dual carriageway. What should you do before emerging?",
                  question_text_bn: "আপনি একটি ডুয়াল ক্যারেজওয়েতে ডান দিকে মোড় নিচ্ছেন। মূল রাস্তায় ওঠার আগে আপনার কী করা উচিত?",
                  options: [
                    { id: 1, option_text: "Position your vehicle well to the left of the side road", option_text_bn: "পার্শ্ব সড়কের বাম দিকে ভালোভাবে আপনার গাড়ি অবস্থান করান", is_correct: false },
                    { id: 2, option_text: "Stop, apply the parking brake and then select a low gear", option_text_bn: "পার্কিং ব্রেক প্রয়োগ করুন এবং তারপরে একটি নিচু গিয়ার দিন", is_correct: false },
                    { id: 3, option_text: "Give an arm signal as well as using your indicators", option_text_bn: "ইন্ডিকেটর ব্যবহারের পাশাপাশি হাতের ইশারায় সংকেত দিন", is_correct: false },
                    { id: 4, option_text: "Check that the central reservation is wide enough for your vehicle", option_text_bn: "যাচাই করুন যে কেন্দ্রীয় ডিভাইডার বা সংরক্ষিত মধ্যবর্তী স্থানটি আপনার গাড়ির জন্য যথেষ্ট প্রশস্ত কি না", is_correct: true },
                  ],
                },
                {
                  id: 2,
                  question_text: "What should you do before making a U-turn?",
                  question_text_bn: "ইউ-টার্ন বা উল্টো দিকে মোড় নেওয়ার আগে আপনার কী করা উচিত?",
                  options: [
                    { id: 5, option_text: "Give an arm signal as well as using your indicators", option_text_bn: "ইন্ডিকেটর ব্যবহারের পাশাপাশি হাতের ইশারায় সংকেত দিন", is_correct: false },
                    { id: 6, option_text: "Check road markings to see that U-turns are permitted", option_text_bn: "যাচাই করুন যে ইউ-টার্ন নেওয়ার অনুমতি আছে কিনা", is_correct: false },
                    { id: 7, option_text: "Look over your shoulder for a final check", option_text_bn: "শেষ মুহূর্তের চেকের জন্য আপনার কাঁধের ওপর দিয়ে পেছনে তাকিয়ে দেখে নিন", is_correct: true },
                    { id: 8, option_text: "Select a higher gear than normal", option_text_bn: "অন্যান্য চালকদের সাথে মিল রাখার জন্য স্বাভাবিকের চেয়ে উচ্চ গিয়ার সিলেক্ট করুন", is_correct: false },
                  ],
                },
                {
                  id: 3,
                  question_text: "Why should you switch your headlights on when it first starts to get dark?",
                  question_text_bn: "সন্ধ্যা নামতে শুরু করলেই কেন আপনার হেডলাইট জ্বালানো উচিত?",
                  options: [
                    { id: 9, option_text: "To make your dials easier to see", option_text_bn: "গাড়ির ড্যাশবোর্ড বা ডায়ালগুলো সহজে দেখার জন্য", is_correct: false },
                    { id: 10, option_text: "So that you blend in with other drivers", option_text_bn: "যাতে আপনি অন্য ড্রাইভারদের সাথে মিশে যেতে পারেন", is_correct: false },
                    { id: 11, option_text: "Because the street lights are lit", option_text_bn: "কারণ রাস্তার বাতিগুলো জ্বালানো হয়েছে", is_correct: false },
                    { id: 12, option_text: "So others can see you more easily", option_text_bn: "যাতে অন্য চালকরা আপনাকে আরও সহজে দেখতে পায়", is_correct: true },
                  ],
                }
              ]
            }
          },
        ],
      },
      {
        id: 2,
        course_id: 1,
        title: 'Module 2: Road Rules & Signs',
        sort_order: 2,
        lessons: [
          {
            id: 201, module_id: 2, type: 'video', duration_minutes: 15, sort_order: 1, is_free_preview: false, is_completed: false,
            title: '2.1 Confused by Road Signs? Watch This Before Your Test',
            slug: 'confused-road-signs',
            video_url: 'https://www.youtube.com/watch?v=3d4Kfirg7KY', video_duration_seconds: 900,
          },
          {
            id: 202, module_id: 2, type: 'video', duration_minutes: 11, sort_order: 2, is_free_preview: false, is_completed: false,
            title: '2.2 Learning Traffic Signs/Road Signs With their Meanings',
            slug: 'learning-traffic-signs',
            video_url: 'https://www.youtube.com/watch?v=fMIGRMVY4nQ', video_duration_seconds: 660,
          },
          {
            id: 203, module_id: 2, type: 'video', duration_minutes: 9, sort_order: 3, is_free_preview: false, is_completed: false,
            title: '2.3 Zipper Merge Demonstration / How to Merge Properly',
            slug: 'zipper-merge-demonstration',
            video_url: 'https://www.youtube.com/watch?v=-LycUhiiZ9Q', video_duration_seconds: 540,
          },
          {
            id: 204, module_id: 2, type: 'video', duration_minutes: 7, sort_order: 4, is_free_preview: false, is_completed: false,
            title: '2.4 Railroad Safety: The One Mistake That Could Cost Your Life',
            slug: 'railroad-safety',
            video_url: 'https://www.youtube.com/watch?v=fQD7xbXEUzs', video_duration_seconds: 420,
          },
          {
            id: 205, module_id: 2, type: 'video', duration_minutes: 25, sort_order: 5, is_free_preview: false, is_completed: false,
            title: '2.5 DMV Permit Practice Test – Real Questions & Answers',
            slug: 'dmv-permit-practice-test',
            video_url: 'https://www.youtube.com/watch?v=-1qX1l4opuA', video_duration_seconds: 1500,
          },
          {
            id: 206, module_id: 2, type: 'quiz', duration_minutes: 15, sort_order: 6, is_free_preview: false, is_completed: false,
            title: 'Module 2 Knowledge Check Quiz',
            slug: 'module-2-knowledge-check-quiz',
            quiz: {
              id: 2,
              lesson_id: 206,
              title: 'Module 2 Knowledge Check Quiz',
              passing_score_percentage: 75,
              questions: [
                {
                  id: 4,
                  question_text: "What should you do if you cannot see clearly behind when you're reversing?",
                  question_text_bn: "গাড়ি রিভার্স করার সময় যদি আপনি পেছনে পরিষ্কার দেখতে না পান, তবে আপনার কী করা উচিত?",
                  options: [
                    { id: 13, option_text: "Open the window to look behind", option_text_bn: "পেছনে দেখার জন্য জানালা খুলুন", is_correct: false },
                    { id: 14, option_text: "Look in the nearside mirror", option_text_bn: "কাছের আয়নায় দেখুন", is_correct: false },
                    { id: 15, option_text: "Ask someone to guide you", option_text_bn: "কাউকে আপনাকে পথ দেখিয়ে বা সাহায্য করতে বলুন", is_correct: true },
                    { id: 16, option_text: "Give a signal after moving off", option_text_bn: "গাড়ি ছাড়ার পরে সংকেত দিন", is_correct: false },
                  ],
                },
                {
                  id: 5,
                  question_text: "What should you do when you're approaching traffic lights that have been green for some time?",
                  question_text_bn: "কিছু সময় ধরে সবুজ হয়ে থাকা ট্রাফিক লাইটের দিকে এগিয়ে যাওয়ার সময় আপনার কী করা উচিত?",
                  options: [
                    { id: 17, option_text: "Be ready to stop", option_text_bn: "থামার জন্য প্রস্তুত থাকুন", is_correct: true },
                    { id: 18, option_text: "Maintain your speed", option_text_bn: "আপনার গতি বজায় রাখুন", is_correct: false },
                    { id: 19, option_text: "Accelerate hard", option_text_bn: "দ্রুত গতি বাড়িয়ে দিন", is_correct: false },
                    { id: 20, option_text: "Brake hard", option_text_bn: "জোরে ব্রেক করুন", is_correct: false },
                  ],
                },
                {
                  id: 6,
                  question_text: "What should you do if your mobile phone rings while you're driving or riding?",
                  question_text_bn: "গাড়ি বা মোটরসাইকেল চালানোর সময় আপনার মোবাইল ফোন বাজলে আপনার কী করা উচিত?",
                  options: [
                    { id: 21, option_text: "Leave it until you have stopped in a safe place", option_text_bn: "নিরাপদ স্থানে গাড়ি থামানো পর্যন্ত ফোনটি ধরবেন না", is_correct: true },
                    { id: 22, option_text: "Answer it immediately", option_text_bn: "তাৎক্ষণিকভাবে ফোনটির উত্তর দিন", is_correct: false },
                    { id: 23, option_text: "Stop immediately", option_text_bn: "সাথে সাথে থেমে যান", is_correct: false },
                    { id: 24, option_text: "Pull up at the nearest kerb", option_text_bn: "নিকটতম রাস্তার ধারের ফুটপাথে গাড়ি থামান", is_correct: false },
                  ],
                },
                {
                  id: 7,
                  question_text: "What's likely to happen if you use a hands-free phone while you're driving?",
                  question_text_bn: "ড্রাইভিং করার সময় হ্যান্ডস-ফ্রি ফোন ব্যবহার করলে কী হতে পারে?",
                  options: [
                    { id: 25, option_text: "It will divert your attention", option_text_bn: "এটি আপনার মনোযোগ অন্যদিকে সরিয়ে নেবে", is_correct: true },
                    { id: 26, option_text: "It will increase your concentration", option_text_bn: "এটি আপনার মনোযোগ বৃদ্ধি করবে", is_correct: false },
                    { id: 27, option_text: "It will improve your safety", option_text_bn: "এটি আপনার নিরাপত্তা উন্নত করবে", is_correct: false },
                    { id: 28, option_text: "It will reduce your view", option_text_bn: "এটি আপনার দেখার পরিসর কমিয়ে দেবে", is_correct: false },
                  ],
                }
              ]
            }
          },
        ],
      },
      {
        id: 3,
        course_id: 1,
        title: 'Module 3: Parking, Turning & Maneuvers',
        sort_order: 3,
        lessons: [
          {
            id: 301, module_id: 3, type: 'video', duration_minutes: 14, sort_order: 1, is_free_preview: false, is_completed: false,
            title: "3.1 Don't Scratch Your Car! Perfect Parking Technique",
            slug: 'perfect-parking-technique',
            video_url: 'https://www.youtube.com/watch?v=-Hv4pJjjZpY', video_duration_seconds: 840,
          },
          {
            id: 302, module_id: 3, type: 'video', duration_minutes: 10, sort_order: 2, is_free_preview: false, is_completed: false,
            title: '3.2 Reverse Parking with Cones // Reverse Park Step by Step',
            slug: 'reverse-parking-cones',
            video_url: 'https://www.youtube.com/watch?v=e2_YNNtdke8', video_duration_seconds: 600,
          },
          {
            id: 303, module_id: 3, type: 'video', duration_minutes: 18, sort_order: 3, is_free_preview: false, is_completed: false,
            title: '3.3 How to Turn Right & Left Properly // Turning References',
            slug: 'turn-right-left-properly',
            video_url: 'https://www.youtube.com/watch?v=z-6hdcaOAPc', video_duration_seconds: 1080,
          },
          {
            id: 304, module_id: 3, type: 'video', duration_minutes: 8, sort_order: 4, is_free_preview: false, is_completed: false,
            title: '3.4 Stop Doing This! 5 Driving Habits Destroying Your Car',
            slug: 'driving-habits-destroying-car',
            video_url: 'https://www.youtube.com/watch?v=J98OjpL2PTQ', video_duration_seconds: 480,
          },
          {
            id: 305, module_id: 3, type: 'quiz', duration_minutes: 15, sort_order: 5, is_free_preview: false, is_completed: false,
            title: 'Module 3 Knowledge Check Quiz',
            slug: 'module-3-knowledge-check-quiz',
            quiz: {
              id: 3,
              lesson_id: 305,
              title: 'Module 3 Knowledge Check Quiz',
              passing_score_percentage: 75,
              questions: [
                {
                  id: 8,
                  question_text: "What should you do before slowing down or stopping your vehicle?",
                  question_text_bn: "আপনার গাড়ি ধীর করার বা থামানোর আগে আপনার কী করা উচিত?",
                  options: [
                    { id: 29, option_text: "Use the mirrors", option_text_bn: "আয়না ব্যবহার করুন / পেছনের অবস্থা দেখুন", is_correct: true },
                    { id: 30, option_text: "Select a higher gear", option_text_bn: "উচ্চতর গিয়ার নির্বাচন করুন", is_correct: false },
                    { id: 31, option_text: "Sound your horn as you pass", option_text_bn: "অতিক্রম করার সময় হর্ন বাজান", is_correct: false },
                    { id: 32, option_text: "Flash the headlights", option_text_bn: "হেডলাইটের আলো ফ্ল্যাশ করুন", is_correct: false },
                  ],
                },
                {
                  id: 9,
                  question_text: "What does the term 'blind spot' mean?",
                  question_text_bn: "'ব্লাইন্ড স্পট' (অদৃশ্য ক্ষেত্র) শব্দটির অর্থ কী?",
                  options: [
                    { id: 33, option_text: "An area not visible to the driver", option_text_bn: "যে এলাকা চালকের চোখে দৃশ্যমান নয়", is_correct: true },
                    { id: 34, option_text: "An area covered by your right-hand mirror", option_text_bn: "আপনার ডান পাশের আয়না দ্বারা কভার করা একটি এলাকা", is_correct: false },
                    { id: 35, option_text: "An area covered by your left-hand mirror", option_text_bn: "আপনার বাম পাশের আয়না দ্বারা কভার করা একটি এলাকা", is_correct: false },
                    { id: 36, option_text: "An area not covered by your headlights", option_text_bn: "আপনার হেডলাইটের আলোয় দেখা যায় না এমন একটি এলাকা", is_correct: false },
                  ],
                },
                {
                  id: 10,
                  question_text: "You're following a large vehicle. Why should you stay a safe distance behind it?",
                  question_text_bn: "আপনি একটি বড় গাড়ির পেছনে গাড়ি চালাচ্ছেন। কেন আপনার এর পেছনে একটি নিরাপদ দূরত্ব বজায় রেখে চলা উচিত?",
                  options: [
                    { id: 37, option_text: "You'll give the driver a chance to see you in their mirrors", option_text_bn: "ড্রাইভারকে তার আয়নায় আপনাকে দেখার সুযোগ করে দেবেন", is_correct: true },
                    { id: 38, option_text: "You'll help the large vehicle to stop more easily", option_text_bn: "বড় গাড়িটিকে আরও সহজে থামতে সাহায্য করবেন", is_correct: false },
                    { id: 39, option_text: "You'll be able to corner more quickly", option_text_bn: "আপনি আরও দ্রুত মোড় নিতে পারবেন", is_correct: false },
                    { id: 40, option_text: "To assess how your actions will affect the traffic behind", option_text_bn: "আপনার কাজের ফলে পেছনের ট্রাফিকে কেমন প্রভাব পড়বে তা মূল্যায়ন করার জন্য", is_correct: false },
                  ],
                }
              ]
            }
          },
        ],
      },
    ],
  },
];

import api from '../lib/api';

export const courseService = {
  getCourses: async (search = '', category = '', level = ''): Promise<Course[]> => {
    try {
      const res = await api.get('/courses', { params: { search, category, level } });
      return res.data.data || [];
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      // Fallback for demo purposes if backend is down
      let filtered = [...mockCourses];
      if (search) filtered = filtered.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
      if (category) filtered = filtered.filter((c) => c.category?.slug === category);
      if (level && level !== 'all') filtered = filtered.filter((c) => c.level === level);
      return filtered;
    }
  },

  getCourseBySlug: async (slug: string): Promise<Course | null> => {
    try {
      const res = await api.get(`/courses/${slug}`);
      return res.data.data;
    } catch (err) {
      console.error('Failed to fetch course by slug:', err);
      return mockCourses.find((c) => c.slug === slug) || mockCourses[0];
    }
  },
};
