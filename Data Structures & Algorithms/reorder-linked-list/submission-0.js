/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {ListNode} head
     * @return {void}
     */
    reorderList(head) {
        if(!head || !head.next) return;

        let slow = head;
        let fast = head.next;
        while (fast && fast.next) {
            slow = slow.next;
            fast  = fast.next.next;
        }
        let second = slow.next
        slow.next = null
        let prev = null
       

        while (second) {
            let temp = second.next;
            second.next = prev;
            prev = second;
            second = temp;
        }
        let first = head;
        second = prev;

        while(second) {
            let temp1 = first.next;
            let temp2 = second.next;

            first.next = second;
            second.next = temp1;

            first = temp1;
            second = temp2;
        }
    }
}
