/*
 * @Author: Jackson 
 * @Date: 2018-03-03 20:10:44 
 * @Last Modified by: Jackson
 * @Last Modified time: 2018-04-16 17:53:14
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

// 测试代码
// (function() {
//     console.log('reverse sentence:');
//     var a = reverseSentence('ni hao ma hahah');
//     console.log('ni hao ma hahah');
//     console.log(a);


//     var str = ' sdfl sldkfj fg daflkgj   jksdhf sdfh wef  asf k';
//     console.log(str)
//     var str2 = str.replace(/\b\w+\b/g, function(word) {
//         let arr = word.split('');
//         arr.reverse();
//         return arr.join('');
//     })
//     console.log(str2)
// })()


/**
 * 求丑数，注意：丑数的素因子只有2、3、5才是丑数
 * 丑数 乘以 丑数 还是丑数  利用这个原理 逐位增加
 * @param {number} index 
 * @returns 
 */
function GetUglyNumber_Solution(index) {
    // write code here
    if (index == 0) return 0
    var uglys = [1];
    var factor2 = 0,
        factor3 = 0,
        factor5 = 0;
    for (var i = 1; i < index; i++) {

        uglys[i] = Math.min(uglys[factor2] * 2, uglys[factor3] * 3, uglys[factor5] * 5);

        // 同值合并  例如2*3 == 3*2 不会出现两个6 因为合并了
        if (uglys[i] == uglys[factor2] * 2) factor2++;
        if (uglys[i] == uglys[factor3] * 3) factor3++;
        if (uglys[i] == uglys[factor5] * 5) factor5++;
    }
    return uglys;
}

// (function() {
//     console.log('输出丑数：')
//     console.log(GetUglyNumber_Solution(20));
// })()


function PrintMinNumber(numbers) {
    // write code here
    numbers.sort(function(a, b) {
        var s1 = a + '' + b;
        var s2 = b + '' + a;
        for (var i = 0; i < s1.length; i++) {
            if (s1.charAt(i) > s2.charAt(i)) {
                return 1
            } else if (s1.charAt(i) < s2.charAt(i)) {
                return -1;
            }

        }
        return 1
    })
    var result = "";
    numbers.map(function(num) {
        result = result.concat(num)
    })
    return result;
}
// 利用int来判断会出现一个问题 就是数字大小溢出。
// function PrintMinNumber2(numbers) {
//     // write code here
//     numbers.sort(function(a, b) {
//         console.log(a + 'and' + b)
//         var s1 = a + '' + b;
//         var s2 = b + '' + a;
//         var number1 = parseInt(s1);
//         var number2 = parseInt(s2);

//         // console.log(s1);
//         // console.log(s2);
//         if (number1 < number2) {
//             return -1;
//         } else {
//             return 1;
//         }
//     })
//     var result = "";
//     numbers.map(function(num) {
//         result = result.concat(num)
//     })
//     return result;
// }

(function() {
    console.log(PrintMinNumber([321, 32, 320, 3201, 3203]))
        // console.log(PrintMinNumber2([321, 32, 320, 3201, 3203]))
    console.log(PrintMinNumber([12, 123, 122]))
        // console.log(PrintMinNumber2([12, 123, 122]))
})()


// 判断数组是不是一个平衡二叉树的后序遍历结果
function checkTranverse(arr) {
    var root = arr.pop();
    if (arr.length == 0) {
        return true;
    }
    var len = arr.length;
    var index = 0;
    for (index = 0; index < len; index++) {
        if (arr[index] > root) {
            break;
        }
    }

    if (checkArrayMatch(arr.slice(index), root)) {
        return checkTranverse(arr.slice(0, index)) && checkTranverse(arr.slice(index))
            // return true;
    } else {
        return false;
    }

}

function checkArrayMatch(arr, root) {
    return arr.every(function(ele) {
        return ele > root;
    })
}

// 测试代码
// (function() {

//     var a = [1, 4, 10, 18, 16, 9];
//     console.log(checkTranverse(a));


//     var func = eval("(function parse(data) {\
//                 console.log(this.b);\
//                 return true;\
//             })\
//             ")

//     var a = {
//         b: 2
//     };
//     console.log(func);
//     func.call(a);
// })()




// 快排代码实现
function quickSort(i, j, arr) {
    if (i >= j) return;
    var flag = arr[i];
    var stIndex = i;
    var endIndex = j;
    while (i < j) {
        while (arr[j] >= flag && i < j) {
            j--;
        }
        arr[i] = arr[j];
        // arr[j] = flag;
        while (arr[i] <= flag && i < j) {
            i++;
        }
        arr[j] = arr[i];
        // arr[i] = flag;
    }
    arr[i] = flag;
    quickSort(stIndex, i - 1, arr);
    quickSort(i + 1, endIndex, arr);
}


var shellSort = (arr) => {
    console.time('希尔排序耗时:');
    let len = arr.length,
        temp, gap = 1;
    while (gap < len / 5) { // 动态定义间隔序列步长为 5
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (let i = gap; i < len; i++) {
            temp = arr[i];
            let j;
            for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    console.timeEnd('希尔排序耗时:');
    console.log(arr);
    return arr;
}

// 测试代码
(function() {
    var a = [1, 43, 5, 4, 5, 6, 7, 6, 4, 54, 67];
    shellSort(a);
    // quickSort(0, a.length - 1, a);
    // console.log(a);
})()



// function _handleData(x, y, z, start, end) {
//     var plan_arr = [];

//     var start = start;
//     var now_value = start;

//     function judgePlanAandB(x, y, now_value) {
//         var valueA = x / 2;
//         var valueB = y / now_value
//         if (valueA < valueB) {
//             plan_arr.push({
//                 plan: 'A',
//                 price: x
//             })
//             now_value = now_value + 2;
//         } else {
//             plan_arr.push({
//                 plan: 'B',
//                 price: y
//             })
//             now_value = now_value * 2;
//         }
//     }

//     // 计算翻倍和回调的钱  比较A方案 选取方案
//     function judgePlanAandB_spc(x, y, z, now_value) {

//         var valueA = (end - now_value) / 2 * x;
//         var overflow_value = now_value * 2 - end;
//         var valueB = y + overflow_value / 2 * z;
//         if (valueA < valueB) {
//             plan_arr.push({
//                 plan: 'A',
//                 price: x
//             })
//             now_value = now_value + 2;
//         } else {
//             plan_arr.push({
//                 plan: 'B',
//                 price: y
//             })
//             now_value = now_value * 2;
//         }
//     }

//     function doPlanC(z) {
//         plan_arr.push({
//             plan: 'C',
//             price: z
//         })
//         now_value = now_value - 2;
//     }
//     // 当前value值不符合条件 继续调整
//     while (now_value !== end) {
//         // 增加策略判断 不超过总人气的策略判断
//         // 根据平均每人气花费来计算
//         if (now_value + 2 <= end && now_value * 2 <= end) {
//             judgePlanAandB(x, y, now_value)
//         } else if (now_value * 2 > end && now_value < end) {
//             judgePlanAandB_spc(x, y, z, now_value)
//         } else if (now_value > end) {
//             doPlanC(z);
//         }
//     }

//     var final_price = 0;
//     plan_arr.map(function(ele) {
//         final_price = parseFloat(ele.price) + final_price;
//     })

//     console.log(final_price);

// }

// (function() {
//     _handleData(2, 50, 1, 10, 100);

// })


// function addTwoBigNumber(a, b) {
//     var arrA = a.split('');
//     var arrB = b.split('');
//     var lenA = a.length;
//     var lenB = b.length;
//     var result_arr = [];
//     var jinwei = 0;
//     for (var i = lenA - 1, j = lenB - 1; i >= 0 || j >= 0; i--, j--) {
//         let num = parseInt(arrA[i] || 0) + parseInt(arrB[j] || 0) + jinwei;
//         jinwei = num > 10 ? 1 : 0;
//         result_arr.push(num % 10)
//     }
//     console.log(result_arr.reverse().join(''))
// }


// (function() {
//     addTwoBigNumber('123123123', '43435354');
// })()


var now_position = 'N';


var pos_number = 0;

function checkPosition(arr) {

    arr.forEach(function(ele, i) {
        if (ele == 'L') {
            pos_number--;
        } else if (ele == 'R') {
            pos_number++;
        }
    })

    var res = pos_number % 4;
    if (res < 0) {
        res = res + 4
    }
    console.log(pos_number);
    console.log(res);


}

function outputPos(number) {
    switch (number) {
        case 0:
            print('N');
            break;
        case 1:
            print('E');
            break;
        case 2:
            print('S');
            break;
        case 3:
            print('W');
            break;
    }
}


function handleNumber(st, end) {
    var result = 0;
    var res_arr = [];
    var count = 0;
    for (let index = 1; index <= st; index++) {
        result = index + result;
    }
    if (result % 3 == 0) {
        count++;
    }
    var round = end - st;
    for (let index = st + 1; index <= end; index++) {
        result = result + index;
        if (result % 3 == 0) {
            count++;
        }
    }
    console.log(count)
    return count;
}

function judgeArr(arr) {
    var count = 0;
    if (arr instanceof Array) {
        arr.forEach(function(ele) {
            if (ele % 3 == 0) {
                count++;
            }
        })
    }
    return count;
}

// 根据题目  k <= x <= n 
// y 根据条件约束 限制在余数 k2 到 x之间 ，如果x>k 则k到n皆可取值
function handleNandK(n, k) {

    var x = k;
    var count = 0;
    for (let x = k; x <= n; x++) {

        if (x >= k) {
            count = count + n - x;
        }
        // x == y
        if (k == 0) {
            count++;

        }
        for (let j = k + 1; j < x; j++) {
            if (x % j >= k) {
                count++;
            }
        }
    }
    console.log(count);
    return count;

}


// 记录出现次数最多的子串
// 函数如下

function handleStr(originString) {
    // 字符串总长度
    var total_len = originString.length;
    // 当前处理子串长度  之后会递增 3 4 5 ... 的子串
    var now_process_len = 2;
    // 结束处理子串长度  先缩减为n/2
    // 当k长度子串 匹配t次  该数字更新为 n/t  （前提是能更新全局标记位whole_flag
    var end_process_len = Math.floor(total_len / 2);

    var whole_flag = {
        son_str: '',
        times: 0
    }

    // while循环  递增 2 3 4 ...子串
    while (now_process_len <= end_process_len) {

        // 截取所有长度为now_process_len 可能的子串
        // 例如截取长度为2的所有字符串 放入arr
        // 截取长度为3的所有字符串 放入arr   ....
        let now_process_arr = [];
        for (let index = 0; index < total_len - now_process_len; index++) {
            now_process_arr.push(originString.slice(index, index + now_process_len));
        }
        console.log(now_process_arr);


        var flag = {
            son_str: '',
            times: 0
        }

        // 利用正则 匹配次数  次数高的更新flag位
        for (let i = 0; i < now_process_arr.length; i++) {
            let reg = new RegExp(now_process_arr[i], 'g');
            let match_times = originString.match(reg).length;
            if (match_times > flag.times) {
                flag = {
                    son_str: now_process_arr[i],
                    times: match_times
                }
            }
        }
        console.log(flag);

        // 递增 2长度处理完 处理3长度子串 类推
        now_process_len++;

        // 如果当前子串最高flag位  高于全局位 更新全局
        // 例如2子串最多4次    3子串最多有5次  更新全局标记位
        // 同时更新end_process_len   缩减到n/5 作为结束位
        if (flag.times >= whole_flag.times) {
            whole_flag = flag;
            end_process_len = Math.floor(total_len / flag.times);
        }
    }
    // 得出结果
    console.log(whole_flag)
}


// handleStr('abcsdfjkabcskdfabc')


// (function() {
//     handleNandK(5, 2)
//         // handleNumber(2, 8)
//         // checkPosition(['L', 'R', 'R', 'L', 'L', 'L', 'L', 'L', 'L', 'L']);
// })()


// (function() {

//     var result = [];

//     for (let i = 1; i <= 6; i++) {
//         for (let j = 1; j <= 6; j++) {
//             for (let k = 1; k <= 6; k++) {
//                 for (let l = 1; l <= 6; l++) {
//                     result.push(i + j + k + l);
//                 }
//             }
//         }
//     }

//     console.log(result.length);
//     var hashMap = {
//         0: 0,
//         1: 0,
//         2: 0,
//         3: 0,
//         4: 0,
//         5: 0,
//         6: 0,
//         7: 0
//     };

//     for (let index = 0; index < result.length; index++) {
//         var key = result[index] % 8;
//         hashMap[key]++;
//     }

//     var count = 0;
//     for (var p in hashMap) {
//         count = count + hashMap[p];
//     }

//     console.log(count);
//     console.log(hashMap)


// })()




function handleStr(originString) {
    // 字符串总长度
    var total_len = originString.length;
    // 当前处理子串长度  之后会递增 3 4 5 ... 的子串
    var now_process_len = 2;
    // 结束处理子串长度  先缩减为n/2
    // 当k长度子串 匹配t次  该数字更新为 n/t  （前提是能更新全局标记位whole_flag
    var end_process_len = Math.floor(total_len / 2);

    var whole_flag = {
        son_str: '',
        times: 0
    }

    // while循环  递增 2 3 4 ...子串
    while (now_process_len <= end_process_len) {

        // 截取所有长度为now_process_len 可能的子串
        // 例如截取长度为2的所有字符串 放入arr
        // 截取长度为3的所有字符串 放入arr   ....
        let now_process_arr = [];
        for (let index = 0; index < total_len - now_process_len; index++) {
            now_process_arr.push(originString.slice(index, index + now_process_len));
        }
        console.log(now_process_arr);


        var flag = {
            son_str: '',
            times: 0
        }

        // 利用正则 匹配次数  次数高的更新flag位
        for (let i = 0; i < now_process_arr.length; i++) {
            let reg = new RegExp(now_process_arr[i], 'g');
            let match_times = originString.match(reg).length;
            if (match_times > flag.times) {
                flag = {
                    son_str: now_process_arr[i],
                    times: match_times
                }
            }
        }
        console.log(flag);

        // 递增 2长度处理完 处理3长度子串 类推
        now_process_len++;

        // 如果当前子串最高flag位  高于全局位 更新全局
        // 例如2子串最多4次    3子串最多有5次  更新全局标记位
        // 同时更新end_process_len   缩减到n/5 作为结束位
        if (flag.times >= whole_flag.times) {
            whole_flag = flag;
            end_process_len = Math.floor(total_len / flag.times);
        }
    }
    // 得出结果
    console.log(whole_flag)
}

handleStr('abcsdfjkabcskdfabc');