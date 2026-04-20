import type { toolIcons } from "@/lib/icon-map";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: keyof typeof toolIcons;
  gradient: string;
  features: string[];
  pricing: string;
  rating: number;
  users: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  popular: boolean;
}

export const categories = [
  "All",
  "Image Generation",
  "Text to Image",
  "Video Generation",
  "Audio Generation",
  "3D Modeling",
  "Image Editing",
  "Style Transfer",
  "Animation",
];

export const tools: Tool[] = [
  {
    id: "1",
    name: "ArtGen Pro",
    description:
      "Generate stunning artwork from text descriptions using advanced AI models. Create photorealistic images, illustrations, and digital art in seconds.",
    category: "Image Generation",
    icon: "palette",
    gradient: "from-blue-500 to-purple-600",
    features: [
      "Text to Image",
      "Style Customization",
      "HD Export",
      "Batch Processing",
    ],
    pricing: "Free",
    rating: 4.9,
    users: "150K+",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "DreamCanvas",
    description:
      "Transform your ideas into breathtaking visual masterpieces. Supports multiple art styles from watercolor to cyberpunk aesthetics.",
    category: "Text to Image",
    icon: "image",
    gradient: "from-purple-500 to-pink-600",
    features: [
      "Multiple Styles",
      "High Resolution",
      "API Access",
      "Commercial License",
    ],
    pricing: "$9.99/mo",
    rating: 4.8,
    users: "200K+",
    isFeatured: true,
  },
  {
    id: "3",
    name: "MotionAI",
    description:
      "Create cinematic videos from text prompts. Generate short clips, animations, and visual stories with AI-powered video synthesis.",
    category: "Video Generation",
    icon: "video",
    gradient: "from-cyan-500 to-blue-600",
    features: [
      "Text to Video",
      "4K Output",
      "Custom Duration",
      "Music Sync",
    ],
    pricing: "$19.99/mo",
    rating: 4.7,
    users: "80K+",
    isNew: true,
  },
  {
    id: "4",
    name: "SoundForge AI",
    description:
      "Generate music, sound effects, and voiceovers using artificial intelligence. Perfect for content creators and game developers.",
    category: "Audio Generation",
    icon: "music",
    gradient: "from-green-500 to-teal-600",
    features: [
      "Music Generation",
      "Voice Cloning",
      "SFX Library",
      "Royalty Free",
    ],
    pricing: "$14.99/mo",
    rating: 4.6,
    users: "65K+",
  },
  {
    id: "5",
    name: "Sculpt3D",
    description:
      "Turn 2D images into detailed 3D models instantly. Perfect for game assets, product visualization, and architectural design.",
    category: "3D Modeling",
    icon: "box",
    gradient: "from-orange-500 to-red-600",
    features: [
      "Image to 3D",
      "Texture Mapping",
      "OBJ/FBX Export",
      "Real-time Preview",
    ],
    pricing: "$24.99/mo",
    rating: 4.5,
    users: "45K+",
    isFeatured: true,
  },
  {
    id: "6",
    name: "PixelPerfect",
    description:
      "AI-powered image editing tool that understands context. Remove backgrounds, enhance photos, and apply intelligent retouching.",
    category: "Image Editing",
    icon: "sparkles",
    gradient: "from-pink-500 to-rose-600",
    features: [
      "Background Removal",
      "AI Enhancement",
      "Object Removal",
      "Color Grading",
    ],
    pricing: "Free",
    rating: 4.8,
    users: "300K+",
  },
  {
    id: "7",
    name: "StyleMorph",
    description:
      "Transfer artistic styles between images. Apply the style of famous paintings to your photos or create unique visual mashups.",
    category: "Style Transfer",
    icon: "wand",
    gradient: "from-violet-500 to-indigo-600",
    features: [
      "Style Transfer",
      "Custom Styles",
      "Batch Processing",
      "Real-time Preview",
    ],
    pricing: "$7.99/mo",
    rating: 4.4,
    users: "55K+",
  },
  {
    id: "8",
    name: "AnimateX",
    description:
      "Bring static images to life with AI-powered animation. Create smooth animations, character movements, and visual effects.",
    category: "Animation",
    icon: "film",
    gradient: "from-amber-500 to-orange-600",
    features: [
      "Image Animation",
      "Character Rigging",
      "GIF Export",
      "Loop Control",
    ],
    pricing: "$12.99/mo",
    rating: 4.6,
    users: "70K+",
    isNew: true,
  },
  {
    id: "9",
    name: "PhotoReal AI",
    description:
      "Generate hyperrealistic photographs from text descriptions. Create stock photos, portraits, and product images without a camera.",
    category: "Image Generation",
    icon: "camera",
    gradient: "from-emerald-500 to-green-600",
    features: [
      "Photorealistic Output",
      "Face Generation",
      "Product Photos",
      "Lighting Control",
    ],
    pricing: "$16.99/mo",
    rating: 4.7,
    users: "120K+",
    isFeatured: true,
  },
  {
    id: "10",
    name: "SketchToArt",
    description:
      "Transform rough sketches into polished artwork. Draw a basic outline and let AI fill in the details with stunning precision.",
    category: "Image Generation",
    icon: "sketch",
    gradient: "from-sky-500 to-cyan-600",
    features: [
      "Sketch Recognition",
      "Auto Coloring",
      "Style Selection",
      "Layer Support",
    ],
    pricing: "Free",
    rating: 4.5,
    users: "90K+",
  },
  {
    id: "11",
    name: "VoiceArt Studio",
    description:
      "Create AI-powered voiceovers, narrations, and audio content. Supports 50+ languages with natural-sounding voice synthesis.",
    category: "Audio Generation",
    icon: "mic",
    gradient: "from-fuchsia-500 to-purple-600",
    features: [
      "50+ Languages",
      "Voice Cloning",
      "Emotion Control",
      "SSML Support",
    ],
    pricing: "$11.99/mo",
    rating: 4.6,
    users: "85K+",
  },
  {
    id: "12",
    name: "CinematicAI",
    description:
      "Professional-grade video generation with cinematic quality. Create trailers, short films, and visual narratives from scripts.",
    category: "Video Generation",
    icon: "clapperboard",
    gradient: "from-red-500 to-pink-600",
    features: [
      "Script to Video",
      "Cinematic Effects",
      "Voice Narration",
      "4K HDR",
    ],
    pricing: "$29.99/mo",
    rating: 4.8,
    users: "40K+",
    isNew: true,
    isFeatured: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Digital Artist",
    content:
      "AI ART has completely transformed my creative workflow. The tools are incredibly intuitive and the results are mind-blowing. I can now produce in hours what used to take days.",
    avatar: "SJ",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Game Developer",
    content:
      "The 3D modeling and animation tools are game-changers. We have reduced our asset creation time by 70%. The quality is production-ready right out of the box.",
    avatar: "MC",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Content Creator",
    content:
      "I use AI ART daily for my YouTube thumbnails and social media content. The image generation quality is unmatched. My engagement has increased by 300%!",
    avatar: "ED",
    rating: 5,
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Marketing Director",
    content:
      "Our marketing team has saved thousands of dollars on stock photos and design work. AI ART pays for itself within the first week of use.",
    avatar: "JW",
    rating: 4,
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "UI/UX Designer",
    content:
      "The style transfer and image editing tools help me create unique designs that stand out. My clients are always impressed with the results.",
    avatar: "LP",
    rating: 5,
  },
  {
    id: 6,
    name: "David Brown",
    role: "Filmmaker",
    content:
      "CinematicAI is revolutionary. I can now create concept videos and storyboards in minutes. It is like having an entire production studio at my fingertips.",
    avatar: "DB",
    rating: 5,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out AI ART tools",
    features: [
      "5 generations per day",
      "Basic image generation",
      "Standard quality output",
      "Community support",
      "Basic editing tools",
      "720p export",
    ],
    limitations: [
      "No commercial license",
      "Watermark on exports",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For professionals and serious creators",
    features: [
      "Unlimited generations",
      "All AI tools access",
      "4K quality output",
      "Priority support",
      "Advanced editing suite",
      "Commercial license",
      "API access",
      "Custom style training",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "For teams and businesses",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Dedicated account manager",
      "Custom AI model training",
      "SLA guarantee",
      "White-label option",
      "Bulk processing",
      "Advanced analytics",
      "Priority queue",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];