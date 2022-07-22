import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import DataTable, { createTheme } from 'react-data-table-component';
import { Inertia } from '@inertiajs/inertia';
import { InertiaProgress } from '@inertiajs/progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import pickBy from 'lodash/pickBy'

const Trips = ({ data, stations }) => {
  const [filters, setFilters] = useState({
    departure: '',
    return: '',
    from: '',
    to: '',
    min_time: '',
    max_time: '',
    min_d: '',
    max_d: '',
  });
  const isBigScreen = useMediaQuery({ query: '(min-width: 600px)' });

  InertiaProgress.init({
    color: 'red',
    showSpinner: true,
  })

  const columns = [
    {
      name: 'Departure',
      selector: row => row.departure,
      format: row =>
        <div class='text-center'>
          <div>{dayjs(row.departure).format('DD.MM.YYYY')}</div>
          <div>{dayjs(row.departure).format('HH:mm')}</div>
        </div>,
      sortable: true,
    },
    {
      name: 'Return',
      selector: row => row.return,
      format: row =>
        <div class='text-center'>
          <div>{dayjs(row.return).format('DD.MM.YYYY')}</div>
          <div>{dayjs(row.return).format('HH:mm')}</div>
        </div>,
      sortable: true,
    },
    {
      name: 'Departure station',
      selector: row => row.departure_station_name,
      sortable: true,
    },
    {
      name: 'Return station',
      selector: row => row.return_station_name,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row.duration,
      format: row => {
        const minutes = (Math.floor(row.duration / 60));
        const seconds = (row.duration - minutes * 60);
        return `${minutes}m ${seconds}s`
      },
      sortable: true,
    },
    {
      name: 'Distance covered',
      selector: row => row.covered_distance,
      format: row => `${parseFloat(row.covered_distance / 1000).toFixed(2)} km`,
      sortable: true,
    },
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

  const onChangePage = page => {
    if (page === 1) return Inertia.visit(data.first_page_url);
    if (page === data.last_page) return Inertia.visit(data.last_page_url);
    if (page < data.current_page) return Inertia.visit(data.prev_page_url);
    if (page > data.current_page) return Inertia.visit(data.next_page_url);
  }

  const handleFilterChange = key => e => {
    setFilters({ ...filters, [key]: e.target.value });
  }

  const handleSubmitFilters = () => {
    Inertia.get('/trips', pickBy(filters), { preserveState: true });
  }

  return (
    <div>
      <div class='p-4' >
        <div class='py-2'>
          <div class='font-bold text-lg'>Date</div>
          <div class='flex'>
            <div class='flex flex-col'>
              <label>Departure</label>
              <input
                type="date"
                value={filters.departure}
                min="2021-05-01"
                max="2021-07-31"
                onChange={handleFilterChange('departure')}
              />
            </div>
            <div class='flex flex-col ml-4'>
              <label>Return</label>
              <input
                type="date"
                value={filters.return}
                min="2021-05-01"
                max="2021-07-31"
                onChange={handleFilterChange('return')}
              />
            </div>
          </div>
        </div>
        <div class='py-2'>
          <div class='font-bold text-lg'>Station</div>
          <div class='flex'>
            <div class='flex flex-col'>
              <label>From</label>
              <select class='w-40' value={filters.from} onChange={handleFilterChange('from')}>
                <option value='' />
                {stations.map(s => (
                  <option key={s.id} value={s.id}>{s.name_en}</option>
                ))}
              </select>
            </div>
            <div class='flex flex-col ml-4'>
              <label>To</label>
              <select class='w-40' value={filters.to} onChange={handleFilterChange('to')}>
                <option value='' />
                {stations.map(s => (
                  <option key={s.id} value={s.id}>{s.name_en}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div class='py-2'>
          <div class='font-bold text-lg'>Duration</div>
          <div class='flex'>
            <div class='flex flex-col'>
              <label>Min</label>
              <input
                class='w-20'
                type="number"
                value={filters.min_time}
                min={0}
                onChange={handleFilterChange('min_time')}
              />
            </div>
            <div class='flex flex-col ml-4'>
              <label>Max</label>
              <input
                class='w-20'
                type="number"
                value={filters.max_time}
                min={0}
                onChange={handleFilterChange('max_time')}
              />
            </div>
          </div>
        </div>
        <div class='py-2'>
          <div class='font-bold text-lg'>Distance</div>
          <div class='flex'>
            <div class='flex flex-col'>
              <label>Min</label>
              <input
                class='w-20'
                type="number"
                value={filters.min_d}
                min={0}
                onChange={handleFilterChange('min_d')}
              />
            </div>
            <div class='flex flex-col ml-4'>
              <label>Max</label>
              <input
                class='w-20'
                type="number"
                value={filters.max_d}
                min={0}
                onChange={handleFilterChange('max_d')}
              />
            </div>
          </div>
        </div>
        <button class='py-2' onClick={handleSubmitFilters}>Submit</button>
      </div>
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

Trips.propTypes = {
  data: PropTypes.object.isRequired,
}

Trips.defaultProps = {};

Trips.displayName = 'Trips';

export default Trips;