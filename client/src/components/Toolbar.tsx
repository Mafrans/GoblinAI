import { HiSolidArrowRight } from "solid-icons/hi";
import { Button } from "./Button";
import style from "./Toolbar.module.css";
import { TextArea } from "./TextArea";

type ToolbarProps = {
  onGenerate?: () => void;
};

export function Toolbar(props: ToolbarProps) {
  return (
    <div class={style.toolbar}>
      <TextArea></TextArea>

      <Button
        type="primary"
        icon={HiSolidArrowRight}
        onClick={props.onGenerate}
      />
    </div>
  );
}
