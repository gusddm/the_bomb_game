export function addBomb() {
    return {
      type: 'ADD_BOMB'
    }
  }

export function removeBomb(i) {
    return {
        type: 'REMOVE_BOMB',
        id: i
    }
}  

export function reduceLife(i, lifetaken) {
    return {
        type: 'REDUCE_LIFE_BOMB',
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

export function reduceBinSwapCount() {
    return {
        type: 'REDUCE_BIN_SWAP_COUNT'
    }
}

export function resetBinSwapCount() {
    return {
        type: 'RESET_BIN_SWAP_COUNT'
    }
}

export function takeBomb(score) {
    return {
        type: 'TAKE_BOMB_TO_BIN',
        score: score
    }
}