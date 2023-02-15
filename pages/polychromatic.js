import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Header from "../componont/header";
import styles from '../styles/Home.module.css'

export default function Polychromatic () {
  const [image,setImage] = useState([]);
  const [images,setImages] = useState([]);
  const [time, setTime] = useState('Loading');
  const [date,setDate] = useState('');
  const [coords,setCoords] = useState({});

  const apiKey = "5XzyZifCBvDBN0fcmWgu4FLLNuatbxKe3cNfjcpI";
  const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`

  const getPolychromaticData = async () => {
    const res = await axios.get(url);
    const data = await res.data;
    console.log(data)

    const caption = data[0].caption;
    const date = data[0].date.split(" ")[0];

    const date_formatted = date.replaceAll("-","/")
    console.log(date_formatted);

    let times = [];
    let images = [];

    for(let i = 0; i < data.length; i++) {
      let time = data[i].date.split(" ")[1];
      let coords = data[i].centroid_coordinates;
      let imagePath = data[i].image;
      let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imagePath}.png`
      
      times.push(time);
      images.push({
        image:image,
        time:time,
        coords:coords
      })
    }

    setDate(date);
    setImages(images);
    setImage(images[0].image);
    setTime(time[0]);
    setCoords([images[0].coords.lat, images[0].coords.lon])

    console.log(image)

  }
  
  useEffect(() => {
    getPolychromaticData();
  },[])

  return(
    <main className={styles.main}>
      <Header title="Polychromatic" btn_title="NASA TechTransfer" href="/" />
      <div className={styles.col}>
        <div className={styles.mask1}>
          <Image src={image} alt={image} width={320} height={320} />
        </div>
        <div>Time: {time}</div>
        <div>Coords: {coords[0]}, {coords[1]}</div>

        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th style={{width:"18%"}}>Time</th>
              <th style={{width:"18%"}}>Latitude</th>
              <th style={{width:"18%"}}>Longitude</th>
              <th style={{width:"28%"}}>Image</th>
              <th style={{width:"18%"}}></th>
            </tr>
          </thead>
          <tbody>
            {
              images.map((e, i)=> {
                return (
                  <tr className={styles.tr} key={i}>
                    <td className={styles.td} style={{width:"18%"}}>{e.time}</td>
                    <td className={styles.td} style={{width:"18%"}}>{e.coords.lat}</td>
                    <td className={styles.td} style={{width:"18%"}}>{e.coords.lon}</td>
                    <td className={styles.td} style={{width:"28%"}}>
                      <div className={styles.mask2}>
                        <Image src={e.image} alt={i} width={120} height={120}/>
                      </div>
                      
                    </td>
                    <td className={styles.td} style={{width:"18%"}}>
                      <button
                        className={styles.view_button}
                        onClick={() => {
                        setImage(e.image);
                        setTime(e.time);
                        setCoords([e.coords.lat, e.coords.lon])
                        console.log(images[i].image)
                        document.body.scrollIntoView();
                      }}>View</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </main>

      

  )
}