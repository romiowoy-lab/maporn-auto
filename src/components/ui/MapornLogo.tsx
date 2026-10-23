// Company logo from the Maporn Auto Group CI (CI-Maporn-logo.pdf), traced to SVG.
// red = CI gradient #FF0000 → #AD0000 for light backgrounds; white for dark/photo backgrounds.
export default function MapornLogo({
  variant = "red",
  className = "h-8 w-auto",
}: {
  variant?: "red" | "white" | "black";
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/brand/maporn-logo-${variant}.svg`} alt="Maporn Auto Group" width={1897} height={488} className={className} />
  );
}
