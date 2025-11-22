import React from 'react';
import { Play, Star } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      className="group relative flex flex-col gap-2 cursor-pointer transition-transform hover:scale-105 duration-200"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-800">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <div className="rounded-full bg-red-600 p-3 shadow-lg">
            <Play className="h-6 w-6 text-white fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
          HD
        </div>
      </div>
      
      <div className="flex flex-col px-1">
        <h3 className="font-bold text-white truncate">{movie.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          <span>{movie.year}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span>{movie.rating}</span>
          </div>
          <span>{movie.genre}</span>
        </div>
      </div>
    </div>
  );
};