import { Select } from "antd";
import Axios from "axios";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Home({ manga }) {
  const { push } = useRouter();

  return (
    <main className={styles.page}>
      <section className={styles.search}>
        <img className={styles.logo} src="/manga.svg" />
        <Select
          style={{ width: 300 }}
          showSearch
          placeholder="Search..."
          optionFilterProp="children"
          onChange={(value) => push(`/manga/${value}`)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {manga.map((manga) => (
            <Select.Option value={manga.i}>{manga.t}</Select.Option>
          ))}
        </Select>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const { data } = await Axios.get("https://www.mangaeden.com/api/list/0");

  return {
    props: { manga: data.manga },
  };
}
