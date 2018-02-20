import { ID, randomRangeNumber, moveLeft} from '../utils';

const colorClassArr = ["bombRed", "bombGreen", "bombBlue"];

function bins(state = {}, action) {     
  var newstate = Object.assign({}, state);  
  switch(action.type) {
    case 'SWAP_BIN':     
      newstate.bins = [...moveLeft(newstate.bins)];
      return newstate;
    case 'REDUCE_BIN_SWAP_COUNT':
      newstate.swapBinTime = newstate.swapBinTime - 1;      
      return newstate;
    case 'RESET_BIN_SWAP_COUNT':
      newstate.swapBinTime = newstate.defaultSwapTime;      
      return newstate;
    default:
      return state;
  }
}

function bombs(state = {}, action) {  
  var newstate = Object.assign({}, state);  
  switch(action.type) {
    case 'PLACE_BOMB':      
      newstate.bombsPlaced = newstate.bombsPlaced + 1
      return newstate;
    case 'TAKE_BOMB_TO_BIN':      
      let score = action.score;
      newstate.score = newstate.score + score
      return newstate;
    default:
      return state;
  }
}

function liveBombs(state = [], action) {
  const id = action.id;
  let index = state.findIndex(liveBomb => {
    return liveBomb.id === id
  });
  switch(action.type) {
    case 'ADD_BOMB':         
      return [...state, 
        {
          className : colorClassArr[randomRangeNumber(2, 0)],          
          lifetime : randomRangeNumber(10, 5),
          id : ID()
        }
    ];
    case 'REMOVE_BOMB':        
      const newState = Object.assign([], state);
      newState.splice(index, 1);
      return newState;    
    case 'REDUCE_LIFE_BOMB':  
      const life = state[index].lifetime;
      if(life - action.lifetaken <= 0) {
        action.type = 'REMOVE_BOMB';
        return liveBombs(state, action);
      }

      return [
        ...state.slice(0, index), 
        {
          ...state[index],
          lifetime: state[index].lifetime - action.lifetaken
        },
        ...state.slice(index + 1)
      ];

  default:
      return state;
  }  
}

export {liveBombs, bombs, bins};