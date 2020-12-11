import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table' ;
import 'react-table/react-table.css';
import Moment from 'moment';
export default function Traininglist() {
        const [trainings, setTrainings] = useState([]) ;

        useEffect(() => fetchData() , []);

        const fetchData = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
            console.log(trainings)
        }

        const columns =[
            {
            id: 'date',
            Header: 'Date',
            
            accessor: d => {
                return Moment.utc(d.date)
                
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
                
            }
           
        ]

        
        return (
            <div>
                <ReactTable filterable={true}  data={trainings} columns={columns}/>
                
            </div>


        );
}