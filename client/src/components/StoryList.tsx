import { For } from "solid-js";
import { Loader } from "./Loader";
import { StoryListItem } from "./StoryListItem";
import style from "./StoryList.module.css";
import { useStories } from "../hooks/useStories";

type StoryListProps = {};

export function StoryList({}: StoryListProps) {
  const { data } = useStories();

  return (
    <div class={style.storyList}>
      <For each={data()?.stories} fallback={<Loader />}>
        {(story) => <StoryListItem story={story} />}
      </For>
    </div>
  );
}
