import {
  Palette,
  Image as ImageIcon,
  Video,
  Music4,
  Box,
  Sparkles,
  Wand2,
  Film,
  Brush,
  Camera,
  PencilRuler,
  Mic2,
  Clapperboard,
  Rocket,
  PenTool,
  Search,
  MonitorSmartphone,
  Workflow,
  Globe,
  Shield,
  SlidersHorizontal,
  Zap,
} from "lucide-react";

export const toolIcons = {
  palette: Palette,
  image: ImageIcon,
  video: Video,
  music: Music4,
  box: Box,
  sparkles: Sparkles,
  wand: Wand2,
  film: Film,
  brush: Brush,
  camera: Camera,
  sketch: PencilRuler,
  mic: Mic2,
  clapperboard: Clapperboard,
} as const;

export const featureIcons = {
  zap: Zap,
  sliders: SlidersHorizontal,
  shield: Shield,
  globe: Globe,
  workflow: Workflow,
  devices: MonitorSmartphone,
} as const;

export const stepIcons = {
  search: Search,
  pen: PenTool,
  wand: Wand2,
  rocket: Rocket,
} as const;