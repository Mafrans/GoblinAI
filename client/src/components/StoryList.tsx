import { For, Show, Suspense } from "solid-js";
import { Loader } from "./Loader";
import { StoryListItem } from "./StoryListItem";
import style from "./StoryList.module.css";
import { useStories } from "../hooks/useStories";
import { NewStoryButton } from "./NewStoryButton";
import { useCreateStory } from "../hooks/useCreateStory";
import { useNavigate } from "@solidjs/router";

type StoryListProps = {
  canCreateStory?: boolean;
};

export function StoryList({ canCreateStory = true }: StoryListProps) {
  const navigate = useNavigate();
  const [stories] = useStories();
  const createStory = useCreateStory();

  async function handleCreateStory() {
    const story = await createStory();
    navigate(`/story/${story.id}`);
  }

  return (
    <div class={style.storyList}>
      <Show when={canCreateStory}>
        <NewStoryButton onClick={handleCreateStory} />
      </Show>

      <Suspense fallback={<Loader />}>
        <For each={stories() ?? []}>
          {(story) => <StoryListItem story={story} />}
        </For>
      </Suspense>
    </div>
  );
}
