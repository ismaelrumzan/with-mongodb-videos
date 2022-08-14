import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home({ isConnected, movies }) {
  console.log(movies);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Movie list</h1>
      {movies.length > 0 && (
        <div>
          <ul>
            {movies.map((rec) => (
              <li>{rec.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();
    return {
      props: { isConnected: true, movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
