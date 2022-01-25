import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import ColorBar from '../components/colorbar';
import styles from '../styles/EventsScouting.module.css'
import scoutingConfig from "./scouting-config.js";
import Image from 'next/image';

const EventScouting: NextPage = () => {
  const [index, setIndex] = useState(0);
  const router: NextRouter = useRouter();

  function next() {
    if (index !== scoutingConfig.length-1) {
      setIndex(index+1);
    }
  }

  async function sendData(event: SubmitEvent) {
    event.preventDefault()

    const res = await fetch("/api/submiteventinfo", {
      body: JSON.stringify({
        name: "TEST"
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
  }

  useEffect(() => {
    let query_params: Array<string> = window.location.search.substring(1,  window.location.search.length).split("&");
    if (query_params.length == 0 ||
      query_params[0].substring(0,2) != "tm" ||
      query_params.length <= 1 ||
      query_params[1][0] != "c") {
      router.push({
        pathname: '/scoutinfo'
      });
    } else {
      localStorage.setItem("TM", query_params[0].split("=")[1]);
      localStorage.setItem("C", query_params[1].split("=")[1]);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <article>
        <ColorBar />
        <h1>{scoutingConfig[index].name}</h1>
      </article>

      <section className={styles.image}>
        <Image src="/mask.svg" alt="Mask logo" width="400vw" height="400vh"/>
      </section>

      <form onSubmit={sendData}>
        {
          scoutingConfig[index].inputs.map(element => {
            if (element.type === "number") {
              return (
                <article key={element.name} className={element.className}>
                  <h1>{element.name}</h1>
                  <input type={element.type}/>
                </article>
              );
            } else if (element.type === "radio" && element.values.length !== 0) {
              return (
                <section key={element.name} className={element.className}>
                  {
                    element.values.map(checkbox => {
                      return (
                        <section key={element.name}>
                          <input type={ element.type } name={element.name}/>
                          <label>{ checkbox }</label>
                        </section>
                      );
                    })
                  }
                </section>
              );
            }
          })
        }
      </form>

      <button className={styles.button2} onClick={() => setIndex(index+1)}>
        <p className={styles.text3}>Continue</p>
      </button>
    </div>
  )
}

export default EventScouting
