<?php

class Solution {
    protected $canNots = [];
    protected $board;

    protected function init() 
    {
        $this->canNots = [];
        for ($i=0; $i<9; $i++) {
            $this->canNots[] = [[],[],[],[],[],[],[],[],[]];
        }
    }

    protected function canNotRow($rowNumber) 
    {
        $canNot = [];

        for ($i=0; $i<9; $i++) {
            if ($this->board[$rowNumber][$i] != '.') $canNot['s'. $this->board[$rowNumber][$i]] = $this->board[$rowNumber][$i];
        }

        for ($i=0; $i<9; $i++) {
            $this->canNots[$rowNumber][$i] = array_merge($this->canNots[$rowNumber][$i], $canNot);
        }
    }

    protected function canNotCol($rowNumber) 
    {
        $canNot = [];

        for ($i=0; $i<9; $i++) {
            if ($this->board[$i][$rowNumber] != '.') $canNot['s'. $this->board[$i][$rowNumber]] = $this->board[$i][$rowNumber];
        }

        for ($i=0; $i<9; $i++) {
            $this->canNots[$i][$rowNumber] = array_merge($this->canNots[$i][$rowNumber], $canNot);
        }
    }

    protected function canNotBox($x, $y) 
    {
        $canNot = [];

        for ($i=0; $i<3; $i++) {
            for ($j=0; $j<3; $j++) {
                $a = $x+$i; 
                $b = $y+$j;
                if ($this->board[$a][$b] != '.') $canNot['s'. $this->board[$a][$b]] = $this->board[$a][$b];
            }
        }

        for ($i=0; $i<3; $i++) {
            for ($j=0; $j<3; $j++) {
                $a = $x+$i; 
                $b = $y+$j;
                $this->canNots[$a][$b] = array_merge($this->canNots[$a][$b], $canNot);
            }
        }
    }

    protected function isSolved($testBoard = null)
    {
        $result = true;
        if (!$testBoard) $testBoard = $this->board;

        for ($i=0; $i<9; $i++) {
            for ($j=0; $j<9; $j++) {
                if ($testBoard[$i][$j] != '.') continue;
                $result = false;
                break 2;
            }
        }

        return $result;
    }

    protected function canOnlyRow($rowNumber) 
    {
        $didSomething = false;

        $a = $rowNumber;
        for ($char = 1; $char < 10; $char++) {
            $options = [];

            for ($i=0; $i<9; $i++) {
                $b = $i;

                if (isset($this->canNots[$a][$b]['s'.$char])) continue;
                $options[] = ['x'=>$a, 'y'=>$b];
            }
            if (count($options) != 1) continue;

            $this->board[$options[0]['x']][$options[0]['y']] = (string) $char;
            $didSomething = true;
        }

        return $didSomething;
    }

    protected function canOnlyCol($colNumber) 
    {
        $didSomething = false;

        $b = $colNumber;
        for ($char = 1; $char < 10; $char++) {
            $options = [];

            for ($i=0; $i<9; $i++) {
                $a = $i;

                if (isset($this->canNots[$a][$b]['s'.$char])) continue;
                $options[] = ['x'=>$a, 'y'=>$b];
            }
            if (count($options) != 1) continue;

            $this->board[$options[0]['x']][$options[0]['y']] = (string) $char;
            $didSomething = true;
        }

        return $didSomething;
    }

    protected function canOnlyBox($x, $y)
    {
        $didSomething = false;

        for ($char = 1; $char < 10; $char++) {
            $options = [];

            for ($i=0; $i<3; $i++) {
                for ($j=0; $j<3; $j++) {
                    $a = $x+$i; 
                    $b = $y+$j;

                    if (isset($this->canNots[$a][$b]['s'.$char])) continue;
                    $options[] = ['x'=>$a, 'y'=>$b];
                }
            }   

            if (count($options) != 1) continue;

            $this->board[$options[0]['x']][$options[0]['y']] = (string) $char;
            $didSomething = true;
        }
        

        return $didSomething;
    }

    protected function step() 
    {
        $didSomething = false;

        for ($i=0; $i<9; $i++) {
            $this->canNotRow($i);
            $this->canNotCol($i);
        }

        for ($i=0; $i<3; $i++) {
            for ($j=0; $j<3; $j++) {
                $this->canNotBox($i*3, $j*3);
            }
        }

        for ($i=0; $i<9; $i++) {
            for ($j=0; $j<9; $j++) {
                if ($this->board[$i][$j] != '.') continue;
                
                if (count($this->canNots[$i][$j]) != 8) continue;

                $diffArr = array_diff(["5","3","4","6","7","8","9","1","2"], $this->canNots[$i][$j]);
                
                $this->board[$i][$j] = (string) array_pop($diffArr);
                
                $didSomething = true;
            }
        }

        if ($didSomething) return $didSomething;

        for ($i=0; $i<3; $i++) {
            for ($j=0; $j<3; $j++) {
                $didSomething = $this->canOnlyBox($i*3, $j*3) || $didSomething;
            }
        }
        for ($i=0; $i<9; $i++) {
            $didSomething = $this->canOnlyRow($i) || $didSomething;
            $didSomething = $this->canOnlyCol($i) || $didSomething;
        }

        return $didSomething;
    }
    

    protected function attempt($board) 
    {
        $this->board = $board;
        $this->init();
        while ($this->step()) {
            if ($this->isSolved()) break;
        }
        // $board = $this->board;
    }


    /**
     * @param String[][] $board
     * @return NULL
     */
    function solveSudoku(&$board) 
    {
        $this->attempt($board);
        if ($this->isSolved()) {
            $board = $this->board;
            return;
        }

        $backUp = $this->board;

        $pairs = [];
        for ($i=0; $i<9; $i++) {
            for ($j=0; $j<9; $j++) {
                if ($this->board[$i][$j] != '.') continue;
                if (count($this->canNots[$i][$j]) != 7) continue;
                $vals = array_diff(["5","3","4","6","7","8","9","1","2"], $this->canNots[$i][$j]);

                $pairs[] = ['x' => $i, 'y' => $j, 'val' => array_pop($vals)];
                $pairs[] = ['x' => $i, 'y' => $j, 'val' => array_pop($vals)];
            }
        }

        foreach ($pairs as $pair) {
            $testBoard = $backUp;
            $testBoard[$pair['x']][$pair['y']] = (string) $pair['val'];

            $this->attempt($testBoard);
            if ($this->isSolved()) {
                $board = $this->board;
                return;
            }
        }

        foreach ($pairs as $pair) {
            $testBoard = $backUp;
            $testBoard[$pair['x']][$pair['y']] = (string) $pair['val'];

            $this->attempt($testBoard);
            if ($this->isSolved()) {
                $board = $this->board;
                return;
            }
            $this->solveSudoku($testBoard);
            if ($this->isSolved($testBoard)) {
                $board = $testBoard;
                return;
            }
        }

        $board = $backUp;
    }
}

$boardA = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
$boardB = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]];
$boardC = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]];
$boardD = [[".",".",".","2",".",".",".","6","3"],["3",".",".",".",".","5","4",".","1"],[".",".","1",".",".","3","9","8","."],[".",".",".",".",".",".",".","9","."],[".",".",".","5","3","8",".",".","."],[".","3",".",".",".",".",".",".","."],[".","2","6","3",".",".","5",".","."],["5",".","3","7",".",".",".",".","8"],["4","7",".",".",".","1",".",".","."]];
$boardE = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]];

$board = $boardD;

foreach ($board as $row) {
    echo( implode(' ', $row) . "\r\n" );
}
echo( "\r\n" );
(new Solution())->solveSudoku($board);
foreach ($board as $row) {
    echo( implode(' ', $row) . "\r\n" );
}
// var_dump($board);