import { useEffect, useState } from "react";
import { database } from "../firebase";

export default function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    var starCountRef = database.ref("users/" + userId);
    starCountRef.once("value", async (snapshot) => {
      const data = await snapshot.val();
      setIsLoading(false);
      setUser(data);
    });
  }, []);

  return { isloading, user };
}
