import { For, Show, Suspense, createResource, createSignal } from "solid-js";
import { Loader } from "./Loader";
import { StoryListItem } from "./StoryListItem";
import style from "./StoryList.module.css";
import { NewStoryButton } from "./NewStoryButton";
import { useNavigate } from "@solidjs/router";
import { Story } from "../types/Story";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { getStories } from "../api/getStories";
import { createStory } from "../api/createStory";
import { deleteStory } from "../api/deleteStory";

type StoryListProps = {
  canCreateStory?: boolean;
};

export function StoryList(props: StoryListProps) {
  const navigate = useNavigate();
  const [stories, { mutate: setStories }] = createResource(getStories);
  const [storyToDelete, setStoryToDelete] = createSignal<Story>();

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
          <Button variant="primary" onClick={() => setStoryToDelete(undefined)}>
            No, I don't
          </Button>,
          <Button variant="secondary" onClick={handleDeleteStory}>
            Yes, I want to delete it
          </Button>,
        ]}
      >
        This decision cannot be undone. Any files in the
        <code>{`./saves/${storyToDelete()?.id}/`}</code> folder will be deleted.
      </Dialog>

      <Suspense fallback={<Loader />}>
        <Show when={props.canCreateStory ?? true}>
          <NewStoryButton onClick={handleCreateStory} />
        </Show>

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
