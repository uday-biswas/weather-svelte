<script lang="ts">
	import CurrentWeather from '../components/CurrentWeather.svelte';
	import WeatherForecast from '../components/WeatherForecast.svelte';
	import { DoubleBounce } from 'svelte-loading-spinners';
	import axios from 'axios';
	import { onMount } from 'svelte';

	interface WeatherData {
		location: {
			name: string;
			region: string;
			country: string;
			localtime: string;
		};
		current: {
			condition: {
				icon: string;
				text: string;
			};
			temp_c: number;
			temp_f: number;
			wind_kph: number;
			humidity: number;
			feelslike_f: number;
			feelslike_c: number;
			pressure_in: number;
			wind_dir: string;
			precip_in: number;
		};
		forecast: {
			forecastday: {
				date: string;
				day: {
					avgtemp_c: number;
					avgtemp_f: number;
					condition: {
						text: string;
						icon: string;
					};
				};
			}[];
		};
	}

	let location = '';
	let weatherData: WeatherData | null = null;
	let loading = false;
	let error: string | null = null;
	let tempunit: 'C' | 'F' = 'C';

	// function for getting the weather for current location
	const currentlocation = async () => {
		loading = true;
		try {
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					const { latitude, longitude } = position.coords;
					console.log('latitude and longitude', latitude, longitude);
					console.log(
						`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${latitude},${longitude}&days=6&aqi=no&alerts=no`
					);
					const response = await axios.get(
						`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${latitude},${longitude}&days=6&aqi=no&alerts=no`
					);
					console.log(response);
					if (response.status !== 200) throw new Error('Error fetching weather data');
					const data = await response.data;
					weatherData = data;
					loading = false;
				});
			} else {
				error = 'Geolocation is not supported by your browser. Please enter a location manually.';
				loading = false;
			}
		} catch (error) {
			console.error('Error fetching weather data:', error);
			error = 'Error fetching weather data. Please try again later.';
			loading = false;
		}
	};

	// using useEffect to get the current location and favorites from local storage when the component mounts
	onMount(() => {
		currentlocation();
	});

	// function to get weather data for a given location
	const handleSearch = async (location: string) => {
		loading = true;
		try {
			error = null;
			const response = await axios.get(
				`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}&days=6&aqi=no&alerts=no`
			);
			console.log('response', response);

			if (response.status !== 200) throw new Error('Error fetching weather data');
			const data = await response.data;
			weatherData = data;
			loading = false;
		} catch (err: any) {
			// setError(error.message);
			error = err.message;
			console.error('Error fetching weather data:', error);
			loading = false;
		}
	};
</script>

<div
	class="bg-gray-500 bg-opacity-20 min-h-screen backdrop-blur-md flex flex-col justify-center items-center px-4 py-8"
>
	<h1 class="text-3xl w-full text-center font-bold mb-4">Welcome to the Weather App !!</h1>
	<p class="mb-4 w-full font-semibold text-center">
		Enter a location to get the current weather and 5-day forecast
	</p>
	<div class="flex">
		<!-- {/* taking input for location to search for weather data */} -->
		<input
			class="border border-gray-300 rounded py-2 px-4 mr-2 w-full"
			type="text"
			placeholder="Enter location"
			bind:value={location}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleSearch(location);
				}
			}}
		/>

		<!-- {/* button to search for weather data */} -->
		<button
			class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
			on:click={() => handleSearch(location)}
			disabled={!location.trim()}
		>
			Search
		</button>
	</div>

	<div class="flex gap-3">
		<!-- {/* button to switch between Celcius and Fareinheit for temperature units */} -->
		{#if tempunit === 'C'}
			<button
				class="hover:bg-fuchsia-600 bg-fuchsia-500 text-white font-bold py-2 px-4 rounded mt-4"
				on:click={() => (tempunit = 'F')}
			>
				Fareinheit
			</button>
		{:else}
			<button
				class="hover:bg-fuchsia-600 bg-fuchsia-500 text-white font-bold py-2 px-4 rounded mt-4"
				on:click={() => (tempunit = 'C')}
			>
				Celcius
			</button>
		{/if}

		<!-- {/* button to get weather data for current location */} -->
		<button
			class="hover:bg-fuchsia-600 bg-fuchsia-500 text-white font-bold py-2 px-4 rounded mt-4"
			on:click={() => currentlocation()}
		>
			Current location
		</button>
	</div>

	<!-- {/* loading indicator while fetching data */} -->
	{#if loading}
		<div class="flex justify-center items-center mt-4">
			<DoubleBounce size="60" color="blue" unit="px" duration="2s" />
		</div>
	{/if}

	<!-- {/* showing error message if any */} -->
	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}

	<!-- {/* showing current weather and 5-day forecast */} -->
	{#if weatherData}
		<CurrentWeather data={weatherData} {tempunit} />
		<WeatherForecast data={weatherData.forecast.forecastday.slice(1)} {tempunit} />
	{/if}

	<!-- {/* footer */} -->
	<footer class="text-center py-4 text-gray-600 w-full min-h-2 absolute bottom-0 bg-gray-400 mt-8">
		<p>Created by Uday Biswas</p>
	</footer>
</div>
