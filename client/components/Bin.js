import React from 'react';

import { DropTarget } from 'react-dnd';
import ItemTypes from '../itemTypes';

const Bin = React.createClass({
    render() {  
        const { canDrop, isOver, connectDropTarget } = this.props;
		const isActive = canDrop && isOver;
        const _className = canDrop ? 'hover'.concat(this.props.className) : this.props.className;

		return connectDropTarget(
            <div className={_className}>{isActive ? 'Release to drop Bomb' : 'Drag a Bomb here!'}</div>
        )
    }
});

const bombTarget = {
	drop(props, monitor, component ) {
		const sourceObj = monitor.getItem();
		props.onDrop(sourceObj)
	}
}

export default DropTarget(ItemTypes.BOMB, bombTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Bin);