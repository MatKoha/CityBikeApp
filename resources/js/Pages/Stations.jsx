import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import DataTable, { createTheme } from 'react-data-table-component';
import { Inertia } from '@inertiajs/inertia';
import { InertiaProgress } from '@inertiajs/progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';

const Stations = ({ data }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 600px)' });
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

  const smallScreenColumns = [
    {
      cell: row => {
        const minutes = (Math.floor(row.duration / 60));
        const seconds = (row.duration - minutes * 60);
        return (
          <div class='w-full flex items-stretch py-1 text-lg'>
            <div class='flex flex-col justify-between text-center '>
              <div class='font-bold text-green-900 ml-1'>{dayjs(row.departure).format('HH:mm')}</div>
              <div class='font-bold text-rose-900 ml-1'>{dayjs(row.return).format('HH:mm')}</div>
            </div>
            <div class='flex flex-col justify-between px-1'>
              <FontAwesomeIcon icon="location-dot" class="w-7 h-7 mx-2 text-green-500 z-10" />
              <div class="bg-white w-[2px] left-[93px] top-5 h-[calc(100%-50px)] absolute" />
              <FontAwesomeIcon icon="location-dot" class="w-7 h-7 mx-2 text-rose-500 z-10" />
            </div>
            <div class='flex-1'>
              <div class='font-bold text-green-900 uppercase'>{row.departure_station_name}</div>
              <div class='flex items-center justify-between'>
                <div class='font-bold '>Date</div>
                {dayjs(row.departure).isSame(row.return, 'd')
                  ? dayjs(row.departure).format('D.M.YYYY')
                  : `${dayjs(row.departure).format('D.M.')} - ${dayjs(row.return).format('D.M.YYYY')}`
                }
              </div>
              <div class='flex items-center justify-between'>
                <div class='font-bold '>Distance</div>
                {`${parseFloat(row.covered_distance / 1000).toFixed(2)} km`}
              </div>
              <div class='flex items-center justify-between'>
                <div class='font-bold '>Duration</div>
                {`${minutes}min ${seconds}s`}
              </div>
              <div class='font-bold text-rose-900 uppercase'>{row.return_station_name}</div>
            </div>
          </div>
        )
      }
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

  const onChangePage = page => {
    Inertia.visit(`${data.path}/?page=${page}`);
  }
  return (
    <div>
      {!!data && (
        <DataTable
          columns={isBigScreen ? columns : smallScreenColumns}
          data={data.data}
          theme="solarized"
          pagination
          paginationPerPage={10}
          paginationTotalRows={data.total}
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          paginationDefaultPage={data.current_page}
          onChangePage={onChangePage}
          noTableHead={!isBigScreen}
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