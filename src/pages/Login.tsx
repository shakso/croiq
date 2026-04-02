import React from 'react';
import Auth from '../components/Auth';
import Header from '../components/Header';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h1>
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default Login;