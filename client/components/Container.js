import React from 'react';

import Bomb from './Bomb';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Bin from './Bin';
import { move } from '../utils';

var intervalIDArr = [];

const Container = React.createClass({
    handleDrop(item, binClass) {

        let draggedBomb = this.props.liveBombs.filter(liveBomb => liveBomb.id === item.bomb.id)[0];

        if(draggedBomb && draggedBomb.lifetime > 0) {
            const colorClass = item.bomb.className.substring(6).toLowerCase();
            let score;
            score = binClass.toLowerCase().indexOf(colorClass) > -1 ? 1 : -1;    
            this.props.takeBomb(score);
            this.props.removeBomb(item.id);
        }    
    },
    placeBomb() {
        if(this.props.bombs.bombsPlaced < 120) {
            this.props.placeBomb();
            this.props.addBomb();
        }
        else {
            this.stopInvertals()
        }
    },
    startBombing(time) {
        let interval = 2000;
        let timerId = setInterval(() => {
            this.placeBomb();
        }, interval);
        intervalIDArr.push(timerId);
    },
    shuffleBins(time) {
        let interval = 1000;
        let timerId = setInterval(() => {                
            if(this.props.bins.swapBinTime > 1) {
                this.props.reduceBinSwapCount();
            }
            else {
                this.props.swapBin();
                this.props.resetBinSwapCount();
            }
        }, 1000);
        intervalIDArr.push(timerId);
    },
    stopInvertals() {
        intervalIDArr.forEach(intervalID => clearInterval(intervalID));
    },
    componentDidMount() {
      const gameTime = 120;  
      this.startBombing(gameTime);
      this.shuffleBins(gameTime);
    },
    shouldComponentUpdate(nextProps) {        
        return this.props.liveBombs !== nextProps.liveBombs || this.props.bins !== nextProps.bins || this.props.bombs !== nextProps.bombs;
    },
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        return ( 
            <div>
                <h2>Bombs Planted: {this.props.bombs.bombsPlaced}</h2>
                <h2>Your current Score: {this.props.bombs.score}</h2>
                <div className="grid">                            
                   {this.props.liveBombs.map((bomb, id) => <Bomb key={bomb.id} bomb={bomb} {...this.props} />)}
                </div>
                <div>
                    <div>
                        {this.props.bins.bins.map((clazz, id) => <Bin key={id} className={clazz} onDrop={item => this.handleDrop(item, clazz)} />)}
                    </div>                   
                    <div style={{float: "left", position: "relative"}}>Countdown to swap bins: {this.props.bins.swapBinTime} </div>
                </div>
            </div>
        )
    }
});

export default DragDropContext(HTML5Backend)(Container);