import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import axios from 'axios';
import Link from 'next/link';

import Header from '../componont/header';


export default function Home() {

const [data, setData] = useState();

const apiKey = "5XzyZifCBvDBN0fcmWgu4FLLNuatbxKe3cNfjcpI";
const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`;

const getTechTransferData = async () => {
  const res = await axios.get(url);
  const info = await res.data;
  console.log(info);
  setData(info)
}
// const router=useRouter()

// const handleClick = () => {
//   router.push("/")
// }

useEffect(() => {
  getTechTransferData();
},[])


  return (
    <>
      <Head>
        <title>Nasa TechTransfer</title>
        <meta name="description" content="Fetching data from NASA API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className={styles.main}>
        <Header title="NASA TechTransfer" btn_title="Polychromatic" href="/polychromatic"/>
        

        <div className={styles.col}>
          
          <div className={styles.image_box}>
            {
              data && data.results.map((tech, index) => {
                return (
                  <div className={styles.item} key={index}>
                    {
                      tech && tech.map((t, ind) => {
                        if(ind === 10) {
                          return (
                            <Image src={t} alt={t} key={ind} width={250} height={250}/>
                          )
                        }
                      })
                    }
                    {
                      tech && tech.map((t, ind) => {
                        
                        if(ind === 2) {
                          return (
                            <div className={styles.title}>{t}</div>
                          )
                        }
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </main>
    </>
  )
}
