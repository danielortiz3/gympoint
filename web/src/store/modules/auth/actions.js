export function SignInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function SignInSuccess(token, profile) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, profile },
  };
}

export function SignInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function SingOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
