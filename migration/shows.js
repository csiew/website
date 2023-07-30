const fs = require("fs");
const { Pool } = require("pg");
const { v4 } = require("uuid");
const config = require("./config");

const showsData = fs.readFileSync("pages/watching/showsMetadata.json", { encoding: "utf-8" });
const watchData = fs.readFileSync("pages/watching/shows.json", { encoding: "utf-8" });
const showsParsed = JSON.parse(showsData);
const watchParsed = JSON.parse(watchData)?.shows;

const watching = [];

for (const watch of watchParsed) {
  const showAndWatchData = { ...watch };
  showAndWatchData.details = showsParsed.find((show) => show.imdbID === watch.imdbId);
  watching.push(showAndWatchData);
}

const pool = new Pool(config);

Promise.all(
  watching.map((watch) => {
    return pool.query(
      "INSERT INTO public.item (id, content_type, body) VALUES ($1, $2, $3)",
      [v4(), "tv_show", watch]
    );
  })
);
