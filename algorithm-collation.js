/*
 * @Author: Jackson 
 * @Date: 2018-03-03 20:10:44 
 * @Last Modified by: Jackson
 * @Last Modified time: 2018-03-04 12:12:56
 */

/**
 * 判断B树是不是A树的子结构
 * 子结构条件：节点构造相同、节点value值相同
 * 还需要特殊注意的事 B树中没有的子节点 A树中可以有
 * A树中没有的子节点 B树中一定有没有
 * @param {any} pRoot1 
 * @param {any} pRoot2 
 * @returns 
 */
function HasSubtree(pRoot1, pRoot2) {
    // 判空操作
    if (pRoot1 == null || pRoot2 == null) {
        return false;
    }
    // 主逻辑，先判断当前节点是否符合同构要求
    // 若当前节点不符合，则判断左右子节点
    // 只要有其中一个符合即可
    if (isSubTree(pRoot1, pRoot2)) {
        return true;
    } else {
        return HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2);
    }

    // 同构判断函数，判断两个树是否通过
    // 同时对两个树进行遍历，不过要注意的是
    // 由于题目限定的要求，所以B树中没有的子节点 A树中可以有
    // A树中没有的子节点 B树中一定有没有
    function isSubTree(pRoot1, pRoot2) {

        // B树中没有的子节点 A树中可以有
        if (pRoot2 == null) return true;
        if (pRoot1 == null) return false;

        //若当前节点符合 继续递归判断左右子节点
        if (pRoot1.val === pRoot2.val) {
            return isSubTree(pRoot1.left, pRoot2.left) && isSubTree(pRoot1.right, pRoot2.right);
        } else {
            return false;
        }
    }
}




/**
 * 查找两个链表的公共交点，如果没有公共交点返回空
 * @param {linkClass} linkOne 链表一
 * @param {linkClass} linkTwo 链表二
 */
function findFirstPublicNode(linkOne, linkTwo) {

    // 直接判断尾节点是否相同
    if (linkOne.getTail() !== linkTwo.getTail()) {
        return false;
    }
    if (linkOne.length > linkTwo.length) {
        return traverseSync(linkOne, linkTwo);
    } else {
        return traverseSync(linkTwo, linkOne);
    }

    function traverseSync(linkLong, linkShort) {
        var step = linkLong.length - linkShort.length;
        var pointerOne = linkLong.head;
        var pointerTwo = linkShort.head;
        for (let index = 0; index < step; index++) {
            pointerOne = pointerOne.next;
        }
        while (pointerOne !== pointerTwo) {
            pointerOne = pointerOne.next;
            pointerTwo = pointerTwo.next;
        }
        return pointerOne;
    }


}

/**
 * 节点类，每个节点包含自己的value值以及指向下一个节点的指针
 * @param {number} val 
 */
function node(val) {
    this.val = val;
    this.next = null;
}
/**
 * 链表类，存储链表信息，以及头尾节点
 */
function linkClass() {
    this.head = null;
    this.length = 0;
    this.tail = null;
}
linkClass.prototype.push = function(node) {
    if (this.length == 0) {
        this.head = node;
    } else {
        this.tail.next = node;
    }
    this.tail = node;
    this.length++;
}
linkClass.prototype.getTail = function() {
    return this.tail;
}
linkClass.prototype.getHead = function() {
    return this.head;
}


/**
 * 随机生成一条链表
 * 根据题目要求需要生成两条链表使得他们香蕉\
 * @param {number} len 
 */
function makeRamdomLink(len) {
    var linkInstance = new linkClass();
    var newNode = null;
    for (let index = 0; index < len; index++) {
        newNode = new node(getVal());
        linkInstance.push(newNode);
    }
    return linkInstance;
}


/**
 * 随机生成0-100的正整数
 * @returns number 
 */
function getVal() {
    return parseInt(Math.random() * 100);
}


/**
 * 生成两条相交的链表，通过生成三条链表
 * 将两条链表尾部指针指向同一个链表头 实现两个链表相交
 * @param {any} params 
 * @returns 
 */
function makeTwoIntersectLink() {
    var linkOne = makeRamdomLink(5);
    var linkTwo = makeRamdomLink(15);
    var linkPublic = makeRamdomLink(10);
    var head = linkPublic.getHead();
    var tailOne = linkOne.getTail();
    var tailTwo = linkTwo.getTail();
    tailOne.next = head;
    tailTwo.next = head;
    // 长度增长
    linkOne.length += linkPublic.length;
    linkTwo.length += linkPublic.length;
    // 尾部一致
    linkOne.tail = linkPublic.getTail();
    linkTwo.tail = linkPublic.getTail();
    return {
        linkOne: linkOne,
        linkTwo: linkTwo
    }
}


// 测试算法所调用的代码
(function() {
    var testObj = makeTwoIntersectLink();
    var node = findFirstPublicNode(testObj.linkOne, testObj.linkTwo);
    console.log(node)
})()