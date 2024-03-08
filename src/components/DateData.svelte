<script>
	export let date;
	const day = new Date(date).toLocaleString('en-US', { weekday: 'short' });
	const month = new Date(date).toLocaleString('en-US', { month: 'short' });
	const dayNumber = new Date(date).toLocaleString('en-US', { day: 'numeric' });
</script>

<div>
	<!-- {/* returning the date in the format "day, dayNumber month" */} -->
	{`${day}, ${dayNumber} ${month}`}
</div>
