import reducer from "reducers/application";

describe("Application Reducer", () => {
  it("throws an error with an unsupported type", () => {
    const action = {type: null, value: null}

    expect(() => reducer({}, action)).toThrowError(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  });
});