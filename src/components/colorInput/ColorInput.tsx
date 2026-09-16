import { useEffect, useState } from "react";
import styles from "./colorInput.module.css";

interface Props {
  id?: string;
  label: string;
  color: string;
  onColorChange: (color: string) => void;
  onRevert: () => void;
}

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

const normalizeHex = (value: string) => {
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const [, r, g, b] = value.toLowerCase();
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return value.toLowerCase();
};

const ColorInput = ({ id = "color", label, color, onColorChange, onRevert }: Props) => {
  const [text, setText] = useState(color);

  useEffect(() => {
    setText(color);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    if (HEX_RE.test(value)) {
      onColorChange(normalizeHex(value));
    }
  };

  const handleTextBlur = () => {
    if (!HEX_RE.test(text)) {
      setText(color);
    } else {
      const normalized = normalizeHex(text);
      setText(normalized);
      onColorChange(normalized);
    }
  };

  return (
    <div className={styles.theme_picker}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.button_group}>
        <input
          type="text"
          className={styles.hex_input}
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          maxLength={7}
          spellCheck={false}
          aria-label="HEX color"
        />
        <input type="color" id={id} value={color} onChange={handleColorChange} />
        <button className={styles.clear_button} onClick={onRevert}>
          Revert
        </button>
      </div>
    </div>
  );
};

export default ColorInput;
