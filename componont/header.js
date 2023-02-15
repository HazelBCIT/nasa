import Image from 'next/image'
import styles from '../styles/Home.module.css'
import starPic from '../public/star.png';
import Link from 'next/link';

export default function Header (props) {
  return (
    <div className={styles.head_container}>
      <Image className={styles.logo}src="/logo.png" alt="logo" width={120} height={120} />
      <h1 className={styles.glow}>{props.title}</h1>
      <Link className={styles.button} href={props.href}>{props.btn_title}</Link>
      <Image className={styles.starPic} src={starPic} alt="star background"/>
    </div>
  )
}