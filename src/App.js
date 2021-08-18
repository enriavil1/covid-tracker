import './App.css';
import CovidInformation from './components/CovidInformation';
import CovidGraph from './components/covidGraph/CovidGraph';
import CountryPicker from './components/CountryPicker';
import { useState, useEffect } from 'react';

function App() {
	const API_URL = 'https://disease.sh/v3/covid-19/';
	const [currentCountry, setCurrentCountry] = useState('worldwide');
	const [countries, setCountries] = useState([]);
	const [casesCard, setCasesCard] = useState(true);
	const [deathsCard, setDeathCard] = useState(true);
	const [recoveriesCard, setRecoveriesCard] = useState(true);

	useEffect(() => {
		fetchCountries();
	}, []);

	const fetchData = async (country) => {
		//if no country is picked it'll default to using the worldwide data
		const response = await fetch(
			country ? `${API_URL}countries/${country}` : API_URL + 'all',
		);
		const responseJson = await response.json();

		return responseJson;
	};

	const fetchCountries = async () => {
		const countriesResponse = await fetchData(' ');
		const countriesList = countriesResponse.map((country) => ({
			name: country.country,
			value: country.countryInfo.iso2,
		}));

		setCountries(countriesList);

		return countriesResponse;
	};

	const fetchCountrysHistoricalData = async () => {
		const response = await fetch(
			currentCountry != 'worldwide'
				? `${API_URL}historical/${currentCountry}?lastdays=90`
				: API_URL + 'historical/all?lastdays=90',
		);
		const responseJson = await response.json();

		return responseJson;
	};

	const changeCurrentCountry = (newCurrentCountry) => {
		setCurrentCountry(newCurrentCountry);
	};

	const toggleCasesCard = () => {
		setCasesCard(!casesCard);
	};

	const toggleDeathsCard = () => {
		setDeathCard(!deathsCard);
	};

	const toggleRecoveriesCard = () => {
		setRecoveriesCard(!recoveriesCard);
	};

	return (
		<div className='App'>
			<CountryPicker
				changeCurrentCountry={changeCurrentCountry}
				currentCountry={currentCountry}
				countries={countries}
			/>
			<div className='app-child'>
				<CovidInformation
					toggleCasesCard={toggleCasesCard}
					toggleDeathsCard={toggleDeathsCard}
					toggleRecoveriesCard={toggleRecoveriesCard}
					casesCard={casesCard}
					deathsCard={deathsCard}
					recoveriesCard={recoveriesCard}
					fetchData={fetchData}
					country={currentCountry}
				/>
				<CovidGraph
					casesCard={casesCard}
					deathsCard={deathsCard}
					recoveriesCard={recoveriesCard}
					fetchCountrysHistoricalData={fetchCountrysHistoricalData}
					currentCountry={currentCountry}
				/>
			</div>
		</div>
	);
}

export default App;
