import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select' ;
import { FormControl, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Addtraining(props){
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState('',[])

    const [training, setTraining] = React.useState({
       date: '', activity: '', duration: '', customer: ''
    })
    const [customers, setCustomers] = React.useState([])
    const [startDate, setStartDate] = React.useState(new Date());

useEffect(() => fetchCustomers(), [])
useEffect(() => handleDateChange(startDate), [startDate])


    const fetchCustomers = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
      
    }

    useEffect(() => setCustomer(customers[0]), [])


    const handleClickOpen = () => {
      setOpen(true);
      setCustomer(customers[0])
      
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
const handleInputChange = (e) => {
    setTraining({...training, [e.target.name]: e.target.value})
    console.log(customer)
}

const addTraining = () => {
    props.saveTraining(training) ;
    handleClose() ;
    
}
 const handleChange = (c) => {
    setCustomer(c.target.value)
    console.log(customer)
    console.log(training)
    setTraining({...training, customer: customer.links[0].href})
    console.log(customer)
    console.log(training)
    
 }
 

 const handleDateChange = (startDate) => {
    
    setTraining({...training, date: startDate.toISOString() })



 }



return (
    <div>
         <Button style = {{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Session
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Session</DialogTitle>
            <DialogContent> 

            <DatePicker selected={startDate} showTimeSelect dateFormat="Pp" onChange={date => setStartDate(date)} />
                <TextField
                    margin="dense"
                    name="duration"
                    value= {training.duration}
                    onChange={e => handleInputChange(e)}
                    label="Duration"
                    fullWidth
                />
                 <TextField
                    margin="dense"
                    name="activity"
                    value= {training.activity}
                    onChange={e => handleInputChange(e)}
                    label="Activity"
                    fullWidth
                />
                <FormControl>
                <InputLabel id="customer" style={{ fontSize: 17 }}>Customer</InputLabel>
                <Select labelId="customer" id= "customers" onChange={(c) => handleChange(c)}>
                  {customers.map((c) =>
                  <MenuItem value={c}>

                    {c.firstname}
                  </MenuItem>
                  
                  )}
                  </Select>
                  </FormControl>  
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

    </div>


)

}
