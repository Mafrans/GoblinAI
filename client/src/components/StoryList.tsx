import { For, Show, Suspense, createEffect, createSignal } from "solid-js";
import { Loader } from "./Loader";
import { StoryListItem } from "./StoryListItem";
import style from "./StoryList.module.css";
import { useStories } from "../hooks/useStories";
import { NewStoryButton } from "./NewStoryButton";
import { useCreateStory } from "../hooks/useCreateStory";
import { useNavigate } from "@solidjs/router";
import { useDeleteStory } from "../hooks/useDeleteStory";
import { Story } from "../types/Story";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

type StoryListProps = {
  canCreateStory?: boolean;
};

export function StoryList(props: StoryListProps) {
  const canCreateStory = props.canCreateStory ?? true;

  const navigate = useNavigate();
  const [stories, { mutate: setStories }] = useStories();
  const [storyToDelete, setStoryToDelete] = createSignal<Story>();
  const createStory = useCreateStory();
  const deleteStory = useDeleteStory();

  createEffect(() => console.log(storyToDelete()));

  async function handleCreateStory() {
    const story = await createStory();
    navigate(`/story/${story.id}`);
  }

  async function handleDeleteStory() {
    const story = storyToDelete();
    if (story == null) return;

    const newStories = await deleteStory(story.id);
    setStories(newStories);
    setStoryToDelete(undefined);
  }

  return (
    <div class={style.storyList}>
      <Dialog
        open={storyToDelete() !== undefined}
        title={`Permanently delete ${storyToDelete()?.name}?`}
        buttons={[
          <Button type="primary" onClick={() => setStoryToDelete(undefined)}>
            No, I don't
          </Button>,
          <Button type="secondary" onClick={handleDeleteStory}>
            Yes, I want to delete it
          </Button>,
        ]}
      >
        This decision cannot be undone. Any files in the
        <code>{`./saves/${storyToDelete()?.id}/`}</code> folder will be deleted.
      </Dialog>

      <Show when={canCreateStory}>
        <NewStoryButton onClick={handleCreateStory} />
      </Show>

      <Suspense fallback={<Loader />}>
        <For each={stories() ?? []}>
          {(story) => (
            <StoryListItem
              story={story}
              onDelete={() => setStoryToDelete(story)}
            />
          )}
        </For>
      </Suspense>
    </div>
  );
}
