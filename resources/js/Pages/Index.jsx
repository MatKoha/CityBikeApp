import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

const Index = ({ data }) => {

  const columns = [
    {
      name: 'Departure',
      selector: row => row.departure_date,
    },
    {
      name: 'Departure station',
      selector: row => row.departure_station_name,
    },
    {
      name: 'Return',
      selector: row => row.return_date,
    },
    {
      name: 'Return Station',
      selector: row => row.departure_station_name,
    },
    {
      name: 'Duration',
      selector: row => row.duration,
    },
    {
      name: 'Distance covered',
      selector: row => row.covered_distance,
    },
  ];

  createTheme('solarized', {
    text: {
      primary: '#000',
      secondary: '#333',
    },
    background: {
      default: '#fcbd1a',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  console.log(data, 'wow');
  return (
    <div>
      {!!data && (
        <DataTable
          columns={columns}
          data={data.data}
          theme="solarized"
          pagination
          paginationPerPage={20}
          paginationTotalRows={data.total}
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          paginationDefaultPage={data.current_page}
        />
      )}
    </div>
  )
}

export default Index;