import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-950 rounded-t-4xl text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <img
                src="/images/logo.png"
                alt="Caterbazar Logo"
                className="h-10 w-auto mb-2"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted platform for finding the perfect caterer for any event. 
              Making event planning easier, one meal at a time.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  For Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/wedding"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Wedding Catering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/corporate"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link
                  href="/services/party"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Party Catering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/event-planning"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Event Planning
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Custom Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  123 Business Street, Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a
                  href="mailto:info@caterbazar.com"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  info@caterbazar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} CaterBazar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
