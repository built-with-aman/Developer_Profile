import { createContext, useContext, useState, Children, cloneElement, isValidElement } from "react";

const TabsCtx = createContext(null);

/** Compound Components pattern — Tabs + Tabs.List + Tabs.Tab + Tabs.Panel */
export function Tabs({ defaultValue, children, className = "" }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}

function List({ children, className = "" }) {
  return <div className={"flex flex-wrap gap-2 border-b border-line pb-3 " + className}>{children}</div>;
}

function Tab({ value, children }) {
  const ctx = useContext(TabsCtx);
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={
        "px-3 py-1.5 text-sm transition-colors " +
        (active ? "bg-fg text-bg" : "text-muted hover:text-fg")
      }
    >
      {children}
    </button>
  );
}

function Panel({ value, children, className = "" }) {
  const ctx = useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return <div className={"pt-6 " + className}>{children}</div>;
}

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;
