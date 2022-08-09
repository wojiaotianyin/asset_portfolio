import React from "react";
import Plot from 'react-plotly.js';
const Graph = (data) => {
    console.log("react側");
    console.log(data);

    return (
        <div>
            <Plot
                data={[ // 線グラフと棒グラフを両方表示するのであればブラケットを一つ増やす
                    { type: 'pie', values: [19, 26, 55],
                    labels: ['Residential', 'Non-Residential', 'Utility'], },
                ]}
                layout={{ width: 500, height: 500, title: 'A Fancy Plot' }}
            />
        </div>
    );
};

export default Graph;