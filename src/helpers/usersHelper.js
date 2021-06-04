import { database } from "../firebase";

export const fetchUserData = (userId) => {
  let dataset = "";
  var starCountRef = database.ref("users/" + userId);
  starCountRef.on("value", async (snapshot) => {
    const data = await snapshot.val();
    dataset = data;
  });
  return dataset;
};
