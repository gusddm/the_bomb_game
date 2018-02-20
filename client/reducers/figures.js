import { ID, randomRangeNumber, moveLeft} from '../utils';

const colorClassArr = ["circleRed", "circleGreen", "circleBlue"];

function bins(state = [], action) {   
  var newstate = [...state];
  switch(action.type) {
    case 'SWAP_BIN':         
      return [ ...moveLeft(newstate) ];
    default:
      return state;
  }  
}

function bombs(state = {}, action) {  
  switch(action.type) {
    case 'PLACE_BOMB':      
      return { bombsPlaced: state.bombsPlaced + 1 };
    default:
      return state;
  }  
}

function circles(state = [], action) {
  const id = action.id;
  let index = state.findIndex(circle => {
    return circle.id === id
  });
  switch(action.type) {
    case 'ADD_CIRCLE':         
      return [...state, 
        {
          className : colorClassArr[randomRangeNumber(2, 0)],          
          lifetime : randomRangeNumber(10, 5),
          id : ID()
        }
    ];
    case 'REMOVE_CIRCLE':        
      const newState = Object.assign([], state);
      newState.splice(index, 1);
      return newState;    
    case 'REDUCE_LIFE_CIRCLE':  
      const life = state[index].lifetime;
      if(life - action.lifetaken <= 0) {
        action.type = 'REMOVE_CIRCLE';
        return circles(state, action);
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

export {circles, bombs, bins};