export default function Noise() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[250]">
      <div className="grain absolute inset-0" />
      <div className="scan absolute inset-0" />
      <div className="vignette" />
      <div className="scanline" />
    </div>
  );
}
