/*
 * @Author: Jackson 
 * @Date: 2018-03-03 20:10:44 
 * @Last Modified by: Jackson
 * @Last Modified time: 2018-03-10 16:33:46
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

function handleLink(link) {
    if (link.head == null) {
        return null;
    }
    // 空节点 作为首个对接位节点
    var dockingPos = null;
    var newNode = new node(null);
    newNode.next = link.head;
    dockingPos = newNode;

    // 遍历信息初始化
    traversePos = link.head.next;
    var flag = link.head.val;
    var death = 0;

    // 迭代判断simida
    while (traversePos !== null) {
        if (traversePos.val !== flag) {
            if (death == 0) {
                flag = traversePos.val;
                dockingPos = dockingPos.next;
                traversePos = traversePos.next;
            } else {
                death = 0;
                flag = traversePos.val;
                traversePos = traversePos.next;
            }
        } else {
            death = 1;
            dockingPos.next = traversePos.next;
            traversePos = traversePos.next;
        }
    }

    return newNode.next;

}

function makeOrderlyLink() {
    var linkInstance = new linkClass();
    var newNode = null;
    newNode = new node(1);
    linkInstance.push(newNode);
    newNode = new node(1);
    linkInstance.push(newNode);
    newNode = new node(1);
    linkInstance.push(newNode);
    newNode = new node(4);
    linkInstance.push(newNode);
    newNode = new node(4);
    linkInstance.push(newNode);
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

    // 设置一个有序链表
    // 删除链表中的重复项
    // 例如1224 输出14  又13566输出135
    var link = makeOrderlyLink();
    var link2 = handleLink(link);
    console.log(link2);


    // var testObj = makeTwoIntersectLink();
    // var node = findFirstPublicNode(testObj.linkOne, testObj.linkTwo);
    // console.log(node)
})()



/**
 * 重建二叉树，利用递归的方式，只关注输入和输出，不care内部过程
 * 巧妙的利用递归，把复杂的问题简单化
 * @param {nodearr} pre 
 * @param {nodearr} vin 
 * @returns 
 */
function rebuildTree(pre, vin) {

    // 特殊判断
    if (pre.length == 0 || vin.length == 0) {
        return null;
    }
    var val = pre[0];
    var index = vin.indexOf(val);
    return {
        val: val,
        leftChild: rebuildTree(pre.slice(1, index + 1), vin.slice(0, index)),
        rightChild: rebuildTree(pre.slice(index + 1), vin.slice(index + 1))
    }
}

// 测试代码
// (function() {
//     var tree = rebuildTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]);
//     console.log(tree);
// })()



// 借住动态规划的思想
// 利用递归+缓存 实现算法

/**
 * 计算如何切割钢筋可以达到最大价值
 * 通过分治的思想，把fn定义为f(n-1)+最后一割
 * 注意 递归算法，只关注输入和输出，充分利用分治，简化过程代码
 * @param {array} p 价格表
 * @param {number} n 钢筋的长度
 * @param {array} r 缓存数据的数组
 * @returns 
 */
function countMaxPrice(p, n, r) {
    if (n <= 0) {
        return 0;
    }
    if (r[n] >= 0) {
        return r[n];
    }
    var max = 0;
    for (let i = 1; i <= 10; i++) {
        if (n - i < 0) {
            break;
        }
        max = Math.max(max, p[i] + countMaxPrice(p, n - i, r));
    }
    r[n] = max;
    return max;
}

function runCounting(n) {
    var p = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
    var r = [-1];

    for (let index = 1; index <= n; index++) {
        r[index] = -1;
    }
    return countMaxPrice(p, n, r);
}

// 切钢筋问题代码测试
(function() {
    console.log('max price:\n');
    console.log('length equals 1:' + runCounting(1));
    console.log('length equals 2:' + runCounting(2));
    console.log('length equals 3:' + runCounting(3));
    console.log('length equals 4:' + runCounting(4));
    console.log('length equals 5:' + runCounting(5));
    console.log('length equals 6:' + runCounting(6));
    console.log('length equals 7:' + runCounting(7));
    console.log('length equals 8:' + runCounting(8));
    console.log('length equals 9:' + runCounting(9));
    console.log('length equals 10:' + runCounting(10));
    console.log('length equals 11:' + runCounting(11));
    console.log('length equals 12:' + runCounting(12));
})()



// 初始化堆
/**
 * 初始化堆结构 利用数组来存值
 * 从第一个非叶子节点开始调整 调整的过程是和子节点比较
 * @param {array} arr 
 * @returns 
 */
function initHeapConstruction(arr) {
    arr.unshift(0);
    var len = arr.length - 1;
    var st_index = Math.floor(len / 2);
    for (let index = st_index; index >= 1; index--) {
        flowNode(index, arr);
    }
    return arr;
}

/**
 * 对某个节点进行调整操作，从上往下flow
 * 和该节点的两个子节点比较，因为是大顶堆，所以是和较大值交换值
 * @param {number} index 
 * @param {array} arr 
 * @returns 
 */
function flowNode(index, arr) {
    var left = index * 2;
    var right = index * 2 + 1;
    var bigger = arr[left] > arr[right] ? left : right;
    var temp;
    if (arr[index] < arr[bigger]) {
        temp = arr[index];
        arr[index] = arr[bigger];
        arr[bigger] = temp;
        flowNode(bigger, arr);
    }
    return;
}
/**
 * 处理arr 数组中的数据，查找其中最大的number个数
 * @param {array} arr 
 * @param {number} number 
 * @returns 
 */
function handleMoreData(arr, number) {
    var heap = initHeapConstruction(arr.slice(0, number));
    var arr2 = arr.slice(number);
    var len = arr2.length;
    for (let index = 0; index < len; index++) {
        if (arr2[index] < heap[1]) {
            heap[1] = arr2[index];
            flowNode(1, heap);
        }
    }
    return heap;
}


// 测试堆代码
// (function() {
//     console.log('Find the maximum number of five :')
//     var a = handleMoreData([2, 4, 5, 6, 7, 5, 16, 7, 8, 2, 1, 5, 8, 7, 8, 1, 3, 6, 0, 1, 8, 9, 9], 5);
//     console.log(a.slice(1));
// 利用排序来验证
// console.log([2, 4, 5, 6, 7, 5, 16, 7, 8, 2, 1, 5, 8, 7, 8, 1, 3, 6, 0, 1, 8, 9, 9].sort(function(b, a) {
//     return b - a;
// }).slice(0, 5))

// })()




// 判断文件之间是否存在循环依赖
/**
 * 判断文件数组中是否存在循环依赖
 * 如果存在返回false，不存在返回true
 * @param {fileArray} fileArr 
 * egg:[{
        name: 'file1',
        dependencies: ['file2', 'file3']
    }]
 * @returns 
 */
function checkCyclicDependence(fileArr) {

    var nodeHash = {};
    var quickObj = {};
    fileArr.forEach(function(obj, i) {
        quickObj[obj.name] = obj.dependencies;
    })

    // 初始化节点值
    fileArr.forEach(function(obj, i) {
        if (nodeHash[obj.name] == undefined) {
            nodeHash[obj.name] = 0;
        }
    })

    // 节点值计数
    fileArr.forEach(function(obj, i) {

        obj.dependencies.forEach(function(dep, i) {
            if (nodeHash[dep] == undefined) {
                nodeHash[dep] = 1;
            } else {
                nodeHash[dep]++;
            }
        })

    })

    // 逐个删除节点 拓扑排序
    var flag = false;

    function checkMatchCondition(nodeHash) {
        var flag = false;
        for (let p in nodeHash) {
            if (nodeHash[p] == 0) {
                flag = true;
                return true;
            }
        }
        return flag;
    }
    while (checkMatchCondition(nodeHash)) {
        for (let p in nodeHash) {
            if (nodeHash[p] == 0) {
                quickObj[p].forEach(function(file, i) {
                    nodeHash[file]--;
                })
                nodeHash[p] = -1;
                return true;
            }
        }
    }

    function checkAllMatch(nodeHash) {
        var flag = true;
        for (let p in nodeHash) {
            if (nodeHash[p] != -1) {
                flag = false;
                return false;
            }
        }
        return flag;
    }
    return checkAllMatch(nodeHash);


}

// 测试循环依赖代码
// (function() {
//     console.log('判断是否循环依赖：')
//     console.log(
//         checkCyclicDependence([{
//                 name: 'file1',
//                 dependencies: ['file2', 'file3']
//             },
//             {
//                 name: 'file2',
//                 dependencies: []
//             },
//             {
//                 name: 'file3',
//                 dependencies: ['file2']
//             }
//         ])
//     )
//     console.log('判断是否循环依赖：')
//     console.log(
//         checkCyclicDependence([{
//                 name: 'file1',
//                 dependencies: ['file2', 'file3']
//             },
//             {
//                 name: 'file2',
//                 dependencies: ['file1']
//             },
//             {
//                 name: 'file3',
//                 dependencies: ['file2']
//             }
//         ])
//     )

// })()


// 对句子中的单词倒叙输出
/**
 * 对句子中的单词倒叙 并输出
 * 注意 如果有特殊符号 ?!,:等 还要做特殊判断 可以利用正则
 * @param {String} str 
 * @returns 
 */
function reverseSentence(str) {

    var words = str.split(' ');
    var len = words.length;
    for (let index = 0; index < len; index++) {
        let arr = words[index].split('');
        arr.reverse();
        words[index] = arr.join('');
    }
    return words.join(' ')
}

(function() {
    console.log('reverse sentence:');
    var a = reverseSentence('ni hao ma hahah');
    console.log('ni hao ma hahah');
    console.log(a);


    var str = ' sdfl sldkfj fg daflkgj   jksdhf sdfh wef  asf k';
    console.log(str)
    var str2 = str.replace(/\b\w+\b/g, function(word) {
        let arr = word.split('');
        arr.reverse();
        return arr.join('');
    })
    console.log(str2)
})()