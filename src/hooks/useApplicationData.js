import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }
        });
      });
      
    //webSocket connection
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    // update all socket connections when a user creates/deletes an appointment
    webSocket.onmessage = (event) => {
      const {id, interview} = JSON.parse(event.data);
   
      dispatch({type: SET_INTERVIEW, id, interview});
    }
  }, []); 
    
  const setDay = day => dispatch({type: SET_DAY, value: day});

  const bookInterview = async (id, interview) => {
    await axios.put(`/api/appointments/${id}`, {interview});
    
    dispatch({
      type: SET_INTERVIEW,
      id,
      interview
    });
  };

  const cancelInterview = async id => {
    await axios.delete(`/api/appointments/${id}`);
      
    dispatch({
      type: SET_INTERVIEW,
      id,
      interview: null
    });
      
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}