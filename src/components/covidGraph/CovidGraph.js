import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import fixData from './fixData.js';

function CovidGraph(props) {
	const [casesData, setCasesData] = useState([]);
	const [deathsData, setDeathsData] = useState([]);
	const [recoveredData, setRecoveredData] = useState([]);

	let datasets = [
		{
			label: '# of cases',
			backgroundColor: 'hsl(205, 78%, 60%)',
			borderColor: 'hsl(205, 78%, 60%)',
			data: casesData,
		},
		{
			label: '# of recoveries',
			backgroundColor: 'hsl(125, 71%, 66%)',
			borderColor: 'hsl(125, 71%, 66%)',
			data: recoveredData,
		},
		{
			label: '# of deahts',
			backgroundColor: 'hsl(360, 67%, 44%)',
			borderColor: 'hsl(360, 67%, 44%)',
			data: deathsData,
		},
	];

	const options = {
		datasets: {
			line: {
				pointRadius: 0,
			},
		},
		plugins: {
			legend: {
				onClick: () => {
					return;
				},
			},
		},
		scales: {
			xAxes: [
				{
					type: 'time',
					time: {
						format: 'MM/DD/YY',
						tooltipFormat: 'll',
					},
				},
			],
			yAxes: [
				{
					gridLines: {
						display: false,
					},
				},
			],
		},
	};

	useEffect(() => {
		props
			.fetchCountrysHistoricalData()
			.then((fetchedData) => {
				let cases = fixData(fetchedData, 'cases', props.currentCountry);
				let deaths = fixData(fetchedData, 'deaths', props.currentCountry);
				let recovered = fixData(fetchedData, 'recovered', props.currentCountry);

				setRecoveredData(recovered);
				setCasesData(cases);
				setDeathsData(deaths);
			})
			.catch((error) => {
				console.log(error);
				setCasesData(['None']);
			});
	}, [props.currentCountry]);

	if (!props.casesCard) {
		datasets = datasets.filter((data) => data.label !== '# of cases');
	}
	if (!props.recoveriesCard) {
		datasets = datasets.filter((data) => data.label !== '# of recoveries');
	}

	if (!props.deathsCard) {
		datasets = datasets.filter((data) => data.label !== '# of deahts');
	}

	return (
		<div className='graph-container'>
			{datasets.length === 0 ? (
				<h1> No Data Is Being Selected </h1>
			) : setCasesData[0] === 'None' ? (
				<h1> No Historical Data Found </h1>
			) : (
				<Line
					className='line-graph'
					data={{
						datasets: datasets,
					}}
					options={options}
				/>
			)}
		</div>
	);
}

export default CovidGraph;
