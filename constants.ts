import { Movie } from './types';

// Using open-source movies (Blender Foundation) for legal streaming demo
export const INITIAL_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    description: 'A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    genre: 'Animation',
    rating: 4.8,
    year: 2008,
    views: 12500,
    uploadedAt: '2023-10-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Sintel',
    description: 'A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend.',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Sintel_poster.png/800px-Sintel_poster.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    genre: 'Fantasy',
    rating: 4.9,
    year: 2010,
    views: 34200,
    uploadedAt: '2023-11-01T14:30:00Z'
  },
  {
    id: '3',
    title: 'Tears of Steel',
    description: 'A group of warriors and scientists gather at the Oude Kerk in Amsterdam to stage a crucial event from the past, in a desperate attempt to rescue the world from destructive robots.',
    thumbnailUrl: 'https://mango.blender.org/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    genre: 'Sci-Fi',
    rating: 4.5,
    year: 2012,
    views: 8900,
    uploadedAt: '2023-12-20T09:15:00Z'
  },
  {
    id: '4',
    title: 'Elephant Dream',
    description: 'The story of two characters, Emo and Proog, who navigate a surreal and sometimes bizarre machine-world.',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_poster.jpg/800px-Elephants_Dream_poster.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    genre: 'Sci-Fi',
    rating: 4.2,
    year: 2006,
    views: 5600,
    uploadedAt: '2024-01-05T16:45:00Z'
  }
];

export const APP_NAME = "BestMovies.com";