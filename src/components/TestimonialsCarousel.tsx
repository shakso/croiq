import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "One of the most influential mentors I have ever had. Balanced challenge and support perfectly. Transformational for my career.",
    author: "Tim Bellhouse",
    role: "Head of Customer Success, Inflo"
  },
  {
    quote: "An absolute wizard on GTM, product positioning, and commercial growth. A highly sought-after asset for any business looking to scale.",
    author: "Antony Thomson",
    role: "Co-Founder & CEO, Loopin"
  },
  {
    quote: "Steve brings the best out of individuals and teams — an authentic, passionate executive who leads with purpose and drive.",
    author: "Jan Jivmark",
    role: "Global SaaS CMO"
  },
  {
    quote: "Under Steve's leadership, I was given the opportunities, feedback, and challenges that helped me step into a leadership role myself.",
    author: "Louis Zahawi Eid",
    role: "Commercial VP, Nivoda"
  },
  {
    quote: "Leaders who inspire true performance are rare. Steve consistently built trust, delivered on goals, and motivated people to achieve more.",
    author: "John Gibson",
    role: "Managing Director, EVENTIM"
  },
  {
    quote: "Steve parachuted into my business at a critical time, separated the good from the bad, and laid out a clear, confident path forward.",
    author: "Debbie Harris",
    role: "CEO, Autumna"
  },
  {
    quote: "Steve is a seasoned leader with a strong sales and operational focus, who championed the right outcomes for the business and the people.",
    author: "Gautam Thakar",
    role: "Global CEO, EdTech (Prosus/Naspers)"
  },
  {
    quote: "Steve is a rare leader who moves seamlessly from strategy to execution. His impact on our commercial success was transformational.",
    author: "David Strauss",
    role: "SVP Sales, SumUp USA"
  },
  {
    quote: "Steve is analytical, commercially sharp, and action-focused, a rare combination that consistently delivers real results.",
    author: "Nigel Clarkson",
    role: "Global CRO, TapTap"
  },
  {
    quote: "He's a natural leader who inspires teams and drives results with energy, passion, and clarity. Working with Steve raises everyone's game.",
    author: "Mark Henderson",
    role: "CEO, Kubicle"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Clients Say
          </h2>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden px-12">
            <div className="grid grid-cols-3 gap-8">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <p className="text-gray-900 italic mb-6 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto">
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;