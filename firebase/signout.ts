import firebaseAppInstance from ".";

export const handleSignout = async (): Promise<void> => {
  await firebaseAppInstance.auth.signOut();
};

export default handleSignout;
