/*
 * @Author: jacksonzeng
 * @Date: 2021-02-20 17:19:29
 * @LastEditTime: 2021-02-20 22:00:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /algorithm-collation/0220.js
 */

/**
* @description 利用哈希快速查找
* @url https://leetcode-cn.com/problems/two-sum/
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/
var twoSum = function (nums, target) {
    const hashObj = {};
    nums.forEach((num, index) => {
        hashObj[num] = index;
    })
    for (let i = 0; i < nums.length; i++) {
        if (hashObj[target - nums[i]] && hashObj[target - nums[i]] !== i) {
            return [i, hashObj[target - nums[i]]]
        }
    }
};


/**
 * @url https://leetcode-cn.com/problems/add-two-numbers/comments/
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let l1Index = l1.length - 1;
    let l2Index = l2.length - 1;
    const finalListNode = [];
    let formerAddPlace = false;
    let loopNum;
    for (let i = 0; i < Math.max(l1Index, l2Index); i++, l1Index--, l2Index--) {
        loopNum = l2[l2Index] ? l2[l2Index] : 0 + l1[l1Index] ? l1[l1Index] : 0 + formerAddPlace ? 1 : 0;
        formerAddPlace = loopNum >= 10 ? true : false;
        finalListNode.unshift(loopNum % 10);
    }
    return finalListNode;
};

// 直接当初数组处理了 搞错了
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
function makeListNode(arr) {
    const listNodeArray = [];
    arr.forEach(num => {
        listNodeArray.push({
            val: num,
            next: null,
        })
    })
    listNodeArray.forEach((node, index) => {
        node.next = listNodeArray[index + 1] || null
    })
    return listNodeArray[0]
}
// 方法一 转换成数组来处理 本题其实不需要
var addTwoNumbers = function (l1, l2) {
    const l1Array = [],
        l2Array = [];
    while (l1 !== null && l1.val !== undefined) {
        l1Array.push(l1.val);
        l1 = l1.next;
    }
    while (l2 !== null && l2.val !== undefined) {
        l2Array.push(l2.val);
        l2 = l2.next;
    }
    let l1Index = l1Array.length - 1;
    let l2Index = l2Array.length - 1;
    const finalListNode = [];
    let formerAddPlace = false;
    let loopNum;
    let maxLen = Math.max(l1Index, l2Index);
    for (let i = 0; i <= maxLen; i++, l1Index--, l2Index--) {
        loopNum = (l2Array[i] || 0) + (l1Array[i] || 0) + (formerAddPlace ? 1 : 0);
        formerAddPlace = loopNum >= 10 ? true : false;
        finalListNode.push({
            val: loopNum % 10,
            next: null,
        });
    }
    if (formerAddPlace) {
        finalListNode.push({
            val: 1,
            next: null,
        });
    }
    finalListNode.forEach((node, i) => {
        node.next = finalListNode[i + 1] || null
    })
    return finalListNode[0];
};

// 方法二 链表直接遍历
var addTwoNumbers = function (l1, l2) {
    const finalListNodeArray = [];
    let formerAddPlace = false;
    let loopNum;
    while (l1.val !== undefined || l2.val !== undefined) {
        loopNum = (l1.val || 0) + (l2.val || 0) + (formerAddPlace ? 1 : 0);
        formerAddPlace = loopNum >= 10 ? true : false;
        finalListNodeArray.push({
            val: loopNum % 10,
            next: null,
        });
        l1 = l1.next || {};
        l2 = l2.next || {};
    }
    if (formerAddPlace) {
        finalListNodeArray.push({
            val: 1,
            next: null,
        });
    }
    finalListNodeArray.forEach((node, i) => {
        node.next = finalListNodeArray[i + 1] || null
    })
    return finalListNodeArray[0];
}



/**
 * @url https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * @description hash维护查找关系 countStep实时更新计步器 stepCollection存储所有的计步记录
 *              clearHashObject 用于实时刷新hash查找关系 把旧索引index之前的hash存储记录清除
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let countStep = 0;
    const stepCollection = [];
    const hashCheckObj = {}
    for (let i = 0; i < s.length; i++) {
        if (hashCheckObj[s[i]] === undefined) {
            hashCheckObj[s[i]] = i;
            countStep++;
        } else {
            stepCollection.push(countStep);
            countStep = i - hashCheckObj[s[i]];
            clearHashObject(hashCheckObj, hashCheckObj[s[i]]);
            hashCheckObj[s[i]] = i;
        }
    }
    stepCollection.push(countStep);
    return Math.max.apply(null, stepCollection);
};

function clearHashObject(hashObj, index) {
    Object.keys(hashObj).forEach(k => {
        if (hashObj[k] <= index) {
            delete hashObj[k];
        }
    })
}


