/**
 * LandmarkBanner - horizontal photo bar behind a leader's name/role.
 * Used on: leader detail page header, compare page profile strip.
 *
 * Layout: full-width image, left-to-right gradient overlay (dark → transparent),
 * children rendered over the gradient on the left side.
 * Text must be white (text-paper) at all times - the dark scrim guarantees contrast
 * in both light and dark mode.
 */
import { getLandmark } from "@/lib/landmarks";

export function LandmarkBanner({
  jurisdiction,
  height = "h-28",
  children,
}: {
  jurisdiction: string;
  height?: string;
  children: React.ReactNode;
}) {
  const photo = getLandmark(jurisdiction);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${height}`}>
      {/* Landmark photo */}
      <img
        src={photo}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />

      {/* Left-to-right gradient: black solid on left, fades to transparent by 65% */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.35) 60%, transparent 100%)",
        }}
      />

      {/* Content: rendered over the dark scrim - always white regardless of mode */}
      <div className="relative flex h-full flex-col justify-center px-6 text-white">
        {children}
      </div>
    </div>
  );
}
