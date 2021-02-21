/*
 * @Author: jacksonzeng
 * @Date: 2021-02-20 17:19:29
 * @LastEditTime: 2021-02-21 14:47:04
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


function findMedianSortedArrays(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    if ((m + n) == 1) return m == 1 ? nums1[0] : nums2[0];
    let left = 0;
    let right = m;
    let temp;
    if (m > n) {
        right = n;
        temp = nums1;//注意这种写法
        nums1 = nums2;
        nums2 = temp;
    }
    let total = (m + n + 1) / 2;
    while (left < right) {
        let i = left + (right - left) / 2;
        let j = total - i;
        if (nums1[i] > nums2[j - 1]) {
            right = i;
        }
        else {
            left = i + 1;
        }
    }
    let i = left;
    let j = total - i;
    let nums1LValue = i - 1 >= 0 ? nums1[i - 1] : -Infinity;
    let nums2LValue = j - 1 >= 0 ? nums2[j - 1] : -Infinity;
    let nums1RValue = i >= nums1.length ? Infinity : nums1[i];
    let nums2Rvalue = j >= nums2.length ? Infinity : nums2[j];
    return (m + n) % 2 == 0 ? parseFloat(Math.min(nums1RValue, nums2Rvalue) + Math.max(nums1LValue, nums2LValue)) / 2 : Math.max(nums1LValue, nums2LValue);
}

function countingMiddle(nums1, nums2) {

    let m = nums1.length;
    let n = nums2.length;
    if ((m + n) == 1) return m == 1 ? nums1[0] : nums2[0];
    let left = 0;
    let right = m;
    let temp;
    if (m > n) {
        right = n;
        temp = nums1;//注意这种写法
        nums1 = nums2;
        nums2 = temp;
    }
    let total = Math.floor((m + n + 1) / 2);
    let i, j;
    while (left < right) {
        i = left + Math.floor((right - left) / 2);
        j = total - i;
        if (nums1[i] > nums2[j - 1]) {
            //搜索区间[left,i]，要注意区间只有两个数时是否会无限循环
            right = i;
        }
        else {
            //搜索区间[i+1,right]，要注意区间只有2个数是否会无限循环
            left = i + 1;
        }
    }
    i = left;
    j = total - i;
    let lvalue, rvalue;
    if (i - 1 < 0) {
        lvalue = nums2[j - 1];
    }
    else if (j - 1 < 0) {
        lvalue = nums1[i - 1];
    }
    else lvalue = nums1[i - 1] > nums2[j - 1] ? nums1[i - 1] : nums2[j - 1];
    if (i >= nums1.length) {
        rvalue = nums2[j];
    }
    else if (j >= nums2.length) {
        rvalue = nums1[i];
    }
    else rvalue = nums1[i] < nums2[j] ? nums1[i] : nums2[j];

    return (m + n) % 2 == 0 ? (parseFloat(lvalue + rvalue) / 2) : lvalue;
}

let res = countingMiddle([1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]);
console.log(res);






/**
 * @url https://leetcode-cn.com/problems/median-of-two-sorted-arrays/submissions/
 * @description 注意Math.floor提前处理k1、k2
 *              递归、分治算法
 * @param {number[]} nums1 
 * @param {number[]} nums2 
 * @return {number}
 */
var findMedianSortedArrays = function findMedianSortedArrays(nums1, nums2) {
    let len1 = nums1.length,
        len2 = nums2.length;
    let k1 = Math.floor((len1 + len2 + 1) / 2);
    let k2 = Math.floor((len1 + len2 + 2) / 2);
    return (getKthPlaceVal(nums1, 0, nums2, 0, k1) + getKthPlaceVal(nums1, 0, nums2, 0, k2)) / 2
}

function getKthPlaceVal(nums1, start1, nums2, start2, k) {
    let len1 = nums1.length - start1;
    let len2 = nums2.length - start2;
    if (len1 <= 0) {
        return nums2[start2 + k - 1]
    }
    if (len2 <= 0) {
        return nums1[start1 + k - 1]
    }
    if (k === 1) {
        return Math.min(nums1[start1], nums2[start2])
    }
    let k_half = Math.floor(k / 2);
    // 这里要防止数组越界
    let comparePlace1 = start1 + Math.min(k_half, len1) - 1;
    let comparePlace2 = start2 + Math.min(k_half, len2) - 1;
    if (nums1[comparePlace1] > nums2[comparePlace2]) {
        return getKthPlaceVal(nums1, start1, nums2, comparePlace2 + 1, k - (comparePlace2 - start2 + 1))
    } else {
        return getKthPlaceVal(nums1, comparePlace1 + 1, nums2, start2, k - (comparePlace1 - start1 + 1))
    }
}
