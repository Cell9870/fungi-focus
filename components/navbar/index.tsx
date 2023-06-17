import { useSession, signOut, signIn } from "next-auth/react";
import styles from "./styles.module.css";
import React from "react";

export default function Navbar() {
  const { data: session, status } = useSession();

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
