var board,
    game = new Chess(),
    timers = {},
    gameState,
    playerColor = 'w';


var setAlwaysMyTurn = function(){
    game.setTurn(playerColor);
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

var onDragStart = function(source, piece) {
    setAlwaysMyTurn();
    // do not pick up pieces if the game is over
    // or if it's not that side's turn
    if (game.game_over() === true) {
        return false;
    }
};

var onDrop = function(source, target) {
    removeGreySquares();

    setAlwaysMyTurn();

    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    if (move.captured === 'k') {
        alert('you win!');
    }

    setAlwaysMyTurn();

    // illegal move
    if (move === null) return 'snapback';
};

var onMouseoverSquare = function(square, piece) {
    // get list of possible moves for this square

    setAlwaysMyTurn();

    var moves = game.moves({
        square: square,
        verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    greySquare(square);

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var onSnapEnd = function() {
    board.position(game.fen());
    setAlwaysMyTurn();
};

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd,
    pieceTheme: 'chessboardjs-0.3.0/img/chesspieces/wikipedia/{piece}.png'
};
board = ChessBoard('board', cfg);