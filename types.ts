import React from 'react';

export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // For demo, this will be a direct MP4 link
  genre: string;
  rating: number;
  year: number;
  views: number;
  uploadedAt: string;
}

export enum View {
  HOME = 'HOME',
  PLAYER = 'PLAYER',
  UPLOAD = 'UPLOAD',
  GUIDE = 'GUIDE' // The "How to add database" guide
}

export interface NavItem {
  label: string;
  view: View;
  icon: React.ReactNode;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}