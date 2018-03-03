/*
 * @Author: Jackson 
 * @Date: 2018-03-03 20:10:44 
 * @Last Modified by: Jackson
 * @Last Modified time: 2018-03-03 20:16:48
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