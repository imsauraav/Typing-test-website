
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useTheme } from '../Context/ThemeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({ graphData, type }) => {
    const { theme } = useTheme();

    const data = {
        labels: graphData.map((i) =>
            type === 'date' ? i[0].toDate().toLocaleDateString() : i[0] + 1
        ),
        datasets: [
            {
                label: 'WPM',
                data: graphData.map((i) => i[1]),
                borderColor: theme.title,
                backgroundColor: `${theme.title}33`, 
                tension: 0.4, 
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: theme.background,
                pointBorderColor: theme.title,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: theme.title,
                    font: { size: 14 },
                },
            },
            tooltip: {
                backgroundColor: theme.background,
                titleColor: theme.title,
                bodyColor: theme.title,
                borderColor: theme.title,
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: theme.title,
                    font: { size: 12 },
                },
                grid: {
                    color: `${theme.title}22`, 
                },
            },
            y: {
                ticks: {
                    color: theme.title,
                    font: { size: 12 },
                },
                grid: {
                    color: `${theme.title}22`,
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '350px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default Graph;
