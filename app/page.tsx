import Link from "next/link";
import styles from "./styles/home.module.css";
import Image from "next/image";

export const URL = "https://billions-api.nomadcoders.workers.dev/";

async function getBillions() {
    return fetch(URL).then((response) => response.json());
}

export function transformNum(worth: any) {
    return Math.round(parseInt(worth) / 1000);
}

export default async function Home() {
    const billions = await getBillions();
    return (
        <div className={styles.container}>
            {billions.map((billion: any) => (
                <Link
                    key={billion.id}
                    href={`/person/${billion.id}`}
                >
                    <div className={styles.card}>
                        <Image
                            className={styles.cardImg}
                            alt={billion.name}
                            src={billion.squareImage}
                        />
                        <div className={styles.cardInfo}>
                            <span className={styles.name}>{billion.name}</span>
                            <span className={styles.worth}>
                                {transformNum(billion.netWorth)} Billion / {billion.industries}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
