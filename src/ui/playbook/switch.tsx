import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

type PlaybookSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  "aria-label"?: string;
};

export function PlaybookSwitch({
  checked,
  onCheckedChange,
  id = "playbook-tip-switch",
  "aria-label": ariaLabel = "Show tip",
}: PlaybookSwitchProps) {
  return (
    <SwitchPrimitive.Root
      id={id}
      nativeButton
      render={<button type="button" aria-label={ariaLabel} />}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="bg-parchment-200 focus-visible:outline-parchment-900 relative inline-flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 data-checked:bg-parchment-800"
    >
      <SwitchPrimitive.Thumb
        className="bg-white size-5 rounded-full shadow-sm transition-transform data-checked:translate-x-4"
      />
    </SwitchPrimitive.Root>
  );
}
