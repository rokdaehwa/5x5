/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	console.log('reorder', list, startIndex, endIndex);
	let result = list;
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250,
});

function TestScreen(props) {
		
	const {exercises, setExercises} = props;
	
	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const newItems = reorder(exercises, result.source.index, result.destination.index);

		setExercises(newItems);
	};
	
	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{exercises.map((item, index) => (
							<Draggable key={item.key} draggableId={`${item.key}`} index={index}>
								{(provided, snapshot) => (
									
									<Card
										elevation={snapshot.isDragging ? 4: 0}
										ref={provided.innerRef}
										{...provided.draggableProps}
										
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
										>
									
									{item.exerciseName}
										<span {...provided.dragHandleProps} >
										<DragIndicatorIcon />
										</span>
										
									</Card>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Link to='/routine'><button>Check Routine</button></Link>
		</DragDropContext>
	);
}

export default TestScreen;