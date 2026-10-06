import { parseTopicTree, type TopicTreeNode } from "@/lib/parseTopicTree";

function BranchNode({ node, depth }: { node: TopicTreeNode; depth: number }) {
  return (
    <li className="list-none">
      <div
        className="rounded-xl border border-[var(--tree-border)] bg-[var(--tree-node)] px-4 py-3"
        style={{ marginLeft: depth > 0 ? `${Math.min(depth, 4) * 0.75}rem` : 0 }}
      >
        <p className="text-base leading-relaxed text-[var(--tree-text)] sm:text-[1.0625rem]">
          {node.label}
        </p>
      </div>
      {node.children.length > 0 && (
        <ul className="mt-2 space-y-2 border-l-2 border-[var(--tree-line)] pl-4 ml-2">
          {node.children.map((child, idx) => (
            <BranchNode key={`${child.label}-${idx}`} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TopicTreeDiagram({ tree }: { tree: string }) {
  const { root, branches } = parseTopicTree(tree);

  return (
    <div className="tree-panel overflow-hidden rounded-2xl border border-[var(--tree-border)] shadow-sm">
      <div className="border-b border-[var(--tree-border)] bg-[var(--tree-panel-head)] px-5 py-4 sm:px-6">
        <p className="text-sm text-[var(--tree-text-dim)]">Starts from</p>
        <p className="mt-1 text-xl font-semibold tracking-tight text-[var(--tree-text)] sm:text-2xl">
          {root}
        </p>
      </div>
      <div className="space-y-3 px-4 py-5 sm:px-6 sm:py-6">
        {branches.length === 0 ? (
          <p className="text-sm text-[var(--tree-text-dim)]">No levels listed.</p>
        ) : (
          <ul className="space-y-3">
            {branches.map((node, idx) => (
              <BranchNode key={`${node.label}-${idx}`} node={node} depth={0} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
