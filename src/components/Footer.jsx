
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © 2025 FlowDesk. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="#" className="text-sm text-gray-500 hover:text-flowdesk-600">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-flowdesk-600">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-flowdesk-600">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
