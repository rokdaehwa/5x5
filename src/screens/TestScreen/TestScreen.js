/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';

const seperator = 'seperator';

const ServiceCommandUnit = (props) => {
	return (
		<Droppable droppableId={props.type} type={`droppableSubItem${seperator}${props.type}`}>
			{(provided, snapshot) => (
				<div ref={provided.innerRef}>
					{props.subItems.map((item, index) => (
						<Draggable key={item.key} draggableId={item.key} index={index}>
							{(provided, snapshot) => (
								<div style={{ display: 'flex' }}>
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										{`${item.weight}kg ${item.reps}${item.repsUnit}`}
									</div>
									{provided.placeholder}
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

function TestScreen(props) {
	const { exercises, reorderExercise, reorderExerciseSet } = props;

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		if (result.type === 'droppableItem') {
			reorderExercise(result.source.index, result.destination.index);
		} else if (result.type.includes('droppableSubItem')) {
			const parentKey = result.type.split(seperator)[1];
			reorderExerciseSet(parentKey, result.source.index, result.destination.index);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Link to="/routine">
				<button>home</button>
			</Link>
			<Droppable droppableId="droppable" type="droppableItem">
				{(provided, snapshot) => (
					<div ref={provided.innerRef}>
						{exercises.map((item, index) => (
							<Draggable key={item.key} draggableId={item.key} index={index}>
								{(provided, snapshot) => (
									<div>
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											{item.exerciseName}
											<ServiceCommandUnit
												subItems={item.exerciseSets}
												type={item.key}
											/>
										</div>
										{provided.placeholder}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default TestScreen;