import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {
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
        setCustomer({
            firstname: props.params.firstname,
            lastname: props.params.lastname,
            email: props.params.email,
            phone: props.params.phone,
            streetaddress: props.params.streetaddress,
            postcode: props.params.postcode,
            city: props.params.city
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        props.updateCustomer(customer, props.params.links[0].href);
        handleClose();
    };


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit an existing customer</DialogTitle>
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
                    <Button onClick={handleEdit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}