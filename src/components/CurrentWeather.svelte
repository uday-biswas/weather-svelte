<script lang="ts">
	import DateData from './DateData.svelte';

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
	}

	// Define the props and types for the component
	export let data: WeatherData;
	export let tempunit: 'C' | 'F';

	const dateParts = data.location.localtime.split(' ');
	const date = new Date(dateParts[0]);
	const time = dateParts[1];
</script>

<div class="mt-4 w-full md:w-[65%] lg:w-[45%] p-4 border-2 bg-sky-700 rounded-lg">
	<!-- weather data for the given location  -->

	<!-- place, date, and time -->
	<div class="flex flex-col">
		<div class="text-cyan-50 font-bold text-2xl">
			{data.location.name}, {data.location.region}, {data.location.country}
		</div>
		<div class="text-cyan-200 flex gap-3 font-semibold">
			<DateData {date} />
			<p>{time}</p>
		</div>
	</div>

	<!-- {/* weather icon, temperature, and condition */} -->
	<div class="flex justify-center mt-4">
		<img class="w-36" src={data.current.condition.icon} alt={data.current.condition.text} />
		<div class="flex flex-col items-center text-cyan-50 gap-3 ml-4">
			<div class="text-4xl font-bold mt-4">
				{#if tempunit === 'C'}
					{data.current.temp_c}°C
				{:else}
					{data.current.temp_f}°F
				{/if}
			</div>
			<p class="text-lg">{data.current.condition.text}</p>
		</div>
	</div>

	<!-- {/* other weather data */} -->
	<div class="flex justify-center mt-4 gap-5 flex-wrap">
		<div class="flex flex-col items-center p-5">
			<p class="text-cyan-50 font-bold">Wind</p>
			<p class="text-cyan-200">{data.current.wind_kph} km/h</p>
		</div>
		<div class="flex flex-col items-center p-5">
			<p class="text-cyan-50 font-bold">Humidity</p>
			<p class="text-cyan-200">{data.current.humidity}%</p>
		</div>
		<div class="flex flex-col items-center p-5">
			<p class="text-cyan-50 font-bold">Feels Like</p>
			<p class="text-cyan-200">
				{#if tempunit === 'C'}
					{data.current.feelslike_c}°C
				{:else}
					{data.current.feelslike_f}°F
				{/if}
			</p>
		</div>
		<div class="flex flex-col items-center p-5">
			<p class="text-cyan-50 font-bold">Pressure</p>
			<p class="text-cyan-200">{data.current.pressure_in} inHg</p>
		</div>
		<div class="flex flex-col items-center p-5">
			<p class="text-cyan-50 font-bold">Wind direction</p>
			<p class="text-cyan-200">{data.current.wind_dir}</p>
		</div>
		<div class="flex flex-col items-center p-5">
			<p class="text-cyan-50 font-bold">Precipitation</p>
			<p class="text-cyan-200">{data.current.precip_in} in</p>
		</div>
	</div>
</div>
