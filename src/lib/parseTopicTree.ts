export interface TopicTreeNode {
  label: string;
  children: TopicTreeNode[];
}

export interface ParsedTopicTree {
  root: string;
  branches: TopicTreeNode[];
}

function lineDepth(raw: string): number {
  let depth = 0;
  let i = 0;
  while (i < raw.length) {
    if (raw.startsWith("│   ", i)) {
      depth += 1;
      i += 4;
    } else if (raw.startsWith("    ", i)) {
      depth += 1;
      i += 4;
    } else {
      break;
    }
  }
  return depth;
}

function lineLabel(raw: string): string {
  return raw.replace(/^[\s│├└─]+/, "").trim();
}

/** Parse compact ASCII trees from topic content into a render tree. */
export function parseTopicTree(text: string): ParsedTopicTree {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/\r$/, ""))
    .filter((l) => {
      const t = l.trim();
      return t.length > 0 && t !== "│";
    });

  if (lines.length === 0) {
    return { root: "Topic", branches: [] };
  }

  const root = lineLabel(lines[0]);
  const branches: TopicTreeNode[] = [];
  const stack: { depth: number; node: TopicTreeNode }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];
    const label = lineLabel(raw);
    if (!label) continue;

    const depth = lineDepth(raw);
    const node: TopicTreeNode = { label, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      branches.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    stack.push({ depth, node });
  }

  return { root, branches };
}
