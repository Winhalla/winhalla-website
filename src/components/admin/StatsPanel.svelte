<script>
    import {
        Chart,
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Decimation,
        Filler,
        Legend,
        Title,
        Tooltip
    } from "chart.js";
    import { onMount } from "svelte";
    import { callApi } from "../../utils/api";

    export let otp;
    export let pwd;
    Chart.register(
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Decimation,
        Filler,
        Legend,
        Title,
        Tooltip
    );

    function indexToBgColor(index) {
        if (index === 0 || index === 3 || index === 6) return "#3d72e4";    //primary
        else if (index === 1 || index === 4 || index === 7) return "#3de488";   //green
        else if (index === 2 || index === 5 || index === 8) return "#fc1870";   //legendary
    }


    let stats;
    onMount(async () => {

        stats = await callApi("get", `/feltrom/stats?otp=${otp}&pwd=${pwd}`);
        setTimeout(async () => {
            stats.forEach((e, i) => {
                console.log(e.name);
                let canvas = document.getElementById(e.name).getContext("2d");
                const data = {
                    labels: e.date,
                    datasets: [{
                        label: e.name,
                        backgroundColor: indexToBgColor(i),
                        borderColor: indexToBgColor(i),
                        data: e.data
                    }]
                };
                const config = {
                    type: "line",
                    data,
                    options: {}
                };
                new Chart(
                    canvas,
                    config
                );
            });
        }, 1);
    });

</script>
<style>
    m {
        @apply text-3xl;
    }

    n {
        @apply text-4xl text-accent;
    }
</style>
<div>
    <div class="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {#if stats}
            {#each stats as stat}
                <div>
                    <m>{stat.name}</m>
                    <n>{stat.data[stat.data.length - 1]}</n>
                    <div>
                        <canvas id="{stat.name}" width="500" height="500"></canvas>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>