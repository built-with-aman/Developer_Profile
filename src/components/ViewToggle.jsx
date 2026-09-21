import { LayoutGrid, List } from "lucide-react";

/**
 * Small segmented control for switching a section between its normal list
 * layout and a bigger-icon grid layout — same idea as the view switcher in
 * a file manager. Purely presentational; the parent owns the `view` state
 * and decides what each mode actually renders.
 */
export default function ViewToggle({ view, onChange, testid = "view-toggle" }) {
  const OPTIONS = [
    { id: "list", label: "List", Icon: List },
    { id: "grid", label: "Grid", Icon: LayoutGrid },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Layout"
      data-testid={testid}
      className="inline-flex items-center gap-1 border border-lin bg-paper2 p-1"
    >
      {OPTIONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={view === id}
          aria-label={label + " view"}
          data-testid={`${testid}-${id}`}
          onClick={() => onChange(id)}
          className={
            "flex items-center gap-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 " +
            (view === id ? "bg-acc text-onacc" : "text-mut hover:text-ink")
          }
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  );
}
