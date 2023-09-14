import { For, Show } from "solid-js";
import { Loader } from "./Loader";
import { StoryListItem } from "./StoryListItem";
import style from "./StoryList.module.css";
import { useStories } from "../hooks/useStories";
import { NewStoryButton } from "./NewStoryButton";

type StoryListProps = {
  canCreateStory?: boolean;
};

export function StoryList({ canCreateStory = true }: StoryListProps) {
  const { data } = useStories();

  return (
    <div class={style.storyList}>
      <Show when={canCreateStory}>
        <NewStoryButton />
      </Show>

      <For each={data()?.stories} fallback={<Loader />}>
        {(story) => <StoryListItem story={story} />}
      </For>
    </div>
  );
}
