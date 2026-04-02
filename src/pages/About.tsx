import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { LineChart, Briefcase, Users, Globe, Handshake } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-8 ring-4 ring-indigo-500 shadow-xl">
              <img
                className="h-full w-full object-cover"
                src="/steve-marritt.png"
                alt="Steve Marritt"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center">
            Steve Marritt
          </h1>
            <p className="mt-6 max-w-3xl text-xl text-gray-500 text-center">
            Leadership That Moves the Needle
          </p>
            <p className="mt-4 max-w-3xl text-lg text-gray-500 text-center">
              CROIQ was built for founders, boards, and investors who need experienced, sleeves-rolled-up leadership at moments that matter, when growth is accelerating, stakes are rising, and clarity is everything.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div className="prose prose-lg max-w-none text-gray-500">
              <p>
Founded by Steve Marritt, CROIQ supports technology ventures through scale-up, change, and transformation. With over 20 years of senior leadership across SaaS, FinTech, marketplaces, and AI-led platforms, Steve has driven commercial growth and operational alignment for businesses navigating international expansion, market repositioning, and capital events.
              </p><p>
Whether stepping in as a permenant, fractional, interim exec, or strategic advisor, Steve brings a rare mix of board-level credibility and on-the-ground commercial know-how. Over the past six years, CROIQ has partnered with early-stage, post-raise, and pre-exit ventures to design and execute revenue strategies that work in the real world, under pressure, at pace, and with a relentless focus on outcomes.
              </p><p>
This isn’t consulting. It’s embedded leadership for when you can’t afford not to get it right.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {[
                {
                  icon: LineChart,
                  title: 'Commercial Strategy and Transformation',
                  description: 'Partnering with leadership teams to reframe go-to-market strategies, sharpen commercial execution, and build scalable growth platforms.',
                },
                {
                  icon: Briefcase,
                  title: 'Executive Leadership on Demand',
                  description: 'Providing interim and fractional S/E/VP, CRO, CCO, and CEO leadership, aligning teams, sharpening focus, and leading change at critical business junctures.',
                },
                {
                  icon: Globe,
                  title: 'International Expansion Support',
                  description: 'Helping businesses expand internationally with structured strategies, localised market approaches, and operational scaling expertise across EMEA, APAC, and the Americas.',
                },
                {
                  icon: Users,
                  title: 'Team and Culture Development',
                  description: 'Building high-performing, accountable commercial and operational teams through smart organisational design, leadership coaching, and cultural clarity.',
                },
                {
                  icon: Handshake,
                  title: 'Strategic Advisory for Founders, CEOs, and Investors',
                  description: 'Acting as a trusted partner to support capital raises, M&A strategies, operational scale-ups, and exit planning, providing real-world insight shaped by hands-on leadership experience.',
                }
              ].map((item) => (
                <div key={item.title} className="relative flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <TestimonialsCarousel />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-12">
            Ways to Work with CROIQ
          </h2>
          <div className="grid gap-12 lg:grid-cols-2">
            {[
              {
                icon: Briefcase,
                title: 'Permanent Leadership',
                description: 'Full-time senior leadership for businesses undergoing major transformation.'
              },
              {
                icon: Users,
                title: 'Fractional Leadership',
                description: 'Senior executive engagement scaled to the growth phase and business needs.'
              },
              {
                icon: LineChart,
                title: 'Interim Leadership',
                description: 'Structured leadership during periods of rapid growth, transition, or change.'
              },
              {
                icon: Handshake,
                title: 'Strategic Advisory',
                description: 'Trusted partner for boards, founders, and investors during critical decision-making phases as Chair, NED, Advisor.'
              }
            ].map((item) => (
              <div key={item.title} className="relative flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              Let's Talk
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              If you are preparing for growth, transformation, expansion, or change, CROIQ brings the clarity, leadership, and practical execution needed to help you move forward with confidence.
            </p>
            <a
              href="mailto:steve@croiq.com"
              className="text-xl text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Contact CROIQ - steve@croiq.com
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;