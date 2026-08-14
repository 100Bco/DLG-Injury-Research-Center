/**
 * The ten fixed categories. Order here is the display order on the home grid
 * and in navigation. `slug` matches the `category` field in source frontmatter.
 */
export interface Category {
  slug: string;
  name: string;
  /** One-line description shown on the home grid and category header. */
  description: string;
  /** Framing sentence shown at the top of the category page. */
  framing: string;
}

export const categories: Category[] = [
  {
    slug: 'crash-stats',
    name: 'Texas Crash Statistics',
    description: 'Statewide motor-vehicle crash counts, rates, and query tools.',
    framing:
      'Official statewide crash records and statistics — the base layer for almost any Texas traffic-injury question.',
  },
  {
    slug: 'fatality',
    name: 'Fatality Data',
    description: 'Traffic and injury death counts from state and federal registries.',
    framing:
      'Authoritative counts of traffic and injury deaths in Texas, from the state fatality record and the federal FARS census.',
  },
  {
    slug: 'injury-health',
    name: 'Injury & Health Data',
    description: 'Injury morbidity, causes, and public-health surveillance.',
    framing:
      'Injury as a public-health outcome: nonfatal injury counts, causes, and surveillance from state and federal health agencies.',
  },
  {
    slug: 'trauma-hospital',
    name: 'Trauma & Hospital Injury Data',
    description: 'Trauma registries and hospital discharge / ED injury records.',
    framing:
      'What injuries look like at the hospital: trauma registries, emergency-department visits, and inpatient discharge data.',
  },
  {
    slug: 'city-regional',
    name: 'City & Regional Data',
    description: 'Local crash dashboards and metropolitan planning data.',
    framing:
      'City and regional crash data — Vision Zero programs and metropolitan planning organizations that publish local detail the state totals hide.',
  },
  {
    slug: 'truck-commercial',
    name: 'Commercial / Truck Data',
    description: 'Large-truck and commercial-vehicle crash and carrier data.',
    framing:
      'Commercial motor vehicles: large-truck and bus crash facts, and the federal carrier-safety records behind them.',
  },
  {
    slug: 'occupational',
    name: "Occupational / Workers' Comp Injury",
    description: 'Workplace injuries, fatalities, and workers-compensation data.',
    framing:
      'Injury on the job: workplace fatality and injury surveys and the Texas workers-compensation record.',
  },
  {
    slug: 'litigation',
    name: 'Litigation & Tort Data',
    description: 'Civil court caseloads, tort filings, and claim data.',
    framing:
      'What happens after the injury in the civil system: court caseload statistics, tort filings, and insurance closed-claim data.',
  },
  {
    slug: 'exposure',
    name: 'Exposure / Traffic Volume Data',
    description: 'Traffic counts and vehicle-miles-traveled denominators.',
    framing:
      'The denominators. Traffic volume and vehicle-miles-traveled data that turn raw crash counts into rates.',
  },
  {
    slug: 'academic',
    name: 'Academic / Research',
    description: 'University research centers and peer-reviewed analysis.',
    framing:
      'Research centers and academic sources that analyze, contextualize, and extend the primary Texas injury data.',
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}
