# DSA Invariants — SDE-1 Prep

Dark, proof-first interview preparation platform.

> **Do not teach DSA as a collection of problems. Teach DSA as a progression of invariants.**

## Philosophy

$$
\text{Invariant} + \text{Safe elimination} + \text{Progress} = \text{Algorithm}
$$

Each of the **24 topics** is a progressive tree: every level introduces one new constraint, invariant, or data-structure idea — not another random LeetCode clone.

**Stacks** is the canonical deep dive: Balanced → Wildcard `*` → Score → Generate → Longest Valid → Monotonic / DP combinations.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                  # Home, roadmap, topic pages
  components/           # Tree nav, node detail, math (KaTeX)
  content/
    types.ts            # Topic / Level / Proof schemas
    catalog.ts          # Home grid metadata
    roadmap.ts          # Master + cross-dependency graphs
    topics/*.ts         # 24 invariant trees
```

## Learning loop

```
Problem Recognition → Invariant Recognition → Proof → Implementation
```

Not: Problem → Memorized Solution.
