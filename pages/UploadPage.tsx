import React, { useState } from 'react';
import { Movie, View } from '../types';
import { Button } from '../components/Button';
import { Upload, Wand2, Film } from 'lucide-react';
import { generateMovieMetadata } from '../services/geminiService';

interface UploadPageProps {
  onUpload: (movie: Movie) => void;
  onCancel: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onUpload, onCancel }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleAutoFill = async () => {
    if (!title) {
      setError('Please enter a movie title first.');
      return;
    }
    setError('');
    setIsGenerating(true);
    
    try {
      const metadata = await generateMovieMetadata(title);
      setDescription(metadata.description);
      setGenre(metadata.genre);
      setYear(metadata.year);
    } catch (err) {
      setError('Failed to generate metadata. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !videoUrl) {
      setError('Title and Video URL are required.');
      return;
    }

    // Create new movie object
    const newMovie: Movie = {
      id: Date.now().toString(),
      title,
      description: description || 'No description provided.',
      // Use a default placeholder if no thumb provided
      thumbnailUrl: thumbnailUrl || 'https://picsum.photos/800/450', 
      videoUrl,
      genre: genre || 'General',
      rating: 0,
      year,
      views: 0,
      uploadedAt: new Date().toISOString()
    };

    onUpload(newMovie);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-600 rounded-lg">
            <Upload className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Upload Movie</h2>
            <p className="text-gray-400 text-sm">Share your video with the community</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Movie Title</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="e.g. The Matrix"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleAutoFill}
                isLoading={isGenerating}
                title="Use AI to fill details"
              >
                <Wand2 size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Click the wand to auto-fill description using AI.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-300 mb-1">Genre</label>
               <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Action"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
               <input
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
              placeholder="What is this movie about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Video URL (MP4)</label>
            <div className="relative">
              <Film className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="url"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="https://example.com/movie.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Direct link to MP4 file required for streaming.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Thumbnail URL (Optional)</label>
             <input
                type="url"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="https://example.com/poster.jpg"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="px-8">
              Upload Movie
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};