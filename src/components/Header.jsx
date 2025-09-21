import React, { useState } from 'react';
    import { Shield, Menu, X, Moon, Sun } from 'lucide-react';

    const Header = () => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isDarkMode, setIsDarkMode] = useState(false);

      const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
      const toggleTheme = () => setIsDarkMode(!isDarkMode);

      return (
        <header className="bg-white dark:bg-zinc-900 shadow-sm border-b border-slate-200 dark:border-zinc-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-700" />
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white font-['Inter']">
                  Smart PII Redactor
                </h1>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-cyan-500 transition-colors font-medium">
                  Features
                </a>
                <a href="#security" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-cyan-500 transition-colors font-medium">
                  Security
                </a>
                <a href="#api" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-cyan-500 transition-colors font-medium">
                  API
                </a>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </nav>

              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-200 dark:border-zinc-700">
                <nav className="flex flex-col space-y-3">
                  <a href="#features" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-cyan-500 transition-colors font-medium">
                    Features
                  </a>
                  <a href="#security" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-cyan-500 transition-colors font-medium">
                    Security
                  </a>
                  <a href="#api" className="text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-cyan-500 transition-colors font-medium">
                    API
                  </a>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-cyan-500 transition-colors font-medium"
                  >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </header>
      );
    };

    export default Header;
