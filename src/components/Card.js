import React, { useEffect } from 'react';
import CountUp from 'react-countup';

function Card({ type, totalData, todaysData, state, setState }) {
	let color = '';
	let boxShadow = '0px 5px 15px ';

	switch (type) {
		case 'Deaths':
			color = 'hsl(360, 67%, 44%)';
			boxShadow += color;
			break;

		case 'Cases':
			color = 'hsl(205, 78%, 60%)';
			boxShadow += color;
			break;

		case 'Recoveries':
			color = 'hsl(125, 71%, 66%)';
			boxShadow += color;
			break;
	}

	return (
		<div className='card' onClick={() => setState()}>
			<div
				className='center-container'
				style={
					state
						? { boxShadow: `${boxShadow}`, borderRadius: '2em' }
						: { borderRadius: '2em' }
				}
			>
				<h1 className='type-headline'>{type}</h1>
				<div className='underline' style={{ background: `${color}` }}></div>
				<div className='card-data'>
					<h2>Total {type} From </h2>
					<h2>Covid-19:</h2>
					<h2 id='total-data'>
						<CountUp start={0} end={totalData} duration={3} separator={','} />
					</h2>
					<h3>
						Today's {type}:{' '}
						<CountUp
							start={0}
							end={todaysData}
							duration={1.5}
							separator={','}
						/>
					</h3>
				</div>
			</div>
		</div>
	);
}

export default Card;
