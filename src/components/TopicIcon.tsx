import {
  Award,
  Binary,
  Boxes,
  Brain,
  Calculator,
  FolderTree,
  GitBranch,
  GitCommitHorizontal,
  Grid3x3,
  Hash,
  Layers,
  Link as LinkIcon,
  ListOrdered,
  Merge,
  Network,
  Rabbit,
  Search,
  Share2,
  Shuffle,
  Triangle,
  Zap,
  ArrowUpDown,
  AppWindow,
  BetweenHorizontalStart,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "git-commit-horizontal": GitCommitHorizontal,
  "between-horizonal": BetweenHorizontalStart,
  "between-horizontal": BetweenHorizontalStart,
  "app-window": AppWindow,
  rabbit: Rabbit,
  link: LinkIcon,
  layers: Layers,
  "list-ordered": ListOrdered,
  hash: Hash,
  triangle: Triangle,
  award: Award,
  search: Search,
  "arrow-up-down": ArrowUpDown,
  boxes: Boxes,
  shuffle: Shuffle,
  zap: Zap,
  brain: Brain,
  "git-branch": GitBranch,
  network: Network,
  "grid-3x3": Grid3x3,
  "folder-tree": FolderTree,
  "share-2": Share2,
  merge: Merge,
  binary: Binary,
  calculator: Calculator,
};

export function TopicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Network;
  return <Icon className={className} />;
}
