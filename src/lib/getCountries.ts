export type Country = {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  flags: {
    svg: string;
    png: string;
  };
};

export async function getCountries(): Promise<Country[]> {
  const res = await fetch("https://www.apicountries.com/countries", {
    next: { revalidate: 60 * 60 * 24 }, // 24h cache
  });

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await res.json();

  return data
    .map((c: any) => ({
      name: c.name,
      alpha2Code: c.alpha2Code,
      alpha3Code: c.alpha3Code,
      flags: {
        svg: c.flags?.svg,
        png: c.flags?.png,
      },
    }))
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
}
