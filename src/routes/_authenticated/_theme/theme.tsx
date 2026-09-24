import { createFileRoute } from "@tanstack/react-router";
import { useThemeContext } from "../../../context/themeProvider";
import ColorInput from "../../../components/colorInput";
import styles from "./theme.module.css";

export const Route = createFileRoute("/_authenticated/_theme/theme")({
  component: Theme,
});

function Theme() {
  const { primaryColor, setPrimaryColor, revertColor, blurStrength, setBlurStrength, revertBlur } =
    useThemeContext();

  const onChangeBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlurStrength(Number(e.target.value));
  };

  const blurPercentage = (blurStrength / 30) * 100;

  return (
    <section className={styles.section}>
      <h1 className={styles.section_header}>Theme customization</h1>

      <ColorInput
        id="primary-color"
        label="Primary color:"
        color={primaryColor}
        onColorChange={setPrimaryColor}
        onRevert={revertColor}
      />

      <div className={styles.theme_picker}>
        <label htmlFor="blur">Blur strength:</label>
        <div className={styles.button_group}>
          <input
            type="range"
            className={styles.range}
            id="blur"
            name="blur"
            min="0"
            max="30"
            value={blurStrength}
            onChange={onChangeBlur}
            style={{ "--blur": `${blurPercentage}%` } as React.CSSProperties}
          />
          <button className={styles.clear_button} onClick={revertBlur}>
            Revert
          </button>
        </div>
      </div>
    </section>
  );
}
