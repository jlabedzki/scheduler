import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import "components/Application.scss";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    const promise1 = axios.get('/api/days');
    const promise2 = axios.get('/api/appointments');

    Promise.all([promise1, promise2])
      .then(all => {
        console.log(all);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }))
      });
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          return (
            <Appointment
              key={appointment.id} {...appointment}
            />
          )
        })}
      </section>
    </main>
  );
}
