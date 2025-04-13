import React from 'react';
import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5C4033] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-xl mb-6">Luxe Doors</h3>
            <p className="text-sm opacity-75 mb-6">
              Elevating entryways with the finest imported wooden doors since 1995. 
              Handcrafted excellence for discerning clients worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#D4B483]">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-[#D4B483]">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-[#D4B483]">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="text-sm opacity-75 hover:opacity-100 hover:text-[#D4B483]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#collections" className="text-sm opacity-75 hover:opacity-100 hover:text-[#D4B483]">
                  Our Collections
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-sm opacity-75 hover:opacity-100 hover:text-[#D4B483]">
                  Installation Services
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-sm opacity-75 hover:opacity-100 hover:text-[#D4B483]">
                  Blog & Inspiration
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm opacity-75 hover:opacity-100 hover:text-[#D4B483]">
                  For Architects
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-3 text-[#D4B483]" />
                <span className="text-sm opacity-75">123 Luxury Lane, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-4 w-4 mt-1 mr-3 text-[#D4B483]" />
                <span className="text-sm opacity-75">+1 (800) LUXE-DOOR</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-4 w-4 mt-1 mr-3 text-[#D4B483]" />
                <span className="text-sm opacity-75">info@luxedoors.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-4 w-4 mt-1 mr-3 text-[#D4B483]" />
                <span className="text-sm opacity-75">Mon-Fri: 9am-6pm, Sat: 10am-4pm</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-6">Visit Our Showroom</h3>
            <div className="h-40 bg-[#4a3329] mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-[#D4B483]" />
            </div>
            <p className="text-sm opacity-75">
              Experience our doors in person at our luxury showroom. Schedule an appointment for a personalized tour.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm opacity-75 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Luxe Doors. All Rights Reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm opacity-75 hover:opacity-100">Privacy Policy</a>
            <a href="#" className="text-sm opacity-75 hover:opacity-100">Terms of Service</a>
            <a href="#" className="text-sm opacity-75 hover:opacity-100">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
