'use client';

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { DiscussionPost } from '../../../types';
import { Badge } from '../../../components/common/Badge';

const initialPosts: DiscussionPost[] = [
  {
    id: 1,
    user_name: 'Ariful Islam',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content:
      'In Module 1.1, how does the Next.js 15 App Router handle client navigation caching compared to Next.js 14?',
    created_at: '2 hours ago',
    likes_count: 8,
    replies: [
      {
        id: 101,
        user_name: 'Hasin Hayder (Instructor)',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        content:
          'Great question! In Next.js 15, the Client Router Cache for dynamic pages is no longer cached by default (staleTime is 0), ensuring the freshest data on page navigations.',
        created_at: '1 hour ago',
      },
    ],
  },
  {
    id: 2,
    user_name: 'Nusrat Jahan',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    content:
      'Should we always use the Service-Repository pattern in Laravel 12 for small microservices or only for large applications?',
    created_at: '5 hours ago',
    likes_count: 5,
    replies: [],
  },
];

export default function StudentCommunityPage() {
  const [posts, setPosts] = useState<DiscussionPost[]>(initialPosts);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newPost: DiscussionPost = {
      id: Date.now(),
      user_name: 'Tanvir Hossain',
      content: newQuestionText,
      created_at: 'Just now',
      likes_count: 0,
      replies: [],
    };
    setPosts([newPost, ...posts]);
    setNewQuestionText('');
  };

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
      setPosts(
        posts.map((p) => (p.id === postId ? { ...p, likes_count: p.likes_count - 1 } : p))
      );
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(
        posts.map((p) => (p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Community Q&A & Discussion Hub
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Ask code questions, discuss architecture, and get answers from instructors and mentors.
        </p>
      </div>

      {/* Ask Question Box */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card space-y-3">
        <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
          Ask a Question to the Instructors
        </h3>
        <form onSubmit={handleCreatePost} className="space-y-2">
          <textarea
            rows={3}
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="What technical problem or error are you encountering?"
            className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-500 leading-relaxed"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs shadow-md shadow-primary-600/20 transition-all flex items-center cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Post Question
            </button>
          </div>
        </form>
      </div>

      {/* Discussion Threads */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4"
          >
            <div className="flex items-center space-x-3">
              <img
                src={post.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={post.user_name}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="font-bold text-xs text-slate-900 block">{post.user_name}</span>
                <span className="text-[10px] text-slate-400">{post.created_at}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">{post.content}</p>

            <div className="flex items-center space-x-4 pt-2 border-t border-slate-100 text-xs">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-1 font-semibold ${
                  likedPosts.includes(post.id) ? 'text-primary-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{post.likes_count} Likes</span>
              </button>

              <span className="flex items-center space-x-1 text-slate-500">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{post.replies.length} Replies</span>
              </span>
            </div>

            {/* Replies List */}
            {post.replies.length > 0 && (
              <div className="pl-4 pt-3 border-l-2 border-primary-500 space-y-3 mt-3 bg-slate-50 p-4 rounded-2xl">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-primary-900">{reply.user_name}</span>
                      <Badge variant="primary">Verified Instructor</Badge>
                      <span className="text-[10px] text-slate-400">• {reply.created_at}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
