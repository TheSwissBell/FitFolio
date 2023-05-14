import React, { useState, useEffect, useRef, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import { API_URL } from '../constants'


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = '';

    useEffect(() => fetchCustomers(), [])

    const fetchCustomers = () => {
        fetch(API_URL + 'api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    const gridRef = useRef();


    // Grid
    const [columnDefs] = useState([  // We don't to update it so no need for setColumnDefs
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'streetaddress', width: 170 },
        { field: 'postcode', width: 100 },
        { field: 'city' },
        { field: 'email', width: 180 }

    ]);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        width: 154,
        cellClass: 'ag-left-aligned-cell'
    }))

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: 1000, margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    rowData={customers}
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
