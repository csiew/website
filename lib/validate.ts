export const isValidPassword = (password: string) => {
  const matchResult = password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\-_])[A-Za-z\d@$!%*#?&]{8,255}$/gm);
  if (
    !matchResult ||
    !matchResult.length ||
    (matchResult.length >= 1 && matchResult[0] !== password)
  ) {
    return false;
  }
  return true;
};
