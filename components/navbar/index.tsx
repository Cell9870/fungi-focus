import { useSession, signOut, signIn } from "next-auth/react";
import styles from "./styles.module.css";
import React, { useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();

  useEffect(() => {
    async function checkUser() {
      let response = await fetch(
        `http://localhost:3000/api/users/?id=${session?.user?.email}`
      );
      let res = await response.json();
      if (!res.users[0]) {
        const response = await fetch("http://localhost:3000/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              id: session?.user?.email,
              username: "",
              password: "",
            },
          }),
        });
      }
    }
    if (session) {
      checkUser();
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.navbar}>
      <a href="/">HOME</a>
      <>
        {session ? (
          <React.Fragment>
            <a href="/estadisticas">Estadisticas</a>
            <button onClick={() => signOut()}>SignOut</button>
          </React.Fragment>
        ) : (
          <button onClick={() => signIn()}>SingIn</button>
        )}
      </>
    </div>
  );
}
