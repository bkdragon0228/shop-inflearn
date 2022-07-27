const continents = [
    {
        _id: 1,
        name: 'Africa',
    },
    {
        _id: 2,
        name: 'Europe',
    },
    {
        _id: 3,
        name: 'Asia',
    },
    {
        _id: 4,
        name: 'America',
    },
    {
        _id: 5,
        name: 'Australia',
    },
    {
        _id: 6,
        name: 'Antarctica',
    },
];

const price = [
    {
        _id: 0,
        name: 'Any',
        array: [],
    },
    {
        _id: 1,
        name: '$0 to $199',
        array: [0, 199],
    },
    {
        _id: 3,
        name: '$200 to $249',
        array: [200, 249],
    },
    {
        _id: 4,
        name: '$250 to $299',
        array: [250, 299],
    },
    {
        _id: 5,
        name: '$300 to $349',
        array: [300, 349],
    },
    {
        _id: 6,
        name: 'More than $300',
        array: [350, 1500000],
    },
];

export { continents, price };
