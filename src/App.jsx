import { useState, useEffect } from 'react';
import GameArea from './GameArea';

const App = () => {
	const [gameOver, setGameOver] = useState(true);
	const [buttonMsg, setButtonMsg] = useState('Start Game');
	const [mainMsg, setMainMsg] = useState('Tapscend');
	const [score, setScore] = useState(0);
	const [inst, setInst] = useState('Keep It Round, Forget the Edges!');
	const [highScore, setHighScore] = useState(0);

	const updateScore = (gotScore) => {
		setScore(gotScore);
	};
	useEffect(() => {
		const localHighScore = localStorage.getItem('highScore');
		setHighScore(localHighScore ? localHighScore : 0);
	}, []);

	useEffect(() => {
		if (score > highScore) {
			localStorage.setItem('highScore', score);
			setHighScore(score);
		}
	}, [highScore, score]);

	useEffect(() => {
		if (!gameOver) {
			setButtonMsg('Restart Game');
			setMainMsg('Game Over!');
			setInst('');
		}
	}, [gameOver]);

	return (
		<div className='h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center flex-col'>
			<h1 className='text-white text-2xl mb-5'>HighScore: {highScore}</h1>
			<div className='bg-gray-800 border-2 border-gray-600 w-[90vw] h-[70vh] md:w-[60vw] md:h-[60vh] rounded-lg shadow-2xl flex flex-col items-center justify-center p-8'>
				{gameOver ? (
					<div className='text-center space-y-10'>
						<h1 className='text-gray-300 text-3xl font-semibold'>{mainMsg}</h1>
						<button
							className=' px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300'
							onClick={() => setGameOver(false)}
						>
							{buttonMsg}
						</button>
						{inst && <p className='text-white text-2xl font-medium'>{inst}</p>}
					</div>
				) : (
					<GameArea onGameOver={setGameOver} updateScore={updateScore} />
				)}
			</div>
			<h1 className='text-white text-2xl mt-6'>Score: {score}</h1>
		</div>
	);
};

export default App;
