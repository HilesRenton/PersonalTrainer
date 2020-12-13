import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainingCalendar() {
    const localizer = momentLocalizer(moment)
    const [trainings, setTrainings] = useState([])

    useEffect(() => {fetchdata() }, []);

    const fetchdata = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
        
    }

    

    

    const events= trainings.map((training)=>{
        
        return {
          id: training.id,
          title: training.activity +'/'+ training.customer.firstname +' ' + training.customer.lastname,
          start:new Date(training.date),
          end: new Date(moment(training.date).add(training.duration, 'minutes')),
          allDay: false
        
        }
      })

    return (
        <div>
        <Calendar 
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={['month', 'day', 'week']}
        style={{height: 600}}
        />
        </div>
        )

}