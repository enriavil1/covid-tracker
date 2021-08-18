import React, { useEffect, useState } from 'react';
import Card from './Card.js';

function CovidInformation(props) {
	const [data, setData] = useState('');

	useEffect(() => {
		if (props.country === 'worldwide') {
			props.fetchData().then((fetchedData) => setData(fetchedData));
		} else {
			props
				.fetchData(props.country)
				.then((fetchedData) => setData(fetchedData));
		}
	}, [props.country]);

	if (!data) {
		return 'Loading';
	}

	return (
		<div className='covid-information-section'>
			<div className='card-container'>
				<Card
					type={'Cases'}
					state={props.casesCard}
					setState={props.toggleCasesCard}
					totalData={data.cases}
					todaysData={data.todayCases}
				/>
				<Card
					type={'Recoveries'}
					state={props.recoveriesCard}
					setState={props.toggleRecoveriesCard}
					totalData={data.recovered}
					todaysData={data.todayRecovered}
				/>
				<Card
					type={'Deaths'}
					state={props.deathsCard}
					setState={props.toggleDeathsCard}
					totalData={data.deaths}
					todaysData={data.todayDeaths}
				/>
			</div>
		</div>
	);
}

export default CovidInformation;
