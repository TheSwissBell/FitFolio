import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { API_CUSTOMERID_TRAINING } from '../constants';
import { MenuItem, InputLabel, FormControl, Select } from '@mui/material';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: null,
        duration: '',
        activity: '',
        customer: API_CUSTOMERID_TRAINING + '3664'
    });

    const handleClickOpen = () => {
        setTraining({ ...training, customer: props.data.links[0].href });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setTraining(currTraining => ({ ...currTraining, date: training.date.toISOString() }));
        props.addTraining(training);
        setOpen(false);
        setTraining({
            date: new Date(),
            duration: '',
            activity: '',
            customer: ''
        });
    };



    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adding a new training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            date={training.date}
                            onChange={(newValue) => {
                                setTraining({ ...training, date: newValue });
                            }}
                            format="DD.MM.YYYY"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}