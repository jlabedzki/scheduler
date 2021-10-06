export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(({name}) => name === day);

  if (filteredDays.length > 0) {
    const appointments = filteredDays[0].appointments;
    const appointmentsForDay = [];

    for (const appointment of appointments) {
      if (state.appointments[appointment]) {
        appointmentsForDay.push(state.appointments[appointment])
      }
    }

    return appointmentsForDay;
  }

  return filteredDays;
};

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(({name}) => name === day);

  if (filteredDays.length > 0) {
    const interviews = filteredDays[0].interviewers;
    const interviewsForDay = [];

    for (const interview of interviews) {
      if (state.interviewers[interview]) {
        interviewsForDay.push(state.interviewers[interview])
      }
    }

    return interviewsForDay;
  }

  return filteredDays;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  if(interview.interviewer) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
}