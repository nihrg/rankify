export interface Album {
  id: string;
  name: string;
  artists: Array<{
    name: string;
  }>;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  release_date: string;
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  track_number: number;
  preview_url: string | null;
}

export interface Rankings {
  [trackId: string]: number;
}