import rfs from "rfs";
import easings from "postcss-easings";
import mixins from "postcss-mixins";
import presetEnv from "postcss-preset-env";

export default {
  plugins: [rfs(), easings(), mixins(), presetEnv()],
};
