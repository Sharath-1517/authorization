export const emailVerifier = (email: any) => {
  const emailVerifierRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  return emailVerifierRegEx.test(email);
}

export const passwordVerifier = (password: string) => {
  return password.length < 6
}