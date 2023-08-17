import { allColumnsWithHeader, defaultColumns } from './column.js'
import { gridOptions } from './index.js'

let tempColumns = []

// This function remove headers from the columns
export const removeHeadersFromColumns = columns => {
	let listedColumns = []
	columns.forEach(col => {
		listedColumns = [...listedColumns, ...col.children]
	})
	return listedColumns
}

// This function will auto resize all the columns
export const autoResizeColumns = () => {
	const allColumnIds = []
	gridOptions.columnApi.getColumns().forEach(column => {
		allColumnIds.push(column.getId())
	})
	gridOptions.columnApi.autoSizeColumns(allColumnIds)
}

// get the currentColDef with headers
export const getCurrentColDef = viewName => {
	let colDef
	if (viewName === '') {
		colDef = tempColumns
	} else if (viewName === 'all') {
		colDef = allColumnsWithHeader
	} else if (viewName === 'default') {
		colDef = defaultColumns
	} else {
		let views = localStorage.getItem('AG_DATATABLE_VIEWS')
		views = JSON.parse(views)
		const currentView = views.find(view => view.name === viewName)
		colDef = currentView.colDefs
	}
	return colDef
}

// Add Columns UI to Custom View Modal
export const addColumnsToUI = () => {
	const MODAL_BODY = document.querySelector('#addCustomViewModal .modal-body')

	allColumnsWithHeader.forEach(parentCol => {
		const section = document.createElement('section')
		section.append(UI.createWrapper(parentCol.headerName, '', true))

		parentCol.children.forEach(col => {
			section.append(UI.createWrapper(col.headerName, col.field))
		})

		MODAL_BODY.append(section)
	})
}

// Switch View Option on Selection
export const handleSwitchViewOption = () => {
	const viewOptions = document.querySelector('#viewOptions')
	viewOptions.addEventListener('change', onChangeViewOptions)
}

export const onChangeViewOptions = e => {
	const viewName = e.target.value
	const header = document.querySelector('#toggleHeaders').checked
	let colDefs = getCurrentColDef(viewName)

	if (!header) colDefs = removeHeadersFromColumns(colDefs)

	gridOptions.api.setColumnDefs(colDefs)
}

// Switch Header betwwen Show and Hide
export const handleToggleHeader = () => {
	const header = document.querySelector('#toggleHeaders')
	header.addEventListener('change', () => {
		const visibility = header.checked
		const viewName = document.querySelector('#viewOptions').value
		let colDefs = getCurrentColDef(viewName)

		if (!visibility) colDefs = removeHeadersFromColumns(colDefs)

		gridOptions.api.setColumnDefs(colDefs)
	})
}

// Selection of Parent Field
export const handleParentHeaderSelect = () => {
	const parentHeaderCheckboxes = document.querySelectorAll("#addCustomViewModal .field.parent input[type='checkbox']")
	parentHeaderCheckboxes.forEach(parentFieldCheckbox => {
		parentFieldCheckbox.addEventListener('change', () => {
			const section = parentFieldCheckbox.parentElement.parentElement
			const checkboxes = section.querySelectorAll(".field input[type='checkbox']")
			checkboxes.forEach((cb, i) => {
				if (i === 0) return
				cb.checked = parentFieldCheckbox.checked
			})
		})
	})
}

// Add viewOptions from Localstorage
export const addViewsToOptions = () => {
	let views = localStorage.getItem('AG_DATATABLE_VIEWS')
	views = JSON.parse(views)

	const viewOptions = document.querySelector('#viewOptions')
	views?.forEach(view => {
		viewOptions.append(UI.createOption(view.name))
	})
}

// Saving the View in Localstorage
export const handleSaveView = () => {
	const viewInput = document.querySelector("#addCustomViewModal .modal-footer input[name='viewName']")
	const saveViewBtn = document.querySelector('#addCustomViewModal #saveViewBtn')

	saveViewBtn.addEventListener('click', () => {
		// Check Validation
		if (!viewInput.value) {
			viewInput.classList.add('error')
			window.setTimeout(() => viewInput.classList.remove('error'), 10000)
			viewInput.focus()
			return
		}
		// Create Coldef
		const colDefs = createCustomColDefs()
		// Save in Localstorage
		let views = localStorage.getItem('AG_DATATABLE_VIEWS')
		if (views) {
			views = JSON.parse(views)
			views.push({ name: viewInput.value, colDefs })
			localStorage.setItem('AG_DATATABLE_VIEWS', JSON.stringify(views))
		} else {
			localStorage.setItem('AG_DATATABLE_VIEWS', JSON.stringify([{ name: viewInput.value, colDefs }]))
		}
		// Add it in option
		const viewOptions = document.querySelector('#viewOptions')
		viewOptions.append(UI.createOption(viewInput.value))
		// Select the option
		viewOptions.value = viewInput.value
		onChangeViewOptions({ target: viewOptions })
		// clear the selection
		viewInput.value = ''
		const fields = document.querySelectorAll('#addCustomViewModal .modal-body .field input[type="checkbox"]')
		fields.forEach(field => {
			if (field.checked) {
				field.checked = false
			}
		})
		// Close Modal
		document.querySelector('#addCustomViewModal .btn-close').click()
	})
}

// Create Custom ColDefs
export const createCustomColDefs = () => {
	let colDefs = []
	const fields = document.querySelectorAll('#addCustomViewModal .modal-body .field input[type="checkbox"]')
	fields.forEach(field => {
		if (field.checked && !field.parentElement.classList.contains('parent')) {
			const id = field.id
			const fieldHeader = UI.getParentHeaderField(field.id)
			const headerFound = colDefs.find(header => header.headerName === fieldHeader)
			const column = Helper.getColumnDefFromFieldId(id, fieldHeader)

			if (headerFound) {
				headerFound.children.push(column)
			} else {
				colDefs.push({ headerName: fieldHeader, children: [column] })
			}
		}
	})
	return colDefs
}

// Removing Validation when user started typing
export const handleViewNameInputValidation = () => {
	const viewInput = document.querySelector("#addCustomViewModal .modal-footer input[name='viewName']")

	viewInput.addEventListener('input', () => {
		if (viewInput.value) {
			viewInput.classList.remove('error')
		} else {
			viewInput.classList.add('error')
		}
	})
}

// Adding the View to Table
export const handleOpenTable = () => {
	const openTableBtn = document.querySelector('#openTable')
	openTableBtn.addEventListener('click', () => {
		// Create ColDefs
		let colDefs = createCustomColDefs()
		// Set it to view and variable
		tempColumns = colDefs
		const header = document.querySelector('#toggleHeaders').checked
		if (!header) colDefs = removeHeadersFromColumns(colDefs)
		gridOptions.api.setColumnDefs(colDefs)
		// clear the Option
		document.querySelector('#viewOptions').value = ''
		// Clear the Selection
		const fields = document.querySelectorAll('#addCustomViewModal .modal-body .field input[type="checkbox"]')
		fields.forEach(field => {
			if (field.checked) {
				field.checked = false
			}
		})
		// Close Modal
		document.querySelector('#addCustomViewModal .btn-close').click()
	})
}

// Open Row Modal
export const openRowModal = e => {
	// Invoke the Modal
	document.querySelector('button[data-bs-target="#dataShowModal"]').click()
	// Updating Modal Header
	document.querySelector('#dataShowModal .modal-header h5 span').innerText = `#${e.data.id} ${e.data.schoolName}`
	// Updating Data
	allColumnsWithHeader.forEach(header => {
		header.children.forEach(column => {
			Helper.updateFieldToModal(column.field, e.data[column.field])
		})
	})
}

// UI Class to Handle UI related things
class UI {
	static createWrapper(headerName, fieldName, parent = false) {
		const fieldWrapper = document.createElement('div')
		fieldWrapper.classList.add('field')
		parent && fieldWrapper.classList.add('parent')

		const input = document.createElement('input')
		input.classList.add('form-check-input')
		input.type = 'checkbox'
		input.id = parent ? headerName : fieldName
		fieldWrapper.append(input)

		const label = document.createElement('label')
		label.classList.add('form-check-label')
		label.setAttribute('for', parent ? headerName : fieldName)
		label.append(document.createTextNode(headerName))
		fieldWrapper.append(label)

		return fieldWrapper
	}

	static getParentHeaderField(fieldId) {
		const field = document.getElementById(fieldId)
		return field.parentElement.parentElement.querySelector('.parent input[type="checkbox"]').id
	}

	static createOption(name) {
		const option = document.createElement('option')
		option.value = name
		option.append(document.createTextNode(name))
		return option
	}

	static creatingAccordionItem(accordionItemId, accordionName) {
		// <div class="accordion-item" style="display: none">
		// 	<h2 class="accordion-header">
		// 		<button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#generalModalAccor">
		// 			General Details
		// 		</button>
		// 	</h2>
		// 	<div id="generalModalAccor" class="show">
		// 		<div class="accordion-body">
		// 			<div class="field" data-field="schoolName">
		// 				<h4>School Name</h4>
		// 				<p>Loading...</p>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		const accordionItem = document.createElement('div')
		accordionItem.classList.add('accordion-item')

		const accordionHeader = document.createElement('h2')
		accordionHeader.classList.add('accordion-header')
		accordionItem.append(accordionHeader)

		const accordionButton = document.createElement('button')
		accordionButton.classList.add('accordion-button')
		accordionButton.dataset.bsToggle = 'collapse'
		accordionButton.dataset.bsTarget = `#${accordionItemId}`
		accordionButton.append(document.createTextNode(accordionName))
		accordionHeader.append(accordionButton)

		return accordionItem
	}
}

// Heler class to S
class Helper {
	static getColumnDefFromFieldId(id, header) {
		const foundHeader = allColumnsWithHeader.find(currentHeader => currentHeader.headerName === header)
		if (foundHeader) {
			const foundCol = foundHeader.children.find(coldef => coldef.field === id)
			if (foundCol) return foundCol
		}
		return { headerName: 'Not Found', field: id, cellDataType: 'text' }
	}

	static updateFieldToModal(fieldId, value) {
		// get wrapper and type
		const fieldWrapper = document.querySelector(`.accordion-body [data-field="${fieldId}"]`)
		if (!fieldWrapper) return
		const type = fieldWrapper.dataset.fieldType

		// if there is no value, hide the wrapper
		if (fieldWrapper.classList.contains('hide')) fieldWrapper.classList.remove('hide')
		if (!value) {
			fieldWrapper.classList.add('hide')
			return
		}

		if (type === 'text' || type === 'paragraph') {
			// For Text and Paragraph
			const p = fieldWrapper.querySelector('p')
			p.innerText = String(value)
		} else if (type === 'brick') {
			// For Bricks
			const brick = fieldWrapper.querySelector('span.brick')
			brick.className = 'brick'
			brick.classList.add('brick', `bg-${Helper.getBrickColor(value)}`)
			brick.innerText = String(value)
		} else if (type === 'date') {
			// For Date
			const p = fieldWrapper.querySelector('p')
			p.innerText = String(value)
		} else if (type === 'website') {
			// For Website
			const p = fieldWrapper.querySelector('p')
			p.innerHTML = ''
			const a = document.createElement('a')
			a.href = `${value}`
			a.target = '_blank'
			a.innerText = `${value}`
			p.append(a)
		} else if (type === 'phone') {
			// For Phone
			const p = fieldWrapper.querySelector('p')
			p.innerHTML = ''
			const a = document.createElement('a')
			a.href = `tel:${value}`
			a.target = '_blank'
			a.innerText = `${value}`
			p.append(a)
		} else if (type === 'email') {
			// For Email
			const p = fieldWrapper.querySelector('p')
			p.innerHTML = ''
			const a = document.createElement('a')
			a.href = `mailto:${value}`
			a.target = '_blank'
			a.innerText = `${value}`
			p.append(a)
		}
	}

	static getBrickColor(value) {
		// red, green, yellow, blue, black
		const redLabels = ['on-hold', 'make-appointment', 'pending', 'maintenance', 'disable', 'inactive']
		const greenLabels = ['active', 'completed', '4', 'normal']
		const yellowLabels = [
			'pending sales',
			'awaiting principal',
			'awaiting sgb',
			'awaiting smt',
			'awaiting educator training',
			'pending parent flyers',
			'started',
			'1',
			'monthly',
			'coming soon',
			'upcoming',
		]
		const blueLabels = [
			'pilot phase',
			'onboarding',
			'ongoing weekly onboarding',
			'awaiting principal sign-off',
			'principal pitch',
			'sgb presentation',
			'smt engagement',
			'ict champian demo',
			'school data',
			"educators's training",
			'parent flyers',
			'documentation',
			'photos',
			'go-live',
			'ongoing',
			'2',
			'3',
			'website redirection',
			'ready',
		]
		const blackLabels = ['na', 'normal', 'key', 'streams']

		if (redLabels.includes(value.toLowerCase())) return 'red'
		else if (greenLabels.includes(value.toLowerCase())) return 'green'
		else if (yellowLabels.includes(value.toLowerCase())) return 'yellow'
		else if (blueLabels.includes(value.toLowerCase())) return 'blue'
		else if (blackLabels.includes(value.toLowerCase())) return 'black'
		else return 'black'
	}
}
