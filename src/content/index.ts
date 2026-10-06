import type { Topic } from "./types";
import { twoPointers } from "./topics/two-pointers";
import { intervals } from "./topics/intervals";
import { slidingWindow } from "./topics/sliding-window";
import { fastSlow } from "./topics/fast-slow";
import { linkedLists } from "./topics/linked-lists";
import { stacks } from "./topics/stacks";
import { queues } from "./topics/queues";
import { hashMaps } from "./topics/hash-maps";
import { heaps } from "./topics/heaps";
import { topK } from "./topics/top-k";
import { binarySearch } from "./topics/binary-search";
import { sorting } from "./topics/sorting";
import { subsets } from "./topics/subsets";
import { permutations } from "./topics/permutations";
import { greedy } from "./topics/greedy";
import { dynamicProgramming } from "./topics/dynamic-programming";
import { backtracking } from "./topics/backtracking";
import { search } from "./topics/search";
import { matrices } from "./topics/matrices";
import { trie } from "./topics/trie";
import { graphs } from "./topics/graphs";
import { unionFind } from "./topics/union-find";
import { bitManipulation } from "./topics/bit-manipulation";
import { mathGeometry } from "./topics/math-geometry";

export const topics: Topic[] = [
  twoPointers,
  intervals,
  slidingWindow,
  fastSlow,
  linkedLists,
  stacks,
  queues,
  hashMaps,
  heaps,
  topK,
  binarySearch,
  sorting,
  subsets,
  permutations,
  greedy,
  dynamicProgramming,
  backtracking,
  search,
  matrices,
  trie,
  graphs,
  unionFind,
  bitManipulation,
  mathGeometry,
].sort((a, b) => a.id - b.id);

export function getAllTopics(): Topic[] {
  return topics;
}

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getTopicSlugs(): string[] {
  return topics.map((t) => t.slug);
}
