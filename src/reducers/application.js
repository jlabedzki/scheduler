export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}

const setDay = (state, action) => ({ ...state, day: action.value });

const setApplicationData = (state, action) => ({
  ...state,
  days: action.value.days,
  appointments: action.value.appointments,
  interviewers: action.value.interviewers,
});

const setInterview = (state, action) => {
  const appointments = {
    ...state.appointments,
    [action.id]: {
      ...state.appointments[action.id],
      interview: action.interview && { ...action.interview },
    },
  };

  const days = updateSpots(state, action.id, appointments);

  return {
    ...state,
    appointments,
    days,
  };
};

const updateSpots = (state, id, appointments) => {
  const newDays = [];
  let availableSpots = 0;

  for (const day of state.days) {
    if (day.appointments.includes(id)) {
      for (const appointmentID of day.appointments) {
        if (appointments[appointmentID].interview === null) availableSpots++;
      }

      newDays.push({...day, spots: availableSpots});
    }
  }

  return newDays;
};

const reducers = {
  SET_DAY: setDay,
  SET_APPLICATION_DATA: setApplicationData,
  SET_INTERVIEW: setInterview,
};
