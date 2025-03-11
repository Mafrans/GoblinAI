import { Hocuspocus } from "@hocuspocus/server";

const hocuspocus = new Hocuspocus({
  port: 1234,
});

hocuspocus.listen();
