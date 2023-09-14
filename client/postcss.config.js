import rfs from "rfs";
import easings from "postcss-easings";
import mixins from "postcss-mixins";

export default {
  plugins: [rfs(), easings(), mixins()],
};
