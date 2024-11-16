import path from "path";

const ROOT_PATH = path.resolve();

const SRC_PATH = path.join(ROOT_PATH, "src");

const paths = {
  root: ROOT_PATH,
  src: SRC_PATH,
  thumbnails: path.join(ROOT_PATH, "public", "images"),
  data: path.join(SRC_PATH, "data"),
  views: path.join(SRC_PATH, "views"),
};

export default paths;
