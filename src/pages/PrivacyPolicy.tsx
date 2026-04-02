import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Privacy Policy
          </h1>
          <div className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
              <p>When you engage with our LinkedIn Ads, we may collect the following types of information:</p>
              <ul>
                <li>Contact details you voluntarily submit (such as your name, email address, company, and job title)</li>
                <li>Data provided through LinkedIn Lead Gen Forms</li>
                <li>Engagement metrics (e.g. clicks, views, and form submissions)</li>
                <li>Demographic and professional information, as provided by LinkedIn (such as industry, location, and company size)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">2. How We Use Your Information</h2>
              <p>We use the information collected to:</p>
              <ul>
                <li>Provide you with relevant content, insights, and updates from CROIQ</li>
                <li>Respond to your enquiries or follow up on your interest in our services</li>
                <li>Improve our advertising and targeting strategies</li>
                <li>Analyse engagement to optimise future campaigns</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">3. Sharing Your Information</h2>
              <p>We do not sell your personal information. Your data may be shared with trusted partners or service providers who support our advertising and marketing efforts, under strict data protection agreements.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">4. Your Rights and Choices</h2>
              <p>You can:</p>
              <ul>
                <li>Opt out of receiving future communications at any time by clicking the unsubscribe link in our emails</li>
                <li>Adjust your LinkedIn advertising preferences via your LinkedIn account settings</li>
                <li>Contact us to request access, correction, or deletion of your personal data</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">5. Data Security</h2>
              <p>We implement appropriate technical and organisational measures to safeguard your information.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">6. Contact Us</h2>
              <p>If you have any questions about this policy or how your data is handled, please get in touch at:</p>
              <p><a href="mailto:privacy@croiq.com" className="text-indigo-600 hover:text-indigo-800">privacy@croiq.com</a></p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;