import { HiSolidPlus } from "solid-icons/hi";
import style from "./NewStoryButton.module.css";

type NewStoryButtonProps = {};

export function NewStoryButton({}: NewStoryButtonProps) {
  return (
    <button class={style.newStoryButton}>
      <HiSolidPlus size={24} />
      <span>Start your next adventure</span>
    </button>
  );
}
