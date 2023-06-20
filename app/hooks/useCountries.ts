import countries from "world-countries";

const formattedCountries = countries.map((c) => ({
  label: c.name.common,
  value: c.cca2,
  flag: c.flag,
  latlng: c.latlng,
  region: c.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  const getByValue = (val: string) =>
    formattedCountries.find((i) => i.value === val);

  return { getAll, getByValue };
};

export default useCountries;
