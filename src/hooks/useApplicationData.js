import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return action.value;
    }
    case SET_APPLICATION_DATA: {
      return action.value;
    }
    case SET_INTERVIEW: {
      return action.value;
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
        );
      }
};

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  

  const setDay = day => dispatch({type: SET_DAY, value: {...state, day}});
  
  const updateSpots = (id, appointments) => {
    const newDays = [...state.days];
    let availableSpots = 0;

    for (const day of newDays) {
      if (day.appointments.includes(id)) {
        for (const appointmentID of day.appointments) {
          if (appointments[appointmentID].interview === null) availableSpots++;
        }
        const index = newDays.indexOf(day);
        newDays[index].spots = availableSpots;
      }
    }  
    
    return newDays;
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            ...state,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }
        });
      });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        const days = updateSpots(id, appointments);
        dispatch({
          type: SET_INTERVIEW,
          value: {
            ...state,
            appointments,
            days
          }
        });
      });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(id, appointments);
        dispatch({
          type: SET_INTERVIEW,
          value: {
            ...state,
            appointments, days
          }
        });
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}