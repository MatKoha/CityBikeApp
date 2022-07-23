import React from 'react';
import PropTypes from 'prop-types';
import DataTable, { createTheme } from 'react-data-table-component';
import { Inertia } from '@inertiajs/inertia';
import { InertiaProgress } from '@inertiajs/progress';

const Stations = ({ data }) => {
  InertiaProgress.init({
    color: 'red',
    showSpinner: true,
  })
  const columns = [
    {
      name: 'Station',
      selector: row => row.name_en,
      sortable: true,
    },
    {
      name: 'Capacity',
      selector: row => row.capacity,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.address_fi,
      sortable: true,
    },
    {
      name: 'City',
      selector: row => row.city_fi,
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => `${row.lat} ${row.long}`
    }
  ]

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

  const onChangePage = page => {
    Inertia.visit(`${data.path}/?page=${page}`);
  }
  return (
    <div>
      {!!data && (
        <DataTable
          columns={columns}
          data={data.data}
          theme="solarized"
          pagination
          paginationPerPage={10}
          paginationTotalRows={data.total}
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          paginationDefaultPage={data.current_page}
          onChangePage={onChangePage}
        />
      )}
    </div>
  )
}

Stations.propTypes = {
  data: PropTypes.object.isRequired,
}

Stations.defaultProps = {};

Stations.displayName = 'Stations';

export default Stations;