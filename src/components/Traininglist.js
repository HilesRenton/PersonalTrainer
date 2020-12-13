import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table' ;
import 'react-table/react-table.css';
import Moment from 'moment';
import Addtraining from './Addtraining';
import Button from '@material-ui/core/Button';

export default function Traininglist() {
        const [trainings, setTrainings] = useState([]) ;
      
        useEffect(() => fetchData() , []);

        const fetchData = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
           
        }

        const saveTraining = (training) => {
            fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)   
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
        const deleteTraining = (id) => {
            console.log(id)
            if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/'+ id, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            }
            
        }

        const columns =[
            {
            id: 'date',
            Header: 'Date',
            
            accessor: d => {
                return Moment(d.date)
                
                .format("DD/MM/YYYY hh:mm a")
            }
            
            
            },
            {
                Header: 'Duration(Minutes)',
                accessor: 'duration'
            },
            {
                Header: 'Activity',
                accessor: 'activity'
            },
            {
                Header: 'Customer',
                accessor: 'customer',
                Cell: row => {
                    return (
                        <div>
                          <span className="class-for-firstname">{row.row.customer.firstname} </span> 
                          <span className="class-for-lastname">{row.row.customer.lastname}</span>
                        </div>
                    )

                }
                
            },
            {
                sortable: false,
                filterable: false,
                width: 100,
                accessor:'id',
                Cell: row => <Button onClick={()=> deleteTraining(row.value)} color = "secondary" size = "small" >Delete</Button>
    
            }
           
        ]

        
        return (
            <div>
                <Addtraining saveTraining={saveTraining}/>
                <ReactTable filterable={true}  data={trainings} columns={columns}/>
                
            </div>


        );
}