import path from "path";

const ROOT_PATH = path.resolve();

const SRC_PATH = path.join(ROOT_PATH, "src");

const paths = {
  root: ROOT_PATH,
  src: SRC_PATH,
  images: path.join(SRC_PATH, "public", "images"),
  data: path.join(SRC_PATH, "data"),
};

export default paths;
