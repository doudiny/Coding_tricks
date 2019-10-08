var IA = function () {
    let board2D = [[], [], []];
    let board1D = [];
    let main;
    let aiPlayer = 'X';
    let huPlayer = 'O';
    let moves = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];

    this.init = function (game, board) {
        board2D = board;
        board1D = [].concat(...board2D);
        main = game;
    }

    this.play = function (board) {
        board2D = board;
        board1D = [].concat(...board2D);
        for (let i = 0; i < board1D.length; i++) {
            if (board1D[i] === null) board1D[i] = i;
        }
        PlayMinMax();
    }

    function playRandom() {
        var row = Math.floor(Math.random() * 3);
        var col = Math.floor(Math.random() * 3);
        main.play(aiPlayer, row, col);
    }

    function PlayMinMax() {
        var bestSpot = minimax(board1D, aiPlayer);
        if (bestSpot.index === undefined) {
            var row = Math.floor(Math.random() * 3);
            var col = Math.floor(Math.random() * 3);
            main.play(aiPlayer, row, col);
        }
        else main.play(aiPlayer, moves[bestSpot.index][0], moves[bestSpot.index][1])
    }

    function minimax(newBoard, player) {
        var availSpots = emptyIndexies(newBoard);

        if (winning(newBoard, huPlayer)) {
            return { score: -10 };
        } else if (winning(newBoard, aiPlayer)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }

        var moves = [];

        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;

            if (player == aiPlayer) {
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }

        var bestMove;
        if (player === aiPlayer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    function emptyIndexies(board) {
        return board.filter(s => s != 'O' && s != 'X');
    }

    function winning(board, player) {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
        ) {
            return true;
        } else {
            return false;
        }
    }
}