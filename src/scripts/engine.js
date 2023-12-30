const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector("#time-left"),
    timeScore: document.querySelector("#time-score"),

  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    curretDownTimerId: setInterval(countDown, 1000),
  }
}

function playAudio(audio) {
  let audio = new Audio(`./src/audios/${audio}.m4a`)
  audio.volume = 0.2
  audio.play()
}

function countDown() {
  state.values.curretTime--
  state.view.timeLeft.textContent = state.values.curretTime

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.curretDownTimerId)
    clearInterval(state.actions.timerId)
    alert('Game Over! o seu resultado foi ' + state.values.result)
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
  })

  let randomNumber = Math.floor(Math.random() * 9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy")
  state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++
        state.view.timeScore.textContent = state.values.result

        state.values.hitPosition = null
        playAudio("hit'")
      }

    })
  })
}

function initialize() {
  addListenerHitBox()
}

initialize()