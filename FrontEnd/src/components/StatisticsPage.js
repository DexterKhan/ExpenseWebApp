import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getExpensesPerCategory } from '../services/statistics';
import { useEffect, useState } from "react";



Chart.register(ArcElement, Tooltip, Legend);



const StatisticsPage = () => {
    const dispatch = useDispatch();
    const expenseAmountPerCategory = useSelector(state => state.statisticsSlice.expenseAmountPerCategory);
    const [doughnut, setDoughnut] = useState({
        labels: [],
        data: []
    });

    useEffect(() => {
        setDoughnut({
            labels: expenseAmountPerCategory.map(x => x.key),
            data: expenseAmountPerCategory.map(x => x.value),
        });
    }, [expenseAmountPerCategory]);

    useEffect(() => {
        getExpensesPerCategory(dispatch);
    }, []);


    const data = {
        labels: doughnut.labels,
        datasets: [{
            data: doughnut.data,
            backgroundColor: [
                '#007bff', // blue
                '#FF0000', // red
                '#FFD700', // yellow
                '#28a745', // green
                '#FF00FF', //violet
                '#ff9900', //orange
                '#00FFFF', //aqua marine
                '#d69ae5', //red violet
                '#FF8F66', //orange red
                '#00FF00', // lime
            ]

        }]
    }

    return <div hidden={!expenseAmountPerCategory || !expenseAmountPerCategory.length}
        style={{ maxWidth: '35rem', maxHeight: '35rem', margin: 'auto', textAlign: 'center' }}>
        <h4 style={{ marginTop: '10px' }}>Expenses per Category</h4>
        <Doughnut data={data} />
    </div>
};

export default StatisticsPage;