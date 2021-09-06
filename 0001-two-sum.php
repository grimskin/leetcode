/**
 * Definition for a singly-linked list.
 * class ListNode {
 *     public $val = 0;
 *     public $next = null;
 *     function __construct($val = 0, $next = null) {
 *         $this->val = $val;
 *         $this->next = $next;
 *     }
 * }
 */
class Solution {

    /**
     * @param ListNode $l1
     * @param ListNode $l2
     * @return ListNode
     */
    function addTwoNumbers($l1, $l2) {
        $overhead = 0;
        $root = null;
        $lastResult = null;
        while ($l1 || $l2 || $overhead) {
            $sum = $l1 ? $l1->val : 0;
            $sum += $l2 ? $l2->val : 0;
            $sum += $overhead;

            $item = new ListNode($sum % 10);

            if (!$root) { $root = $item; }
            if ($lastResult) {
                $lastResult->next = $item;
                $lastResult = $item;
            } else {
                $lastResult = $item;
            }

            $overhead = floor($sum / 10);
            $l1 = $l1 ? $l1->next : null;
            $l2 = $l2 ? $l2->next : null;
        }

        return $root;
    }
}