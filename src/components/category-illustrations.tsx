"use client";

/**
 * One SVG illustration per quiz category.
 * Civic Nigerian references, simplified geometric style.
 * Monochrome (uses currentColor) so they adapt to both modes via opacity.
 * No human faces.
 */

type IllustrationProps = { className?: string };

// Infrastructure: road with potholes + bridge silhouette (Third Mainland Bridge style)
export function InfrastructureIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bridge cables */}
      <line x1="40" y1="30" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="160" y1="30" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="60" y1="18" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
      <line x1="140" y1="18" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
      {/* Bridge deck */}
      <rect x="20" y="98" width="160" height="8" rx="2" fill="currentColor" fillOpacity="0.18" />
      {/* Towers */}
      <rect x="37" y="18" width="6" height="82" rx="2" fill="currentColor" fillOpacity="0.28" />
      <rect x="157" y="18" width="6" height="82" rx="2" fill="currentColor" fillOpacity="0.28" />
      {/* Road beneath */}
      <rect x="20" y="120" width="160" height="28" rx="2" fill="currentColor" fillOpacity="0.1" />
      <line x1="100" y1="122" x2="100" y2="148" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.3" />
      {/* Pothole circles */}
      <ellipse cx="60" cy="134" rx="8" ry="4" fill="currentColor" fillOpacity="0.18" />
      <ellipse cx="145" cy="138" rx="6" ry="3" fill="currentColor" fillOpacity="0.14" />
    </svg>
  );
}

// Transparency: open book + magnifying glass over a document
export function TransparencyIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Document */}
      <rect x="50" y="30" width="90" height="110" rx="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Lines on document */}
      {[50, 65, 80, 95, 110].map((y) => (
        <line key={y} x1="65" y1={y} x2="125" y2={y} stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      ))}
      {/* Magnifying glass */}
      <circle cx="140" cy="110" r="22" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2.5" fill="currentColor" fillOpacity="0.06" />
      <line x1="156" y1="126" x2="172" y2="142" stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      {/* Highlight inside glass */}
      <circle cx="134" cy="104" r="5" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

// Responsiveness: POS kiosk / phone with signal bars
export function ResponsivenessIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* POS terminal body */}
      <rect x="70" y="30" width="60" height="90" rx="8" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
      {/* Screen */}
      <rect x="78" y="38" width="44" height="30" rx="3" fill="currentColor" fillOpacity="0.15" />
      {/* Keypad dots */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle key={`${row}-${col}`} cx={84 + col * 14} cy={80 + row * 12} r="3" fill="currentColor" fillOpacity="0.22" />
        ))
      )}
      {/* Signal waves */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${148 + i * 9},${80 - i * 12} A${10 + i * 9},${10 + i * 9} 0 0,1 ${148 + i * 9},${80 + i * 12}`}
          stroke="currentColor"
          strokeOpacity={0.45 - i * 0.1}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// Security: gate / estate entrance (concrete wall, padlock)
export function SecurityIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left pillar */}
      <rect x="30" y="40" width="28" height="100" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Right pillar */}
      <rect x="142" y="40" width="28" height="100" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Gate bars */}
      {[68, 86, 104, 122, 132].map((x) => (
        <rect key={x} x={x} y="50" width="5" height="90" rx="2" fill="currentColor" fillOpacity="0.18" />
      ))}
      {/* Top arch */}
      <path d="M58 50 Q100 18 142 50" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      {/* Padlock */}
      <rect x="88" y="82" width="24" height="18" rx="4" fill="currentColor" fillOpacity="0.25" />
      <path d="M93 82 Q100 70 107 82" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
      <circle cx="100" cy="91" r="3" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

// Healthcare: medicine packet / clinic cross + Nigerian waiting bench
export function HealthcareIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Clinic cross */}
      <rect x="82" y="40" width="36" height="12" rx="3" fill="currentColor" fillOpacity="0.22" />
      <rect x="94" y="28" width="12" height="36" rx="3" fill="currentColor" fillOpacity="0.22" />
      {/* Waiting bench */}
      <rect x="40" y="110" width="120" height="8" rx="3" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="50" y="118" width="6" height="18" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="144" y="118" width="6" height="18" rx="2" fill="currentColor" fillOpacity="0.15" />
      {/* Medicine packet */}
      <rect x="60" y="78" width="32" height="20" rx="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
      <line x1="76" y1="78" x2="76" y2="98" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      {/* Small pill circles */}
      <circle cx="120" cy="88" r="8" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
      <line x1="112" y1="88" x2="128" y2="88" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  );
}

// Education: school building with blackboard
export function EducationIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* School building */}
      <rect x="35" y="70" width="130" height="70" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Roof */}
      <path d="M25 70 L100 28 L175 70Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
      {/* Door */}
      <rect x="88" y="110" width="24" height="30" rx="2" fill="currentColor" fillOpacity="0.2" />
      {/* Windows */}
      <rect x="48" y="82" width="22" height="18" rx="2" fill="currentColor" fillOpacity="0.18" />
      <rect x="130" y="82" width="22" height="18" rx="2" fill="currentColor" fillOpacity="0.18" />
      {/* Blackboard */}
      <rect x="58" y="38" width="84" height="26" rx="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="68" y1="48" x2="88" y2="48" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="68" y1="56" x2="100" y2="56" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      {/* Flag on top */}
      <line x1="100" y1="28" x2="100" y2="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <rect x="100" y="10" width="16" height="10" rx="1" fill="currentColor" fillOpacity="0.22" />
    </svg>
  );
}

// Power Supply: NEPA pole with tangled cables + meter box
export function PowerSupplyIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Pole */}
      <rect x="97" y="10" width="6" height="140" rx="2" fill="currentColor" fillOpacity="0.22" />
      {/* Cross arm */}
      <rect x="68" y="34" width="64" height="5" rx="2" fill="currentColor" fillOpacity="0.22" />
      {/* Tangled cables */}
      <path d="M68 36 Q50 70 40 80 Q55 90 70 100" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M132 36 Q150 60 160 80 Q148 95 135 100" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M68 36 Q80 55 100 60 Q120 55 132 36" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" fill="none" />
      {/* Meter box */}
      <rect x="80" y="95" width="40" height="40" rx="4" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <rect x="86" y="102" width="28" height="16" rx="2" fill="currentColor" fillOpacity="0.18" />
      {/* Meter digits hint */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={89 + i * 9} y={105} width="6" height="10" rx="1" fill="currentColor" fillOpacity="0.22" />
      ))}
    </svg>
  );
}

// Job Creation: market stall / wheelbarrow trader
export function JobCreationIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Market stall canopy */}
      <path d="M20 60 L100 30 L180 60 L180 70 L20 70Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Canopy scallop */}
      {[20, 44, 68, 92, 116, 140, 164].map((x) => (
        <path key={x} d={`M${x} 70 Q${x + 12} 82 ${x + 24} 70`} fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
      ))}
      {/* Poles */}
      <line x1="30" y1="70" x2="30" y2="140" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <line x1="170" y1="70" x2="170" y2="140" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      {/* Table */}
      <rect x="50" y="105" width="100" height="10" rx="2" fill="currentColor" fillOpacity="0.18" />
      <rect x="55" y="115" width="4" height="22" rx="1" fill="currentColor" fillOpacity="0.15" />
      <rect x="141" y="115" width="4" height="22" rx="1" fill="currentColor" fillOpacity="0.15" />
      {/* Goods on table */}
      <circle cx="72" cy="100" r="7" fill="currentColor" fillOpacity="0.16" />
      <circle cx="90" cy="100" r="7" fill="currentColor" fillOpacity="0.16" />
      <circle cx="108" cy="100" r="7" fill="currentColor" fillOpacity="0.16" />
      <circle cx="126" cy="100" r="7" fill="currentColor" fillOpacity="0.16" />
    </svg>
  );
}

// Cost of Living: market basket + price tag
export function CostOfLivingIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Basket body */}
      <path d="M50 75 Q50 140 100 140 Q150 140 150 75Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
      {/* Basket weave lines horizontal */}
      <line x1="52" y1="95" x2="148" y2="95" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="54" y1="112" x2="146" y2="112" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="58" y1="128" x2="142" y2="128" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      {/* Handle */}
      <path d="M70 75 Q70 50 100 50 Q130 50 130 75" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Contents visible at top */}
      <ellipse cx="85" cy="78" rx="14" ry="8" fill="currentColor" fillOpacity="0.18" />
      <ellipse cx="112" cy="76" rx="12" ry="7" fill="currentColor" fillOpacity="0.15" />
      {/* Price tag */}
      <rect x="130" y="30" width="48" height="30" rx="4" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx="140" cy="38" r="4" fill="currentColor" fillOpacity="0.22" />
      <line x1="148" y1="46" x2="170" y2="46" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
      <line x1="148" y1="52" x2="162" y2="52" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
      {/* String */}
      <line x1="130" y1="40" x2="118" y2="55" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 2" />
    </svg>
  );
}

// Accountability: election poster / INEC finger ink
export function AccountabilityIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Election poster (layered, torn corner) */}
      <rect x="30" y="28" width="80" height="110" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="40" y="18" width="80" height="110" rx="3" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Poster lines */}
      <rect x="52" y="32" width="56" height="36" rx="3" fill="currentColor" fillOpacity="0.14" />
      <line x1="52" y1="78" x2="96" y2="78" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" />
      <line x1="52" y1="88" x2="88" y2="88" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
      <line x1="52" y1="96" x2="92" y2="96" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
      {/* Torn corner */}
      <path d="M100 18 L120 18 L100 38Z" fill="currentColor" fillOpacity="0.18" />
      {/* Ink-stained finger */}
      <path d="M148 80 Q148 55 155 45 Q162 35 165 45 Q168 55 168 80 Q168 100 158 105 Q148 100 148 80Z"
        fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Ink at tip */}
      <ellipse cx="158" cy="104" rx="9" ry="5" fill="currentColor" fillOpacity="0.35" />
      {/* PVC card */}
      <rect x="130" y="112" width="52" height="34" rx="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <rect x="136" y="118" width="20" height="12" rx="2" fill="currentColor" fillOpacity="0.18" />
      <line x1="136" y1="136" x2="174" y2="136" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  );
}

import type { ReactElement } from "react";

// Economy: naira note / market scale / POS kiosk
export function EconomyIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Naira banknote */}
      <rect x="28" y="45" width="100" height="60" rx="5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      {/* Naira symbol */}
      <line x1="58" y1="68" x2="98" y2="68" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <line x1="58" y1="78" x2="98" y2="78" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M68 90 L78 58 L88 90" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Rising chart line */}
      <polyline points="140,120 150,105 160,95 170,80 180,60" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="180" cy="60" r="4" fill="currentColor" fillOpacity="0.4" />
      {/* Chart baseline */}
      <line x1="135" y1="125" x2="185" y2="125" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  );
}

// Community: group of silhouettes / welfare handshake
export function CommunityIllo({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Three people silhouettes (abstract, no faces) */}
      {[60, 100, 140].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy={50 + (i === 1 ? -8 : 0)} r={i === 1 ? 14 : 11} fill="currentColor" fillOpacity={i === 1 ? 0.22 : 0.15} />
          <path
            d={`M${cx - (i === 1 ? 18 : 14)} 120 Q${cx - (i === 1 ? 18 : 14)} ${70 + (i === 1 ? -8 : 0)} ${cx} ${70 + (i === 1 ? -8 : 0)} Q${cx + (i === 1 ? 18 : 14)} ${70 + (i === 1 ? -8 : 0)} ${cx + (i === 1 ? 18 : 14)} 120`}
            fill="currentColor"
            fillOpacity={i === 1 ? 0.18 : 0.12}
          />
        </g>
      ))}
      {/* Handshake line */}
      <path d="M75 120 Q100 108 125 120" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Heart above center */}
      <path d="M100 40 Q100 34 94 34 Q88 34 88 40 Q88 46 100 54 Q112 46 112 40 Q112 34 106 34 Q100 34 100 40Z" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

export function CategoryIllo({
  category,
  className = "",
}: {
  category: string;
  className?: string;
}) {
  const map: Record<string, (p: IllustrationProps) => ReactElement | null> = {
    Infrastructure: InfrastructureIllo,
    Transparency: TransparencyIllo,
    Responsiveness: ResponsivenessIllo,
    Security: SecurityIllo,
    Healthcare: HealthcareIllo,
    Education: EducationIllo,
    "Power Supply": PowerSupplyIllo,
    "Job Creation": JobCreationIllo,
    "Cost of Living": CostOfLivingIllo,
    Accountability: AccountabilityIllo,
    Economy: EconomyIllo,
    Community: CommunityIllo,
  };
  const Comp = map[category];
  if (!Comp) return null;
  return <Comp className={className} />;
}
