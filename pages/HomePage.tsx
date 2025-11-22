import React, { useState } from 'react';
import { Movie, View } from '../types';
import { MovieCard } from '../components/MovieCard';
import { Search, Sparkles } from 'lucide-react';
import { getAiRecommendation } from '../services/geminiService';

interface HomePageProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ movies, onMovieSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsThinking(true);
    const availableTitles = movies.map(m => m.title);
    const response = await getAiRecommendation(aiQuery, availableTitles);
    setAiResponse(response);
    setIsThinking(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-900 to-black min-h-[300px] flex items-center p-8 md:p-12">
        <div className="relative z-10 max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Unlimited Movies,<br /> 
            <span className="text-red-500">Zero Cost.</span>
          </h1>
          <p className="text-lg text-gray-200">
            Stream, download, and share your favorite moments. No signup required.
            Just pure entertainment powered by the community.
          </p>
        </div>
        {/* Decorative background elements */}
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 mask-image-linear-gradient"></div>
      </div>

      {/* Search & AI Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Standard Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl leading-5 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 sm:text-sm transition-colors"
            placeholder="Search title, genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* AI Recommendation */}
        <div className="relative">
           <form onSubmit={handleAiSearch} className="flex gap-2">
            <div className="relative flex-1">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <input 
                type="text"
                placeholder="Ask AI: 'I want something sad with robots'"
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-900 text-gray-100 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={isThinking}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium text-sm transition-colors disabled:opacity-50"
            >
              {isThinking ? 'Asking...' : 'Ask AI'}
            </button>
           </form>
           {aiResponse && (
             <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-xl text-sm text-gray-200 z-20 animate-fade-in">
               <span className="font-bold text-purple-400">Gemini says:</span> {aiResponse}
               <button onClick={() => setAiResponse('')} className="ml-2 text-xs text-gray-500 hover:text-white underline float-right">Dismiss</button>
             </div>
           )}
        </div>
      </div>

      {/* Movie Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          <span className="text-sm text-gray-400">{filteredMovies.length} movies available</span>
        </div>
        
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={onMovieSelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-lg">No movies found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-red-500 hover:text-red-400 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};