import { getData } from './data.js'
import { columns, defaultColumns } from './column.js'
import {
	addColumnsToUI,
	addViewsToOptions,
	autoResizeColumns,
	handleOpenTable,
	handleParentHeaderSelect,
	openRowModal,
	handleSaveView,
	handleSwitchViewOption,
	handleToggleHeader,
	handleViewNameInputValidation,
} from './helper.js'

const defaultColDef = {
	sortable: true,
	resizable: true,
	filter: true,
	floatingFilter: true,
	lockPosition: 'left',
}

export const gridOptions = {
	columnDefs: defaultColumns,
	defaultColDef,
	pagination: true,
	paginationAutoPageSize: true,
	enableCellTextSelection: true,
	rowSelection: 'single',
	/* 
		to open the modal on single click, 
		use this 2 attribute 
		- rowMultiSelectWithClick: true,
		- onSelectionChanged: handleRowSelection,
	*/
	onCellDoubleClicked: openRowModal,
}

document.addEventListener('DOMContentLoaded', async () => {
	const gridDiv = document.querySelector('#myGrid')
	new agGrid.Grid(gridDiv, gridOptions)

	gridOptions.api.setRowData(await getData())

	// Auto Resized Columns
	autoResizeColumns()
})

function main() {
	addColumnsToUI()
	addViewsToOptions()
	handleSwitchViewOption()
	handleToggleHeader()
	handleParentHeaderSelect()
	handleSaveView()
	handleOpenTable()
	handleViewNameInputValidation()
}

main()
