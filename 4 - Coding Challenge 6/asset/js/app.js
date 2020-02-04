/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

///////////////////////////////////////////////////////////

var scores, roundScore, activePlayer, gamePlay;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlay === true){

        // 1. Random number
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-0').style.display = 'block';;
        document.getElementById('dice-1').style.display = 'block';;
        document.getElementById('dice-0').src = 'asset/img/dice-' + dice0 + '.png';
        document.getElementById('dice-1').src = 'asset/img/dice-' + dice1 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice0 !== 1 && dice1 !== 1){
            // Add score
            roundScore += dice0 + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            // Next player
            nextPlayer();
        }
        
        
        /*
        if(dice == 6 && lastDice == 6){
            // Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }else if (dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            // Next player
            nextPlayer();
        }
        
        lastDice = dice;
        */
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlay){
        // Add CURRENT SCORE to GLOBAL SCORE
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var inputFS = document.querySelector('.final-score').value;
        var winningScore;
        if(inputFS){
            winningScore = inputFS;
        }else{
            winningScore = 100;
        }

        // Check IF player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlay = false;

        }else{
        // Next player
        nextPlayer();
        }
    }
})

function nextPlayer(){

    if(gamePlay){
        if(activePlayer === 0){
            activePlayer = 1;
        }else{
            activePlayer = 0;
        }
        
        roundScore = 0;
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');            

        document.querySelector('.dice-0').style.display = 'none';
        document.querySelector('.dice-1').style.display = 'none';
    }
}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    
    gamePlay = true;

    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById ('name-0').textContent = 'Player 1';
    document.getElementById ('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}