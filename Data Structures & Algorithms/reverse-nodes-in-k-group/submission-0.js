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
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head, k) {
        let dummy = new ListNode(0, head);
        let groupPrev = dummy;

        while(true) {
            let kth = this.getKth(groupPrev, k)
            if (kth === null) break;
            let groupNext = kth.next;
            let prev = groupNext;
            let curr = groupPrev.next;
            while (curr !== groupNext) {
                let temp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = temp;
            }
            let tail = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tail;
        }
        return dummy.next;
    }
    getKth(curr, k) {
        while(curr && k > 0) {
            curr = curr.next;
            k--;
        }
        return curr;
    }
}
