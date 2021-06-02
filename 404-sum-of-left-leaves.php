<?php

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     public $val = null;
 *     public $left = null;
 *     public $right = null;
 *     function __construct($val = 0, $left = null, $right = null) {
 *         $this->val = $val;
 *         $this->left = $left;
 *         $this->right = $right;
 *     }
 * }
 */
class TreeNode {
    public $val = null;
    public $left = null;
    public $right = null;
    function __construct($val = 0, $left = null, $right = null) {
        $this->val = $val;
        $this->left = $left;
        $this->right = $right;
    }
}
class Solution {

    /**
     * @param TreeNode $root
     * @return Integer
     */
    function sumOfLeftLeaves($root, $isLeft = true) {
        if ($root->left === null && $root->right === null) {
            if (!$isLeft) return 0;
            return $root->val;
        }
        var_dump(($root));

        $result = 0;
        if (isset($root->left) && $root->left !== null) $result += $this->sumOfLeftLeaves($root->left, true);
        if (isset($root->right) && $root->right !== null) $result += $this->sumOfLeftLeaves($root->right, false);

        return $result;
    }
}


$nodes = unserialize('O:8:"TreeNode":3:{s:3:"val";i:3;s:4:"left";O:8:"TreeNode":3:{s:3:"val";i:9;s:4:"left";N;s:5:"right";N;}s:5:"right";O:8:"TreeNode":3:{s:3:"val";i:20;s:4:"left";O:8:"TreeNode":3:{s:3:"val";i:15;s:4:"left";N;s:5:"right";N;}s:5:"right";O:8:"TreeNode":3:{s:3:"val";i:7;s:4:"left";N;s:5:"right";N;}}}');

$sol = new Solution();
echo $sol->sumOfLeftLeaves($nodes);