import React, { useState, useEffect } from 'react';
import { INITIAL_MOVIES, APP_NAME } from './constants';
import { Movie, View } from './types';
import { HomePage } from './pages/HomePage';
import { PlayerPage } from './pages/PlayerPage';
import { UploadPage } from './pages/UploadPage';
import { SetupGuidePage } from './pages/SetupGuidePage';
import { Film, Upload, HelpCircle, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load from local storage if available (persisting session data)
  useEffect(() => {
    const storedMovies = localStorage.getItem('bestMovies_data');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  // Save to local storage whenever movies change
  useEffect(() => {
    localStorage.setItem('bestMovies_data', JSON.stringify(movies));
  }, [movies]);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentView(View.PLAYER);
    window.scrollTo(0, 0);
  };

  const handleUpload = (newMovie: Movie) => {
    setMovies([newMovie, ...movies]);
    setCurrentView(View.HOME);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return <HomePage movies={movies} onMovieSelect={handleMovieSelect} />;
      case View.PLAYER:
        return selectedMovie ? (
          <PlayerPage 
            movie={selectedMovie} 
            onBack={() => setCurrentView(View.HOME)} 
          />
        ) : (
          <HomePage movies={movies} onMovieSelect={handleMovieSelect} />
        );
      case View.UPLOAD:
        return (
          <UploadPage 
            onUpload={handleUpload} 
            onCancel={() => setCurrentView(View.HOME)} 
          />
        );
      case View.GUIDE:
        return <SetupGuidePage />;
      default:
        return <HomePage movies={movies} onMovieSelect={handleMovieSelect} />;
    }
  };

  const NavLink = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        currentView === view 
          ? 'bg-red-600 text-white font-medium' 
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-red-900 selection:text-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setCurrentView(View.HOME)}
            >
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <Film className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight">Best<span className="text-red-500">Movies</span></span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink view={View.HOME} icon={Film} label="Browse" />
              <NavLink view={View.UPLOAD} icon={Upload} label="Upload" />
              <NavLink view={View.GUIDE} icon={HelpCircle} label="DB Setup Guide" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="block px-3 py-2">
                 <NavLink view={View.HOME} icon={Film} label="Browse" />
              </div>
              <div className="block px-3 py-2">
                 <NavLink view={View.UPLOAD} icon={Upload} label="Upload" />
              </div>
              <div className="block px-3 py-2">
                 <NavLink view={View.GUIDE} icon={HelpCircle} label="Setup Guide" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4 md:px-6 min-h-[calc(100vh-4rem)]">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {APP_NAME}. 
            Built with React, Tailwind & Gemini AI.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-gray-600 text-sm">
            <button onClick={() => setCurrentView(View.GUIDE)} className="hover:text-gray-400">Tech Stack</button>
            <span className="cursor-pointer hover:text-gray-400">Privacy Policy</span>
            <span className="cursor-pointer hover:text-gray-400">DMCA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;