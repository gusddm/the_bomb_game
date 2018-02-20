export function addCircle() {
    return {
      type: 'ADD_CIRCLE'
    }
  }

export function removeCircle(i) {
    return {
        type: 'REMOVE_CIRCLE',
        id: i
    }
}  

export function reduceLife(i, lifetaken) {
    return {
        type: 'REDUCE_LIFE_CIRCLE',
        id: i,
        lifetaken : lifetaken
    }
}

export function placeBomb() {
    return {
        type: 'PLACE_BOMB'
    }
}

export function swapBin() {
    return {
        type: 'SWAP_BIN'
    }
}

export function takeBomb(score) {
    return {
        type: 'TAKE_BOMB',
        score: score
    }
}

export function changeScore(bombPlacement) {
    return {
        type: 'CHANGE_SCORE',
        bombPlacement: bombPlacement
    }
}