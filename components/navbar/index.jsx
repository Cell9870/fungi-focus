import { useSession, signOut, signIn } from "next-auth/react";
import styles from "./styles.module.css";
import React, { useEffect } from "react";
import { useGlobalContext } from "@/context/store";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useGlobalContext();

  function newTheme(current) {
    let newTheme;
    switch (current) {
      case "light":
        newTheme = "solar";
        break;
      case "solar":
        newTheme = "dark";
        break;
      case "dark":
        newTheme = "light";
        break;
    }
    return newTheme;
  }

  useEffect(() => {
    async function checkUser() {
      let response = await fetch(
        `${process.env.PUBLIC_URL}/api/users/?id=${session?.user?.email}`
      );
      let res = await response.json();
      if (!res.users[0]) {
        const response = await fetch(`${process.env.PUBLIC_URL}/api/users/`, {
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

  useEffect(() => {
    document.querySelector("body").classList = [theme];
  }, [theme]);

  if (status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_nav}>
        <li className={styles.logo}>
          <a style={{ cursor: "crosshair" }} href="https://www.google.com/search?q=escalabilidad+&sxsrf=APwXEdeJTiNgwBfQ9YmQWIz2zyXUEE_Jpw%3A1687560355234&ei=oyCWZKnVDazQ1sQPnpCH8As&ved=0ahUKEwjpsoqcvNr_AhUsqJUCHR7IAb4Q4dUDCA8&uact=5&oq=escalabilidad+&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BwgjEOoCECc6FQgAEAMQjwEQ6gIQtAIQjAMQ5QIYAToVCC4QAxCPARDqAhC0AhCMAxDlAhgBOgcIIxCKBRAnOgsILhCABBDHARDRAzoRCC4QgAQQsQMQgwEQxwEQ0QM6CAgAEIAEELEDOhEILhCABBCLAxCoAxCYAxCaAzoOCC4QgAQQiwMQpAMQqAM6DAgjEIoFECcQRhD5AToHCAAQigUQQzoNCC4QigUQxwEQrwEQQzoLCC4QigUQsQMQgwE6CAgAEIAEEIsDOg4ILhCABBCLAxCoAxCbAzogCAAQigUQRhD5ARCXBRCMBRDdBBBGEPQDEPUDEPYDGAI6CggAEIoFEEMQiwM6GwguEIoFEMcBEK8BEEMQlwUQ3AQQ3gQQ4AQYAzoNCAAQigUQsQMQgwEQQzoLCAAQgAQQsQMQiwM6CggAEIoFELEDEEM6DQguEIMBELEDEIAEEAo6CwgAEIAEELEDEIMBOgYIABAWEB46CAgAEBYQHhAPSgQIQRgAUABYyDZgxzloBnAAeACAAZEBiAHJEJIBBDUuMTSYAQCgAQGwARS4AQLAAQHaAQYIARABGAvaAQYIAhABGBPaAQYIAxABGBQ&sclient=gws-wiz-serp" className={styles.nav_link}>
            <span className={styles.link_text + " " + styles.logo_text}>
              Fungi Focus{" "}
            </span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
            >
              <g className={styles.fa_group}>
                <path
                  fill="currentColor"
                  d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                  className={styles.fa_secondary}
                ></path>
                <path
                  fill="currentColor"
                  d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                  className={styles.fa_primary}
                ></path>
              </g>
            </svg>
          </a>
        </li>

        <li className={styles.nav_item}>
          <a href="/" className={styles.nav_link}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="home"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              height="1em"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-home fa-w-16 fa-9x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 
                            .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 
                            .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                  className={styles.fa_primary}
                />
              </g>
            </svg>
            <span className={styles.link_text}>Home</span>
          </a>
        </li>

        <li className={styles.nav_item}>
          <a href="/statistics" className={styles.nav_link}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="statistics"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-statistics fa-w-18 fa-9x"
            >
              <g className={styles.fa_group}>
                <path
                  fill="currentColor"
                  d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 
                        48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"
                  className={styles.fa_primary}
                />
              </g>
            </svg>
            <span className={styles.link_text}>Statistics</span>
          </a>
        </li>

        <li className={styles.nav_item}>
          <a href="/error404" className={styles.nav_link}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="settings"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-settings fa-w-16 fa-5x"
            >
              <g className={styles.fa_group}>
                <path
                  fill="currentColor"
                  d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 
                            27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 
                            7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 
                            5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4
                            20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2
                            -19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3
                            14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 
                            307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1
                            .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 
                            1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4
                                3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                  className={styles.fa_primary}
                />
              </g>
            </svg>
            <span className={styles.link_text}>Settings</span>
          </a>
        </li>

        <li className={styles.nav_item}>
          <a
            className={styles.nav_link}
            href={session ? "http://localhost:3000/api/auth/signout" : "/login"}
          /* onClick={() => (session ? signOut() : {})} */
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="login"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              className="svg-inline--fa fa-login fa-w-20 fa-5x"
              height="1em"
              viewBox="0 0 512 512"
            >
              <g className={styles.fa_group}>
                <path
                  fill="currentColor"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  className={styles.fa_primary}
                />
              </g>
            </svg>
            <span className={styles.link_text}>
              {session ? "Log Out" : "Log In"}
            </span>
          </a>
        </li>

        <li className={styles.nav_item} id="themeButton">
          <a
            href="#"
            className={
              styles.nav_link + " svg-inline--fa fa-moon-stars fa-w-16 fa-7x"
            }
            onClick={() => {
              setTheme(newTheme(theme));
            }}
          >
            <svg
              className={styles.theme_icon}
              data-prefix="fad"
              data-icon="moon-stars"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="1em"
            >
              <g className={styles.fa_group}>
                <path
                  fill="currentColor"
                  d={
                    theme === "dark"
                      ? "M502.42 240.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.41-94.8a17.31 17.31 0 0 0-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4a17.31 17.31 0 0 0 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.41-33.5 47.3 94.7a17.31 17.31 0 0 0 31 0l47.31-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3a17.33 17.33 0 0 0 .2-31.1zm-155.9 106c-49.91 49.9-131.11 49.9-181 0a128.13 128.13 0 0 1 0-181c49.9-49.9 131.1-49.9 181 0a128.13 128.13 0 0 1 0 181z"
                      : theme === "light"
                        ? "M574.09 280.38L528.75 98.66a87.94 87.94 0 0 0-113.19-62.14l-15.25 5.08a16 16 0 0 0-10.12 20.25L395.25 77a16 16 0 0 0 20.22 10.13l13.19-4.39c10.87-3.63 23-3.57 33.15 1.73a39.59 39.59 0 0 1 20.38 25.81l38.47 153.83a276.7 276.7 0 0 0-81.22-12.47c-34.75 0-74 7-114.85 26.75h-73.18c-40.85-19.75-80.07-26.75-114.85-26.75a276.75 276.75 0 0 0-81.22 12.45l38.47-153.8a39.61 39.61 0 0 1 20.38-25.82c10.15-5.29 22.28-5.34 33.15-1.73l13.16 4.39A16 16 0 0 0 180.75 77l5.06-15.19a16 16 0 0 0-10.12-20.21l-15.25-5.08A87.95 87.95 0 0 0 47.25 98.65L1.91 280.38A75.35 75.35 0 0 0 0 295.86v70.25C0 429 51.59 480 115.19 480h37.12c60.28 0 110.38-45.94 114.88-105.37l2.93-38.63h35.76l2.93 38.63c4.5 59.43 54.6 105.37 114.88 105.37h37.12C524.41 480 576 429 576 366.13v-70.25a62.67 62.67 0 0 0-1.91-15.5zM203.38 369.8c-2 25.9-24.41 46.2-51.07 46.2h-37.12C87 416 64 393.63 64 366.11v-37.55a217.35 217.35 0 0 1 72.59-12.9 196.51 196.51 0 0 1 69.91 12.9zM512 366.13c0 27.5-23 49.87-51.19 49.87h-37.12c-26.69 0-49.1-20.3-51.07-46.2l-3.12-41.24a196.55 196.55 0 0 1 69.94-12.9A217.41 217.41 0 0 1 512 328.58z"
                        : "M320 32L304 0l-16 32-32 16 32 16 16 32 16-32 32-16zm138.7 149.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208z"
                  }
                  className={styles.fa_secondary}
                ></path>
                <path
                  fill="currentColor"
                  d={
                    theme === "dark"
                      ? "M352 256a96 96 0 1 1-96-96 96.15 96.15 0 0 1 96 96z"
                      : theme === "light"
                        ? "M64.19 367.9c0-.61-.19-1.18-.19-1.8 0 27.53 23 49.9 51.19 49.9h37.12c26.66 0 49.1-20.3 51.07-46.2l3.12-41.24c-14-5.29-28.31-8.38-42.78-10.42zm404-50l-95.83 47.91.3 4c2 25.9 24.38 46.2 51.07 46.2h37.12C489 416 512 393.63 512 366.13v-37.55a227.76 227.76 0 0 0-43.85-10.66z"
                        : "M332.2 426.4c8.1-1.6 13.9 8 8.6 14.5a191.18 191.18 0 0 1-149 71.1C85.8 512 0 426 0 320c0-120 108.7-210.6 227-188.8 8.2 1.6 10.1 12.6 2.8 16.7a150.3 150.3 0 0 0-76.1 130.8c0 94 85.4 165.4 178.5 147.7z"
                  }
                  className={styles.fa_primary}
                ></path>
              </g>
            </svg>
            <span className={styles.link_text}>Change color</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
