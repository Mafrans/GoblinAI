import { createMemo } from "solid-js";
import { Story } from "../types/Story";
import dayjs from "dayjs";
import style from "./StoryListItem.module.css";
import { Link } from "@solidjs/router";
import { Button } from "./Button";
import { HiSolidTrash } from "solid-icons/hi";

type StoryListItemProps = {
  story: Story;
  onDelete?: () => void;
};

export function StoryListItem(props: StoryListItemProps) {
  const createdAt = createMemo(() => dayjs(props.story.createdAt));
  const editedAt = createMemo(() => dayjs(props.story.editedAt));

  return (
    <Link href={`/story/${props.story.id}`} class={style.storyListItem}>
      <div class={style.content}>
        <h3 class="headline-3">{props.story.name}</h3>
        <p>Last edited {editedAt().fromNow()}</p>
        <p>Created {createdAt().format("D MMMM YYYY")}</p>
      </div>

      <div class={style.buttons}>
        <Button variant="link" icon={HiSolidTrash} onClick={props.onDelete} />
      </div>
    </Link>
  );
}
