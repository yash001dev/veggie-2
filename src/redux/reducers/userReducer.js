import {
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_ERROR,
  USER_REGISTRATION_LOADING,
  USER_REGISTRATION_SUCCESSFUL,
  USER_REGISTRATION_ERROR,
  USER_LOGOUT,
  USER_UPDATE_LOADING,
  USER_UPDATE_SUCCESSFUL,
  USER_UPDATE_ERROR,
  USER_REGISTRATION_VERIFICATION_ERROR,
  USER_REGISTRATION_VERIFICATION_LOADING,
  USER_REGISTRATION_VERIFICATION_SUCCESSFUL,
  USER_REGISTRATION_VERIFICATION_AGAIN_LOADING,
  USER_REGISTRATION_VERIFICATION_AGAIN_SUCCESSFUL,
  USER_REGISTRATION_VERIFICATION_AGAIN_ERROR,
} from "../constants/userConstants";

import produce from "immer";

const currentUser = localStorage.getItem("loggedUser");

const initialState = {
  loading: false,
  user: currentUser ? JSON.parse(currentUser)[0] : {},
  error: false,
  newUser: "",
  userToken: localStorage.getItem("userToken")
    ? JSON.parse(localStorage.getItem("userToken"))
    : "",
};

export const userLoginReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_LOADING: {
      state.loading = true;
      return;
    }

    case USER_LOGIN_SUCCESSFUL: {
      state.loading = false;
      state.user = JSON.parse(action.payload)[0];
      return;
    }

    case USER_LOGIN_ERROR: {
      state.loading = false;
      state.error = action.payload;
      return;
    }

    case USER_LOGOUT: {
      state.user = {};
      state.userToken = "";
      return;
    }

    default: {
      return state;
    }
  }
});

export const userRegistrationReducer = produce(
  (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTRATION_LOADING: {
        state.loading = true;
        return;
      }

      case USER_REGISTRATION_SUCCESSFUL: {
        state.loading = false;
        state.newUser = action.payload;
        return;
      }

      case USER_REGISTRATION_ERROR: {
        state.loading = false;
        state.newUser = action.payload;
        return;
      }

      default: {
        return state;
      }
    }
  }
);

export const userUpdateReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATE_LOADING: {
      state.loading = true;
      return;
    }

    case USER_UPDATE_SUCCESSFUL: {
      state.loading = false;
      state.user = action.payload;
      return;
    }

    case USER_UPDATE_ERROR: {
      state.loading = false;
      state.error = action.payload;
      return;
    }

    default: {
      return state;
    }
  }
});

export const userVerificationReducer = produce(
  (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTRATION_VERIFICATION_LOADING: {
        state.loading = true;
        return;
      }

      case USER_REGISTRATION_VERIFICATION_SUCCESSFUL: {
        state.loading = false;
        state.user = action.payload;
        return;
      }

      case USER_REGISTRATION_VERIFICATION_ERROR: {
        state.loading = false;
        state.error = action.payload;
        return;
      }

      default: {
        return state;
      }
    }
  }
);
export const userVerificationReducerAgain = produce(
  (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTRATION_VERIFICATION_AGAIN_LOADING: {
        state.loading = true;
        return;
      }

      case USER_REGISTRATION_VERIFICATION_AGAIN_SUCCESSFUL: {
        state.loading = false;
        state.user = action.payload;
        return;
      }

      case USER_REGISTRATION_VERIFICATION_AGAIN_ERROR: {
        state.loading = false;
        state.error = action.payload;
        return;
      }

      default: {
        return state;
      }
    }
  }
);
