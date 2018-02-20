import React from 'react';
import ItemTypes from '../itemTypes';
import { DragSource } from 'react-dnd';


const Bomb = React.createClass({  

    componentDidMount() {
        let props = this.props;
        let bomb = props.bomb;
        //let timeout = bomb.lifetime * 1000;
        this.timerId = setInterval(() => {
            props.reduceLife(bomb.id, 1);
        }, 1000);
    },
    componentWillUnmount() {
        console.log("elimino ID: ");
        console.log(this.props);
        clearInterval(this.timerId);
    },
    render() {
        let props = this.props;
        let bomb = props.bomb;
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={{
                opacity: isDragging ? 0.8 : 1,
                fontSize: 15,
                fontWeight: 'bold',
                cursor: 'move'}}>
                <div className={bomb.className}>
                    <div className="innerCircle">{bomb.lifetime}</div>
                </div>    
            </div>
        )        
    }
});

const cardSource = {
	beginDrag(props) {        
		return {			
			/*index: props.index,
            listId: props.listId,*/            
			bomb: props.bomb
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();	

        if (dropResult) {
		}
	}
};

export default 	DragSource(ItemTypes.CIRCLE, cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))(Bomb);