/*
 * @Author: your name
 * @Date: 2021-02-22 01:14:38
 * @LastEditTime: 2021-02-22 03:18:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm-collation/0222.js
 */
/**
 * @url https://leetcode-cn.com/problems/container-with-most-water/submissions/
 * @description 夹逼思想 双指针处理
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let maxArea = 0, l = 0, r = height.length - 1;
    while (l < r) {
        maxArea = Math.max(maxArea, Math.min(height[l], height[r]) * (r - l));
        if (height[l] < height[r]) {
            l++;
        } else {
            r--;
        }
    }
    return maxArea;
};



/**
 * @url https://leetcode-cn.com/problems/3sum/
 * @description 双指针移动 
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let len = nums.length, res = [];

    if (len < 3) return res;

    // 小到大排序
    nums.sort((a, b) => a - b);

    for (let i = 0; i < len; i++) {
        if (nums[i] > 0) return res;

        // 跳过重复项
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let L = i + 1, R = len - 1;

        while (L < R) {
            if (nums[i] + nums[L] + nums[R] === 0) {
                res.push([nums[i], nums[L], nums[R]]);

                while (L < R && nums[L] === nums[L + 1]) L++;
                while (L < R && nums[R] === nums[R - 1]) R--;

                L++;
                R--;
            } else if (nums[i] + nums[L] + nums[R] > 0) {
                R--;
            } else {
                L++;
            }
        }
    }

    return res;

};



/**
 * @url https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/submissions/
 * @description DFS or BFS
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {

    let res = [];

    if (digits.length) {
        backtracks(res, '', digits);
    }

    return res;
};

let letterMap = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
};
function backtracks(res, combination, rest_digits) {
    if (!rest_digits.length) return res.push(combination);

    let digit = rest_digits.substring(0, 1);
    let letters = letterMap[digit];

    for (let i = 0; i < letters.length; i++) {
        backtracks(res, combination + letters[i], rest_digits.substring(1));
    }
}


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @url https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/submissions/
 * @description 快慢指针处理 一次遍历
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;

    let first = dummy;
    let second = dummy;
    let i = 0;

    while (first !== null) {
        first = first.next;
        if (i++ > n) {
            second = second.next;
        }
    }

    second.next = second.next.next;

    return dummy.next;
};



/**
 * @url https://leetcode-cn.com/problems/valid-parentheses/submissions/
 * @description 栈
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let bracketMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] in bracketMap) {
            stack.push(s[i]);
        } else if (s[i] !== bracketMap[stack.pop()]) {
            return false;
        }
    }

    return !stack.length;
};