import {HiSolidArrowPath, HiSolidArrowRight} from "solid-icons/hi";
import { Button } from "./Button";
import style from "./Toolbar.module.css";
import { TextArea } from "./TextArea";

type ToolbarProps = {
  onGenerate?: () => void;
  onRegenerate?: () => void;
  disabled?: boolean;
  ref?: HTMLTextAreaElement;
};

export function Toolbar(props: ToolbarProps) {
  function handleKeyUp(event: KeyboardEvent) {
    // Handle keyboard submit
    if (event.ctrlKey && event.key === "Enter") {
      props.onGenerate?.();
      event.preventDefault();
    }
  }

  return (
    <form
      method="dialog"
      onKeyUp={handleKeyUp}
      onSubmit={() => props.onGenerate?.()}
      class={style.toolbar}
    >
      <TextArea ref={props.ref} disabled={props.disabled} autoresize />
      <Button
        type="submit"
        variant="primary"
        disabled={props.disabled}
        icon={HiSolidArrowRight}
      />
      <Button
        variant="secondary"
        disabled={props.disabled}
        onClick={() => props.onRegenerate?.()}
        icon={HiSolidArrowPath}
      />
    </form>
  );
}
