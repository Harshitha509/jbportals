import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { parse,format } from 'date-fns';
import './App.css';

const CompletedTable = () => {
  const [data, setData] = useState([ ]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/completed-orders');
      setData(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    /*{ Header: 'Portfolio Type', accessor: 'portfolio_type_id', sortable: false },*/
    { Header: 'Scrip Name', accessor: 'scrip_name', sortable: false },
    { Header: 'Buy Price', accessor: 'buy_price', sortable: false },
    { Header: 'Buy Quantity', accessor: 'buy_qty', sortable: false },
    {
      Header: 'Buy Time',accessor:'buy_time',
      Cell: ({ value }) => {
        console.log('Time value from API:', value);
      
        try {
          const parsedTime = parse(value, 'HH:mm', new Date());
          return isNaN(parsedTime.getTime())
            ? 'Invalid Time'
            : format(parsedTime, 'HH:mm:ss');
        } catch (error) {
          console.error('Error parsing time:', error);
          return 'Invalid Time';
        }
      },
      sortable: false,
    },
    { Header: 'Sell Price', accessor: 'sell_price', sortable: false },
    { Header: 'Sell Quantity', accessor: 'sell_qty', sortable: false },
    {
      Header: 'Sell Time',
      accessor: 'sell_time',
      Cell: ({ value }) => {
        console.log('Time value from API:', value);
      
        try {
          const parsedTime = parse(value, 'HH:mm', new Date());
          return isNaN(parsedTime.getTime())
            ? 'Invalid Time'
            : format(parsedTime, 'HH:mm:ss');
        } catch (error) {
          console.error('Error parsing time:', error);
          return 'Invalid Time';
        }
      },
      sortable: false,
    },
    {
      Header: 'Profit',
      accessor: 'profit',
      Cell: ({ value }) => (value ? `${value}` : ' '),
      sortable: false,
    },
    {
      Header: 'Profit %',
      accessor: 'profit_percentage',
      Cell: ({ value }) => (value ? `${value}%` : ' '),
      sortable: false,
    },
  ];

  

  return (
    <div>
      <h1>Completed Orders</h1>
      <input
        className='date-input'
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <h2>YUVI (High Risk High Profit)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReactTable
        data={data}
        columns={columns}
        getTrProps={(state, rowInfo) => ({
          style: {
            backgroundColor: rowInfo && rowInfo.original.is_stoploss === 1 ? 'red' : 'white',
          },
        })
      }
        />
      )}
    </div>
  );
};

export default CompletedTable;
