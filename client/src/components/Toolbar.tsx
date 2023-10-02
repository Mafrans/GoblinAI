import { HiSolidArrowRight } from "solid-icons/hi";
import { Button } from "./Button";
import style from "./Toolbar.module.css";
import { TextArea } from "./TextArea";

type ToolbarProps = {
  onGenerate?: () => void;
  disabled?: boolean;
};

export function Toolbar(props: ToolbarProps) {
  return (
    <div class={style.toolbar}>
      <TextArea disabled={props.disabled} autoresize />
      <Button
        type="primary"
        disabled={props.disabled}
        icon={HiSolidArrowRight}
        onClick={props.onGenerate}
      />
    </div>
  );
}
