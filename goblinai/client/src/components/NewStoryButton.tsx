import { HiSolidPlus } from "solid-icons/hi";
import style from "./NewStoryButton.module.css";

type NewStoryButtonProps = {
  onClick?: () => void;
};

export function NewStoryButton({ onClick }: NewStoryButtonProps) {
  return (
    <button onClick={onClick} class={style.newStoryButton}>
      <HiSolidPlus size={24} />
      <span>Start your next adventure</span>
    </button>
  );
}
