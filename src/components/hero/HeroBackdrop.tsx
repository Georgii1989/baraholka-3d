import "./hero-backdrop.css";

export function HeroBackdrop() {
  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-orb hero-orb-cyan" />
      <div className="hero-orb hero-orb-magenta" />
      <div className="hero-orb hero-orb-amber" />
      <div className="hero-laser" />
      <div className="hero-vignette" />
    </div>
  );
}
