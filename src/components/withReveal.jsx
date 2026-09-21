import Reveal from "@/components/Reveal";

/** HOC pattern — wrap any component with scroll reveal. */
export function withReveal(Component, revealProps = {}) {
  function Revealed(props) {
    return (
      <Reveal {...revealProps}>
        <Component {...props} />
      </Reveal>
    );
  }
  Revealed.displayName = `withReveal(${Component.displayName || Component.name || "Component"})`;
  return Revealed;
}
