const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const playerScoreSpan = document.querySelector('[data-player-score]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const restartButton = document.getElementById('restart')
const playerWinText = document.getElementById('player-win')
const computerWinText = document.getElementById('computer-win')
const selButton_rock = document.getElementById('sel-button-rock')
const selButton_paper = document.getElementById('sel-button-paper')
const selButton_scissors = document.getElementById('sel-button-scissors')
const SELECTIONS = [
    {
        name: 'rock',
        img: '🪨',
        beats: 'scissors'
    },
    {
        name: 'paper',
        img: '📜',
        beats: 'rock'
    },
    {
        name: 'scissors',
        img: '✂️',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name == selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const playerWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, playerWinner)

    if (playerWinner) incrementScore(playerScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)

    gameOver()
}

function incrementScore(score) {
    score.innerText = parseInt(score.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.img
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}

function gameOver() {
    if (parseInt(playerScoreSpan.innerText) == 3) {
        playerWinText.style.display = "block"
        restartButton.style.display = "block"
        selButton_rock.disabled = true
        selButton_paper.disabled = true
        selButton_scissors.disabled = true
    } else if (parseInt(computerScoreSpan.innerText) == 3) {
        computerWinText.style.display = "block"
        restartButton.style.display = "block"
        selButton_rock.disabled = true
        selButton_paper.disabled = true
        selButton_scissors.disabled = true
    }
    restartButton.addEventListener('click', () => {
        location.reload()
    })
}