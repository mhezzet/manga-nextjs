import { Descriptions, List, Typography } from "antd";
import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./[id].module.css";

export default function Manga({ manga }) {
  const {
    query: { id },
  } = useRouter();

  return (
    <div className="container">
      <Head>
        <title>{manga.title}</title>
        <meta name="referrer" content="no-referrer" />
      </Head>
      <div className={styles.header}>
        {manga.image && (
          <div className={styles.img}>
            <img src={`https://cdn.mangaeden.com/mangasimg/${manga.image}`} />
          </div>
        )}

        <Descriptions title={manga.title}>
          <Descriptions.Item label="Author">{manga.author}</Descriptions.Item>
          <Descriptions.Item label="Released">
            {manga.released}
          </Descriptions.Item>

          <Descriptions.Item label="Categories">
            {manga.categories.join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {manga.description}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <List
        size="small"
        dataSource={manga.chapters}
        header={<Typography.Title level={3}>Chapters</Typography.Title>}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link href={`/chapter/${item[3]}`}>
                  <a>
                    {item[0] == item[2] ? item[0] : `${item[0]} - ${item[2]}`}
                  </a>
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await Axios.get(
    `https://www.mangaeden.com/api/manga/${params.id}`
  );

  return {
    props: { manga: data },
  };
}

export async function getStaticPaths() {
  const { data } = await Axios.get("https://www.mangaeden.com/api/list/0");

  const paths = data.manga.map((manga) => ({
    params: { id: manga.i },
  }));

  return { paths, fallback: false };
}
