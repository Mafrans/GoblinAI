import { Hocuspocus, type onChangePayload } from "@hocuspocus/server";
import { TiptapTransformer } from "@hocuspocus/transformer";
import { debounce } from "goblinai/util";

async function onChange({ document }: onChangePayload) {
  const { default: json } = TiptapTransformer.fromYdoc(document);
  console.log(json);
}

const onChangeDebounced = debounce(onChange, 1000);

export const hocuspocus = new Hocuspocus({
  port: 1234,
  async onAuthenticate({ token }) {
    return {
      id: 1,
      name: "John Doe",
    };
  },
  onChange: onChangeDebounced,
});
