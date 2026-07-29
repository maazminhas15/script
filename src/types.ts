export interface Script20Points {
  id: string;
  title: string;
  category: string;
  viralHook: string; // 1. Viral Hook (first 3s, Roman Urdu)
  fullScript: string; // 2. Full script (Roman Urdu)
  cameraAngles: string; // 3. Camera angles (phone-only)
  shotList: string[]; // 4. Shot list
  bRollIdeas: string[]; // 5. B-roll ideas
  voiceOver: string; // 6. Voice-over (Roman Urdu)
  onScreenText: string[]; // 7. On-screen text (Roman Urdu)
  bgMusicStyle: string; // 8. Background music style
  editingInstructions: string; // 9. Editing instructions
  soundEffects: string[]; // 10. Sound effects
  colorGrading: string; // 11. Color grading
  thumbnailIdea: string; // 12. Thumbnail idea
  caption: string; // 13. Caption (Roman Urdu)
  hashtags: string[]; // 14. Hashtags
  cta: string; // 15. CTA (Roman Urdu)
  whyViral: string; // 16. Why viral
  whyComment: string; // 17. Why comment
  whyShare: string; // 18. Why share
  estWatchTime: string; // 19. Estimated watch time
  difficulty: 'Easy' | 'Medium' | 'Hard'; // 20. Difficulty
}

export interface StoryIdea {
  id: string;
  title: string;
  conceptRomanUrdu: string;
  visualGuide: string;
  interactiveSticker: string;
  captionText: string;
}

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  visualGuide: string;
  textRomanUrdu: string;
}

export interface CarouselPost {
  title: string;
  hookRomanUrdu: string;
  slides: CarouselSlide[];
  caption: string;
  hashtags: string[];
}

export interface CommunityPost {
  title: string;
  questionRomanUrdu: string;
  pollOptions: string[];
  caption: string;
  engagementStrategy: string;
}

export interface DailyContentPackage {
  themeName: string;
  generatedAt?: string;
  instagramReels: Script20Points[];
  tikTokVideos: Script20Points[];
  youtubeShort: Script20Points[];
  storyIdeas: StoryIdea[];
  carouselPost: CarouselPost;
  communityPost: CommunityPost;
}

export type CategoryFilter =
  | 'All'
  | 'Comedy'
  | 'Dark Humor'
  | 'Mini-Documentary'
  | 'Myth Busters'
  | 'Investigation'
  | 'Gym & Health'
  | 'Farm POV'
  | 'Luxury & B2B';
