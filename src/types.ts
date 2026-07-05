export interface StoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
  iconType: "heart" | "compass" | "camera" | "ring";
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  caption: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export interface RsvpWish {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir";
  guests: number;
  message: string;
  timestamp: string;
}
