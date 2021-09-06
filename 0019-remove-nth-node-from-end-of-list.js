/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let listIndex = [];
    let current = head;

    do {
        listIndex.push(current);
        current = current.next;
    } while (current);

    const listLen = listIndex.length;

    if (listLen === n) {
        return head.next;
    }

    listIndex[listLen-n-1].next = listIndex[listLen-n].next;

    return head;
};
