import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="py-10 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <Logo />
          <h2 className="text-lg font-semibold mb-4 mt-4">About Us</h2>
          <p className="text-sm">
            We provide the best gaming reviews and resources for enthusiasts.
            Stay tuned for the latest updates and trends in gaming.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-gray-300">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/auth/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className="hover:text-gray-300">
                Log In
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/mahadihasanfardin2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/FardinMahadi2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/FardinMahadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mahadi-hasan-fardin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} Your Website Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
