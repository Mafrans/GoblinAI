import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  const { id } = useParams<StoryViewParams>();

  return <Layout class={style.story}>{id}</Layout>;
}
