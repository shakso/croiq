import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LineChart, Target, Users as Users2, BarChart2, Briefcase } from 'lucide-react';

const powerPillars = [
  {
    icon: LineChart,
    title: 'The Growth Reset',
    subtitle: 'When growth looks strong on the surface but lacks structure, consistency, or predictability.',
    description: 'We diagnose and realign the entire commercial engine across product, sales, marketing, and customer success. We fix go-to-market architecture and segmentation, and rebuild revenue operations and performance management.',
    outcome: 'Fragmented growth becomes structured, repeatable performance.'
  },
  {
    icon: Target,
    title: 'Revenue Architecture',
    subtitle: 'Most businesses don\'t have a growth problem. They have a design problem.',
    description: 'We rebuild go-to-market strategy and ICP clarity, pricing and packaging aligned to value, and customer journey and lifecycle design.',
    outcome: 'A commercial model built for scale, not patchwork fixes.'
  },
  {
    icon: Users2,
    title: 'Execution and Performance',
    subtitle: 'Strategy only matters if it shows up in numbers.',
    description: 'We fix conversion, velocity, and deal quality. We build and structure high-performing revenue teams. We align acquisition, retention, and expansion into one system.',
    outcome: 'Revenue that moves faster, converts better, and compounds over time.'
  },
  {
    icon: BarChart2,
    title: 'Predictability and Investor Readiness',
    subtitle: 'Growth without predictability erodes confidence.',
    description: 'We implement forecasting models leadership can trust, KPI frameworks tied to real performance, and board-level reporting and operating cadence.',
    outcome: 'A business investors understand, trust, and back.'
  }
];

const leadershipMandates = [
  {
    role: 'CEO',
    description: 'Full strategic and operational ownership'
  },
  {
    role: 'CRO',
    description: 'Complete revenue function leadership'
  },
  {
    role: 'CCO',
    description: 'Commercial strategy and execution'
  }
];

const engagementTypes = ['Interim', 'Fractional', 'Permanent placements'];

const whenBroughtIn = [
  'Growth has slowed but the root cause is unclear',
  'Revenue is inconsistent and hard to forecast',
  'Teams are busy but not aligned',
  'Product, sales, and marketing are disconnected',
  'The business is approaching a funding round or exit',
  'Investors are asking harder questions'
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Growth leadership for technology businesses where scale has become harder than it should be
            </h1>
            <p className="text-xl text-gray-600">
              I step in at CEO, CRO, and CCO level to reset and scale revenue in investor-backed companies where growth is stalled, inconsistent, or no longer fit for the next stage.
            </p>
          </div>

          {/* Four Power Pillars */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                Four Power Pillars
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                How we actually work
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {powerPillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <pillar.icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-base text-gray-700 mb-3 font-medium">
                      {pillar.subtitle}
                    </p>
                    <p className="text-base text-gray-600 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                    <p className="text-sm font-semibold text-indigo-600">
                      Outcome: {pillar.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Mandates */}
          <div className="mb-24 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Leadership Mandates
                </h2>
                <p className="text-xl text-gray-600">
                  We don't sit outside the business. We operate inside it.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Briefcase className="h-8 w-8 text-indigo-600" />
                    <h3 className="text-2xl font-bold text-gray-900">We take on:</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {leadershipMandates.map((mandate) => (
                      <div key={mandate.role} className="text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">
                          {mandate.role}
                        </div>
                        <div className="text-sm text-gray-600">
                          {mandate.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Across:</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    {engagementTypes.map((type) => (
                      <div key={type} className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-full font-semibold">
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    Focus: <span className="text-indigo-600">Stabilise. Reset. Scale.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Where CROIQ Is Typically Brought In */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                Where CROIQ Is Typically Brought In
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {whenBroughtIn.map((situation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold mr-4 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-lg text-gray-700">{situation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a
              href="https://calendly.com/steve-croiq/30-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start the Conversation
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;