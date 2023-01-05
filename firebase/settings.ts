import { updateProfile } from "@firebase/auth";
import firebaseAppInstance from ".";

export const handleUpdateUserDisplayName = async (displayName: string) => {
  const user = firebaseAppInstance.auth.currentUser;
  if (user === null || user === undefined) {
    throw new Error("User not logged in");
  }
  await updateProfile(user, { displayName });
};
