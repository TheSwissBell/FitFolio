import React, { useState, useEffect, useRef, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';

import { API_URL } from '../constants'


export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = '';

    useEffect(() => fetchTrainings(), [])

    const fetchTrainings = () => {
        fetch(API_URL + 'gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
    }

    const gridRef = useRef();


    // Grid
    const [columnDefs] = useState([  // We don't to update it so no need for setColumnDefs
        { field: 'date', width: 220, cellRenderer: params => dayjs(params.value).format('DD.MM.YYYY HH:mm')},
        { field: 'duration' },
        { field: 'activity' },
        {
            field: 'customer',
            cellRenderer: params => params.value.firstname + ' ' + params.value.lastname
        },

    ]);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        width: 130,
        cellClass: 'ag-left-aligned-cell'
    }))

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: 1000, margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    rowData={trainings}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
            </div>
            <Snackbar
                open={open}
                message={snackbarMsg}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </div>
    );
}
