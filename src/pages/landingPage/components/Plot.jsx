import {LineChart, Line, XAxis, ResponsiveContainer, Tooltip} from "recharts";
import React from "react";

/*const Title = styled.h2`
    textAlign: center;
`;*/

function CustomTooltip({active, payload, label}) {
    if(active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="tooltip-label">{label}</p>
            </div>
        );
    }
}

function Plot(props) {
    const {data} = props;

    // We can move these to utils
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    function monthName(date) {
        let monthIndex = date.split("-")[1]-1;
        return monthNames[monthIndex].toUpperCase();
    }
    
    function addMonthsToData(salesData) {
        for(let i=0; i<salesData.length; i++) {
            salesData[i]["month"] = monthName(salesData[i].weekEnding);
        }
        return salesData;
    }

    const newData = addMonthsToData(data.sales);

    return (
        <>
            <h2>Retail Sales</h2>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart width={600} height={400} data={newData}>
                    <Line type="monotone" dataKey="retailSales" stroke="#8884d8" strokeWidth={5}/>
                    <Line type="monotone" dataKey="wholesaleSales" stroke="#3332d2" strokeWidth={5}/>
                    <XAxis xAxisId="0" dataKey="weekEnding" hide={true}/>
                    <XAxis xAxisId="1" dataKey="month" allowDuplicatedCategory={false} interval="preserveStartEnd"/>
                    <Tooltip content={<CustomTooltip />}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default Plot;