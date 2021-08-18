const fixData = (data, caseType, currentCountry) => {
	let dataPoints = [];
	let lastDataPoint;

	switch (caseType) {
		case 'cases':
			if (currentCountry === 'worldwide') {
				for (let date in data.cases) {
					if (lastDataPoint) {
						let dataPoint = {
							x: date,
							y:
								data[caseType][date] > 0
									? data[caseType][date] - lastDataPoint
									: 0,
						};
						dataPoints.push(dataPoint);
					}
					lastDataPoint = data[caseType][date];
				}
				return dataPoints;
			}

			for (let date in data.timeline.cases) {
				if (lastDataPoint) {
					let dataPoint = {
						x: date,
						y:
							data.timeline[caseType][date] > 0
								? data.timeline[caseType][date] - lastDataPoint
								: 0,
					};
					dataPoints.push(dataPoint);
				}
				lastDataPoint = data.timeline[caseType][date];
			}
			return dataPoints;

		case 'deaths':
			if (currentCountry === 'worldwide') {
				for (let date in data.deaths) {
					if (lastDataPoint) {
						let dataPoint = {
							x: date,
							y:
								data[caseType][date] > 0
									? data[caseType][date] - lastDataPoint
									: 0,
						};
						dataPoints.push(dataPoint);
					}
					lastDataPoint = data[caseType][date];
				}
				return dataPoints;
			}

			for (let date in data.timeline.deaths) {
				if (lastDataPoint) {
					let dataPoint = {
						x: date,
						y:
							data.timeline[caseType][date] > 0
								? data.timeline[caseType][date] - lastDataPoint
								: 0,
					};
					dataPoints.push(dataPoint);
				}
				lastDataPoint = data.timeline[caseType][date];
			}
			return dataPoints;

		case 'recovered':
			if (currentCountry === 'worldwide') {
				for (let date in data.recovered) {
					if (lastDataPoint) {
						let dataPoint = {
							x: date,
							y:
								data[caseType][date] > 0
									? data[caseType][date] - lastDataPoint
									: 0,
						};
						dataPoints.push(dataPoint);
					}
					lastDataPoint = data[caseType][date];
				}
				return dataPoints;
			}

			for (let date in data.timeline.recovered) {
				if (lastDataPoint) {
					let dataPoint = {
						x: date,
						y:
							data.timeline[caseType][date] > 0
								? data.timeline[caseType][date] - lastDataPoint
								: 0,
					};
					dataPoints.push(dataPoint);
				}
				lastDataPoint = data.timeline[caseType][date];
			}
			return dataPoints;
	}
};

export default fixData;
