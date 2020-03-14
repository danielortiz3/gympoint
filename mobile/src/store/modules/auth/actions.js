export function signRequest(id) {
  return {
    type: '@auth/SIGN_REQUEST',
    payload: { id },
  };
}

export function signSuccess(id) {
  return {
    type: '@auth/SIGN_SUCCESS',
    payload: { id },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
