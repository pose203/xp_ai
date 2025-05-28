/**
 * 两数相加 - LeetCode 第2题
 * 给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 
 * @param {ListNode} l1 - 第一个链表，表示第一个数
 * @param {ListNode} l2 - 第二个链表，表示第二个数
 * @return {ListNode} - 返回表示两数之和的链表
 */
var addTwoNumbers = function(l1, l2) {
    // 初始化结果链表的头指针和尾指针
    let head = null, tail = null;
    // 初始化进位值
    let carry = 0;
    // 只要两个链表中至少有一个还有节点，就继续循环
    while (l1 || l2) {
        // 获取l1当前节点的值，如果l1已经结束则为0
        const n1 = l1 ? l1.val : 0;
        // 获取l2当前节点的值，如果l2已经结束则为0
        const n2 = l2 ? l2.val : 0;
        // 计算当前位的和，包括可能的进位值
        const sum = n1 + n2 + carry;
        
        // 处理结果链表
        if (!head) {
            // 如果是第一个节点，同时设置头尾指针
            head = tail = new ListNode(sum % 10);
        } else {
            // 否则，将新节点添加到尾部
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        
        // 计算进位值（整除10后向下取整）
        carry = Math.floor(sum / 10);
        
        // 移动l1指针到下一个节点，如果存在的话
        if (l1) {
            l1 = l1.next;
        }
        // 移动l2指针到下一个节点，如果存在的话
        if (l2) {
            l2 = l2.next;
        }
    }
    
    // 如果最后还有进位，需要添加一个额外的节点
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    
    // 返回结果链表的头指针
    return head;
};
