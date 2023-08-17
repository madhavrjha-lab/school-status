export const getData = async () => {
	const initResponse = await fetch('./script/data/data.json')
	const initFetchedSchools = await initResponse.json()

	const aaResponse = await fetch('./script/data/attraction-activities.json')
	const aaFetchedSchools = await aaResponse.json()

	const addResponse = await fetch('./script/data/address-info.json')
	const addressFetchedSchools = await addResponse.json()

	const principalResponse = await fetch('./script/data/principal-info.json')
	const principalFetchedSchools = await principalResponse.json()

	const stakeholderResponse = await fetch('./script/data/stakeholders-info.json')
	const stakeholderFetchedSchools = await stakeholderResponse.json()

	const valueStatementsResponse = await fetch('./script/data/value-statements.json')
	const valueStatementsFetchedSchools = await valueStatementsResponse.json()

	const eaResponse = await fetch('./script/data/engagement-activities.json')
	const eaFetchedSchools = await eaResponse.json()

	const restResponse = await fetch('./script/data/rest-info.json')
	const restFetchedSchools = await restResponse.json()

	let schoolData = []
	for (let i = 0; i <= 1000; i++) {
		schoolData.push({
			id: i + 1,
			...initFetchedSchools[i],
			...aaFetchedSchools[i],
			...addressFetchedSchools[i],
			...principalFetchedSchools[i],
			...stakeholderFetchedSchools[i],
			...valueStatementsFetchedSchools[i],
			...eaFetchedSchools[i],
			...restFetchedSchools[i],
		})
	}

	// let id = 1
	// const schoolsWithId = fetchedSchools.map(school => {
	// 	school.id = id++
	// 	return school
	// })

	return schoolData
}
