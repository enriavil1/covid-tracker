import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
function CountryPicker({ changeCurrentCountry, currentCountry, countries }) {
	const onCountryChange = async (e) => {
		console.log(e.target);
		changeCurrentCountry(e.target.value);
	};

	return (
		<div className='country-picker-container'>
			<FormControl className='form-control' margin={'normal'} fullWidth='true'>
				<Select
					variant='outlined'
					value={currentCountry}
					onChange={onCountryChange}
					style={{ borderRadius: '2em' }}
				>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					{countries.map((country) => (
						<MenuItem alignItems='center' value={country.value}>
							{country.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default CountryPicker;
