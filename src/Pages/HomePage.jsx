import React from "react";
import { NavLink } from "react-router-dom";
import Supplypage from "./Supplypage";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 opacity-90 absolute inset-0"></div>
          <div
            data-aos="zoom-in"
            className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1682310075673-b408eb1ca6fd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center mix-blend-overlay"
          ></div>
        </div>

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-aos="fade-right"
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-down">
              Welcome to A-U-S Networks
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up">
              The future of decentralized finance starts here. Join us in
              revolutionizing the blockchain industry with cutting-edge
              technology and innovative solutions.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
              <button
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-aos="fade-up-right"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-400">
              Experience the power of next-generation blockchain technology with
              our comprehensive suite of services designed for both beginners
              and experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="bg-gray-700 p-8 rounded-xl transform hover:scale-105 transition-transform duration-300"
              data-aos="fade-down-right"
            >
              <div className="text-indigo-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Secure Mining
              </h3>
              <p className="text-gray-400">
                State-of-the-art security protocols protecting your mining
                operations 24/7. Our advanced encryption and multi-signature
                technology ensures your assets remain safe and protected at all
                times.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-gray-700 p-8 rounded-xl transform hover:scale-105 transition-transform duration-300"
              data-aos="fade-down-right"
            >
              <div className="text-indigo-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Fast Transactions
              </h3>
              <p className="text-gray-400">
                Lightning-fast transaction processing with minimal fees. Our
                optimized network ensures transactions are confirmed within
                seconds, with industry-leading low transaction costs.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-gray-700 p-8 rounded-xl transform hover:scale-105 transition-transform duration-300"
              data-aos="fade-down-right"
            >
              <div className="text-indigo-500 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Real-time Analytics
              </h3>
              <p className="text-gray-400">
                Comprehensive analytics and reporting for informed
                decision-making. Access detailed charts, market trends, and
                performance metrics to optimize your trading strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6" data-aos="flip-left">
              <p className="text-4xl font-bold text-indigo-500 mb-2">$540K</p>
              <p className="text-gray-400"> Trading Volume</p>
              <p className="text-sm text-gray-500 mt-2">Across all markets</p>
            </div>
            <div className="p-6" data-aos="flip-left">
              <p className="text-4xl font-bold text-indigo-500 mb-2">10K+</p>
              <p className="text-gray-400">Active Users</p>
              <p className="text-sm text-gray-500 mt-2">Growing community</p>
            </div>
            <div className="p-6" data-aos="flip-left">
              <p className="text-4xl font-bold text-indigo-500 mb-2">100+</p>
              <p className="text-gray-400">Countries Supported</p>
              <p className="text-sm text-gray-500 mt-2">Global accessibility</p>
            </div>
            <div className="p-6" data-aos="flip-left">
              <p className="text-4xl font-bold text-indigo-500 mb-2">99.9%</p>
              <p className="text-gray-400">Uptime</p>
              <p className="text-sm text-gray-500 mt-2">
                Reliable infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
     <Supplypage />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of satisfied users who have already discovered the
            power of A-U-S Networks
          </p>
          <NavLink
            to="/signup"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
          >
            Create Account
          </NavLink>
          <p className="text-sm text-gray-200 mt-4">
            No credit card required • Free to get started
          </p>
        </div>
      </section>
      {/* Latest News Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Latest News & Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" data-aos="flip-up">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSakAf24_MOcXE3zbYAF9yAI0spbkxrv421ew&s"
                alt="News 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-indigo-500 text-sm font-semibold">
                  Announcement
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">
                  New Mining Pool Launch
                </h3>
                <p className="text-gray-400 mb-4">
                  We're excited to announce the launch of our new mining pool
                  with improved efficiency and lower fees.
                </p>
                <a
                  href="/"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" data-aos="flip-up">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdNZLvnKGRKKtHbxu5laF3XzD1FAbNo4vdjQ&s"
                alt="News 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-indigo-500 text-sm font-semibold">
                  Technology
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">
                  Platform Security Update
                </h3>
                <p className="text-gray-400 mb-4">
                  Enhanced security measures implemented to provide even better
                  protection for our users' assets.
                </p>
                <a
                  href="/"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" data-aos="flip-up">
              <img
                src="https://t3.ftcdn.net/jpg/08/18/29/44/360_F_818294473_1nErAwOPZyaFgIotBNceZXFvRr62COHG.jpg"
                alt="News 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-indigo-500 text-sm font-semibold">
                  Community
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">
                  Upcoming AMA Session
                </h3>
                <p className="text-gray-400 mb-4">
                  Join our monthly AMA session with the team to discuss upcoming
                  features and improvements.
                </p>
                <a
                  href="/"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-900" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-75">
            <div className="flex justify-center">
              <img
                src="/okx-wallet.png"
                alt="Partner 1"
                className="h-12 object-contain"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/200x80"
                alt="Partner 2"
                className="h-12 object-contain"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/200x80"
                alt="Partner 3"
                className="h-12 object-contain"
              />
            </div>
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/200x80"
                alt="Partner 4"
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
