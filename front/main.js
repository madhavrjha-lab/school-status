// Columns

const columnDefs = [
	{
		headerName: 'Status',
		children: [
			{ headerName: 'School Name', field: 'schoolName', cellDataType: 'text' },
			{ headerName: 'No of Students', field: 'totalStudents', cellDataType: 'number' },
			{ headerName: 'phase', field: 'phase', cellDataType: 'text' },
			{ headerName: 'Life Cycle', field: 'lifeCycle', cellDataType: 'text' },
			{ headerName: 'Onboarding Status', field: 'onboardingStatus', cellDataType: 'text' },
			{ headerName: 'Current Status', field: 'currentStatus', cellDataType: 'text' },
			{ headerName: 'Next Activity', field: 'nextActivity', cellDataType: 'text' },
			{ headerName: 'Next Appointment', field: 'nextAppointment', cellDataType: 'dateString' },
			{ headerName: 'Curcuit', field: 'circuit', cellDataType: 'text' },
			{ headerName: 'School Website', field: 'schoolURL', cellRenderer: URLRenderer },
		],
	},
	// {
	//   headerName: 'Marketing Activities',
	//   children: [
	//     { headerName: 'School Pain Point', field: 'schoolPainPoint', cellDataType: 'text' },
	//     { headerName: 'Special Request', field: 'schoolRequest', cellDataType: 'text' },
	//     { headerName: 'Special Request Date', field: 'schoolRequestDate', cellDataType: 'dateString' },
	//     { headerName: 'Stopper', field: 'stopper', cellDataType: 'text' },
	//     { headerName: 'Support Required', field: 'supportRequired', cellDataType: 'text' },
	//     { headerName: 'Lesson Learnt', field: 'lessonLearnt', cellDataType: 'text' },
	//     { headerName: 'Subscription Offer Sgnature Date', field: 'subscriptionOfferSgnatureDate', cellDataType: 'dateString' },
	//   ]
	// }
]

// Row Data

const rowData = [
	{
		schoolName: 'Mveledzandivho',
		totalStudents: 1232,
		phase: 'Primary',
		lifeCycle: 'Pending Sales',
		onboardingStatus: 'Make Appointment',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'Completed',
		nextAppointment: '2023-07-13',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Mveledzandivho',
		totalStudents: 1232,
		phase: 'Primary',
		lifeCycle: 'Pending Sales',
		onboardingStatus: 'Ongoing Weekly Onboarding',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'Principal Pitch',
		nextAppointment: '2023-06-29',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Mveledzandivho',
		totalStudents: 1232,
		phase: 'Primary',
		lifeCycle: 'Pending Sales',
		onboardingStatus: 'Awaiting Principal Sign-off',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'SGB Presentation',
		nextAppointment: '2023-08-27',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Mveledzandivho',
		totalStudents: 1232,
		phase: 'Primary',
		lifeCycle: 'Pending Sales',
		onboardingStatus: 'Completed',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'SMT Engagement',
		nextAppointment: '2023-11-30',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Hitekani',
		totalStudents: 1436,
		phase: 'Secondary',
		lifeCycle: 'Pilot Phase',
		onboardingStatus: 'Awaiting Principal',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'ICT Champion Demo',
		nextAppointment: '2023-02-12',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Hitekani',
		totalStudents: 1436,
		phase: 'Secondary',
		lifeCycle: 'NA',
		onboardingStatus: 'Awaiting SGB',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'School Data',
		nextAppointment: '2023-09-03',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Hitekani',
		totalStudents: 1436,
		phase: 'Secondary',
		lifeCycle: 'NA',
		onboardingStatus: 'NA',
		currentStatus: 'Here will be next step and updates',
		nextActivity: "Educator's Training",
		nextAppointment: '2023-10-23',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Kutama',
		totalStudents: 768,
		phase: 'Combined',
		lifeCycle: 'Onboarding',
		onboardingStatus: 'Awaiting SMT',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'Parent Flyers',
		nextAppointment: '2023-12-12',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Shashtri',
		totalStudents: 1789,
		phase: 'Primary',
		lifeCycle: 'Active',
		onboardingStatus: 'Awating Educator training',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'Documentation',
		nextAppointment: '2023-10-01',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Shashtri',
		totalStudents: 1789,
		phase: 'NA',
		lifeCycle: 'On Hold',
		onboardingStatus: 'Pedning Parent Flyers',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'Photos',
		nextAppointment: '2023-09-09',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Shashtri',
		totalStudents: 1789,
		phase: 'NA',
		lifeCycle: 'On Hold',
		onboardingStatus: 'Pedning Parent Flyers',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'Go-Live',
		nextAppointment: '2023-10-22',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
	{
		schoolName: 'Shashtri',
		totalStudents: 1789,
		phase: 'NA',
		lifeCycle: 'On Hold',
		onboardingStatus: 'Pedning Parent Flyers',
		currentStatus: 'Here will be next step and updates',
		nextActivity: 'NA',
		nextAppointment: '2023-08-30',
		circuit: 'NA',
		schoolURL: 'https://kutamasecondary.co.za',
	},
]

// Colum

const defaultColDef = {
	// flex: 1,
	sortable: true,
	resizable: true,
	filter: true,
	floatingFilter: true,
	lockPosition: 'left',
}

const onSelectionChanged = () => {
	const selectedRows = gridOptions.api.getSelectedRows()
	console.log(selectedRows)
}

// let the grid know which columns and what data to use

const gridOptions = {
	rowData: rowData,
	columnDefs: columnDefs,
	defaultColDef,
	pagination: true,
	rowSelection: 'single',
	onSelectionChanged: onSelectionChanged,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
	const gridDiv = document.querySelector('#myGrid')
	new agGrid.Grid(gridDiv, gridOptions)
})

document.querySelector('button').onclick = () => {
	gridOptions.api.setColumnDefs([
		{ headerName: 'School Name', field: 'schoolName', cellDataType: 'text' },
		{ headerName: 'No of Students', field: 'totalStudents', cellDataType: 'number' },
		{ headerName: 'phase', field: 'phase', cellDataType: 'text' },
	])
}

function autoSizeAll(skipHeader) {
	const allColumnIds = []
	gridOptions.columnApi.getColumns().forEach(column => {
		allColumnIds.push(column.getId())
	})

	gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader)
}

// let fields = []

// allColumnsWithHeader.forEach(parentCol => {
// 	parentCol.children.forEach(col => {
// 		fields = [...fields, col.field]
// 	})
// })

// console.log(JSON.stringify(fields))
