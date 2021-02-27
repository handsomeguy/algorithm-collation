/*
 * @Author: your name
 * @Date: 2021-02-26 03:06:02
 * @LastEditTime: 2021-02-27 15:40:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm-collation/0226.js
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    const stack = [-1];
    let max = 0;
    for (let index = 0; index < s.length; index++) {
        if (s[index] === '(') {
            stack.push(index)
        } else {
            if (stack.length === 1) {
                stack.pop();
                stack.push(index);
                continue;
            }
            stack.pop();
            max = Math.max(index - stack[stack.length - 1], max)
        }
    }
    return max;
};

let resx = longestValidParentheses("(()))())(");
console.log((resx));



/**
 * @url https://leetcode-cn.com/problems/super-egg-drop/comments/
 * @description 逆向思维 反推次数固定情况下 所能测出来的楼层 当楼层达到N 代表m次数满足条件了
 *              推理出递推式 不断计算即可 重写aux节约存储空间
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function (K, N) {
    if (N <= 2 || K === 1) return N;
    const aux = new Array(K + 1).fill(1);
    aux[0] = 0;
    let m = 1; // 初始步数
    while (aux[K] < N) { // 当鸡蛋数还没尝试到目标楼层时，继续尝试
        m++;
        for (let e = K; e > 0; e--) {
            // 将 “2个鸡蛋走2步” 简写为 2E2，现求 2E2 能检测的最大楼层
            // 每次扔鸡蛋，有碎或者不碎两种情况，现我们有 2 个鸡蛋：
            // 1. 若鸡蛋碎了，则手上鸡蛋减 1 并且需要往下面的楼层走，所以此时相当于这步白走了，即 1E1
            // 2. 若鸡蛋没碎，则手上鸡蛋数目不变，此时我们对比 2E1 来说多检测了一层，即 2E1 + 1
            // 所以得出下面递推公式，e为鸡蛋数，m为当前步数：f[e][m] = f[e][m-1] + f[e-1][m-1] + 1
            // 代入 e = 2，m = 2（两个鸡蛋走两步）得，f[2][2] = f[2][1] + f[1][1] + 1
            aux[e] = aux[e] + aux[e - 1] + 1;
        }
    }
    return m;
};

/**
 * 动态规划做法 需要加个cache缓存 不然会超时
 */
let cache = {};
var superEggDrop2 = function (K, N) {

    let dp = (K, N) => {
        let cacheKey = K + '-' + N;
        if (cache[cacheKey] !== undefined) return cache[cacheKey];

        if (N === 0) return 0;
        if (K === 1) return N;

        let low = 1, high = N;
        let t1, t2, middle;
        while (low + 1 < high) {
            middle = Math.floor((low + high) / 2);
            t1 = superEggDrop(K - 1, middle - 1);
            t2 = superEggDrop(K, N - middle);

            if (t1 < t2) {
                low = middle;
            } else if (t1 > t2) {
                high = middle;
            } else {
                low = high = middle;
            }
        }

        let minimun = 1 + Math.min(
            Math.max(superEggDrop(K - 1, low - 1), superEggDrop(K, N - low)),
            Math.max(superEggDrop(K - 1, high - 1), superEggDrop(K, N - high)),
        );

        cache[cacheKey] = minimun;

        return minimun;
    };

    return dp(K, N);
};



let resegg = superEggDrop(2, 6);
console.log(resegg);






/**
 * @url https://leetcode-cn.com/problems/search-in-rotated-sorted-array/comments/
 * @description 搜索旋转排序数组
 *              二分法查找 递归 额外的条件判断
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        }
    }
    return -1;
};

// 二分法
var search = function (nums, target) {
    let left = nums[0];
    let right = nums[nums.length - 1];
    let direction = 'left';
    if (target === left) return 0;
    if (target === right) return nums.length - 1;
    if (target > left) direction = 'left';
    if (target < right) direction = 'right';

    return handleFromLowHigh(nums, 0, nums.length - 1, target);
    function handleFromLowHigh(nums, low, high, value) {
        if (low + 1 >= high) return -1;
        let middle = Math.floor((low + high) / 2);
        if (direction === 'left') {
            if (nums[middle] < left) {
                return handleFromLowHigh(nums, low, middle, value);
            } else {
                if (nums[middle] > target) {
                    return handleFromLowHigh(nums, low, middle, value);
                } else if (nums[middle] < target) {
                    return handleFromLowHigh(nums, middle, high, value);
                } else {
                    return middle
                }
            }
        } else {
            if (nums[middle] > right) {
                return handleFromLowHigh(nums, middle, high, value);
            } else {
                if (nums[middle] > target) {
                    return handleFromLowHigh(nums, low, middle, value);
                } else if (nums[middle] < target) {
                    return handleFromLowHigh(nums, middle, high, value);
                } else {
                    return middle
                }
            }
        }
    }
}



/**
 * @url https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/comments/
 * @description 二分查找 分别查找左边界和右边界
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    const res = [-1, -1];
    if (nums.length === 0) return res;
    let len = nums.length,
        l = 0,
        r = len - 1;
    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if (nums[m] >= target) r = m;
        else l = m + 1;
    }
    if (nums[l] !== target) return res;
    res[0] = l;
    r = len;
    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if (nums[m] <= target) l = m + 1;
        else r = m;
    }
    res[1] = l - 1;
    return res;
};







/**
 * @url https://leetcode-cn.com/problems/combination-sum/submissions/
 * @description 自顶向下 利用回溯算法 每个数值都可以重复取。
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    const ans = [];
    const dfs = (target, combine, idx) => {
        if (idx === candidates.length) {
            return;
        }
        if (target === 0) {
            ans.push(combine);
            return;
        }
        // 直接跳过
        dfs(target, combine, idx + 1);
        // 选择当前数
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
        }
    }

    dfs(target, [], 0);
    return ans;
};







/**
 * @url https://leetcode-cn.com/problems/trapping-rain-water/submissions/
 * @description 栈 或者 双指针
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let leftmax = 0;
    let rightmax = 0;
    let leftIndex = 0;
    let rightIndex = height.length - 1;
    let ans = 0;
    while (leftIndex < rightIndex) {
        if (height[leftIndex] < height[rightIndex]) {
            if (height[leftIndex] >= leftmax) {
                leftmax = height[leftIndex]
            } else {
                ans += leftmax - height[leftIndex]
            }
            leftIndex++;
        } else {
            if (height[rightIndex] >= rightmax) {
                rightmax = height[rightIndex]
            } else {
                ans += rightmax - height[rightIndex]
            }
            rightIndex--;
        }
    }
    return ans;
};

var trap = function (height) {
    let stack = [];
    let ans = 0;

    for (let i = 0; i < height.length; i++) {
        // 当前项高度大于栈顶元素高度，则可以确定存在洼地区间 (栈二,栈顶,当前项)，此时弹出栈顶元素计算单位面积
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            let top = stack.pop();

            if (stack.length === 0) break;

            let stackTopIndex = stack.length - 1;
            let distance = i - stack[stackTopIndex] - 1;
            let boundedHeight = Math.min(height[i], height[stack[stackTopIndex]]) - height[top];

            ans += distance * boundedHeight;
        }

        stack.push(i);
    }

    return ans;
};
let restr = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
console.log(restr);






/**
 * @url https://leetcode-cn.com/problems/permutations/submissions/
 * @description 回溯算法 遍历所有情况
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [];
    handleNums(nums, [], 0)
    function handleNums(leftNums, resNums, index) {
        if (index > leftNums.length - 1) return;
        if (leftNums.length === 1) {
            resNums.push(leftNums[0])
            res.push(resNums)
            return;
        }
        handleNums([...leftNums], [...resNums], index + 1);
        resNums.push(leftNums[index]);
        leftNums.splice(index, 1);
        handleNums(leftNums, resNums, 0);
    }
    return res;
};



