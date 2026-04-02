import React from 'react';
import { format } from 'date-fns';

interface InsightCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, excerpt, date, imageUrl, slug }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <time dateTime={date}>
              {format(new Date(date), 'EEE MMM dd \'at\' HH:mm')}
            </time>
          </p>
          <a href={`/insights/${slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-base text-gray-500">{excerpt}</p>
          </a>
        </div>
        <div className="mt-6">
          <a
            href={`/insights/${slug}`}
            className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;