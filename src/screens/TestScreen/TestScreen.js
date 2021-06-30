import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const static_items = [
	{
		key: '1',
		content: 'item 1 content',
		exerciseSets: [
			{
				key: '10',
				content: 'SubItem 10 content',
			},
			{
				key: '11',
				content: 'SubItem 11 content',
			},
		],
	},
	{
		key: '2',
		content: 'item 2 content',
		exerciseSets: [
			{
				key: '20',
				content: 'SubItem 20 content',
			},
			{
				key: '21',
				content: 'SubItem 21 content',
			},
		],
	},
];

const ServiceCommandUnit = (props) => {
	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity

	return (
		<Droppable droppableId={props.type} type={`droppableSubItem-${props.type}`}>
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
										{`${item.weight}`}
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
	const [items, setItems] = useState(static_items);
	
	useEffect(() => {
		const exercises = props.exercises;
		if (exercises === undefined) return;
		setItems(exercises);
	}, []);

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		if (result.type === 'droppableItem') {
			const newItems = reorder(items, result.source.index, result.destination.index);
			setItems(newItems);
		} else if (result.type.includes('droppableSubItem')) {
			const parentId = parseInt(result.type.split('-')[1]);
			const itemSubItemMap = items.reduce((acc, item) => {
				acc[item.key] = item.exerciseSets;
				return acc;
			}, {});
			const subItemsForCorrespondingParent = itemSubItemMap[parentId];
			const reorderedSubItems = reorder(
				subItemsForCorrespondingParent,
				result.source.index,
				result.destination.index
			);
			let newItems = [...items];
			newItems = newItems.map((item) => {
				if (item.key === parentId) {
					item.subItems = reorderedSubItems;
				}
				return item;
			});
			setItems(newItems);
		}
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" type="droppableItem">
				{(provided, snapshot) => (
					<div ref={provided.innerRef}>
						{items.map((item, index) => (
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

/* 
	<DragDropContext onDragEnd={this.onDragEnd}>
			<Droppable droppableId="droppable" type="droppableItem">
			  {(provided, snapshot) => (
				<div ref={provided.innerRef}>
				  {this.state.items.map((item, index) => (
					<Draggable key={item.id} draggableId={item.id} index={index}>
					  {(provided, snapshot) => (
						<div>
						  <div ref={provided.innerRef} {...provided.draggableProps}>
							{item.content}
							<span
							  {...provided.dragHandleProps}
							>
							  Drag !
							</span>
							<ServiceCommandUnit
							  subItems={item.subItems}
							  type={item.id}
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
*/