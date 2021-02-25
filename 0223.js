/*
 * @Author: your name
 * @Date: 2021-02-23 01:21:33
 * @LastEditTime: 2021-02-23 02:24:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm-collation/0223.js
 */

/**
* @url https://leetcode-cn.com/problems/generate-parentheses/submissions/
* @description  左括号的数量一定小于等于右括号 利用递归 分治的思想
                递归和迭代 空间复杂度是不一样的 基本类型值如果相同的情况下 会占用同一个栈内存空间 对象会共享同一个内存 只是一个指针而已
                而如果基本类型值不同 那么就会额外申请内存在栈中存储这个基本类型值
                最高2n次函数调用栈 每个栈里有3（常数）个变量 那么需要6n个变量存储空间 空间复杂度为On
                最后弹栈 执行结束后 栈内存会自动进行回收  堆内存需要等待垃圾回收触发。
* @param {number} n
* @return {string[]}
*/
var generateParenthesis = function (n) {
    const storeResArr = []
    generateNewString('', n, n, storeResArr);
    console.log(storeResArr);
    return storeResArr
};

function generateNewString(str, leftCount, rightCount, storeResArr) {
    if (leftCount === 0 && rightCount === 0) {
        return storeResArr.push(str)
    }
    if (leftCount < rightCount) {
        if (leftCount !== 0) {
            generateNewString(str + '(', leftCount - 1, rightCount, storeResArr);
        }
        generateNewString(str + ')', leftCount, rightCount - 1, storeResArr);
    } else if (leftCount === rightCount) {
        generateNewString(str + '(', leftCount - 1, rightCount, storeResArr);
    }
}

const cres = generateParenthesis(3);
console.log(cres);




/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @url https://leetcode-cn.com/problems/merge-k-sorted-lists/comments/
 * @description 分治思想 空间 O（1）  时间O（klogn）
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    if (!lists.length) return null;

    let amount = lists.length;
    let interval = 1;
    let i, k;

    // 跨步合并，精髓
    while (interval < amount) {
        k = amount - interval;
        i = 0;

        while (i < k) {
            lists[i] = merge2Lists(lists[i], lists[i + interval]);
            i += interval * 2;
        }

        interval *= 2;
    }

    return lists[0];
};

var merge2Lists = function (l1, l2) {
    let head = { next: null }, point = head;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            point.next = l1;
            l1 = l1.next;
        } else {
            point.next = l2;
            l2 = l1;
            l1 = point.next.next;
        }
        point = point.next;
    }

    point.next = l1 ? l1 : l2;

    return head.next;
};













