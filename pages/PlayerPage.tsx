import React from 'react';
import { Movie } from '../types';
import { ArrowLeft, Download, Share2, ThumbsUp, Flag } from 'lucide-react';
import { Button } from '../components/Button';

interface PlayerPageProps {
  movie: Movie;
  onBack: () => void;
}

export const PlayerPage: React.FC<PlayerPageProps> = ({ movie, onBack }) => {
  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    // Note: Cross-origin restrictions might prevent direct download attribute working for some Cloud storage,
    // but this is the standard HTML5 way.
    const a = document.createElement('a');
    a.href = movie.videoUrl;
    a.download = `${movie.title}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: `Watch ${movie.title} on BestMovies.com!`,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Video Player Container */}
      <div className="w-full bg-black aspect-video relative group">
         <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white backdrop-blur-sm transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <video 
          controls 
          autoPlay 
          className="w-full h-full object-contain"
          poster={movie.thumbnailUrl}
        >
          <source src={movie.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Metadata Section */}
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{movie.year}</span>
              <span className="px-1.5 py-0.5 border border-gray-600 rounded text-xs">HD</span>
              <span>{movie.genre}</span>
              <span>{movie.views.toLocaleString()} views</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => alert("Liked!")}>
              <ThumbsUp size={18} className="mr-2" />
              Like
            </Button>
            <Button variant="secondary" onClick={handleShare}>
              <Share2 size={18} className="mr-2" />
              Share
            </Button>
            <Button variant="primary" onClick={handleDownload}>
              <Download size={18} className="mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Description</h3>
          <p className="text-gray-300 leading-relaxed">{movie.description}</p>
        </div>

        {/* Mock Comments */}
        <div className="space-y-4 pt-4 border-t border-gray-800">
            <h3 className="text-xl font-bold">Comments</h3>
            <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">A</div>
                <div>
                    <p className="text-sm font-bold text-gray-300">Anonymous User</p>
                    <p className="text-gray-400 text-sm">This movie is amazing! The quality is top notch for a free site.</p>
                </div>
            </div>
             <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">J</div>
                <div>
                    <p className="text-sm font-bold text-gray-300">John Doe</p>
                    <p className="text-gray-400 text-sm">Thanks for uploading. Download worked perfectly.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};