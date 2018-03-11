## algorithm

最近在复习数据结构的相关知识，设计栈、队列、二叉树和哈希表等，现整理部分算法题及对应JS编程代码附上。

3.3

第一题：如何判断B树是A树的子结构？

3.4 

第二题：查找两个链表的第一个公共交点？

3.5

第三题：输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回？

第四题：10亿个数里面最小的十个数 
（两种解法：利用大顶堆、或者利用快排的分区）
（大顶堆可以有效节约内存空间）

3.7

第五题 删除有序链表内重复的数

3.8 

给定一段长度为n英寸的钢条和一个价格表p(i)，求切割钢条的方案，使得销售收益r(n)最大。注意，如果长度为n英寸的钢条的价格为p(n)足够大，最优解可能不是完全不需要切割。

长度 1 2 3 4  5  6  7  8  9 10

价格 1 5 8 9 10 17 17 20 24 30

3.10

判断文件间是否构成循环依赖 (利用有向图 通过拓扑排序判断)

1万个电话号码里找出出现频率最高的10个数 (哈希表 + 小顶堆)

句子中单词倒叙输出 (借住栈 、或双向指针换位)

A、B文件各有10亿个电话，求交集  (外部排序)

3.11

把只包含因子2、3和5的数称作丑数（Ugly Number）。例如6、8都是丑数，但14不是，因为它包含因子7。 习惯上我们把1当做是第一个丑数。求按从小到大的顺序的第N个丑数。

输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。
（充分利用数组的sort方法，通过比较字符串ascii码的方式，确定是否交换位置）

loading...


