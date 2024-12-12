import { useState, useEffect } from 'react';

const GameArea = ({ onGameOver, updateScore }) => {
	const [shapes, setShapes] = useState([]);
	const [shapeCounter, setShapeCounter] = useState(0);
	const [gameActive, setGameActive] = useState(true);
	const [gameSpeed, setGameSpeed] = useState(1000);
	const [shapeLifeTime, setShapeLifeTime] = useState(1000);
	const [squareFrequency, setSquareFrequency] = useState(0.5);

	useEffect(() => {
		const generateShape = () => {
			if (!gameActive) return;

			const shapeType = Math.random() < squareFrequency ? 'square' : 'circle';
			const x = Math.random() * 90;
			const y = Math.random() * 90;

			const newShape = { type: shapeType, x, y, id: shapeCounter };
			setShapes((prev) => [...prev, newShape]);

			setShapeCounter((prevCounter) => prevCounter + 1);

			setTimeout(() => {
				setShapes((prev) => prev.filter((s) => s.id !== newShape.id));
			}, shapeLifeTime);
		};

		const interval = setInterval(generateShape, gameSpeed);

		return () => clearInterval(interval);
	}, [shapeCounter, gameActive, gameSpeed, shapeLifeTime, squareFrequency]);

	useEffect(() => {
		if (!gameActive) return;

		const difficultyInterval = setInterval(() => {
			setGameSpeed((prev) => Math.max(400, prev - 100));

			setSquareFrequency((prev) => Math.min(0.7, prev + 0.05));

			//setShapeLifeTime((prev) => Math.max(500, prev - 100));
		}, 10000);

		return () => clearInterval(difficultyInterval);
	}, [gameActive]);

	const handleClick = (shape) => {
		if (shape.type === 'square') {
			setGameActive(false);
			onGameOver(true);
			updateScore(0);
		} else {
			updateScore((prevScore) => prevScore + 1);
			setShapes((prev) => prev.filter((s) => s.id !== shape.id));
		}
	};

	return (
		<div className='bg-gray-800 w-full h-full relative overflow-hidden rounded-lg'>
			{shapes.map((shape) => (
				<div
					key={shape.id}
					onClick={() => handleClick(shape)}
					style={{
						position: 'absolute',
						top: `${shape.y}%`,
						left: `${shape.x}%`,
					}}
					className={`transition-all duration-300 ease-in-out transform ${
						shape.type === 'circle'
							? 'w-16 h-16 bg-gray-700 rounded-full cursor-pointer shadow-xl'
							: 'w-16 h-16 bg-indigo-600 rounded-lg cursor-pointer shadow-xl'
					}`}
				></div>
			))}
		</div>
	);
};

export default GameArea;
