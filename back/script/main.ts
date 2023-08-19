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
			span.textContent = `(${textarea.value.length}/300)`
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Handle General Form Submit
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

// Handle Principal Info Submit
const handlePrincipalsInfoSubmit = (): void => {
	principalInfoUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			principalInfoUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement
		let regEx: RegExp
		let phoneNo: number
		let text: string
		let email: string

		// principalNameInput
		formFieldWrapper = principalNameInput.parentElement?.parentElement as HTMLDivElement
		text = principalNameInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, false, "This can't be empty.")
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// principalMobileInput
		formFieldWrapper = principalMobileInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(principalMobileInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!principalMobileInput.value) {
			setValidity(formFieldWrapper, false, "Phone No can't be empty")
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (principalMobileInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (principalMobileInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// principalAlternateMobileInput
		formFieldWrapper = principalAlternateMobileInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(principalAlternateMobileInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!principalAlternateMobileInput.value) {
			setValidity(formFieldWrapper, true)
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (principalAlternateMobileInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (principalAlternateMobileInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// principalEmailAddressInput
		formFieldWrapper = principalEmailAddressInput.parentElement?.parentElement as HTMLDivElement
		email = principalEmailAddressInput.value.trim()
		regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

		if (!email) {
			setValidity(formFieldWrapper, false, "Email can't be empty.")
		} else if (!regEx.test(email)) {
			setValidity(formFieldWrapper, false, 'Please, enter a valid email.')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// billingContactNameInput
		formFieldWrapper = billingContactNameInput.parentElement?.parentElement as HTMLDivElement
		text = billingContactNameInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, false, "This can't be empty.")
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// billingContactPhoneNumberInput
		formFieldWrapper = billingContactPhoneNumberInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(billingContactPhoneNumberInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!billingContactPhoneNumberInput.value) {
			setValidity(formFieldWrapper, false, "Phone No can't be empty")
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (billingContactPhoneNumberInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (billingContactPhoneNumberInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// billingContactDesignationInput
		formFieldWrapper = billingContactDesignationInput.parentElement?.parentElement as HTMLDivElement
		text = billingContactDesignationInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, false, "This can't be empty.")
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// billingEmailAddressInput
		formFieldWrapper = billingEmailAddressInput.parentElement?.parentElement as HTMLDivElement
		email = billingEmailAddressInput.value.trim()
		regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

		if (!email) {
			setValidity(formFieldWrapper, false, "Email can't be empty.")
		} else if (!regEx.test(email)) {
			setValidity(formFieldWrapper, false, 'Please, enter a valid email.')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// billingDateInput
		formFieldWrapper = billingDateInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && principalInfoUpdateForm.submit()
	})
}

// Handle Stakeholders Info Submit
const handleStakeholdersInfoSubmit = (): void => {
	stakeholderInfoUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			stakeholderInfoUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement
		let regEx: RegExp
		let phoneNo: number
		let text: string
		let email: string

		// sgbChairpersonNameInput
		formFieldWrapper = sgbChairpersonNameInput.parentElement?.parentElement as HTMLDivElement
		text = sgbChairpersonNameInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// sgbChairpersonPhoneInput
		formFieldWrapper = sgbChairpersonPhoneInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(sgbChairpersonPhoneInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!sgbChairpersonPhoneInput.value) {
			setValidity(formFieldWrapper, true)
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (sgbChairpersonPhoneInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (sgbChairpersonPhoneInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// sgbChairpersonEmailInput
		formFieldWrapper = sgbChairpersonEmailInput.parentElement?.parentElement as HTMLDivElement
		email = sgbChairpersonEmailInput.value.trim()
		regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

		if (!email) {
			setValidity(formFieldWrapper, true)
		} else if (!regEx.test(email)) {
			setValidity(formFieldWrapper, false, 'Please, enter a valid email')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact1NameInput
		formFieldWrapper = additionalContact1NameInput.parentElement?.parentElement as HTMLDivElement
		text = additionalContact1NameInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact1DesignationInput
		formFieldWrapper = additionalContact1DesignationInput.parentElement?.parentElement as HTMLDivElement
		text = additionalContact1DesignationInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact1MobileInput
		formFieldWrapper = additionalContact1MobileInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(additionalContact1MobileInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!additionalContact1MobileInput.value) {
			setValidity(formFieldWrapper, true)
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (additionalContact1MobileInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (additionalContact1MobileInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact1EmailInput
		formFieldWrapper = additionalContact1EmailInput.parentElement?.parentElement as HTMLDivElement
		email = additionalContact1EmailInput.value.trim()
		regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

		if (!email) {
			setValidity(formFieldWrapper, true)
		} else if (!regEx.test(email)) {
			setValidity(formFieldWrapper, false, 'Please, enter a valid email')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact2NameInput
		formFieldWrapper = additionalContact2NameInput.parentElement?.parentElement as HTMLDivElement
		text = additionalContact2NameInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact2DesignationInput
		formFieldWrapper = additionalContact2DesignationInput.parentElement?.parentElement as HTMLDivElement
		text = additionalContact2DesignationInput.value.trim()

		if (!text) {
			setValidity(formFieldWrapper, true)
		} else if (text.length <= 3) {
			setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact2MobileInput
		formFieldWrapper = additionalContact2MobileInput.parentElement?.parentElement as HTMLDivElement
		phoneNo = Number(additionalContact2MobileInput.value.trim())
		regEx = new RegExp(/^[1-9][0-9]*$/)

		if (!additionalContact2MobileInput.value) {
			setValidity(formFieldWrapper, true)
		} else if (phoneNo === 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be only 0")
		} else if (phoneNo < 0) {
			setValidity(formFieldWrapper, false, "Phone No can't be a negative")
		} else if (additionalContact2MobileInput.value[0] != '0') {
			setValidity(formFieldWrapper, false, 'Phone No must starts with 0')
		} else if (!regEx.test(String(phoneNo))) {
			setValidity(formFieldWrapper, false, "Phone No can't be a decimal")
		} else if (additionalContact2MobileInput.value.length !== 10) {
			setValidity(formFieldWrapper, false, 'Phone No must be 10 digits')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// additionalContact2EmailInput
		formFieldWrapper = additionalContact2EmailInput.parentElement?.parentElement as HTMLDivElement
		email = additionalContact2EmailInput.value.trim()
		regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

		if (!email) {
			setValidity(formFieldWrapper, true)
		} else if (!regEx.test(email)) {
			setValidity(formFieldWrapper, false, 'Please, enter a valid email')
		} else {
			setValidity(formFieldWrapper, true)
		}

		// stakeholderInfoCommentInput
		formFieldWrapper = stakeholderInfoCommentInput.parentElement?.parentElement as HTMLDivElement
		if (
			stakeholderInfoCommentInput.value === '' ||
			(stakeholderInfoCommentInput.value.length > 30 && stakeholderInfoCommentInput.value.length < 500)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters')
		}

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && stakeholderInfoUpdateForm.submit()
	})
}

// Handle School Values Submit
const handleSchoolValuesSubmit = (): void => {
	schoolValuesUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			schoolValuesUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement

		// schoolSloganInput
		formFieldWrapper = schoolSloganInput.parentElement?.parentElement as HTMLDivElement
		if (
			schoolSloganInput.value === '' ||
			(schoolSloganInput.value.length > 10 && schoolSloganInput.value.length <= 300)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
		}

		// schoolMissionInput
		formFieldWrapper = schoolMissionInput.parentElement?.parentElement as HTMLDivElement
		if (
			schoolMissionInput.value === '' ||
			(schoolMissionInput.value.length > 10 && schoolMissionInput.value.length <= 300)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
		}

		// schoolVisionInput
		formFieldWrapper = schoolVisionInput.parentElement?.parentElement as HTMLDivElement
		if (
			schoolVisionInput.value === '' ||
			(schoolVisionInput.value.length > 10 && schoolVisionInput.value.length <= 300)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
		}

		// schoolValuesInput
		formFieldWrapper = schoolValuesInput.parentElement?.parentElement as HTMLDivElement
		if (
			schoolValuesInput.value === '' ||
			(schoolValuesInput.value.length > 10 && schoolValuesInput.value.length <= 300)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
		}

		// schoolLogoInput
		formFieldWrapper = schoolLogoInput.parentElement?.parentElement as HTMLDivElement
		if (schoolLogoInput.value === '' || (schoolLogoInput.value.length > 10 && schoolLogoInput.value.length <= 300)) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
		}

		// schoolGalleryPhotosInput
		formFieldWrapper = schoolGalleryPhotosInput.parentElement?.parentElement as HTMLDivElement
		if (
			schoolGalleryPhotosInput.value === '' ||
			(schoolGalleryPhotosInput.value.length > 10 && schoolGalleryPhotosInput.value.length <= 300)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
		}

		// schoolVideosInput
		formFieldWrapper = schoolVideosInput.parentElement?.parentElement as HTMLDivElement
		if (
			schoolVideosInput.value === '' ||
			(schoolVideosInput.value.length > 10 && schoolVideosInput.value.length <= 300)
		) {
			setValidity(formFieldWrapper, true)
		} else {
			setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
		}

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && schoolValuesUpdateForm.submit()
	})
}

// Handle Engagement Activities Submit
const handleEngagementActivitiesSubmit = (): void => {
	engageActivitiesUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			engageActivitiesUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement

		// schoolSloganInput
		formFieldWrapper = schoolSloganInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolPhotoDataStatusInput
		formFieldWrapper = schoolPhotoDataStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// meetingSgbChairpersonStatusInput
		formFieldWrapper = meetingSgbChairpersonStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// meetingSgbFinComTreasurerStatusInput
		formFieldWrapper = meetingSgbFinComTreasurerStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// principalTrainingsStatusInput
		formFieldWrapper = principalTrainingsStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// ictTrainingsStatusInput
		formFieldWrapper = ictTrainingsStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// timetableTypeStatusInput
		formFieldWrapper = timetableTypeStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// uploadTimetableStatusInput
		formFieldWrapper = uploadTimetableStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolValuesStatusInput
		formFieldWrapper = schoolValuesStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && engageActivitiesUpdateForm.submit()
	})
}

// Handle Sales Docs Submit
const handleSalesDocSubmit = (): void => {
	salesDocUpdateForm.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			salesDocUpdateForm.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement

		// firstQuotationDateInput
		formFieldWrapper = firstQuotationDateInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// quotationInput
		formFieldWrapper = quotationInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// subscriptionAgreementInput
		formFieldWrapper = subscriptionAgreementInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// purchaseOrderInput
		formFieldWrapper = purchaseOrderInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// invoiceInput
		formFieldWrapper = invoiceInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// firstPaymentDateInput
		formFieldWrapper = firstPaymentDateInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// firstInvoiceDateInput
		formFieldWrapper = firstInvoiceDateInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && salesDocUpdateForm.submit()
	})
}

// Handle Tech Check Submit
const handleTechCheckSubmit = (): void => {
	techCheckFormUpdate.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			techCheckFormUpdate.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement

		// crmSchoolInfoStatusInput
		formFieldWrapper = crmSchoolInfoStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// crmPrincipalInfoStatusInput
		formFieldWrapper = crmPrincipalInfoStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// crmIctCommitteeStatusInput
		formFieldWrapper = crmIctCommitteeStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolUrlStatusInput
		formFieldWrapper = schoolUrlStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolLogoStatusInput
		formFieldWrapper = schoolLogoStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolPhotosStatusInput
		formFieldWrapper = schoolPhotosStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolDataStatusInput
		formFieldWrapper = schoolDataStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolTimetableStatusInput
		formFieldWrapper = schoolTimetableStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolGalleryStatusInput
		formFieldWrapper = schoolGalleryStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolUniformStatusInput
		formFieldWrapper = schoolUniformStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolBookstoreStatusInput
		formFieldWrapper = schoolBookstoreStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolEventCalendarStatusInput
		formFieldWrapper = schoolEventCalendarStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// smsLoginsToEducatorsStatusInput
		formFieldWrapper = smsLoginsToEducatorsStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// parentFlyersPrintingStatusInput
		formFieldWrapper = parentFlyersPrintingStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && techCheckFormUpdate.submit()
	})
}

// Handle Remote Tech Check Submit
const handleRemoteTechCheckSubmit = (): void => {
	remoteTechCheckFormUpdate.addEventListener('submit', (e: SubmitEvent) => {
		e.preventDefault()

		const formFields = Array.from(
			remoteTechCheckFormUpdate.querySelectorAll('.form-field') as NodeListOf<HTMLDivElement>
		).slice(0, -1)

		const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'))
		if (invalidFieldFound) return

		let formFieldWrapper: HTMLDivElement

		// crmSchoolInfoStatusInput
		formFieldWrapper = crmSchoolInfoStatusInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// stagingStartedInput
		formFieldWrapper = stagingStartedInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// buyDomainInput
		formFieldWrapper = buyDomainInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// cloudFlareInput
		formFieldWrapper = cloudFlareInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// reCaptchaInput
		formFieldWrapper = reCaptchaInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// websiteModeInput
		formFieldWrapper = websiteModeInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolAssetsInput
		formFieldWrapper = schoolAssetsInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolDataStagingInput
		formFieldWrapper = schoolDataStagingInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// uploadSchoolDataInput
		formFieldWrapper = uploadSchoolDataInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// roleManagementInput
		formFieldWrapper = roleManagementInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// ictChampionAdminInput
		formFieldWrapper = ictChampionAdminInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// ictChampionLoginInput
		formFieldWrapper = ictChampionLoginInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolResourcesInput
		formFieldWrapper = schoolResourcesInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// seoInput
		formFieldWrapper = seoInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// googleMapsInput
		formFieldWrapper = googleMapsInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// faviconInput
		formFieldWrapper = faviconInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// homepageLogoInput
		formFieldWrapper = homepageLogoInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// districtLogoInput
		formFieldWrapper = districtLogoInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// metadataInput
		formFieldWrapper = metadataInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		// schoolReadinessCompletedInput
		formFieldWrapper = schoolReadinessCompletedInput.parentElement?.parentElement as HTMLDivElement
		setValidity(formFieldWrapper, true)

		const isValid = formFields.every(formField => formField.classList.contains('valid'))

		isValid && remoteTechCheckFormUpdate.submit()
	})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// Check Optional Option Validity
const checkOptionalOptionValidity = (e: Event) => {
	const inputElement = e.target as HTMLSelectElement
	const formFieldWrapper = inputElement.parentElement?.parentElement as HTMLDivElement

	setValidity(formFieldWrapper, true)
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

	if (inputElement.value === '' || (inputElement.value.length > 10 && inputElement.value.length <= 300)) {
		setValidity(formFieldWrapper, true)
	} else {
		setValidity(formFieldWrapper, false, 'Content should be between 10 and 300 characters')
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

const principalInfoUpdateForm = document.querySelector('#principalInfoUpdateForm') as HTMLFormElement
const principalNameInput = principalInfoUpdateForm.querySelector('#principalNameInput') as HTMLInputElement
const principalMobileInput = principalInfoUpdateForm.querySelector('#principalMobileInput') as HTMLInputElement
const principalAlternateMobileInput = principalInfoUpdateForm.querySelector(
	'#principalAlternateMobileInput'
) as HTMLInputElement
const principalEmailAddressInput = principalInfoUpdateForm.querySelector(
	'#principalEmailAddressInput'
) as HTMLInputElement
const billingContactNameInput = principalInfoUpdateForm.querySelector('#billingContactNameInput') as HTMLInputElement
const billingContactPhoneNumberInput = principalInfoUpdateForm.querySelector(
	'#billingContactPhoneNumberInput'
) as HTMLInputElement
const billingContactDesignationInput = principalInfoUpdateForm.querySelector(
	'#billingContactDesignationInput'
) as HTMLInputElement
const billingEmailAddressInput = principalInfoUpdateForm.querySelector('#billingEmailAddressInput') as HTMLInputElement
const billingDateInput = principalInfoUpdateForm.querySelector('#billingDateInput') as HTMLInputElement

principalNameInput.addEventListener('input', checkTextValidity)
principalMobileInput.addEventListener('input', checkPhoneValidity)
principalAlternateMobileInput.addEventListener('input', checkOptionalPhoneValidity)
principalEmailAddressInput.addEventListener('input', checkEmailValidity)
billingContactNameInput.addEventListener('input', checkTextValidity)
billingContactPhoneNumberInput.addEventListener('input', checkPhoneValidity)
billingContactDesignationInput.addEventListener('input', checkTextValidity)
billingEmailAddressInput.addEventListener('input', checkEmailValidity)
billingDateInput.addEventListener('input', checkOptionalDateValidiy)

handlePrincipalsInfoSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const stakeholderInfoUpdateForm = document.querySelector('#stakeholderInfoUpdateForm') as HTMLFormElement
const sgbChairpersonNameInput = stakeholderInfoUpdateForm.querySelector('#sgbChairpersonNameInput') as HTMLInputElement
const sgbChairpersonPhoneInput = stakeholderInfoUpdateForm.querySelector(
	'#sgbChairpersonPhoneInput'
) as HTMLInputElement
const sgbChairpersonEmailInput = stakeholderInfoUpdateForm.querySelector(
	'#sgbChairpersonEmailInput'
) as HTMLInputElement
const additionalContact1NameInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact1NameInput'
) as HTMLInputElement
const additionalContact1DesignationInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact1DesignationInput'
) as HTMLInputElement
const additionalContact1MobileInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact1MobileInput'
) as HTMLInputElement
const additionalContact1EmailInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact1EmailInput'
) as HTMLInputElement
const additionalContact2NameInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact2NameInput'
) as HTMLInputElement
const additionalContact2DesignationInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact2DesignationInput'
) as HTMLInputElement
const additionalContact2MobileInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact2MobileInput'
) as HTMLInputElement
const additionalContact2EmailInput = stakeholderInfoUpdateForm.querySelector(
	'#additionalContact2EmailInput'
) as HTMLInputElement
const stakeholderInfoCommentInput = stakeholderInfoUpdateForm.querySelector(
	'#stakeholderInfoCommentInput'
) as HTMLInputElement

sgbChairpersonNameInput.addEventListener('input', checkOptionalTextValidity)
sgbChairpersonPhoneInput.addEventListener('input', checkOptionalPhoneValidity)
sgbChairpersonEmailInput.addEventListener('input', checkOptionalEmailValidity)
additionalContact1NameInput.addEventListener('input', checkOptionalTextValidity)
additionalContact1DesignationInput.addEventListener('input', checkOptionalTextValidity)
additionalContact1MobileInput.addEventListener('input', checkOptionalPhoneValidity)
additionalContact1EmailInput.addEventListener('input', checkOptionalEmailValidity)
additionalContact2NameInput.addEventListener('input', checkOptionalTextValidity)
additionalContact2DesignationInput.addEventListener('input', checkOptionalTextValidity)
additionalContact2MobileInput.addEventListener('input', checkOptionalPhoneValidity)
additionalContact2EmailInput.addEventListener('input', checkOptionalEmailValidity)
stakeholderInfoCommentInput.addEventListener('input', checkOptionalLongTextValidity)

handleStakeholdersInfoSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const schoolValuesUpdateForm = document.querySelector('#schoolValuesUpdateForm') as HTMLFormElement
const schoolSloganInput = schoolValuesUpdateForm.querySelector('#schoolSloganInput') as HTMLTextAreaElement
const schoolMissionInput = schoolValuesUpdateForm.querySelector('#schoolMissionInput') as HTMLTextAreaElement
const schoolVisionInput = schoolValuesUpdateForm.querySelector('#schoolVisionInput') as HTMLTextAreaElement
const schoolValuesInput = schoolValuesUpdateForm.querySelector('#schoolValuesInput') as HTMLTextAreaElement
const schoolLogoInput = schoolValuesUpdateForm.querySelector('#schoolLogoInput') as HTMLTextAreaElement
const schoolGalleryPhotosInput = schoolValuesUpdateForm.querySelector(
	'#schoolGalleryPhotosInput'
) as HTMLTextAreaElement
const schoolVideosInput = schoolValuesUpdateForm.querySelector('#schoolVideosInput') as HTMLTextAreaElement

schoolSloganInput.addEventListener('input', checkOptionalLongTextValidity)
schoolMissionInput.addEventListener('input', checkOptionalLongTextValidity)
schoolVisionInput.addEventListener('input', checkOptionalLongTextValidity)
schoolValuesInput.addEventListener('input', checkOptionalLongTextValidity)
schoolLogoInput.addEventListener('input', checkOptionalLongTextValidity)
schoolGalleryPhotosInput.addEventListener('input', checkOptionalLongTextValidity)
schoolVideosInput.addEventListener('input', checkOptionalLongTextValidity)

handleSchoolValuesSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const engageActivitiesUpdateForm = document.querySelector('#engageActivitiesUpdateForm') as HTMLFormElement
const schoolPhotoDataStatusInput = engageActivitiesUpdateForm.querySelector(
	'#schoolPhotoDataStatusInput'
) as HTMLSelectElement
const meetingSgbChairpersonStatusInput = engageActivitiesUpdateForm.querySelector(
	'#meetingSgbChairpersonStatusInput'
) as HTMLSelectElement
const meetingSgbFinComTreasurerStatusInput = engageActivitiesUpdateForm.querySelector(
	'#meetingSgbFinComTreasurerStatusInput'
) as HTMLSelectElement
const principalTrainingsStatusInput = engageActivitiesUpdateForm.querySelector(
	'#principalTrainingsStatusInput'
) as HTMLSelectElement
const ictTrainingsStatusInput = engageActivitiesUpdateForm.querySelector(
	'#ictTrainingsStatusInput'
) as HTMLSelectElement
const timetableTypeStatusInput = engageActivitiesUpdateForm.querySelector(
	'#timetableTypeStatusInput'
) as HTMLSelectElement
const uploadTimetableStatusInput = engageActivitiesUpdateForm.querySelector(
	'#uploadTimetableStatusInput'
) as HTMLSelectElement
const schoolValuesStatusInput = engageActivitiesUpdateForm.querySelector(
	'#schoolValuesStatusInput'
) as HTMLSelectElement

schoolPhotoDataStatusInput.addEventListener('change', checkOptionalOptionValidity)
meetingSgbChairpersonStatusInput.addEventListener('change', checkOptionalOptionValidity)
meetingSgbFinComTreasurerStatusInput.addEventListener('change', checkOptionalOptionValidity)
principalTrainingsStatusInput.addEventListener('change', checkOptionalOptionValidity)
ictTrainingsStatusInput.addEventListener('change', checkOptionalOptionValidity)
timetableTypeStatusInput.addEventListener('change', checkOptionalOptionValidity)
uploadTimetableStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolValuesStatusInput.addEventListener('change', checkOptionalOptionValidity)

handleEngagementActivitiesSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const salesDocUpdateForm = document.querySelector('#salesDocUpdateForm') as HTMLFormElement
const firstQuotationDateInput = salesDocUpdateForm.querySelector('#firstQuotationDateInput') as HTMLInputElement
const quotationInput = salesDocUpdateForm.querySelector('#quotationInput') as HTMLOptionElement
const subscriptionAgreementInput = salesDocUpdateForm.querySelector('#subscriptionAgreementInput') as HTMLOptionElement
const purchaseOrderInput = salesDocUpdateForm.querySelector('#purchaseOrderInput') as HTMLOptionElement
const invoiceInput = salesDocUpdateForm.querySelector('#invoiceInput') as HTMLOptionElement
const firstPaymentDateInput = salesDocUpdateForm.querySelector('#firstPaymentDateInput') as HTMLInputElement
const firstInvoiceDateInput = salesDocUpdateForm.querySelector('#firstInvoiceDateInput') as HTMLInputElement

firstQuotationDateInput.addEventListener('change', checkOptionalDateValidiy)
quotationInput.addEventListener('change', checkOptionalOptionValidity)
subscriptionAgreementInput.addEventListener('change', checkOptionalOptionValidity)
purchaseOrderInput.addEventListener('change', checkOptionalOptionValidity)
invoiceInput.addEventListener('change', checkOptionalOptionValidity)
firstPaymentDateInput.addEventListener('change', checkOptionalDateValidiy)
firstInvoiceDateInput.addEventListener('change', checkOptionalDateValidiy)

handleSalesDocSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const techCheckFormUpdate = document.querySelector('#techCheckFormUpdate') as HTMLFormElement
const crmSchoolInfoStatusInput = techCheckFormUpdate.querySelector('#crmSchoolInfoStatusInput') as HTMLSelectElement
const crmPrincipalInfoStatusInput = techCheckFormUpdate.querySelector(
	'#crmPrincipalInfoStatusInput'
) as HTMLSelectElement
const crmIctCommitteeStatusInput = techCheckFormUpdate.querySelector('#crmIctCommitteeStatusInput') as HTMLSelectElement
const schoolUrlStatusInput = techCheckFormUpdate.querySelector('#schoolUrlStatusInput') as HTMLSelectElement
const schoolLogoStatusInput = techCheckFormUpdate.querySelector('#schoolLogoStatusInput') as HTMLSelectElement
const schoolPhotosStatusInput = techCheckFormUpdate.querySelector('#schoolPhotosStatusInput') as HTMLSelectElement
const schoolDataStatusInput = techCheckFormUpdate.querySelector('#schoolDataStatusInput') as HTMLSelectElement
const schoolTimetableStatusInput = techCheckFormUpdate.querySelector('#schoolTimetableStatusInput') as HTMLSelectElement
const schoolGalleryStatusInput = techCheckFormUpdate.querySelector('#schoolGalleryStatusInput') as HTMLSelectElement
const schoolUniformStatusInput = techCheckFormUpdate.querySelector('#schoolUniformStatusInput') as HTMLSelectElement
const schoolBookstoreStatusInput = techCheckFormUpdate.querySelector('#schoolBookstoreStatusInput') as HTMLSelectElement
const schoolEventCalendarStatusInput = techCheckFormUpdate.querySelector(
	'#schoolEventCalendarStatusInput'
) as HTMLSelectElement
const smsLoginsToEducatorsStatusInput = techCheckFormUpdate.querySelector(
	'#smsLoginsToEducatorsStatusInput'
) as HTMLSelectElement
const parentFlyersPrintingStatusInput = techCheckFormUpdate.querySelector(
	'#parentFlyersPrintingStatusInput'
) as HTMLSelectElement

crmSchoolInfoStatusInput.addEventListener('change', checkOptionalOptionValidity)
crmPrincipalInfoStatusInput.addEventListener('change', checkOptionalOptionValidity)
crmIctCommitteeStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolUrlStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolLogoStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolPhotosStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolDataStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolTimetableStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolGalleryStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolUniformStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolBookstoreStatusInput.addEventListener('change', checkOptionalOptionValidity)
schoolEventCalendarStatusInput.addEventListener('change', checkOptionalOptionValidity)
smsLoginsToEducatorsStatusInput.addEventListener('change', checkOptionalOptionValidity)
parentFlyersPrintingStatusInput.addEventListener('change', checkOptionalOptionValidity)

handleTechCheckSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const remoteTechCheckFormUpdate = document.querySelector('#remoteTechCheckFormUpdate') as HTMLFormElement
const stagingStartedInput = remoteTechCheckFormUpdate.querySelector('#stagingStartedInput') as HTMLInputElement
const buyDomainInput = remoteTechCheckFormUpdate.querySelector('#buyDomainInput') as HTMLSelectElement
const cloudFlareInput = remoteTechCheckFormUpdate.querySelector('#cloudFlareInput') as HTMLSelectElement
const reCaptchaInput = remoteTechCheckFormUpdate.querySelector('#reCaptchaInput') as HTMLSelectElement
const websiteModeInput = remoteTechCheckFormUpdate.querySelector('#websiteModeInput') as HTMLSelectElement
const schoolAssetsInput = remoteTechCheckFormUpdate.querySelector('#schoolAssetsInput') as HTMLSelectElement
const schoolDataStagingInput = remoteTechCheckFormUpdate.querySelector('#schoolDataStagingInput') as HTMLSelectElement
const uploadSchoolDataInput = remoteTechCheckFormUpdate.querySelector('#uploadSchoolDataInput') as HTMLSelectElement
const roleManagementInput = remoteTechCheckFormUpdate.querySelector('#roleManagementInput') as HTMLSelectElement
const ictChampionAdminInput = remoteTechCheckFormUpdate.querySelector('#ictChampionAdminInput') as HTMLSelectElement
const ictChampionLoginInput = remoteTechCheckFormUpdate.querySelector('#ictChampionLoginInput') as HTMLSelectElement
const schoolResourcesInput = remoteTechCheckFormUpdate.querySelector('#schoolResourcesInput') as HTMLSelectElement
const seoInput = remoteTechCheckFormUpdate.querySelector('#seoInput') as HTMLSelectElement
const googleMapsInput = remoteTechCheckFormUpdate.querySelector('#googleMapsInput') as HTMLSelectElement
const faviconInput = remoteTechCheckFormUpdate.querySelector('#faviconInput') as HTMLSelectElement
const homepageLogoInput = remoteTechCheckFormUpdate.querySelector('#homepageLogoInput') as HTMLSelectElement
const districtLogoInput = remoteTechCheckFormUpdate.querySelector('#districtLogoInput') as HTMLSelectElement
const metadataInput = remoteTechCheckFormUpdate.querySelector('#metadataInput') as HTMLSelectElement
const schoolReadinessCompletedInput = remoteTechCheckFormUpdate.querySelector(
	'#schoolReadinessCompletedInput'
) as HTMLInputElement

stagingStartedInput.addEventListener('change', checkOptionalDateValidiy)
buyDomainInput.addEventListener('change', checkOptionalOptionValidity)
cloudFlareInput.addEventListener('change', checkOptionalOptionValidity)
reCaptchaInput.addEventListener('change', checkOptionalOptionValidity)
websiteModeInput.addEventListener('change', checkOptionalOptionValidity)
schoolAssetsInput.addEventListener('change', checkOptionalOptionValidity)
schoolDataStagingInput.addEventListener('change', checkOptionalOptionValidity)
uploadSchoolDataInput.addEventListener('change', checkOptionalOptionValidity)
roleManagementInput.addEventListener('change', checkOptionalOptionValidity)
ictChampionAdminInput.addEventListener('change', checkOptionalOptionValidity)
ictChampionLoginInput.addEventListener('change', checkOptionalOptionValidity)
schoolResourcesInput.addEventListener('change', checkOptionalOptionValidity)
seoInput.addEventListener('change', checkOptionalOptionValidity)
googleMapsInput.addEventListener('change', checkOptionalOptionValidity)
faviconInput.addEventListener('change', checkOptionalOptionValidity)
homepageLogoInput.addEventListener('change', checkOptionalOptionValidity)
districtLogoInput.addEventListener('change', checkOptionalOptionValidity)
metadataInput.addEventListener('change', checkOptionalOptionValidity)
schoolReadinessCompletedInput.addEventListener('change', checkOptionalDateValidiy)

handleRemoteTechCheckSubmit()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Extras
handleToggleUpdateView()
addCounterToTextAreas()
