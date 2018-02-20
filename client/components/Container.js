import React from 'react';

import Bomb from './Bomb';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Bin from './Bin';
import { move } from '../utils';

var intervalIDArr = [];
const Container = React.createClass({
    handleDrop(item, binClass) {
        const colorClass = item.bomb.className.substring(6).toLowerCase();
        if(binClass.toLowerCase().indexOf(colorClass) > -1) {
            console.log("Se suma el score por la bomba de color");            
        }
    },
    placeBomb() {
        if(this.props.bombs.bombsPlaced < 120) {
            this.props.placeBomb();
            this.props.addCircle();
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
        let interval = 3000;
        let timerId = setInterval(() => {
            this.props.swapBin();
        }, interval);
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
        return this.props.circles !== nextProps.circles;
    },
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;        
        return ( 
            <div>Bombs Planted: {this.props.bombs.bombsPlaced}
                <div className="grid">                            
                   {this.props.circles.map((bomb, id) => <Bomb key={bomb.id} bomb={bomb} {...this.props} />)}
                </div>
                <div>
                   {this.props.bins.map((clazz, id) => <Bin key={id} className={clazz} onDrop={item => this.handleDrop(item, clazz)} />)}
                </div>
            </div>
        )
    }
});

export default DragDropContext(HTML5Backend)(Container);