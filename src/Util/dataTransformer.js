function transformData(data) {
    // Get the current date in the desired format
    const currentDate = new Date().toDateString();

    // Initialize an empty array to store the transformed data
    const transformedData = [];

    // Loop through the original data and transform it
    data.forEach(item => {
        const transformedItem = {
            views: item.uv,
            date: currentDate,
        };

        transformedData.push(transformedItem);
    });

    return transformedData;
}

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    // ... (other data objects)
];



let viewsData = [{ views: 4, date: 'Sat Oct 21 2023' }];


const transformedData = transformData(viewsData);
console.log(transformedData);