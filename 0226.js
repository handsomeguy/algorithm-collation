/*
 * @Author: your name
 * @Date: 2021-02-26 03:06:02
 * @LastEditTime: 2021-02-26 04:11:13
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
