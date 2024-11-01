import Image from "next/image";
import styles from "../../styles/person.module.css";
import { transformNum, URL } from "@/app/page";

async function getBillionInfo(id: string) {
    const response = await fetch(`${URL}person/${id}`);
    const json = await response.json();
    return json;
}

export default async function Person({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const info = await getBillionInfo(id);
    return (
        <div className={styles.container}>
            <div className={styles.article}>
                <Image
                    className={styles.mainImg}
                    src={info.squareImage}
                    alt={info.id}
                />
                <span className={styles.title}>{info.name}</span>
                <span className={styles.infoText}>Networth: {transformNum(info.netWorth)} Billion</span>
                <span className={styles.infoText}>Country: {info.country}</span>
                <span className={styles.infoText}>Industry : {info.industries.map((industry: any) => industry)}</span>
                <p className={styles.bio}>{info.bio}</p>
            </div>
            <div className={styles.article}>
                <span className={styles.title}>Financial Assets</span>
                <div className={styles.assetCards}>
                    {info.financialAssets
                        ? info.financialAssets.map((asset: any) => (
                              <div
                                  key={asset.id}
                                  className={styles.card}
                              >
                                  <span>Ticker: {asset.ticker}</span>
                                  <span>Shares: {parseInt(asset.numberOfShares).toLocaleString()}</span>
                                  {asset.exerciseOptionPrice ? <span>Exercise Price: ${asset.exerciseOptionPrice}</span> : null}
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}
