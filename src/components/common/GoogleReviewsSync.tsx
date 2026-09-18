import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';

interface Review {
  reviewId: string;
  reviewer: { displayName: string };
  starRating: string;
  comment: string;
  createTime: string;
}

export const GoogleReviewsSync: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (err) {
        setError('Unable to load reviews at this time.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12">Ulasan Pelanggan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <SkeletonLoader key={i} className="h-40" />)}
        </div>
      </div>
    </section>
  );
  if (error) return null; // Hide if error to avoid breaking the UI
  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-300 mb-12">Ulasan Pelanggan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.reviewId} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(Number(review.starRating))].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm italic">"{review.comment}"</p>
              <p className="text-blue-900 dark:text-blue-300 font-semibold text-sm">{review.reviewer.displayName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
