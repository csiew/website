import { signInWithEmailAndPassword, updatePassword, updateProfile } from "@firebase/auth";
import firebaseAppInstance from ".";

export const handleUpdateUserDisplayName = async (displayName: string) => {
  const user = firebaseAppInstance.auth.currentUser;
  if (user === null || user === undefined) {
    throw new Error("User not logged in");
  }
  await updateProfile(user, { displayName });
};

export const handleUpdateUserPassword = async (currentPassword: string, newPassword: string) => {
  const user = firebaseAppInstance.auth.currentUser;
  if (user === null || user === undefined) {
    throw new Error("User not logged in");
  }
  if (user.email === null || user.email === undefined) {
    throw new Error("User email not present");
  }
  console.debug("Attempting authentication with current password");
  await signInWithEmailAndPassword(firebaseAppInstance.auth, user.email, currentPassword);
  console.debug("Sending password change request");
  await updatePassword(user, newPassword);
};
