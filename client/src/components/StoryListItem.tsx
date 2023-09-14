import { createMemo } from "solid-js";
import { Story } from "../types/Story";
import dayjs from "dayjs";
import style from "./StoryListItem.module.css";
import { Link } from "@solidjs/router";

type StoryListItemProps = {
  story: Story;
};

export function StoryListItem({ story }: StoryListItemProps) {
  const createdAt = createMemo(() => dayjs(story.createdAt));
  const editedAt = createMemo(() => dayjs(story.editedAt));

  return (
    <Link href={`/story/${story.id}`} class={style.storyListItem}>
      <h3 class="headline-3">{story.name}</h3>
      <p>Last edited {editedAt().fromNow()}</p>
      <p>Created {createdAt().format("D MMMM YYYY")}</p>
    </Link>
  );
}
