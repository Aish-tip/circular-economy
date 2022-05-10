

function CountryChart() {
    return (
        <countries-map
            // width={'350px'}
            height={'300px'}
            chartType="GeoChart"
            data={[
                ['Country', 'Unutilized Stock'],
                ['India', 700],
                ['United States', 300],
                ['Brazil', 400],
                ['Canada', 500],
                ['France', 600],
                ['Russia', 400],
            ]}
            options={{
                colorAxis: { colors: ['#00853f', 'darkgrey', '#e31b23'] },
                defaultColor: '#f5f5f5',
              }}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey="YOUR_KEY_HERE"
            rootProps={{ 'data-testid': '1' }}
            />
    )
}

export default CountryChart