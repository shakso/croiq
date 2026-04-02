import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';

interface Insight {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
}

const InsightView = () => {
  const { id } = useParams();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchInsight();
  }, [id]);

  const fetchInsight = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching insight:', error);
      setError('Failed to load insight');
      return;
    }

    setInsight(data);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Error</h1>
            <p className="mt-4 text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={insight.image_url}
            alt={insight.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {insight.title}
            </h1>
            <time className="text-sm text-gray-500 mb-8 block">
              {format(new Date(insight.created_at), 'MMMM d, yyyy')}
            </time>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: insight.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default InsightView;