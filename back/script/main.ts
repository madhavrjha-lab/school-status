// Set Validity On UI
const setValidity = (formField: HTMLDivElement, isValid: boolean, message?: string): void => {
	if (isValid) {
		formField.classList.remove('invalid')
		formField.classList.add('valid')
	} else {
		formField.classList.remove('valid')
		formField.classList.add('invalid')
		const invalidMessage = formField.querySelector('.invalid-message') as HTMLDivElement
		invalidMessage.textContent = message || 'This field is not valid'
	}
}

// Add Counter To Textareas
const addCounterToTextAreas = (): void => {
	const textares = document.querySelectorAll('textarea')
	textares.forEach(textarea => {
		textarea.addEventListener('input', (e: Event) => {
			const span = textarea.parentElement?.querySelector('span') as HTMLSpanElement
			span.textContent = `(${textarea.value.length}/500)`
		})
	})
}

// Toggle Update View
const handleToggleUpdateView = (): void => {
	const editBtns = document.querySelectorAll('#dataShow .accordion-body .edit-btn') as NodeListOf<HTMLButtonElement>
	const cancelBtns = document.querySelectorAll('#dataShow .accordion-body .cancel-btn') as NodeListOf<HTMLButtonElement>

	editBtns.forEach(editBtn => {
		editBtn.addEventListener('click', (e: Event) => {
			const fieldWrapper = editBtn.parentElement?.querySelector('.fields-wrapper') as HTMLDivElement
			const formWrapper = editBtn.parentElement?.querySelector('.form-wrapper') as HTMLDivElement

			fieldWrapper.classList.add('hide')
			formWrapper.classList.remove('hide')
			editBtn.classList.add('hide')
		})
	})

	cancelBtns.forEach(cancelBtn => {
		cancelBtn.addEventListener('click', (e: MouseEvent) => {
			const formWrapper = cancelBtn.parentElement?.parentElement?.parentElement as HTMLDivElement
			const fieldWrapper = formWrapper?.parentElement?.querySelector('.fields-wrapper') as HTMLDivElement
			const editBtn = formWrapper?.parentElement?.querySelector('.edit-btn') as HTMLButtonElement

			formWrapper.classList.add('hide')
			fieldWrapper.classList.remove('hide')
			editBtn.classList.remove('hide')
		})
	})
}

// Handle GeneralFormSubmit
const handleGeneralDetailsSubmit = (): void => {
	generalDetailsUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			generalDetailsUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement
		let regEx: RegExp

		// schoolNameInput
		formFieldWrapper = schoolNameInput.parentElement?.parentElement as HTMLDivElement
		if (schoolNameInput.value.trim().length <= 3) {
			setValidity(formFieldWrapper, false, 'School name must be greater than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}
		// noOfLearnersInput
		const totalLearners = Number(noOfLearnersInput.value)
		regEx = new RegExp(/^[1-9][0-9]*$/)
		formFieldWrapper = noOfLearnersInput.parentElement?.parentElement as HTMLDivElement
		if (!noOfLearnersInput.value) {
			setValidity(formFieldWrapper, false, "No of learners can't be empty")
		} else if (totalLearners === 0) {
			setValidity(formFieldWrapper, false, "No of learners can't be 0")
		} else if (totalLearners < 0) {
			setValidity(formFieldWrapper, false, "No of learners can't be a negative number")
		} else if (!regEx.test(String(totalLearners))) {
			setValidity(formFieldWrapper, false, "No of learners can't be a decimal")
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolPhaseInput
		formFieldWrapper = schoolPhaseInput.parentElement?.parentElement as HTMLDivElement
		if (schoolPhaseInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolSectorInput
		formFieldWrapper = schoolSectorInput.parentElement?.parentElement as HTMLDivElement
		if (schoolSectorInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolLifecycleInput
		formFieldWrapper = schoolLifecycleInput.parentElement?.parentElement as HTMLDivElement
		if (schoolLifecycleInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// onboardingStatusInput
		formFieldWrapper = onboardingStatusInput.parentElement?.parentElement as HTMLDivElement
		if (onboardingStatusInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// nextActivityInput
		formFieldWrapper = nextActivityInput.parentElement?.parentElement as HTMLDivElement
		if (nextActivityInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// nextAppointmentInput
		formFieldWrapper = nextAppointmentInput.parentElement?.parentElement as HTMLDivElement
		if (nextAppointmentInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolWebsiteInput
		regEx = new RegExp(
			/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
		)
		formFieldWrapper = schoolWebsiteInput.parentElement?.parentElement as HTMLDivElement
		if (schoolWebsiteInput.value === '' || regEx.test(schoolWebsiteInput.value)) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Please enter a valid URL')
		}

		// currentStatusInput
		formFieldWrapper = currentStatusInput.parentElement?.parentElement as HTMLDivElement
		if (
			currentStatusInput.value === '' ||
			(currentStatusInput.value.length > 30 && currentStatusInput.value.length < 500)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		const isValid = formFields.every(formField => formField.classList.contains('valid'))
		isValid && generalDetailsUpdateForm.submit()
	})
}

// Handle Marketing Submit
const handleMarketingViewSubmit = (): void => {
	marketingActivitiesUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			marketingActivitiesUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement

		// schoolPrincipalPainPointInput
		formFieldWrapper = schoolPrincipalPainPointInput.parentElement?.parentElement as HTMLDivElement
		if (
			schoolPrincipalPainPointInput.value === '' ||
			(schoolPrincipalPainPointInput.value.length > 30 && schoolPrincipalPainPointInput.value.length < 500)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		// specialRequestInput
		formFieldWrapper = specialRequestInput.parentElement?.parentElement as HTMLDivElement
		if (
			specialRequestInput.value === '' ||
			(specialRequestInput.value.length > 30 && specialRequestInput.value.length < 500)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		// specialRequestDateInput
		formFieldWrapper = specialRequestDateInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// stopperInput
		formFieldWrapper = stopperInput.parentElement?.parentElement as HTMLDivElement
		if (stopperInput.value === '' || (stopperInput.value.length > 30 && stopperInput.value.length < 500)) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		// supportRequiredInput
		formFieldWrapper = supportRequiredInput.parentElement?.parentElement as HTMLDivElement
		if (
			supportRequiredInput.value === '' ||
			(supportRequiredInput.value.length > 30 && supportRequiredInput.value.length < 500)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		// lessonsLearntInput
		formFieldWrapper = lessonsLearntInput.parentElement?.parentElement as HTMLDivElement
		if (
			lessonsLearntInput.value === '' ||
			(lessonsLearntInput.value.length > 30 && lessonsLearntInput.value.length < 500)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		// subscriptionOfferSgnatureDateInput
		formFieldWrapper = subscriptionOfferSgnatureDateInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && generalDetailsUpdateForm.submit()
	})
}

// Handle Attraction Activities Submit
const handleAttractionActivitiesSubmit = (): void => {
	attractionActivitiesUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			attractionActivitiesUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement

		// principalBuyInInput
		formFieldWrapper = principalBuyInInput.parentElement?.parentElement as HTMLDivElement
		if (principalBuyInInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// sgbPresentationInput
		formFieldWrapper = sgbPresentationInput.parentElement?.parentElement as HTMLDivElement
		if (sgbPresentationInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// financeDocumentationInput
		formFieldWrapper = financeDocumentationInput.parentElement?.parentElement as HTMLDivElement
		if (financeDocumentationInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolDataInput
		formFieldWrapper = schoolDataInput.parentElement?.parentElement as HTMLDivElement
		if (schoolDataInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// smtEngagementInput
		formFieldWrapper = smtEngagementInput.parentElement?.parentElement as HTMLDivElement
		if (smtEngagementInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// ictChampionDemoInput
		formFieldWrapper = ictChampionDemoInput.parentElement?.parentElement as HTMLDivElement
		if (ictChampionDemoInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// educatorPresentationInput
		formFieldWrapper = educatorPresentationInput.parentElement?.parentElement as HTMLDivElement
		if (educatorPresentationInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// parentFlyerInput
		formFieldWrapper = parentFlyerInput.parentElement?.parentElement as HTMLDivElement
		if (parentFlyerInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// parentOnboardingInput
		formFieldWrapper = parentOnboardingInput.parentElement?.parentElement as HTMLDivElement
		if (parentOnboardingInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// weeklyOnboardingInput
		formFieldWrapper = weeklyOnboardingInput.parentElement?.parentElement as HTMLDivElement
		if (weeklyOnboardingInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// firstDateOfEngagingSchoolInput
		formFieldWrapper = firstDateOfEngagingSchoolInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// onboardingClosureDateInput
		formFieldWrapper = onboardingClosureDateInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		// isValid && generalDetailsUpdateForm.submit()
		isValid && console.log(1)
	})
}

// Check School Name Validity
const checkSchoolNameValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	if (inputElement.value.trim().length <= 3) {
		// check greater than 3 characters
		setValidity(formFieldWrapper, false, 'School name must be greater than 3 characters')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check No of Learners Validity
const checkNoOfLearnersValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const totalLearners = Number(inputElement.value)
	const regEx = new RegExp(/^[1-9][0-9]*$/)

	if (!inputElement.value) {
		setValidity(formFieldWrapper, false, "No of learners can't be empty")
	} else if (totalLearners === 0) {
		setValidity(formFieldWrapper, false, "No of learners can't be 0")
	} else if (totalLearners < 0) {
		setValidity(formFieldWrapper, false, "No of learners can't be a negative number")
	} else if (!regEx.test(String(totalLearners))) {
		setValidity(formFieldWrapper, false, "No of learners can't be a decimal")
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Option Validity
const checkOptionValidity = (e: Event) => {
	const inputElement = e.target as HTMLSelectElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	if (inputElement.value === '') {
		setValidity(formFieldWrapper, false, 'This field is required')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Date Validity
const checkDateValidiy = (e: Event) => {
	const inputElement = e.target as HTMLDataElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	if (inputElement.value === '') {
		setValidity(formFieldWrapper, false, 'This field is required')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Optional Date Validity
const checkOptionalDateValidiy = (e: Event) => {
	const inputElement = e.target as HTMLDataElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement
	setValidity(formFieldWrapper, true)
}

// Check URL Validity
const checkURLValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const regEx = new RegExp(
		/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
	)

	if (inputElement.value === '' || regEx.test(inputElement.value)) {
		setValidity(formFieldWrapper, true)
	} else {
		setValidity(formFieldWrapper, false, 'Please enter a valid URL')
	}
}

// Check Long Text Validity
const checkOptionalLongTextValidity = (e: Event) => {
	const inputElement = e.target as HTMLTextAreaElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	if (inputElement.value === '' || (inputElement.value.length > 30 && inputElement.value.length < 500)) {
		setValidity(formFieldWrapper, true)
	} else {
		setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// General Details Form and Fields [General Details]
const generalDetailsUpdateForm = document.querySelector('#generalDetailsUpdateForm') as HTMLFormElement
const schoolNameInput = generalDetailsUpdateForm.querySelector('#schoolNameInput') as HTMLInputElement
const noOfLearnersInput = generalDetailsUpdateForm.querySelector('#noOfLearnersInput') as HTMLInputElement
const schoolPhaseInput = generalDetailsUpdateForm.querySelector('#schoolPhaseInput') as HTMLInputElement
const schoolSectorInput = generalDetailsUpdateForm.querySelector('#schoolSectorInput') as HTMLInputElement
const schoolLifecycleInput = generalDetailsUpdateForm.querySelector('#schoolLifecycleInput') as HTMLInputElement
const onboardingStatusInput = generalDetailsUpdateForm.querySelector('#onboardingStatusInput') as HTMLInputElement
const nextActivityInput = generalDetailsUpdateForm.querySelector('#nextActivityInput') as HTMLInputElement
const nextAppointmentInput = generalDetailsUpdateForm.querySelector('#nextAppointmentInput') as HTMLInputElement
const schoolWebsiteInput = generalDetailsUpdateForm.querySelector('#schoolWebsiteInput') as HTMLInputElement
const currentStatusInput = generalDetailsUpdateForm.querySelector('#currentStatusInput') as HTMLTextAreaElement

// Form Filed Single Validation [General Details]
schoolNameInput.addEventListener('input', checkSchoolNameValidity)
noOfLearnersInput.addEventListener('input', checkNoOfLearnersValidity)
schoolPhaseInput.addEventListener('change', checkOptionValidity)
schoolSectorInput.addEventListener('change', checkOptionValidity)
schoolLifecycleInput.addEventListener('change', checkOptionValidity)
onboardingStatusInput.addEventListener('change', checkOptionValidity)
nextActivityInput.addEventListener('change', checkOptionValidity)
nextAppointmentInput.addEventListener('input', checkDateValidiy)
schoolWebsiteInput.addEventListener('input', checkURLValidity)
currentStatusInput.addEventListener('input', checkOptionalLongTextValidity)

// Form Submit Validation
handleGeneralDetailsSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Marketing Activities Form and Fields [Marketing Activities]
const marketingActivitiesUpdateForm = document.querySelector('#marketingActivitiesUpdateForm') as HTMLFormElement
const schoolPrincipalPainPointInput = marketingActivitiesUpdateForm.querySelector(
	'#schoolPrincipalPainPointInput'
) as HTMLTextAreaElement
const specialRequestInput = marketingActivitiesUpdateForm.querySelector('#specialRequestInput') as HTMLTextAreaElement
const specialRequestDateInput = marketingActivitiesUpdateForm.querySelector(
	'#specialRequestDateInput'
) as HTMLInputElement
const stopperInput = marketingActivitiesUpdateForm.querySelector('#stopperInput') as HTMLTextAreaElement
const supportRequiredInput = marketingActivitiesUpdateForm.querySelector('#supportRequiredInput') as HTMLTextAreaElement
const lessonsLearntInput = marketingActivitiesUpdateForm.querySelector('#lessonsLearntInput') as HTMLTextAreaElement
const subscriptionOfferSgnatureDateInput = marketingActivitiesUpdateForm.querySelector(
	'#subscriptionOfferSgnatureDateInput'
) as HTMLInputElement

// Form Filed Single Validation [General Details]
schoolPrincipalPainPointInput.addEventListener('input', checkOptionalLongTextValidity)
specialRequestInput.addEventListener('input', checkOptionalLongTextValidity)
specialRequestDateInput.addEventListener('input', checkOptionalDateValidiy)
stopperInput.addEventListener('input', checkOptionalLongTextValidity)
supportRequiredInput.addEventListener('input', checkOptionalLongTextValidity)
lessonsLearntInput.addEventListener('input', checkOptionalLongTextValidity)
subscriptionOfferSgnatureDateInput.addEventListener('input', checkOptionalDateValidiy)

// Form Submit Validation
handleMarketingViewSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const attractionActivitiesUpdateForm = document.querySelector('#attractionActivitiesUpdateForm') as HTMLFormElement
const firstDateOfEngagingSchoolInput = attractionActivitiesUpdateForm.querySelector(
	'#firstDateOfEngagingSchoolInput'
) as HTMLInputElement
const principalBuyInInput = attractionActivitiesUpdateForm.querySelector('#principalBuyInInput') as HTMLSelectElement
const sgbPresentationInput = attractionActivitiesUpdateForm.querySelector('#sgbPresentationInput') as HTMLSelectElement
const financeDocumentationInput = attractionActivitiesUpdateForm.querySelector(
	'#financeDocumentationInput'
) as HTMLSelectElement
const schoolDataInput = attractionActivitiesUpdateForm.querySelector('#schoolDataInput') as HTMLSelectElement
const smtEngagementInput = attractionActivitiesUpdateForm.querySelector('#smtEngagementInput') as HTMLSelectElement
const ictChampionDemoInput = attractionActivitiesUpdateForm.querySelector('#ictChampionDemoInput') as HTMLSelectElement
const educatorPresentationInput = attractionActivitiesUpdateForm.querySelector(
	'#educatorPresentationInput'
) as HTMLSelectElement
const parentFlyerInput = attractionActivitiesUpdateForm.querySelector('#parentFlyerInput') as HTMLSelectElement
const parentOnboardingInput = attractionActivitiesUpdateForm.querySelector(
	'#parentOnboardingInput'
) as HTMLSelectElement
const weeklyOnboardingInput = attractionActivitiesUpdateForm.querySelector(
	'#weeklyOnboardingInput'
) as HTMLSelectElement
const onboardingClosureDateInput = attractionActivitiesUpdateForm.querySelector(
	'#onboardingClosureDateInput'
) as HTMLInputElement

firstDateOfEngagingSchoolInput.addEventListener('change', checkOptionalDateValidiy)
principalBuyInInput.addEventListener('change', checkOptionValidity)
sgbPresentationInput.addEventListener('change', checkOptionValidity)
financeDocumentationInput.addEventListener('change', checkOptionValidity)
schoolDataInput.addEventListener('change', checkOptionValidity)
smtEngagementInput.addEventListener('change', checkOptionValidity)
ictChampionDemoInput.addEventListener('change', checkOptionValidity)
educatorPresentationInput.addEventListener('change', checkOptionValidity)
parentFlyerInput.addEventListener('change', checkOptionValidity)
parentOnboardingInput.addEventListener('change', checkOptionValidity)
weeklyOnboardingInput.addEventListener('change', checkOptionValidity)
onboardingClosureDateInput.addEventListener('change', checkOptionalDateValidiy)

handleAttractionActivitiesSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Extras
handleToggleUpdateView()
addCounterToTextAreas()
