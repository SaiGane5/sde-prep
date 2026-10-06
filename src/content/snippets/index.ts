export type CodeSnippets = { cpp: string; python: string };

function key(topicSlug: string, levelId: string): string {
  return `${topicSlug}:${levelId}`;
}

function pair(cpp: string, python: string): CodeSnippets {
  return { cpp, python };
}

function invariantLabel(coreInvariant: string): string {
  return coreInvariant
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\boxed\{([^}]*)\}/g, "$1")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 72);
}

const CURATED: Record<string, CodeSnippets> = {
  [key("backtracking", "bt0")]: pair(
    `// Template: choose -> explore -> undo
void backtrack() {
    // if complete: record
    // for choice: apply; backtrack(); undo
}`,
    `# Template: choose -> explore -> undo
def backtrack() -> None:
    pass  # if complete: record; for choice: apply, recurse, undo`
  ),
  [key("backtracking", "bt1")]: pair(
    `class Solution {
    vector<vector<int>> ans;
    void dfs(vector<int>& nums, int start, vector<int>& path) {
        ans.push_back(path);
        for (int i = start; i < (int)nums.size(); i++) {
            path.push_back(nums[i]);
            dfs(nums, i + 1, path);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> path;
        dfs(nums, 0, path);
        return ans;
    }
};`,
    `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        ans: list[list[int]] = []
        def dfs(start: int, path: list[int]) -> None:
            ans.append(path[:])
            for i in range(start, len(nums)):
                path.append(nums[i])
                dfs(i + 1, path)
                path.pop()
        dfs(0, [])
        return ans`
  ),
  [key("backtracking", "bt2")]: pair(
    `class Solution {
    vector<vector<int>> ans;
    void dfs(vector<int>& nums, vector<int>& path, vector<char>& used) {
        if (path.size() == nums.size()) { ans.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            used[i] = 1; path.push_back(nums[i]);
            dfs(nums, path, used);
            path.pop_back(); used[i] = 0;
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<int> path; vector<char> used(nums.size());
        dfs(nums, path, used);
        return ans;
    }
};`,
    `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        ans: list[list[int]] = []
        def dfs(path: list[int], used: list[bool]) -> None:
            if len(path) == len(nums):
                ans.append(path[:]); return
            for i, x in enumerate(nums):
                if used[i]:
                    continue
                used[i] = True
                path.append(x)
                dfs(path, used)
                path.pop()
                used[i] = False
        dfs([], [False] * len(nums))
        return ans`
  ),
  [key("binary-search", "bs0")]: pair(
    `// Invariant: answer in [lo, hi)
class Solution {
public:
    int lowerBound(vector<int>& A, int target) {
        int lo = 0, hi = (int)A.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (A[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
};`,
    `# Invariant: answer in [lo, hi)
class Solution:
    def lowerBound(self, A: list[int], target: int) -> int:
        lo, hi = 0, len(A)
        while lo < hi:
            mid = (lo + hi) // 2
            if A[mid] < target:
                lo = mid + 1
            else:
                hi = mid
        return lo`
  ),
  [key("binary-search", "bs1")]: pair(
    `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
};`,
    `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return -1`
  ),
  [key("binary-search", "bs2")]: pair(
    `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        auto lb = [&](int t) {
            int lo = 0, hi = (int)nums.size();
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (nums[mid] < t) lo = mid + 1;
                else hi = mid;
            }
            return lo;
        };
        int l = lb(target);
        if (l == (int)nums.size() || nums[l] != target) return {-1, -1};
        return {l, lb(target + 1) - 1};
    }
};`,
    `class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        def lb(t: int) -> int:
            lo, hi = 0, len(nums)
            while lo < hi:
                mid = (lo + hi) // 2
                if nums[mid] < t:
                    lo = mid + 1
                else:
                    hi = mid
            return lo
        l = lb(target)
        if l == len(nums) or nums[l] != target:
            return [-1, -1]
        return [l, lb(target + 1) - 1]`
  ),
  [key("binary-search", "bs3")]: pair(
    `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[lo] <= nums[mid]) {
                if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }
};`,
    `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return mid
            if nums[lo] <= nums[mid]:
                if nums[lo] <= target < nums[mid]:
                    hi = mid - 1
                else:
                    lo = mid + 1
            else:
                if nums[mid] < target <= nums[hi]:
                    lo = mid + 1
                else:
                    hi = mid - 1
        return -1`
  ),
  [key("binary-search", "bs4")]: pair(
    `class Solution {
    bool ok(vector<int>& piles, int h, int speed) {
        long hrs = 0;
        for (int p : piles) hrs += (p + speed - 1) / speed;
        return hrs <= h;
    }
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int lo = 1, hi = 1e9;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (ok(piles, h, mid)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};`,
    `class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        def ok(speed: int) -> bool:
            return sum((p + speed - 1) // speed for p in piles) <= h
        lo, hi = 1, max(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            if ok(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo`
  ),
  [key("binary-search", "bs5")]: pair(
    `class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < nums[mid + 1]) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
};`,
    `class Solution:
    def findPeakElement(self, nums: list[int]) -> int:
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < nums[mid + 1]:
                lo = mid + 1
            else:
                hi = mid
        return lo`
  ),
  [key("bit-manipulation", "bm0")]: pair(
    `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int x = 0;
        for (int v : nums) x ^= v;
        return x;
    }
};`,
    `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        x = 0
        for v in nums:
            x ^= v
        return x`
  ),
  [key("bit-manipulation", "bm1")]: pair(
    `class Solution {
public:
    int hammingWeight(uint32_t n) {
        int cnt = 0;
        while (n) { n &= n - 1; cnt++; }
        return cnt;
    }
};`,
    `class Solution:
    def hammingWeight(self, n: int) -> int:
        cnt = 0
        while n:
            n &= n - 1
            cnt += 1
        return cnt`
  ),
  [key("bit-manipulation", "bm2")]: pair(
    `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
        return dp;
    }
};`,
    `class Solution:
    def countBits(self, n: int) -> list[int]:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp`
  ),
  [key("dynamic-programming", "dp0")]: pair(
    `class Solution {
    int dfs(int n, vector<int>& memo) {
        if (n <= 1) return 1;
        if (memo[n]) return memo[n];
        return memo[n] = dfs(n - 1, memo) + dfs(n - 2, memo);
    }
public:
    int climbStairs(int n) {
        vector<int> memo(n + 1);
        return dfs(n, memo);
    }
};`,
    `class Solution:
    def climbStairs(self, n: int) -> int:
        memo: dict[int, int] = {}
        def dfs(k: int) -> int:
            if k <= 1:
                return 1
            if k in memo:
                return memo[k]
            memo[k] = dfs(k - 1) + dfs(k - 2)
            return memo[k]
        return dfs(n)`
  ),
  [key("dynamic-programming", "dp1")]: pair(
    `class Solution {
    int dfs(int n, vector<int>& memo) {
        if (n <= 1) return n;
        if (memo[n] != -1) return memo[n];
        return memo[n] = dfs(n - 1, memo) + dfs(n - 2, memo);
    }
public:
    int fib(int n) {
        vector<int> memo(n + 1, -1);
        return dfs(n, memo);
    }
};`,
    `class Solution:
    def fib(self, n: int) -> int:
        memo: dict[int, int] = {}
        def dfs(k: int) -> int:
            if k <= 1:
                return k
            if k in memo:
                return memo[k]
            memo[k] = dfs(k - 1) + dfs(k - 2)
            return memo[k]
        return dfs(n)`
  ),
  [key("dynamic-programming", "dp2")]: pair(
    `class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int cur = max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};`,
    `class Solution:
    def rob(self, nums: list[int]) -> int:
        prev2 = prev1 = 0
        for x in nums:
            prev2, prev1 = prev1, max(prev1, prev2 + x)
        return prev1`
  ),
  [key("fast-slow", "fs0")]: pair(
    `struct ListNode { int val; ListNode* next; };
// Invariant: fast moves 2x slow
void advance(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
}`,
    `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def advance(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next`
  ),
  [key("fast-slow", "fs1")]: pair(
    `struct ListNode { int val; ListNode* next; };
ListNode* middleNode(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
    `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def middleNode(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`
  ),
  [key("fast-slow", "fs2")]: pair(
    `struct ListNode { int val; ListNode* next; };
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def hasCycle(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`
  ),
  [key("graphs", "g0")]: pair(
    `// Adjacency list: adj[v] = neighbors of v
#include <vector>
using namespace std;`,
    `# adj[v] lists neighbors of v
from collections import defaultdict

adj: dict[int, list[int]] = defaultdict(list)`
  ),
  [key("graphs", "g1")]: pair(
    `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size(), ans = 0;
        vector<pair<int,int>> q;
        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {
            if (grid[r][c] != '1') continue;
            ans++; grid[r][c] = '0'; q.push_back({r,c});
            for (size_t i = 0; i < q.size(); i++) {
                auto [r,c] = q[i];
                for (auto [dr,dc] : vector<pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}}) {
                    int nr=r+dr, nc=c+dc;
                    if (nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]=='1') {
                        grid[nr][nc]='0'; q.push_back({nr,nc});
                    }
                }
            }
            q.clear();
        }
        return ans;
    }
};`,
    `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] != '1':
                    continue
                ans += 1
                q = [(r, c)]
                grid[r][c] = '0'
                for cr, cc in q:
                    for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                        nr, nc = cr+dr, cc+dc
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':
                            grid[nr][nc] = '0'
                            q.append((nr, nc))
        return ans`
  ),
  [key("graphs", "g2")]: pair(
    `class Solution {
    bool dfs(vector<vector<int>>& g, int u, vector<int>& color) {
        for (int v : g[u]) {
            if (color[v] == -1) { color[v] = 1 - color[u]; if (!dfs(g, v, color)) return false; }
            else if (color[v] == color[u]) return false;
        }
        return true;
    }
public:
    bool isBipartite(vector<vector<int>>& g) {
        vector<int> color(g.size(), -1);
        for (int i = 0; i < (int)g.size(); i++)
            if (color[i] == -1) { color[i] = 0; if (!dfs(g, i, color)) return false; }
        return true;
    }
};`,
    `class Solution:
    def isBipartite(self, graph: list[list[int]]) -> bool:
        color = [-1] * len(graph)
        def dfs(u: int) -> bool:
            for v in graph[u]:
                if color[v] == -1:
                    color[v] = 1 - color[u]
                    if not dfs(v):
                        return False
                elif color[v] == color[u]:
                    return False
            return True
        for i in range(len(graph)):
            if color[i] == -1:
                color[i] = 0
                if not dfs(i):
                    return False
        return True`
  ),
  [key("greedy", "g0")]: pair(
    `// Invariant: greedy choice preserves some optimal solution`,
    `# Invariant: each greedy pick keeps an optimal solution reachable`
  ),
  [key("greedy", "g1")]: pair(
    `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& in) {
        sort(in.begin(), in.end(), [](auto& a, auto& b) { return a[1] < b[1]; });
        int end = INT_MIN, kept = 0;
        for (auto& v : in)
            if (v[0] >= end) { end = v[1]; kept++; }
        return (int)in.size() - kept;
    }
};`,
    `class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        end = float('-inf')
        kept = 0
        for s, e in intervals:
            if s >= end:
                end = e
                kept += 1
        return len(intervals) - kept`
  ),
  [key("greedy", "g2")]: pair(
    `#include <queue>
#include <vector>
using namespace std;

class Solution {
public:
    int connectSticks(vector<int>& sticks) {
        priority_queue<int, vector<int>, greater<int>> pq(sticks.begin(), sticks.end());
        int cost = 0;
        while (pq.size() > 1) {
            int a = pq.top(); pq.pop();
            int b = pq.top(); pq.pop();
            cost += a + b;
            pq.push(a + b);
        }
        return cost;
    }
};`,
    `import heapq

class Solution:
    def connectSticks(self, sticks: list[int]) -> int:
        heapq.heapify(sticks)
        cost = 0
        while len(sticks) > 1:
            a = heapq.heappop(sticks)
            b = heapq.heappop(sticks)
            cost += a + b
            heapq.heappush(sticks, a + b)
        return cost`
  ),
  [key("hash-maps", "hm0")]: pair(
    `#include <unordered_map>
using namespace std;

void demo() {
    unordered_map<int, int> mp;
    mp[1] = 42;
    if (mp.count(1)) mp.at(1);
}`,
    `mp: dict[int, int] = {}
mp[1] = 42
if 1 in mp:
    mp[1]`
  ),
  [key("hash-maps", "hm1")]: pair(
    `#include <unordered_map>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < (int)nums.size(); i++) {
            int need = target - nums[i];
            if (seen.count(need)) return {seen[need], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen: dict[int, int] = {}
        for i, x in enumerate(nums):
            if target - x in seen:
                return [seen[target - x], i]
            seen[x] = i
        return []`
  ),
  [key("hash-maps", "hm2")]: pair(
    `#include <unordered_map>
#include <string>
using namespace std;

class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> freq;
        for (char c : s) freq[c]++;
        for (int i = 0; i < (int)s.size(); i++)
            if (freq[s[i]] == 1) return i;
        return -1;
    }
};`,
    `class Solution:
    def firstUniqChar(self, s: str) -> int:
        from collections import Counter
        freq = Counter(s)
        for i, c in enumerate(s):
            if freq[c] == 1:
                return i
        return -1`
  ),
  [key("heaps", "hp0")]: pair(
    `// Max-heap: parent >= children; root is global max
#include <vector>
using namespace std;`,
    `# Max-heap property: parent dominates children`
  ),
  [key("heaps", "hp1")]: pair(
    `class MaxHeap {
    vector<int> a;
    void siftUp(int i) {
        while (i && a[(i-1)/2] < a[i]) { swap(a[i], a[(i-1)/2]); i = (i-1)/2; }
    }
    void siftDown(int i) {
        int n = a.size();
        while (true) {
            int l = 2*i+1, r = l+1, best = i;
            if (l < n && a[l] > a[best]) best = l;
            if (r < n && a[r] > a[best]) best = r;
            if (best == i) break;
            swap(a[i], a[best]); i = best;
        }
    }
public:
    void push(int x) { a.push_back(x); siftUp(a.size()-1); }
    int top() { return a[0]; }
    void pop() { a[0] = a.back(); a.pop_back(); if (!a.empty()) siftDown(0); }
};`,
    `import heapq

class MaxHeap:
    def __init__(self):
        self.a: list[int] = []
    def push(self, x: int) -> None:
        heapq.heappush(self.a, -x)
    def top(self) -> int:
        return -self.a[0]
    def pop(self) -> None:
        heapq.heappop(self.a)`
  ),
  [key("heaps", "hp2")]: pair(
    `#include <queue>
#include <vector>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> pq(nums.begin(), nums.end());
        while ((int)pq.size() > k) pq.pop();
        return pq.top();
    }
};`,
    `import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        h = nums[:]
        heapq.heapify(h)
        while len(h) > k:
            heapq.heappop(h)
        return h[0]`
  ),
  [key("intervals", "iv0")]: pair(
    `struct Interval { int start, end; };
bool normalized(const Interval& a) { return a.start <= a.end; }`,
    `from dataclasses import dataclass

@dataclass
class Interval:
    start: int
    end: int

def normalized(a: Interval) -> bool:
    return a.start <= a.end`
  ),
  [key("intervals", "iv1")]: pair(
    `struct Interval { int start, end; };
bool overlap(const Interval& a, const Interval& b) {
    return !(a.end < b.start || b.end < a.start);
}`,
    `def overlap(a: tuple[int, int], b: tuple[int, int]) -> bool:
    return not (a[1] < b[0] or b[1] < a[0])`
  ),
  [key("intervals", "iv2")]: pair(
    `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& in) {
        sort(in.begin(), in.end());
        vector<vector<int>> ans;
        for (auto& v : in) {
            if (ans.empty() || v[0] > ans.back()[1]) ans.push_back(v);
            else ans.back()[1] = max(ans.back()[1], v[1]);
        }
        return ans;
    }
};`,
    `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort()
        ans: list[list[int]] = []
        for s, e in intervals:
            if not ans or s > ans[-1][1]:
                ans.append([s, e])
            else:
                ans[-1][1] = max(ans[-1][1], e)
        return ans`
  ),
  [key("linked-lists", "ll0")]: pair(
    `struct ListNode { int val; ListNode* next; };
// Invariant: dummy head simplifies edge cases
ListNode* withDummy(ListNode* head) {
    ListNode dummy(0, head);
    ListNode* cur = dummy.next;
    while (cur) cur = cur->next;
    return dummy.next;
}`,
    `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def with_dummy(head):
    dummy = ListNode(0, head)
    cur = dummy.next
    while cur:
        cur = cur.next
    return dummy.next`
  ),
  [key("linked-lists", "ll1")]: pair(
    `struct ListNode { int val; ListNode* next; };
ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *cur = head;
    while (cur) {
        ListNode* nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}`,
    `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def reverseList(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev, cur = cur, nxt
    return prev`
  ),
  [key("linked-lists", "ll2")]: pair(
    `struct ListNode { int val; ListNode* next; };
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val < l2->val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`,
    `class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def mergeTwoLists(l1, l2):
    dummy = tail = ListNode()
    while l1 and l2:
        if l1.val < l2.val:
            tail.next, l1 = l1, l1.next
        else:
            tail.next, l2 = l2, l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`
  ),
  [key("math-geometry", "mg0")]: pair(
    `int gcd(int a, int b) {
    while (b) { int t = a % b; a = b; b = t; }
    return a;
}`,
    `def gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a`
  ),
  [key("math-geometry", "mg1")]: pair(
    `vector<bool> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int p = 2; 1LL * p * p <= n; p++)
        if (isPrime[p])
            for (int j = p * p; j <= n; j += p) isPrime[j] = false;
    return isPrime;
}`,
    `def countPrimes(n: int) -> int:
    if n <= 2:
        return 0
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False
    for p in range(2, int(n ** 0.5) + 1):
        if is_prime[p]:
            for j in range(p * p, n, p):
                is_prime[j] = False
    return sum(is_prime)`
  ),
  [key("math-geometry", "mg2")]: pair(
    `long modPow(long a, long b, long mod) {
    long res = 1;
    a %= mod;
    while (b) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}`,
    `class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n == 0:
            return 1.0
        if n < 0:
            x, n = 1 / x, -n
        res = 1.0
        while n:
            if n & 1:
                res *= x
            x *= x
            n >>= 1
        return res`
  ),
  [key("matrices", "mx0")]: pair(
    `class Solution {
public:
    int numRows, numCols;
    bool inBounds(int r, int c) { return r >= 0 && r < numRows && c >= 0 && c < numCols; }
};`,
    `class Solution:
    def in_bounds(self, r: int, c: int, m: int, n: int) -> bool:
        return 0 <= r < m and 0 <= c < n`
  ),
  [key("matrices", "mx1")]: pair(
    `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& m, int target) {
        int r = 0, c = (int)m[0].size() - 1;
        while (r < (int)m.size() && c >= 0) {
            if (m[r][c] == target) return true;
            if (m[r][c] > target) c--;
            else r++;
        }
        return false;
    }
};`,
    `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        r, c = 0, len(matrix[0]) - 1
        while r < len(matrix) and c >= 0:
            if matrix[r][c] == target:
                return True
            if matrix[r][c] > target:
                c -= 1
            else:
                r += 1
        return False`
  ),
  [key("matrices", "mx2")]: pair(
    `class Solution {
public:
    void setZeroes(vector<vector<int>>& m) {
        int R = m.size(), C = m[0].size();
        bool row0 = false, col0 = false;
        for (int r = 0; r < R; r++) if (!m[r][0]) col0 = true;
        for (int c = 0; c < C; c++) if (!m[0][c]) row0 = true;
        for (int r = 1; r < R; r++)
            for (int c = 1; c < C; c++)
                if (!m[r][c]) { m[r][0] = m[0][c] = 0; }
        for (int r = 1; r < R; r++)
            for (int c = 1; c < C; c++)
                if (!m[r][0] || !m[0][c]) m[r][c] = 0;
        if (row0) for (int c = 0; c < C; c++) m[0][c] = 0;
        if (col0) for (int r = 0; r < R; r++) m[r][0] = 0;
    }
};`,
    `class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        R, C = len(matrix), len(matrix[0])
        row0 = any(not matrix[0][c] for c in range(C))
        col0 = any(not matrix[r][0] for r in range(R))
        for r in range(1, R):
            for c in range(1, C):
                if not matrix[r][c]:
                    matrix[r][0] = matrix[0][c] = 0
        for r in range(1, R):
            for c in range(1, C):
                if not matrix[r][0] or not matrix[0][c]:
                    matrix[r][c] = 0
        if row0:
            for c in range(C):
                matrix[0][c] = 0
        if col0:
            for r in range(R):
                matrix[r][0] = 0`
  ),
  [key("permutations", "pm0")]: pair(
    `// Invariant: order matters — arrange all n positions
int factorial(int n) { int f = 1; for (int i = 2; i <= n; i++) f *= i; return f; }`,
    `# Invariant: order matters — n! permutations
import math

def count_perms(n: int) -> int:
    return math.factorial(n)`
  ),
  [key("permutations", "pm1")]: pair(
    `class Solution {
    vector<vector<int>> ans;
    void dfs(vector<int>& nums, vector<int>& path, vector<char>& used) {
        if (path.size() == nums.size()) { ans.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i]) continue;
            used[i] = 1; path.push_back(nums[i]);
            dfs(nums, path, used);
            path.pop_back(); used[i] = 0;
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<int> path; vector<char> used(nums.size());
        dfs(nums, path, used);
        return ans;
    }
};`,
    `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        ans: list[list[int]] = []
        def dfs(path: list[int], used: list[bool]) -> None:
            if len(path) == len(nums):
                ans.append(path[:]); return
            for i, x in enumerate(nums):
                if used[i]:
                    continue
                used[i] = True
                path.append(x)
                dfs(path, used)
                path.pop()
                used[i] = False
        dfs([], [False] * len(nums))
        return ans`
  ),
  [key("permutations", "pm2")]: pair(
    `class Solution {
    vector<vector<int>> ans;
    void dfs(vector<int>& nums, vector<int>& path, vector<char>& used) {
        if (path.size() == nums.size()) { ans.push_back(path); return; }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (used[i] || (i && nums[i] == nums[i-1] && !used[i-1])) continue;
            used[i] = 1; path.push_back(nums[i]);
            dfs(nums, path, used);
            path.pop_back(); used[i] = 0;
        }
    }
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> path; vector<char> used(nums.size());
        dfs(nums, path, used);
        return ans;
    }
};`,
    `class Solution:
    def permuteUnique(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        ans: list[list[int]] = []
        def dfs(path: list[int], used: list[bool]) -> None:
            if len(path) == len(nums):
                ans.append(path[:]); return
            for i, x in enumerate(nums):
                if used[i] or (i and x == nums[i - 1] and not used[i - 1]):
                    continue
                used[i] = True
                path.append(x)
                dfs(path, used)
                path.pop()
                used[i] = False
        dfs([], [False] * len(nums))
        return ans`
  ),
  [key("queues", "q0")]: pair(
    `#include <queue>
using namespace std;

void fifoDemo() {
    queue<int> q;
    q.push(1);
    q.push(2);
    int a = q.front(); q.pop();
}`,
    `from collections import deque
q: deque[int] = deque()
q.append(1)
q.append(2)
a = q.popleft()`
  ),
  [key("queues", "q1")]: pair(
    `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if (!root) return ans;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            while (sz--) {
                auto* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            ans.push_back(level);
        }
        return ans;
    }
};`,
    `from collections import deque

class Solution:
    def levelOrder(self, root) -> list[list[int]]:
        if not root:
            return []
        ans: list[list[int]] = []
        q = deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            ans.append(level)
        return ans`
  ),
  [key("queues", "q2")]: pair(
    `#include <deque>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> ans;
        for (int i = 0; i < (int)nums.size(); i++) {
            while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) ans.push_back(nums[dq.front()]);
        }
        return ans;
    }
};`,
    `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        dq: deque[int] = deque()
        ans: list[int] = []
        for i, x in enumerate(nums):
            while dq and dq[0] <= i - k:
                dq.popleft()
            while dq and nums[dq[-1]] <= x:
                dq.pop()
            dq.append(i)
            if i >= k - 1:
                ans.append(nums[dq[0]])
        return ans`
  ),
  [key("search", "sr0")]: pair(
    `// BFS: queue frontier; DFS: stack/recursion with visited
#include <queue>
using namespace std;`,
    `# BFS: deque frontier; DFS: stack + visited`
  ),
  [key("search", "sr1")]: pair(
    `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& g) {
        int n = g.size();
        if (g[0][0] || g[n-1][n-1]) return -1;
        queue<pair<int,int>> q;
        q.push({0,0}); g[0][0] = 1;
        int dist = 1;
        while (!q.empty()) {
            int sz = q.size();
            while (sz--) {
                auto [r,c] = q.front(); q.pop();
                if (r == n-1 && c == n-1) return dist;
                for (int dr=-1; dr<=1; dr++) for (int dc=-1; dc<=1; dc++) {
                    if (!dr && !dc) continue;
                    int nr=r+dr, nc=c+dc;
                    if (nr>=0&&nr<n&&nc>=0&&nc<n&&g[nr][nc]==0) {
                        g[nr][nc]=1; q.push({nr,nc});
                    }
                }
            }
            dist++;
        }
        return -1;
    }
};`,
    `from collections import deque

class Solution:
    def shortestPathBinaryMatrix(self, grid: list[list[int]]) -> int:
        n = len(grid)
        if grid[0][0] or grid[-1][-1]:
            return -1
        q = deque([(0, 0)])
        grid[0][0] = 1
        dist = 1
        while q:
            for _ in range(len(q)):
                r, c = q.popleft()
                if r == n - 1 and c == n - 1:
                    return dist
                for dr in (-1, 0, 1):
                    for dc in (-1, 0, 1):
                        if dr == 0 and dc == 0:
                            continue
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                            grid[nr][nc] = 1
                            q.append((nr, nc))
            dist += 1
        return -1`
  ),
  [key("search", "sr2")]: pair(
    `class Solution {
    void dfs(vector<vector<char>>& g, int r, int c) {
        int m = g.size(), n = g[0].size();
        if (r < 0 || c < 0 || r >= m || c >= n || g[r][c] != '1') return;
        g[r][c] = '0';
        dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int ans = 0;
        for (int r = 0; r < (int)grid.size(); r++)
            for (int c = 0; c < (int)grid[0].size(); c++)
                if (grid[r][c] == '1') { ans++; dfs(grid, r, c); }
        return ans;
    }
};`,
    `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(r: int, c: int) -> None:
            if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)
        ans = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    ans += 1
                    dfs(r, c)
        return ans`
  ),
  [key("sliding-window", "sw0")]: pair(
    `// Invariant: left <= right
class Solution {
public:
    int scan(vector<int>& A) {
        int left = 0, best = 0;
        for (int right = 0; right < (int)A.size(); right++) {
            while (left <= right && false) left++;
            best = max(best, right - left + 1);
        }
        return best;
    }
};`,
    `# Invariant: left <= right
class Solution:
    def scan(self, A: list[int]) -> int:
        left = best = 0
        for right in range(len(A)):
            while left <= right and False:
                left += 1
            best = max(best, right - left + 1)
        return best`
  ),
  [key("sliding-window", "sw1")]: pair(
    `class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        int best = sum;
        for (int i = k; i < (int)nums.size(); i++) {
            sum += nums[i] - nums[i - k];
            best = max(best, sum);
        }
        return (double)best / k;
    }
};`,
    `class Solution:
    def findMaxAverage(self, nums: list[int], k: int) -> float:
        s = sum(nums[:k])
        best = s
        for i in range(k, len(nums)):
            s += nums[i] - nums[i - k]
            best = max(best, s)
        return best / k`
  ),
  [key("sliding-window", "sw2")]: pair(
    `class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, best = INT_MAX;
        for (int right = 0; right < (int)nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                best = min(best, right - left + 1);
                sum -= nums[left++];
            }
        }
        return best == INT_MAX ? 0 : best;
    }
};`,
    `class Solution:
    def minSubArrayLen(self, target: int, nums: list[int]) -> int:
        left = s = 0
        best = float('inf')
        for right, x in enumerate(nums):
            s += x
            while s >= target:
                best = min(best, right - left + 1)
                s -= nums[left]
                left += 1
        return 0 if best == float('inf') else best`
  ),
  [key("sliding-window", "sw3")]: pair(
    `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> last(128, -1);
        int left = 0, best = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            if (last[s[right]] >= left) left = last[s[right]] + 1;
            last[s[right]] = right;
            best = max(best, right - left + 1);
        }
        return best;
    }
};`,
    `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last: dict[str, int] = {}
        left = best = 0
        for right, c in enumerate(s):
            if c in last and last[c] >= left:
                left = last[c] + 1
            last[c] = right
            best = max(best, right - left + 1)
        return best`
  ),
  [key("sliding-window", "sw4")]: pair(
    `class Solution {
public:
    string minWindow(string s, string t) {
        vector<int> need(128), have(128);
        for (char c : t) need[c]++;
        int missing = (int)t.size(), left = 0, bestL = 0, bestLen = INT_MAX;
        for (int right = 0; right < (int)s.size(); right++) {
            if (need[s[right]] && ++have[s[right]] <= need[s[right]]) missing--;
            while (!missing) {
                if (right - left + 1 < bestLen) { bestLen = right - left + 1; bestL = left; }
                if (need[s[left]] && --have[s[left]] < need[s[left]]) missing++;
                left++;
            }
        }
        return bestLen == INT_MAX ? "" : s.substr(bestL, bestLen);
    }
};`,
    `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        from collections import Counter
        need = Counter(t)
        have: Counter[str] = Counter()
        missing = len(t)
        left = best_l = 0
        best_len = float('inf')
        for right, c in enumerate(s):
            if need[c]:
                have[c] += 1
                if have[c] <= need[c]:
                    missing -= 1
            while not missing:
                if right - left + 1 < best_len:
                    best_len = right - left + 1
                    best_l = left
                lc = s[left]
                if need[lc]:
                    have[lc] -= 1
                    if have[lc] < need[lc]:
                        missing += 1
                left += 1
        return '' if best_len == float('inf') else s[best_l:best_l + best_len]`
  ),
  [key("sliding-window", "sw5")]: pair(
    `#include <deque>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> ans;
        for (int i = 0; i < (int)nums.size(); i++) {
            while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) ans.push_back(nums[dq.front()]);
        }
        return ans;
    }
};`,
    `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        dq: deque[int] = deque()
        ans: list[int] = []
        for i, x in enumerate(nums):
            while dq and dq[0] <= i - k:
                dq.popleft()
            while dq and nums[dq[-1]] <= x:
                dq.pop()
            dq.append(i)
            if i >= k - 1:
                ans.append(nums[dq[0]])
        return ans`
  ),
  [key("sorting", "so0")]: pair(
    `// Invariant: extend sorted prefix A[0..k)
#include <vector>
using namespace std;`,
    `# Invariant: sorted prefix grows until k == n`
  ),
  [key("sorting", "so1")]: pair(
    `class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        for (int i = 1; i < (int)nums.size(); i++) {
            int key = nums[i], j = i - 1;
            while (j >= 0 && nums[j] > key) { nums[j+1] = nums[j]; j--; }
            nums[j+1] = key;
        }
        return nums;
    }
};`,
    `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        for i in range(1, len(nums)):
            key, j = nums[i], i - 1
            while j >= 0 and nums[j] > key:
                nums[j + 1] = nums[j]
                j -= 1
            nums[j + 1] = key
        return nums`
  ),
  [key("sorting", "so2")]: pair(
    `void mergeSort(vector<int>& a, int l, int r, vector<int>& tmp) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(a, l, m, tmp);
    mergeSort(a, m + 1, r, tmp);
    int i = l, j = m + 1, k = l;
    while (i <= m && j <= r) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    while (i <= m) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (int t = l; t <= r; t++) a[t] = tmp[t];
}`,
    `def merge_sort(a: list[int], l: int, r: int, tmp: list[int]) -> None:
    if l >= r:
        return
    m = (l + r) // 2
    merge_sort(a, l, m, tmp)
    merge_sort(a, m + 1, r, tmp)
    i, j, k = l, m + 1, l
    while i <= m and j <= r:
        if a[i] <= a[j]:
            tmp[k] = a[i]; i += 1
        else:
            tmp[k] = a[j]; j += 1
        k += 1
    while i <= m:
        tmp[k] = a[i]; i += 1; k += 1
    while j <= r:
        tmp[k] = a[j]; j += 1; k += 1
    for t in range(l, r + 1):
        a[t] = tmp[t]`
  ),
  [key("stacks", "s1")]: pair(
    `#include <stack>
#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> close{{')', '('}, {']', '['}, {'}', '{'}};
        for (char c : s) {
            if (close.count(c)) {
                if (st.empty() || st.top() != close[c]) return false;
                st.pop();
            } else st.push(c);
        }
        return st.empty();
    }
};`,
    `class Solution:
    def isValid(self, s: str) -> bool:
        close = {')': '(', ']': '[', '}': '{'}
        st: list[str] = []
        for c in s:
            if c in close:
                if not st or st.pop() != close[c]:
                    return False
            else:
                st.append(c)
        return not st`
  ),
  [key("stacks", "s2")]: pair(
    `class Solution {
public:
    bool checkValidString(string s) {
        int lo = 0, hi = 0;
        for (char c : s) {
            if (c == '(') { lo++; hi++; }
            else if (c == ')') { lo = max(0, lo - 1); hi--; }
            else { lo = max(0, lo - 1); hi++; }
            if (hi < 0) return false;
        }
        return lo == 0;
    }
};`,
    `class Solution:
    def checkValidString(self, s: str) -> bool:
        lo = hi = 0
        for c in s:
            if c == '(':
                lo += 1; hi += 1
            elif c == ')':
                lo = max(0, lo - 1); hi -= 1
            else:
                lo = max(0, lo - 1); hi += 1
            if hi < 0:
                return False
        return lo == 0`
  ),
  [key("stacks", "s3")]: pair(
    `class Solution {
public:
    int scoreOfParentheses(string s) {
        stack<int> st;
        st.push(0);
        for (char c : s) {
            if (c == '(') st.push(0);
            else {
                int v = st.top(); st.pop();
                st.top() += (v == 0 ? 1 : 2 * v);
            }
        }
        return st.top();
    }
};`,
    `class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        st = [0]
        for c in s:
            if c == '(':
                st.append(0)
            else:
                v = st.pop()
                st[-1] += 1 if v == 0 else 2 * v
        return st[0]`
  ),
  [key("stacks", "s4")]: pair(
    `#include <vector>
#include <string>
using namespace std;

class Solution {
    vector<string> ans;
    void dfs(int open, int close, int n, string& cur) {
        if ((int)cur.size() == 2 * n) { ans.push_back(cur); return; }
        if (open < n) { cur.push_back('('); dfs(open + 1, close, n, cur); cur.pop_back(); }
        if (close < open) { cur.push_back(')'); dfs(open, close + 1, n, cur); cur.pop_back(); }
    }
public:
    vector<string> generateParenthesis(int n) {
        string cur;
        dfs(0, 0, n, cur);
        return ans;
    }
};`,
    `class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        ans: list[str] = []
        def dfs(open_: int, close: int, cur: list[str]) -> None:
            if len(cur) == 2 * n:
                ans.append(''.join(cur)); return
            if open_ < n:
                cur.append('('); dfs(open_ + 1, close, cur); cur.pop()
            if close < open_:
                cur.append(')'); dfs(open_, close + 1, cur); cur.pop()
        dfs(0, 0, [])
        return ans`
  ),
  [key("stacks", "s5")]: pair(
    `class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> st;
        st.push(-1);
        int best = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (s[i] == '(') st.push(i);
            else {
                st.pop();
                if (st.empty()) st.push(i);
                else best = max(best, i - st.top());
            }
        }
        return best;
    }
};`,
    `class Solution:
    def longestValidParentheses(self, s: str) -> int:
        st = [-1]
        best = 0
        for i, c in enumerate(s):
            if c == '(':
                st.append(i)
            else:
                st.pop()
                if not st:
                    st.append(i)
                else:
                    best = max(best, i - st[-1])
        return best`
  ),
  [key("stacks", "s6")]: pair(
    `#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& T) {
        int n = T.size();
        vector<int> ans(n);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && T[i] > T[st.top()]) {
                ans[st.top()] = i - st.top();
                st.pop();
            }
            st.push(i);
        }
        return ans;
    }
};`,
    `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        ans = [0] * len(temperatures)
        st: list[int] = []
        for i, t in enumerate(temperatures):
            while st and t > temperatures[st[-1]]:
                j = st.pop()
                ans[j] = i - j
            st.append(i)
        return ans`
  ),
  [key("subsets", "sb0")]: pair(
    `// 2^n subsets via take/skip decisions at each index`,
    `# 2^n subsets — each element taken or skipped once`
  ),
  [key("subsets", "sb1")]: pair(
    `class Solution {
    vector<vector<int>> ans;
    void dfs(vector<int>& nums, int start, vector<int>& path) {
        ans.push_back(path);
        for (int i = start; i < (int)nums.size(); i++) {
            path.push_back(nums[i]);
            dfs(nums, i + 1, path);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> path;
        dfs(nums, 0, path);
        return ans;
    }
};`,
    `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        ans: list[list[int]] = []
        def dfs(start: int, path: list[int]) -> None:
            ans.append(path[:])
            for i in range(start, len(nums)):
                path.append(nums[i])
                dfs(i + 1, path)
                path.pop()
        dfs(0, [])
        return ans`
  ),
  [key("subsets", "sb2")]: pair(
    `class Solution {
    vector<vector<int>> ans;
    void dfs(vector<int>& nums, int start, vector<int>& path) {
        ans.push_back(path);
        for (int i = start; i < (int)nums.size(); i++) {
            if (i > start && nums[i] == nums[i-1]) continue;
            path.push_back(nums[i]);
            dfs(nums, i + 1, path);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> path;
        dfs(nums, 0, path);
        return ans;
    }
};`,
    `class Solution:
    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        ans: list[list[int]] = []
        def dfs(start: int, path: list[int]) -> None:
            ans.append(path[:])
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                path.append(nums[i])
                dfs(i + 1, path)
                path.pop()
        dfs(0, [])
        return ans`
  ),
  [key("top-k", "tk0")]: pair(
    `// Keep at most K best; discard worse than current K-th`,
    `# Maintain size-K candidate set; discard below threshold`
  ),
  [key("top-k", "tk1")]: pair(
    `#include <queue>
#include <vector>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> pq;
        for (int x : nums) {
            pq.push(x);
            if ((int)pq.size() > k) pq.pop();
        }
        return pq.top();
    }
};`,
    `import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        heap: list[int] = []
        for x in nums:
            heapq.heappush(heap, x)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]`
  ),
  [key("top-k", "tk2")]: pair(
    `class Solution {
    int partition(vector<int>& a, int l, int r) {
        int pivot = a[r], i = l;
        for (int j = l; j < r; j++) if (a[j] >= pivot) swap(a[i++], a[j]);
        swap(a[i], a[r]);
        return i;
    }
    int select(vector<int>& a, int l, int r, int k) {
        int p = partition(a, l, r);
        if (p == k) return a[p];
        return p < k ? select(a, p + 1, r, k) : select(a, l, p - 1, k);
    }
public:
    int findKthLargest(vector<int>& nums, int k) {
        return select(nums, 0, (int)nums.size() - 1, k - 1);
    }
};`,
    `class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        k = len(nums) - k
        def select(l: int, r: int) -> int:
            pivot = nums[r]
            i = l
            for j in range(l, r):
                if nums[j] <= pivot:
                    nums[i], nums[j] = nums[j], nums[i]
                    i += 1
            nums[i], nums[r] = nums[r], nums[i]
            if i == k:
                return nums[i]
            return select(i + 1, r) if i < k else select(l, i - 1)
        return select(0, len(nums) - 1)`
  ),
  [key("trie", "tr0")]: pair(
    `struct TrieNode {
    TrieNode* child[26]{};
    bool end = false;
};`,
    `class TrieNode:
    __slots__ = ("child", "end")
    def __init__(self):
        self.child: dict[str, "TrieNode"] = {}
        self.end = False`
  ),
  [key("trie", "tr1")]: pair(
    `class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(string w) {
        auto* cur = root;
        for (char c : w) {
            int i = c - 'a';
            if (!cur->child[i]) cur->child[i] = new TrieNode();
            cur = cur->child[i];
        }
        cur->end = true;
    }
    bool search(string w) {
        auto* cur = root;
        for (char c : w) {
            int i = c - 'a';
            if (!cur->child[i]) return false;
            cur = cur->child[i];
        }
        return cur->end;
    }
};`,
    `class Trie:
    def __init__(self):
        self.root: TrieNode = TrieNode()
    def insert(self, w: str) -> None:
        cur = self.root
        for c in w:
            cur = cur.child.setdefault(c, TrieNode())
        cur.end = True
    def search(self, w: str) -> bool:
        cur = self.root
        for c in w:
            if c not in cur.child:
                return False
            cur = cur.child[c]
        return cur.end`
  ),
  [key("trie", "tr2")]: pair(
    `class Solution {
    bool dfs(const string& s, int i, TrieNode* node) {
        if (i == (int)s.size()) return true;
        auto* cur = node;
        for (int j = i; j < (int)s.size(); j++) {
            int k = s[j] - 'a';
            if (!cur->child[k]) break;
            cur = cur->child[k];
            if (cur->end && dfs(s, j + 1, root)) return true;
        }
        return false;
    }
    TrieNode* root;
public:
    bool wordBreak(string s, vector<string>& dict) { /* build trie */ return dfs(s, 0, root); }
};`,
    `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        root = TrieNode()
        for w in wordDict:
            cur = root
            for c in w:
                cur = cur.child.setdefault(c, TrieNode())
            cur.end = True
        def dfs(i: int) -> bool:
            if i == len(s):
                return True
            cur = root
            for j in range(i, len(s)):
                c = s[j]
                if c not in cur.child:
                    break
                cur = cur.child[c]
                if cur.end and dfs(j + 1):
                    return True
            return False
        return dfs(0)`
  ),
  [key("two-pointers", "tp0")]: pair(
    `// Invariant: i <= j; discarded regions cannot hold the answer
class Solution {
public:
    int pairTemplate(vector<int>& A, int target) {
        int i = 0, j = (int)A.size() - 1;
        while (i < j) {
            int s = A[i] + A[j];
            if (s == target) return i;
            if (s < target) i++;
            else j--;
        }
        return -1;
    }
};`,
    `# Invariant: i <= j; safe elimination
class Solution:
    def pairTemplate(self, A: list[int], target: int) -> int:
        i, j = 0, len(A) - 1
        while i < j:
            s = A[i] + A[j]
            if s == target:
                return i
            if s < target:
                i += 1
            else:
                j -= 1
        return -1`
  ),
  [key("two-pointers", "tp1")]: pair(
    `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int i = 0, j = (int)numbers.size() - 1;
        while (i < j) {
            int s = numbers[i] + numbers[j];
            if (s == target) return {i + 1, j + 1};
            if (s < target) i++;
            else j--;
        }
        return {};
    }
};`,
    `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        i, j = 0, len(numbers) - 1
        while i < j:
            s = numbers[i] + numbers[j]
            if s == target:
                return [i + 1, j + 1]
            if s < target:
                i += 1
            else:
                j -= 1
        return []`
  ),
  [key("two-pointers", "tp2")]: pair(
    `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int slow = 1;
        for (int fast = 1; fast < (int)nums.size(); fast++)
            if (nums[fast] != nums[slow - 1]) nums[slow++] = nums[fast];
        return slow;
    }
};`,
    `class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        if not nums:
            return 0
        slow = 1
        for fast in range(1, len(nums)):
            if nums[fast] != nums[slow - 1]:
                nums[slow] = nums[fast]
                slow += 1
        return slow`
  ),
  [key("two-pointers", "tp3")]: pair(
    `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> ans;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (i && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                long s = (long)nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    ans.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (s < 0) l++;
                else r--;
            }
        }
        return ans;
    }
};`,
    `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        ans: list[list[int]] = []
        for i, x in enumerate(nums):
            if i and x == nums[i - 1]:
                continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                s = x + nums[l] + nums[r]
                if s == 0:
                    ans.append([x, nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1; r -= 1
                elif s < 0:
                    l += 1
                else:
                    r -= 1
        return ans`
  ),
  [key("two-pointers", "tp4")]: pair(
    `class Solution {
public:
    int maxArea(vector<int>& h) {
        int i = 0, j = (int)h.size() - 1, best = 0;
        while (i < j) {
            best = max(best, min(h[i], h[j]) * (j - i));
            if (h[i] < h[j]) i++;
            else j--;
        }
        return best;
    }
};`,
    `class Solution:
    def maxArea(self, height: list[int]) -> int:
        i, j = 0, len(height) - 1
        best = 0
        while i < j:
            best = max(best, min(height[i], height[j]) * (j - i))
            if height[i] < height[j]:
                i += 1
            else:
                j -= 1
        return best`
  ),
  [key("two-pointers", "tp5")]: pair(
    `class Solution {
public:
    int trap(vector<int>& h) {
        int i = 0, j = (int)h.size() - 1, lmax = 0, rmax = 0, water = 0;
        while (i < j) {
            if (h[i] < h[j]) {
                lmax = max(lmax, h[i]);
                water += lmax - h[i++];
            } else {
                rmax = max(rmax, h[j]);
                water += rmax - h[j--];
            }
        }
        return water;
    }
};`,
    `class Solution:
    def trap(self, height: list[int]) -> int:
        i, j = 0, len(height) - 1
        lmax = rmax = water = 0
        while i < j:
            if height[i] < height[j]:
                lmax = max(lmax, height[i])
                water += lmax - height[i]
                i += 1
            else:
                rmax = max(rmax, height[j])
                water += rmax - height[j]
                j -= 1
        return water`
  ),
  [key("union-find", "uf0")]: pair(
    `struct DSU {
    vector<int> parent;
    DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }
    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }
    void unite(int a, int b) { a = find(a); b = find(b); if (a != b) parent[a] = b; }
};`,
    `class DSU:
    def __init__(self, n: int):
        self.p = list(range(n))
    def find(self, x: int) -> int:
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]
    def unite(self, a: int, b: int) -> None:
        a, b = self.find(a), self.find(b)
        if a != b:
            self.p[a] = b`
  ),
  [key("union-find", "uf1")]: pair(
    `class Solution {
    vector<int> p;
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        p.resize(edges.size() + 1);
        iota(p.begin(), p.end(), 0);
        for (auto& e : edges) {
            if (find(e[0]) == find(e[1])) return e;
            p[find(e[0])] = find(e[1]);
        }
        return {};
    }
};`,
    `class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        p = list(range(len(edges) + 1))
        def find(x: int) -> int:
            if p[x] != x:
                p[x] = find(p[x])
            return p[x]
        for u, v in edges:
            if find(u) == find(v):
                return [u, v]
            p[find(u)] = find(v)
        return []`
  ),
  [key("union-find", "uf2")]: pair(
    `struct DSU {
    vector<int> p, r;
    DSU(int n) : p(n), r(n) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
    }
};`,
    `class DSU:
    def __init__(self, n: int):
        self.p = list(range(n))
        self.r = [0] * n
    def find(self, x: int) -> int:
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]
    def unite(self, a: int, b: int) -> None:
        a, b = self.find(a), self.find(b)
        if a == b:
            return
        if self.r[a] < self.r[b]:
            a, b = b, a
        self.p[b] = a
        if self.r[a] == self.r[b]:
            self.r[a] += 1`
  ),
};

function fallbackSnippets(
  topicSlug: string,
  meta: { title: string; problem: string; coreInvariant: string },
): CodeSnippets {
  const inv = invariantLabel(meta.coreInvariant);
  const families: Record<string, CodeSnippets> = {
    stacks: pair(
      `// Invariant: ${inv}
class Solution {
public:
    int solve(vector<int>& nums) {
        stack<int> st;
        for (int x : nums) {
            while (!st.empty() && /* safe pop */ st.top() < x) st.pop();
            st.push(x);
        }
        return 0;
    }
};`,
      `# Invariant: ${inv}
class Solution:
    def solve(self, nums: list[int]) -> int:
        st: list[int] = []
        for x in nums:
            while st and st[-1] < x:
                st.pop()
            st.append(x)
        return 0`,
    ),
    "two-pointers": pair(
      `// Invariant: ${inv}
class Solution {
public:
    int solve(vector<int>& A, int target) {
        int i = 0, j = (int)A.size() - 1;
        while (i < j) {
            int s = A[i] + A[j];
            if (s == target) return i;
            if (s < target) i++;
            else j--;
        }
        return -1;
    }
};`,
      `# Invariant: ${inv}
class Solution:
    def solve(self, A: list[int], target: int) -> int:
        i, j = 0, len(A) - 1
        while i < j:
            s = A[i] + A[j]
            if s == target:
                return i
            if s < target:
                i += 1
            else:
                j -= 1
        return -1`,
    ),
    "sliding-window": pair(
      `// Invariant: ${inv}
class Solution {
public:
    int solve(string s) {
        int left = 0, best = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            // expand with s[right]
            while (/* window invalid */ false) left++;
            best = max(best, right - left + 1);
        }
        return best;
    }
};`,
      `# Invariant: ${inv}
class Solution:
    def solve(self, s: str) -> int:
        left = best = 0
        for right in range(len(s)):
            # expand with s[right]
            while False:  # shrink while invalid
                left += 1
            best = max(best, right - left + 1)
        return best`,
    ),
    "binary-search": pair(
      `// Invariant: ${inv}
class Solution {
public:
    int search(vector<int>& A, int target) {
        int lo = 0, hi = (int)A.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (A[mid] == target) return mid;
            if (A[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
};`,
      `# Invariant: ${inv}
class Solution:
    def search(self, A: list[int], target: int) -> int:
        lo, hi = 0, len(A) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if A[mid] == target:
                return mid
            if A[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return -1`,
    ),
    "linked-lists": pair(
      `struct ListNode { int val; ListNode* next; };
// Invariant: ${inv}
ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *cur = head;
    while (cur) {
        ListNode* nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}`,
      `# Invariant: ${inv}
class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def reverseList(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev, cur = cur, nxt
    return prev`,
    ),
    "fast-slow": pair(
      `struct ListNode { int val; ListNode* next; };
// Invariant: ${inv}
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      `# Invariant: ${inv}
def hasCycle(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
    ),
    "dynamic-programming": pair(
      `// Invariant: ${inv}
class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int cur = max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};`,
      `# Invariant: ${inv}
class Solution:
    def rob(self, nums: list[int]) -> int:
        prev2 = prev1 = 0
        for x in nums:
            prev2, prev1 = prev1, max(prev1, prev2 + x)
        return prev1`,
    ),
    graphs: pair(
      `// Invariant: ${inv}
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size(), ans = 0;
        vector<pair<int,int>> q;
        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {
            if (grid[r][c] != '1') continue;
            ans++;
            grid[r][c] = '0';
            q.push_back({r,c});
            for (size_t i = 0; i < q.size(); i++) {
                auto [r,c] = q[i];
                for (auto [dr,dc] : vector<pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}}) {
                    int nr = r+dr, nc = c+dc;
                    if (nr>=0&&nr<m&&nc>=0&&nc<n&&grid[nr][nc]=='1') {
                        grid[nr][nc]='0'; q.push_back({nr,nc});
                    }
                }
            }
            q.clear();
        }
        return ans;
    }
};`,
      `# Invariant: ${inv}
class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] != '1':
                    continue
                ans += 1
                q = [(r, c)]
                grid[r][c] = '0'
                for cr, cc in q:
                    for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                        nr, nc = cr+dr, cc+dc
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':
                            grid[nr][nc] = '0'
                            q.append((nr, nc))
        return ans`,
    ),
    backtracking: pair(
      `// Invariant: ${inv}
class Solution {
    vector<vector<int>> ans;
    void dfs(vector<int>& nums, int start, vector<int>& path) {
        ans.push_back(path);
        for (int i = start; i < (int)nums.size(); i++) {
            path.push_back(nums[i]);
            dfs(nums, i + 1, path);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> path;
        dfs(nums, 0, path);
        return ans;
    }
};`,
      `# Invariant: ${inv}
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        ans: list[list[int]] = []
        def dfs(start: int, path: list[int]) -> None:
            ans.append(path[:])
            for i in range(start, len(nums)):
                path.append(nums[i])
                dfs(i + 1, path)
                path.pop()
        dfs(0, [])
        return ans`,
    ),
  };

  return (
    families[topicSlug] ??
    pair(
      `// Invariant: ${inv}
// ${meta.title}
class Solution {
public:
    int solve(vector<int>& nums) {
        for (int i = 0; i < (int)nums.size(); i++) {
            // maintain invariant while scanning
        }
        return 0;
    }
};`,
      `# Invariant: ${inv}
# ${meta.title}
class Solution:
    def solve(self, nums: list[int]) -> int:
        for i, x in enumerate(nums):
            pass  # maintain invariant
        return 0`,
    )
  );
}

export function getLevelSnippets(
  topicSlug: string,
  levelId: string,
  meta: { title: string; problem: string; coreInvariant: string },
): CodeSnippets {
  return CURATED[key(topicSlug, levelId)] ?? fallbackSnippets(topicSlug, meta);
}
