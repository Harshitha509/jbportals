import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { format } from 'date-fns';
import './App.css';

const StockTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockNameFilter, setStockNameFilter] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const isStopLossTriggered = useCallback(
    (row) => row.stopLossTriggerDate !== null && row.stopLossTriggerDate !== '',
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:5000/list/stocks`;

        if (stockNameFilter) {
          url = `http://localhost:5000/list/stocks/filter?stockName=${stockNameFilter}`;
        } else if (selectedMonth && selectedYear) {
          url = `http://localhost:5000/list/stocks/date?selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`;
        }

        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stockNameFilter, selectedMonth, selectedYear]);

  const filteredData = data.filter((row) => {
    const matchesStockName = row.stockName.toLowerCase().includes(stockNameFilter.toLowerCase());

    if (selectedMonth !== '' && selectedYear !== '') {
      const buyDate = new Date(row.buyDate);
      const buyMonth = buyDate.getMonth() + 1; // Adding 1 to match the selected month
      const buyYear = buyDate.getFullYear();

      return matchesStockName && buyMonth === parseInt(selectedMonth, 10) && buyYear === parseInt(selectedYear, 10);
    }

    if (selectedMonth !== '') {
      const buyDate = new Date(row.buyDate);
      const buyMonth = buyDate.getMonth() + 1;
      return matchesStockName && buyMonth === parseInt(selectedMonth, 10);
    }

    if (selectedYear !== '') {
      const buyDate = new Date(row.buyDate);
      const buyYear = buyDate.getFullYear();
      return matchesStockName && buyYear === parseInt(selectedYear, 10);
    }

    return matchesStockName;
  });

  const getRowStyle = (rowInfo) => {
    if (!rowInfo || !rowInfo.original) {
      return {};
    }

    return {
      backgroundColor: isStopLossTriggered(rowInfo.original) ? 'red' : 'white',
    };
  };

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const columns = [
    { Header: 'Stock Name', accessor: 'stockName', sortable: false },
    { Header: 'Buy Price', accessor: 'buyPrice', sortable: false },
    { Header: 'Buy Date', accessor: 'buyDate', Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy'), sortable: false },
    { Header: 'Sell Price', accessor: 'sellPrice', sortable: false },
    { Header: 'Sell Date', accessor: 'sellDate', Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy'), sortable: false },
    { Header: 'Profit', accessor: 'profit', sortable: false },
    { Header: 'Stop Loss Trigger Date', 
      accessor: 'stopLossTriggerDate', 
      Cell: ({ value }) => value ? format(new Date(value), 'dd/MM/yyyy') : '', 
      sortable: false },
    { Header: 'Current Price', accessor: 'current_price', sortable: false },
  ];

  return (
    <div>
      <h1>Stock Tracker</h1>
      <div className='search-box'>
        <input
          type="text"
          value={stockNameFilter}
          onChange={(e) => setStockNameFilter(e.target.value)}
          placeholder="Filter by Stock Name"
        />
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1, 1).toLocaleString('en-US', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {Array.from({ length: new Date().getFullYear() - 2018 }, (_, index) => 2019 + index).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ReactTable
            data={filteredData}
            columns={columns}
            getTrProps={(state, rowInfo) => ({
              style: getRowStyle(rowInfo),
            })}
          />
        )}
      </div>
    </div>
  );
};

export default StockTable;
