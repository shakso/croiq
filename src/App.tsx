import React from 'react';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import InsightCard from './components/InsightCard';
import { LineChart, Target, Users as Users2, BarChart2, ArrowRight } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Tables } from './types/supabase';

type Insight = Tables<'blog_posts'>;

function App() {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching insights:', error);
      return;
    }

    setInsights(data || []);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="/homeback.jpg"
            alt="Executive meeting"
          />
          <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 sm:pb-8 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Growth isn't usually a strategy problem. It's a structural one.
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            CROIQ partners with investors, boards, and founders to reset and scale revenue in technology businesses where growth has stalled, fragmented, or lacks predictability.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            CEO. CRO. CCO. Operator-led. Built inside the pressure of real outcomes.
          </p>
          <div className="mt-10">
            <a
              href="https://calendly.com/steve-croiq/30-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
             aria-label="Schedule a consultation meeting"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start the Conversation
            </a>
          </div>
        </div>
      </div>

      {/* What We Actually Do */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">What We Actually Do</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Four Power Pillars
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <LineChart className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl leading-7 font-semibold text-gray-900">The Growth Reset</h3>
                  <p className="mt-2 text-base text-gray-600">
                    When growth looks fine on the surface but isn't converting into predictable performance.
                  </p>
                  <p className="mt-3 text-base text-gray-600">
                    We step in to realign the commercial engine across product, sales, marketing, customer success, and revenue operations.
                  </p>
                  <p className="mt-3 text-sm font-medium text-indigo-600">
                    Outcome: From fragmented growth → to structured, repeatable revenue.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Target className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl leading-7 font-semibold text-gray-900">Revenue Architecture</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Most businesses don't have a revenue problem. They have a design problem.
                  </p>
                  <p className="mt-3 text-base text-gray-600">
                    We rebuild go-to-market structure, segmentation and positioning, pricing and packaging, and customer lifecycle design.
                  </p>
                  <p className="mt-3 text-sm font-medium text-indigo-600">
                    Outcome: A commercial model built for scale, not survival.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Users2 className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl leading-7 font-semibold text-gray-900">Execution That Actually Lands</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Strategy without execution is theatre.
                  </p>
                  <p className="mt-3 text-base text-gray-600">
                    We operate inside the business to fix conversion and velocity, improve retention and expansion, install operating cadence and accountability, and align teams to a single revenue system.
                  </p>
                  <p className="mt-3 text-sm font-medium text-indigo-600">
                    Outcome: Performance that shows up in numbers, not slides.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl leading-7 font-semibold text-gray-900">Investor-Grade Predictability</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Revenue isn't just about growth. It's about trust.
                  </p>
                  <p className="mt-3 text-base text-gray-600">
                    We deliver forecast accuracy, board-level reporting clarity, KPI frameworks that actually drive decisions, and capital readiness.
                  </p>
                  <p className="mt-3 text-sm font-medium text-indigo-600">
                    Outcome: A business investors can understand, trust, and back.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <a
                href="/services"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
               aria-label="View all our services"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest Insights</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Expert analysis and practical advice for revenue leaders
            </p>
          </div>
          
          <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            {insights.map((insight) => (
              <InsightCard
                key={insight.id}
                title={insight.title}
                excerpt={insight.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                date={insight.created_at}
                imageUrl={insight.image_url}
                slug={insight.id}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="/insights"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <span>View All Articles</span>
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      
      <TestimonialsCarousel />
      <Footer />
    </div>
  );
};

export default App;
