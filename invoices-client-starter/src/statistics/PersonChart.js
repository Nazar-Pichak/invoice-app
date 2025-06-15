import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { FcStatistics } from 'react-icons/fc';
import { apiGet } from '../utils/api';

const PersonStatsChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiGet('/api/persons/statistics');
                const processed = response.map(person => ({
                    name: person.personName,
                    revenue: person.revenue,
                    expenses: person.expenses,
                }));
                setData(processed);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        }

        fetchData();
    }, []);

    
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center my-3'>
                <h2>Statistiky Osob</h2>
                <FcStatistics size={30} />
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Načítám...</span>
                    </div>
                </div>
            ) : (

                <div style={{ width: '100%', height: 400 }}>

                    <ResponsiveContainer>
                        <BarChart layout="vertical" data={data} margin={{ top: 20, right: 20, bottom: 30, left: 20 }} barCategoryGap="10%">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tick={{ fontSize: 12, fontWeight: 500 }} />
                            <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fontWeight: 500 }} />
                            <Tooltip formatter={(value) => `${value} Kč`} contentStyle={{ fontSize: '12px', backgroundColor: '#f9f9f9', borderRadius: 8 }} />
                            <Legend />
                            <Bar dataKey="revenue" fill="rgba(109, 179, 125, 0.8)" name="Příjmy">
                                <LabelList dataKey="revenue" position="right" formatter={(v) => `${v} Kč`} style={{ fontSize: '12px', fontWeight: 500 }} />
                            </Bar>
                            <Bar dataKey="expenses" fill="rgba(175, 40, 54, 0.8)" name="Výdaje">
                                <LabelList dataKey="expenses" position="right" formatter={(v) => `${v} Kč`} style={{ fontSize: '12px', fontWeight: 500 }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

        </div>
    );
};

export default PersonStatsChart;
