const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard
let lockgame = false

function flipCard() {
  if (lockgame) return
  if (this === firstCard) return
  this.classList.add('flip')
  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
    return firstCard
  }

  hasFlippedCard = false
  secondCard = this
  checkCards()
}

function checkCards() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    cardsOff()
    return
  }
  unflip()
}

function cardsOff() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetGame()
}

function unflip() {
  lockgame = true
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetGame()
  }, 2000)
}

function resetGame() {
  ;[hasFlippedCard, lockgame] = [false, false][(firstCard, secondCard)] = [
    null,
    null
  ]
}

;(function mixCards() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 38)
    card.style.order = randomPosition
  })
})()

cards.forEach(card => {
  card.addEventListener('click', flipCard)
})
