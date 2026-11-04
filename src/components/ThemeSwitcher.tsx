import Icon from "./Icon";
import { useTheme } from "../contexts/ThemeContext";
import type { ThemeMode } from "../lib/theme";

const options: { value: ThemeMode; label: string; icon: "monitor" | "sun" | "moon" | "shield" }[] = [
  { value:"system", label:"System default", icon:"monitor" },
  { value:"light", label:"Light", icon:"sun" },
  { value:"dark", label:"Dark", icon:"moon" },
  { value:"contrast", label:"High contrast", icon:"shield" }
];

export default function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  return (
    <label className="theme-control">
      <span className="sr-only">Visual theme</span>
      <Icon name={options.find((item) => item.value === mode)?.icon ?? "monitor"} size={17} />
      <select aria-label="Visual theme" value={mode} onChange={(event) => setMode(event.target.value as ThemeMode)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
