// Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. 
// If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

const tttGame = (function () {
    let row1 = [".", ",", "."]
    let row2 = [",", "+", ","]
    let row3 = [".", ",", "."]
    let board = [row1, row2, row3]
    let turn_counter = 0
    let win = false
    const markers = ["x", "o"]

    function playMove (box_id) {
        let row = box_id[0]
        let col = box_id[1]

        if (tttGame.turn_counter%2 == 0) {
            board[row][col] = markers[0]
        } else {
            board[row][col] = markers[1]
        }
        tttGame.turn_counter++
    }

    function checkWin () {
        while (!win) {
            // check horizontal wins: 
            // marker in rowX[0] = rowX[1] = rowX[2] 
            board.forEach((row) => {
                if ((row[0] == row[1]) && (row[1] == row[2])){
                    win = true
                }
            })
            if(win) {break}
                
            // check vertical wins: 
            // marker in row1[i] = row2[i] = row3[i]
            for (let i=0; i<3; i++) {
                if ((row1[i] == row2[i]) && (row2[i] == row3[i])) {
                    win = true
                } 
            }
            if(win) {break}

            // check diagonal wins:
            // marker in row1[0/2] = row2[1] = row3[2/0]
            if ((row1[0] == row3[2]) && (row1[0] == row2[1])) {
                win = true
            }
            if ((row1[2] == row3[0]) && (row1[2] == row2[1])) {
                win = true
            }
            break
        }
        return win
    }

    function reset() {
        board[0] = [".", ",", "."]
        board[1] = [",", "+", ","]
        board[2] = [".", ",", "."]
        tttGame.turn_counter = 0
        win = false
    }

    return {board, markers, turn_counter, playMove, checkWin, reset};
})();

const tttGameDisplay = (function () {
    // assign interactity to each box
    const boxElements = document.querySelectorAll(".box")
    boxElements.forEach(box => {
        box.addEventListener("click", function(){
            tttGame.playMove(this.id)
            console.table(tttGame.board)
            if (tttGame.turn_counter%2 != 0) {
                this.textContent = tttGame.markers[0]
            } else {
                this.textContent = tttGame.markers[1]
            }
            console.log("turn", tttGame.turn_counter)
            console.log("win:", tttGame.checkWin())
            this.disabled = true
        })
    })

    function restart() {
        console.log("RESET")
        boxElements.forEach(box => {
            box.disabled = false
            box.textContent = ""
        })
        tttGame.reset()
    }

    const resetBtn = document.querySelector(".reset")
    resetBtn.addEventListener("click", restart)

  return {}
})();
