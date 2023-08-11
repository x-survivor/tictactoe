$(document).ready(function () {
    var currentPlayer = 0;
    var turn;
    var gameover;
    var cross = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/2048px-Cross_red_circle.svg.png" width="80" height="80">';
    var circle = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Red_circle_thick.svg/480px-Red_circle_thick.svg.png" width="80" height="80">';



    //Show Cross or Circle When clicking
    $('.box').click(function () {
        if (gameover) return;
        if (!$(this).has("img").length) {
            if (currentPlayer == 0) {
                currentPlayer = 1;
                turn = 'O';
                $(this).empty();
                $(this).append(cross);
            }
            else {
                currentPlayer = 0;
                turn = 'X';
                $(this).empty();
                $(this).append(circle);
            }
        }
        else { }
        $('.turn').empty();
        $('.turn').append('Current Player = ' + turn);
        wincheck();
    });

    //Winnging Combinations
    var winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]           // Diagonals
    ];

    //Check Winner
    var boxes = document.querySelectorAll('.box');
    function wincheck() {
        for (var i = 0; i < winningCombos.length; i++) {
            var combo = winningCombos[i];
            if (
                boxes[combo[0]].innerHTML === boxes[combo[1]].innerHTML &&
                boxes[combo[1]].innerHTML === boxes[combo[2]].innerHTML &&
                boxes[combo[0]].innerHTML !== ''
            ) {
                // We have a winner!
                $('.reset').click(function () {
                    reset();
                });
                $('.turn').empty();
                $('.turn').append('Player ' + (currentPlayer === 1 ? 'X' : 'O') + ' wins!');
                gameover = true;
                return;
            }
        }

        // Check for a draw
        if ($('.box:empty').length === 0) {
            $('.turn').empty();
            $('.turn').append('It\'s a draw!');
            gameover = true;
            $('.reset').click(function () {
                reset();
            });
        }
    }

    //Reset Board
    function reset() {
        if (gameover) {
            $('.box').empty();
            currentPlayer = 0;
            turn = 'X';
            $('.turn').empty();
            $('.turn').append('Current Player = ' + turn);
            gameover = false;
        }
    }

    //Start The Game
    $('.start').click(function () {
        $(this).css('display', 'none');
        $('.welcome').css('display', 'none');
        $('.container').css('display', 'flex');
        $('.currentPlayer').css('display', 'flex');
        $('.btnWrap').css('height', '0');
        $('.reset').css('display', 'flex');
        $('.mMenu').css('display', 'flex');
        $('.border').css('visibility', 'hidden');

    });

    $('.mMenu').click(function () {
        $(this).css('display', 'none');
        $('.welcome').css('display', 'flex');
        $('.container').css('display', 'none');
        $('.currentPlayer').css('display', 'none');
        $('.btnWrap').css('height', '100vh');
        $('.reset').css('display', 'none');
        $('.start').css({ 'display': 'block', 'text-align': 'center' });
        $('.border').css('visibility', 'visible');
        $('.box').empty();
        currentPlayer = 0;
        turn = 'X';
        $('.turn').empty();
        $('.turn').append('Current Player = ' + turn);
        gameover = false;
    });


});