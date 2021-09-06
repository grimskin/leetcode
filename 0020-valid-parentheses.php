<?php

class Solution {

    /**
     * @param String $s
     * @return Boolean
     */
    function isValid($s) {
        $stack = [];

        $openers = ['(','[','{'];
        $closers = [
            ']' => '[',
            ')' => '(',
            '}' => '{',
        ];

        for ($i=0;$i<strlen($s);$i++) {
            $char = $s[$i];
            if (in_array($char, $openers)) {
                array_push($stack, $char);
                continue;
            }

            if (!count($stack)) return false;
            $lastOpener = array_pop($stack);
            if ($lastOpener != $closers[$char]) return false;
        }

        if (count($stack)) return false;

        return true;
    }
}
