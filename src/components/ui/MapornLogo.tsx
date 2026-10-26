// Company logo, exported from the client's Illustrator master (Set-Logo.ai).
// red = main logo (CI gradient #FF0000 → #AD0000) for light backgrounds; white for dark/photo
// backgrounds; black for single-colour use.
export default function MapornLogo({
  variant = "red",
  className = "h-8 w-auto",
}: {
  variant?: "red" | "white" | "black";
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/brand/maporn-logo-${variant}.svg`} alt="Maporn Auto Group" width={999} height={241} className={className} />
  );
}
