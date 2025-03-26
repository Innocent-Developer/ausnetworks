import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              About A-U-S Networks
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We are pioneering the future of blockchain technology and cryptocurrency solutions, making digital assets accessible and secure for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At A-U-S Networks, our mission is to democratize access to blockchain technology and create a more inclusive financial future. We believe in the power of decentralized systems to transform industries and empower individuals worldwide.
              </p>
              <p className="text-gray-300">
                Through innovative solutions and cutting-edge technology, we're building a robust ecosystem that serves both individual users and enterprise clients with the highest standards of security and efficiency.
              </p>
            </div>
            <div className="bg-gray-700 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Core Values</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Innovation & Technology Excellence
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Security & Trust
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  User-Centric Approach
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Global Accessibility
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <img
                src="https://devabubakkarsajid.web.app/pic/abubakkar.jpg"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">Abu-bakkar Sajid</h3>
              <p className="text-indigo-500 mb-4">Chief Executive Officer</p>
              <p className="text-gray-400">
                2+ years of experience in Full-Stack Developer and and modern web technologies.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">Sarah Johnson</h3>
              <p className="text-indigo-500 mb-4">Chief Technology Officer</p>
              <p className="text-gray-400">
                Expert in cryptography and distributed systems architecture.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">Michael Chen</h3>
              <p className="text-indigo-500 mb-4">Chief Operating Officer</p>
              <p className="text-gray-400">
                Specialized in scaling blockchain operations and strategic growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Learn More About A-U-S Networks?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Get in touch with our team to discuss how we can help you achieve your blockchain goals
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
