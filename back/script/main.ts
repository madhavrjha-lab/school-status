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

		// circuitInput
		formFieldWrapper = circuitInput.parentElement?.parentElement as HTMLDivElement
		if (circuitInput.value === '') {
			setValidity(formFieldWrapper, false, 'This field is required')
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

		isValid && generalDetailsUpdateForm.submit()
	})
}

// Handle Address Info Submit
const handleAddressInfoSubmit = (): void => {
	schoolAddressUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			schoolAddressUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement
		let regEx: RegExp
		let phoneNo: number
		let emisNo: number
		let email: string
		let text: string
		let postalCode: number
		let quantile: number

		// schoolEmisInput
		formFieldWrapper = schoolEmisInput.parentElement?.parentElement as HTMLDivElement
		emisNo = Number(schoolEmisInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!schoolEmisInput.value) {
			setValidity(formFieldWrapper, false, "EMIS can't be empty")
		} else if (emisNo === 0) {
			setValidity(formFieldWrapper, false, "EMIS can't be 0")
		} else if (emisNo < 0) {
			setValidity(formFieldWrapper, false, "EMIS can't be a negative number")
		} else if (!regEx.test(String(emisNo))) {
			setValidity(formFieldWrapper, false, "EMIS can't be a decimal")
		} else if (schoolEmisInput.value.length !== 9) {
			setValidity(formFieldWrapper, false, 'EMIS must be 9 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolPhoneNoInput
		formFieldWrapper = schoolPhoneNoInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(schoolPhoneNoInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!schoolPhoneNoInput.value) {
			setValidity(formFieldWrapper, false, "Phone No can't be empty")
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (schoolPhoneNoInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (schoolPhoneNoInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolAlternatePhoneInput
		formFieldWrapper = schoolAlternatePhoneInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(schoolAlternatePhoneInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!schoolAlternatePhoneInput.value) {
			setValidity(formFieldWrapper, true)
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (schoolAlternatePhoneInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (schoolAlternatePhoneInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// schoolEmailInput
		formFieldWrapper = schoolEmailInput.parentElement?.parentElement as HTMLDivElement
		email = schoolAlternatePhoneInput.value.trim()
		regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

		if (!email) {
			setValidity(formFieldWrapper, true)
		} else if (!regEx.test(email)) {
			setValidity(formFieldWrapper, false, 'Please, enter a valid email.')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// streetAddressInput
		formFieldWrapper = streetAddressInput.parentElement?.parentElement as HTMLDivElement
		text = streetAddressInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// postalAddressInput
		formFieldWrapper = postalAddressInput.parentElement?.parentElement as HTMLDivElement
		text = postalAddressInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// suburbInput
		formFieldWrapper = suburbInput.parentElement?.parentElement as HTMLDivElement
		text = suburbInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// townCityInput
		formFieldWrapper = townCityInput.parentElement?.parentElement as HTMLDivElement
		text = townCityInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// postalCodeInput
		formFieldWrapper = postalCodeInput.parentElement?.parentElement as HTMLDivElement
		postalCode = Number(postalCodeInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!postalCodeInput.value) {
			setValidity(formFieldWrapper, true)
		} else if (postalCode === 0) {
			setValidity(formFieldWrapper, false, "Postal code can't be only 0")
		} else if (postalCode < 0) {
			setValidity(formFieldWrapper, false, "Postal code can't be a negative")
		} else if (!regEx.test(String(postalCode))) {
			setValidity(formFieldWrapper, false, "Postal code can't be a decimal")
		} else if (postalCodeInput.value.length !== 4) {
			setValidity(formFieldWrapper, false, 'Postal code must be 4 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// municipalityInput
		formFieldWrapper = municipalityInput.parentElement?.parentElement as HTMLDivElement
		text = municipalityInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// quintileInput
		formFieldWrapper = quintileInput.parentElement?.parentElement as HTMLDivElement
		quantile = Number(quintileInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!quintileInput.value) {
			setValidity(formFieldWrapper, false, "Quantile can't be empty")
		} else if (quantile < 0) {
			setValidity(formFieldWrapper, false, "Quantile can't be a negative")
		} else if (!regEx.test(String(quantile))) {
			setValidity(formFieldWrapper, false, "Quantile can't be a zero or a decimal")
		} else if (quantile > 0 && quantile < 6) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, "Quantile can't be greater than 5")
		}

		// addressInfoCommentInput
		formFieldWrapper = addressInfoCommentInput.parentElement?.parentElement as HTMLDivElement
		if (
			addressInfoCommentInput.value === '' ||
			(addressInfoCommentInput.value.length > 30 && addressInfoCommentInput.value.length < 500)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && schoolAddressUpdateForm.submit()
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

// Check School EMIS Validity
const checkSchoolEMISValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const emisNo = Number(inputElement.value.trim())
	const regEx = new RegExp(/^[1-9][0-9]*$/)

	if (!inputElement.value) {
		setValidity(formFieldWrapper, false, "EMIS can't be empty")
	} else if (emisNo === 0) {
		setValidity(formFieldWrapper, false, "EMIS can't be 0")
	} else if (emisNo < 0) {
		setValidity(formFieldWrapper, false, "EMIS can't be a negative number")
	} else if (!regEx.test(String(emisNo))) {
		setValidity(formFieldWrapper, false, "EMIS can't be a decimal")
	} else if (inputElement.value.length !== 9) {
		setValidity(formFieldWrapper, false, 'EMIS must be 9 digits')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Phone Number Validity
const checkPhoneValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const phoneNo = Number(inputElement.value.trim())
	const regEx = new RegExp(/^[1-9][0-9]*$/)

	if (!inputElement.value) {
		setValidity(formFieldWrapper, false, "Phone No can't be empty")
	} else if (phoneNo === 0) {
		setValidity(formFieldWrapper, false, "Phone No can't be only 0")
	} else if (phoneNo < 0) {
		setValidity(formFieldWrapper, false, "Phone No can't be a negative")
	} else if (inputElement.value[0] != '0') {
		setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
	} else if (!regEx.test(String(phoneNo))) {
		setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
	} else if (inputElement.value.length !== 10) {
		setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Optional Phone Number Validity
const checkOptionalPhoneValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const phoneNo = Number(inputElement.value.trim())
	const regEx = new RegExp(/^[1-9][0-9]*$/)

	if (!inputElement.value) {
		setValidity(formFieldWrapper, true)
	} else if (phoneNo === 0) {
		setValidity(formFieldWrapper, false, "Phone No can't be only 0")
	} else if (phoneNo < 0) {
		setValidity(formFieldWrapper, false, "Phone No can't be a negative")
	} else if (inputElement.value[0] != '0') {
		setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
	} else if (!regEx.test(String(phoneNo))) {
		setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
	} else if (inputElement.value.length !== 10) {
		setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Optional Postal Code Validity
const checkOptionalPostalCodeValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const postalCode = Number(inputElement.value.trim())
	const regEx = new RegExp(/^[1-9][0-9]*$/)

	if (!inputElement.value) {
		setValidity(formFieldWrapper, true)
	} else if (postalCode === 0) {
		setValidity(formFieldWrapper, false, "Postal code can't be only 0")
	} else if (postalCode < 0) {
		setValidity(formFieldWrapper, false, "Postal code can't be a negative")
	} else if (!regEx.test(String(postalCode))) {
		setValidity(formFieldWrapper, false, "Postal code can't be a decimal")
	} else if (inputElement.value.length !== 4) {
		setValidity(formFieldWrapper, false, 'Postal code must be 4 digits')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Optional Email Number Validity
const checkOptionalEmailValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const email = inputElement.value.trim()
	const regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

	if (!email) {
		setValidity(formFieldWrapper, true)
	} else if (!regEx.test(email)) {
		setValidity(formFieldWrapper, false, 'Please, enter a valid email')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Email Validity
const checkEmailValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const email = inputElement.value.trim()
	const regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

	if (!email) {
		setValidity(formFieldWrapper, false, "Email can't be empty.")
	} else if (!regEx.test(email)) {
		setValidity(formFieldWrapper, false, 'Please, enter a valid email.')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Text Validity
const checkTextValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const text = inputElement.value.trim()

	if (!text) {
		setValidity(formFieldWrapper, false, "This can't be empty.")
	} else if (text.length <= 3) {
		setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// Check Optional Text Validity
const checkOptionalTextValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const text = inputElement.value.trim()

	if (!text) {
		setValidity(formFieldWrapper, true)
	} else if (text.length <= 3) {
		setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
	} else {
		setValidity(formFieldWrapper, true)
	}
}

// check Quantile Validity
const checkQuantileValidity = (e: Event) => {
	const inputElement = e.target as HTMLInputElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	const quantile = Number(inputElement.value.trim())
	const regEx = new RegExp(/^[1-9][0-9]*$/)

	if (!inputElement.value) {
		setValidity(formFieldWrapper, false, "Quantile can't be empty")
	} else if (quantile < 0) {
		setValidity(formFieldWrapper, false, "Quantile can't be a negative")
	} else if (!regEx.test(String(quantile))) {
		setValidity(formFieldWrapper, false, "Quantile can't be a zero or a decimal")
	} else if (quantile > 0 && quantile < 6) {
		setValidity(formFieldWrapper, true)
	} else {
		setValidity(formFieldWrapper, false, "Quantile can't be greater than 5")
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// General Details Form and Fields [General Details]
const generalDetailsUpdateForm = document.querySelector('#generalDetailsUpdateForm') as HTMLFormElement
const schoolNameInput = generalDetailsUpdateForm.querySelector('#schoolNameInput') as HTMLInputElement
const noOfLearnersInput = generalDetailsUpdateForm.querySelector('#noOfLearnersInput') as HTMLInputElement
const circuitInput = generalDetailsUpdateForm.querySelector('#circuitInput') as HTMLInputElement
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
circuitInput.addEventListener('input', checkOptionValidity)
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

const schoolAddressUpdateForm = document.querySelector('#schoolAddressUpdateForm') as HTMLFormElement
const schoolEmisInput = schoolAddressUpdateForm.querySelector('#schoolEmisInput') as HTMLInputElement
const schoolPhoneNoInput = schoolAddressUpdateForm.querySelector('#schoolPhoneNoInput') as HTMLInputElement
const schoolAlternatePhoneInput = schoolAddressUpdateForm.querySelector(
	'#schoolAlternatePhoneInput'
) as HTMLInputElement
const schoolEmailInput = schoolAddressUpdateForm.querySelector('#schoolEmailInput') as HTMLInputElement
const streetAddressInput = schoolAddressUpdateForm.querySelector('#streetAddressInput') as HTMLInputElement
const postalAddressInput = schoolAddressUpdateForm.querySelector('#postalAddressInput') as HTMLInputElement
const suburbInput = schoolAddressUpdateForm.querySelector('#suburbInput') as HTMLInputElement
const townCityInput = schoolAddressUpdateForm.querySelector('#townCityInput') as HTMLInputElement
const postalCodeInput = schoolAddressUpdateForm.querySelector('#postalCodeInput') as HTMLInputElement
const municipalityInput = schoolAddressUpdateForm.querySelector('#municipalityInput') as HTMLInputElement
const quintileInput = schoolAddressUpdateForm.querySelector('#quintileInput') as HTMLInputElement
const addressInfoCommentInput = schoolAddressUpdateForm.querySelector('#addressInfoCommentInput') as HTMLInputElement

schoolEmisInput.addEventListener('input', checkSchoolEMISValidity)
schoolPhoneNoInput.addEventListener('input', checkPhoneValidity)
schoolAlternatePhoneInput.addEventListener('input', checkOptionalPhoneValidity)
schoolEmailInput.addEventListener('input', checkOptionalEmailValidity)
streetAddressInput.addEventListener('input', checkOptionalTextValidity)
postalAddressInput.addEventListener('input', checkOptionalTextValidity)
suburbInput.addEventListener('input', checkOptionalTextValidity)
townCityInput.addEventListener('input', checkOptionalTextValidity)
postalCodeInput.addEventListener('input', checkOptionalPostalCodeValidity)
municipalityInput.addEventListener('input', checkOptionalTextValidity)
quintileInput.addEventListener('input', checkQuantileValidity)
addressInfoCommentInput.addEventListener('input', checkOptionalLongTextValidity)

handleAddressInfoSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Extras
handleToggleUpdateView()
addCounterToTextAreas()
