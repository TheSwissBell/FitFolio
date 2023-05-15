import React, { useState, useEffect, useRef, useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

import { API_URL } from '../constants'


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = '';



    const fetchCustomers = () => {
        fetch(API_URL + 'api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    useEffect(() => fetchCustomers(), [])

    const gridRef = useRef();


  
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        width: 154,
        cellClass: 'ag-left-aligned-cell'
    }))


    const addCustomer = (customer) => {
        fetch(API_URL + 'api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)  // Cast JavaScript object into JSON stream
        })
            .then(response => {
                if (response.ok)
                    fetchCustomers();
                else
                    alert('Oups! Something went wrong in addition of a new customer: ' + response.statusText)
            })
    }

    const updateCustomer = (editedCustomer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(editedCustomer)
        })
            .then(response => {
                if (response.ok)
                    fetchCustomers();
                else
                    alert('Oups! Something went wrong in the edition of the customer: ' + response.statusText)
            })
    }

    const deleteButtonRender = params => {
        return (
            <>
                <Button
                    size='small'
                    color='error'
                    onClick={() => deleteCustomer(params)}
                >
                    Delete
                </Button>
            </>

        )
    }

    const deleteCustomer = (params) => {
        if (window.confirm(`Are you sure you want to delete this customer (${params.data.firstname} ${params.data.lastname}) ?`)) {
            alert(`${params.data.firstname} ${params.data.lastname} deleted!!`);
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        setSnackbarMsg('Customer deleted successfully');
                        setOpen(true);
                        fetchCustomers();
                    }
                    else {
                        alert('Something went wrong in the deletion of the customer');
                    };
                }).catch(err => console.error(err))
        }
    };

      // Grid
      const [columnDefs] = useState([  // We don't to update it so no need for setColumnDefs
      { field: 'firstname' },
      { field: 'lastname' },
      { field: 'streetaddress', width: 170 },
      { field: 'postcode', width: 120 },
      { field: 'city' },
      { field: 'email', width: 180 },
      {
          cellRenderer: params => <EditCustomer params={params.data} updateCustomer={updateCustomer} />,
          width: 128
      },
      { field: '_links.self.href', headerName: 'Delete', cellRenderer: deleteButtonRender, sortable: false, filter: false, width: 120 },


  ]);

    return (
        <div>
            <div className="ag-theme-material" style={{ height: 600, width: 1000, margin: 'auto' }}>
                <AddCustomer addCustomer={addCustomer} />
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
