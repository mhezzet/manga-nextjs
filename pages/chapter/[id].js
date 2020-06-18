import { Carousel } from "antd";
import Axios from "axios";
import Head from "next/head";

export default function Chapter(props) {
  return (
    <div className="container">
      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>
      <Carousel dotPosition="top" dots={{ className: "dots" }}>
        {props.chapter.reverse().map((image) => (
          <div>
            <img
              alt={image[0]}
              src={`https://cdn.mangaeden.com/mangasimg/${image[1]}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await Axios.get(
    `https://www.mangaeden.com/api/chapter/${params.id}`
  );

  return {
    props: { chapter: data.images },
  };
}
