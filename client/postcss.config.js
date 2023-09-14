import rfs from "rfs";
import easings from "postcss-easings";

export default {
  plugins: [rfs(), easings()],
};
