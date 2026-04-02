import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';

interface Insight {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
}

const InsightsList = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetchInsights();
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchInsights = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching insights:', error);
      return;
    }

    setInsights(data || []);
  };

  const deleteInsight = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this insight?');
    if (!confirmed) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting insight:', error);
      return;
    }

    fetchInsights();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
          {session && (
            <Link
              to="/insights/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Insight
            </Link>
          )}
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {insights.map((insight) => (
              <li key={insight.id}>
                <div className="px-4 py-4 sm:px-6">
                  <Link to={`/insights/${insight.id}`} className="flex items-center justify-between group">
                    <div className="flex items-center flex-grow">
                      <img
                        className="h-16 w-16 object-cover rounded transition-transform group-hover:scale-105"
                        src={insight.image_url}
                        alt={insight.title}
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {insight.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {format(new Date(insight.created_at), 'MMMM d, yyyy')}
                        </p>
                        <p className="mt-2 text-gray-600 line-clamp-2">
                          {insight.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                      </div>
                    </div>
                    {session && (
                      <div className="flex space-x-2">
                        <Link
                          to={`/insights/edit/${insight.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Pencil className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => deleteInsight(insight.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InsightsList;