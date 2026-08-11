import type { ThemeRegistration } from "shiki";

/** Light shell theme aligned with UI Skills command blocks. */
export const uiSkillsShellTheme: ThemeRegistration = {
  name: "ui-skills-shell",
  type: "light",
  fg: "#171717",
  bg: "#ffffff",
  settings: [
    { settings: { foreground: "#171717" } },
    {
      scope: [
        "support.function",
        "keyword.control",
        "keyword.other",
        "entity.name.function",
      ],
      settings: { foreground: "#953800" },
    },
    {
      scope: [
        "string",
        "constant.other.option",
        "entity.name.flag",
        "variable.parameter",
      ],
      settings: { foreground: "#0550ae" },
    },
    {
      scope: ["variable.other", "meta.argument", "entity.name.command"],
      settings: { foreground: "#0a3069" },
    },
  ],
};
