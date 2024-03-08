<script lang="ts">
	import DateData from './DateData.svelte';

	interface DayData {
		date: string;
		day: {
			condition: {
				icon: string;
				text: string;
			};
			avgtemp_c: number;
			avgtemp_f: number;
		};
	}

	export let data: DayData[];
	export let tempunit: 'C' | 'F';
</script>

<div class="my-8 w-full p-4">
	<div class="text-gray-700 text-center m-4 font-bold text-3xl">5-Day Weather Forecast</div>
	<div class="flex flex-wrap justify-center gap-6">
		{#each data as day, index}
			<div class="bg-gray-300 text-center flex flex-col min-w-44 p-4 border rounded-lg">
				<!-- date, weather icon, condition, and temperature -->
				<DateData date={day.date} />
				<img src={day.day.condition.icon} alt={day.day.condition.text} />
				<div class="font-semibold text-gray-600">{day.day.condition.text}</div>
				<div class="font-bold text-xl text-gray-500">
					{#if tempunit === 'C'}
						{day.day.avgtemp_c}°C
					{:else}
						{day.day.avgtemp_f}°F
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
