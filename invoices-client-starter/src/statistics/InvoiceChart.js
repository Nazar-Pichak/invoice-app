import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import { FcStatistics } from "react-icons/fc";

const InvoiceBarChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStatistics() {
            try {
                const response = await apiGet("/api/invoices/statistics");

                const chartData = [
                    { name: "Letošní suma", value: response.currentYearSum },
                    { name: "Celková suma", value: response.allTimeSum },
                    { name: "Průměr", value: response.allTimeAverage },
                    { name: "Medián", value: response.allTimeMedian },
                    { name: "Minimum", value: response.allTimeMin },
                    { name: "Maximum", value: response.allTimeMax },
                    { name: "Počet faktur", value: response.totalInvoices },
                ];

                setData(chartData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        }

        fetchStatistics();
    }, []);

    return (

        <div>
            <div className='d-flex justify-content-between align-items-center my-3'>
                <h2>Statistiky Faktur</h2>
                <FcStatistics size={30} />
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Načítám...</span>
                    </div>
                </div>
            ) :

                <div style={{ width: "100%", height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 500 }} interval={0} angle={-30} textAnchor="end" />
                            <YAxis tickFormatter={(val) => `${val.toLocaleString()} Kč`} tick={{ fontSize: 12, fontWeight: 500 }} />
                            <Tooltip formatter={(val) => `${val.toLocaleString()} Kč`} itemStyle={{ fontWeight: 500 }} cursor={{ fill: "#f0f0f0" }} />
                            <Bar dataKey="value" fill="#17a2b8" radius={[0, 0, 0, 0]}>
                                <LabelList dataKey="value" position="top" formatter={(val) => `${val.toLocaleString()}`} style={{ fill: "#000", fontSize: 12, fontWeight: 600 }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            }
        </div>

    );
};

export default InvoiceBarChart;
