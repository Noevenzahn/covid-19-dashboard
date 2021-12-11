export const fetcher = (url) => fetch(url)
    .then((r) => r.json())
    .then((data) =>
        data.map((point, index) => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [point.countryInfo.long, point.countryInfo.lat]
            },
            properties: {
                id: index,
                country: point.country,
                cases: point.cases,
                deaths: point.deaths
            }
        }))
    );