import React, { useState } from 'react';
import TopSelling from './TopSelling';
import TopDiscounts from './TopDiscounts';

const SectionToggle = () => {
  const [activeTab, setActiveTab] = useState('topSelling');

  return (
    <section className="section-toggle mx-0 lg:mx-20 my-20">
      <div className="container mx-auto px-4">
        {/* Centered Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('topDiscounts')}
              className={`py-2 px-4 text-sm md:text-base font-medium rounded-l-md transition-colors ${
                activeTab === 'topDiscounts'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Top Discounts
            </button>
            <button
              onClick={() => setActiveTab('topSelling')}
              className={`py-2 px-4 text-sm md:text-base font-medium rounded-r-md transition-colors ${
                activeTab === 'topSelling'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Top Selling
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          {activeTab === 'topSelling' ? <TopSelling /> : <TopDiscounts />}
        </div>
      </div>
    </section>
  );
};

export default SectionToggle;