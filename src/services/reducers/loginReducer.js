export const INITIAL_STATE = {
  isSubmitting: false,
  hasError: false,
  errorMessage: ''
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        hasError: false,
        errorMessage: ''
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        hasError: false,
        errorMessage: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        hasError: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
