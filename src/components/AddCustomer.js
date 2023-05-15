import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer({ addCustomer }) {   
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState(
        {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        }
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        addCustomer(customer);
        setOpen(false);
        setCustomer(
            {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                streetaddress: '',
                postcode: '',
                city: ''
            }
        )
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a new customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={customer.firstname}
                        onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                        margin="dense"
                        label="First name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        value={customer.lastname}
                        onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                        margin="dense"
                        label="Last name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        value={customer.phone}
                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        value={customer.streetaddress}
                        onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                        margin="dense"
                        label="Street address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        value={customer.postcode}
                        onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                        margin="dense"
                        label="Postcode"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        value={customer.city}
                        onChange={e => setCustomer({ ...customer, city: e.target.value })}
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}