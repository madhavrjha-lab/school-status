"use strict";
// Set Validity On UI
const setValidity = (formField, isValid, message) => {
    if (isValid) {
        formField.classList.remove('invalid');
        formField.classList.add('valid');
    }
    else {
        formField.classList.remove('valid');
        formField.classList.add('invalid');
        const invalidMessage = formField.querySelector('.invalid-message');
        invalidMessage.textContent = message || 'This field is not valid';
    }
};
// Add Counter To Textareas
const addCounterToTextAreas = () => {
    const textares = document.querySelectorAll('textarea');
    textares.forEach(textarea => {
        textarea.addEventListener('input', (e) => {
            const span = textarea.parentElement?.querySelector('span');
            span.textContent = `(${textarea.value.length}/500)`;
        });
    });
};
// Toggle Update View
const handleToggleUpdateView = () => {
    const editBtns = document.querySelectorAll('#dataShow .accordion-body .edit-btn');
    const cancelBtns = document.querySelectorAll('#dataShow .accordion-body .cancel-btn');
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', (e) => {
            const fieldWrapper = editBtn.parentElement?.querySelector('.fields-wrapper');
            const formWrapper = editBtn.parentElement?.querySelector('.form-wrapper');
            fieldWrapper.classList.add('hide');
            formWrapper.classList.remove('hide');
            editBtn.classList.add('hide');
        });
    });
    cancelBtns.forEach(cancelBtn => {
        cancelBtn.addEventListener('click', (e) => {
            const formWrapper = cancelBtn.parentElement?.parentElement?.parentElement;
            const fieldWrapper = formWrapper?.parentElement?.querySelector('.fields-wrapper');
            const editBtn = formWrapper?.parentElement?.querySelector('.edit-btn');
            formWrapper.classList.add('hide');
            fieldWrapper.classList.remove('hide');
            editBtn.classList.remove('hide');
        });
    });
};
// Handle General Form Submit
const handleGeneralDetailsSubmit = () => {
    generalDetailsUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formFields = Array.from(generalDetailsUpdateForm.querySelectorAll('.form-field')).slice(0, -1);
        const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'));
        if (invalidFieldFound)
            return;
        let formFieldWrapper;
        let regEx;
        // schoolNameInput
        formFieldWrapper = schoolNameInput.parentElement?.parentElement;
        if (schoolNameInput.value.trim().length <= 3) {
            setValidity(formFieldWrapper, false, 'School name must be greater than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // noOfLearnersInput
        const totalLearners = Number(noOfLearnersInput.value);
        regEx = new RegExp(/^[1-9][0-9]*$/);
        formFieldWrapper = noOfLearnersInput.parentElement?.parentElement;
        if (!noOfLearnersInput.value) {
            setValidity(formFieldWrapper, false, "No of learners can't be empty");
        }
        else if (totalLearners === 0) {
            setValidity(formFieldWrapper, false, "No of learners can't be 0");
        }
        else if (totalLearners < 0) {
            setValidity(formFieldWrapper, false, "No of learners can't be a negative number");
        }
        else if (!regEx.test(String(totalLearners))) {
            setValidity(formFieldWrapper, false, "No of learners can't be a decimal");
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // circuitInput
        formFieldWrapper = circuitInput.parentElement?.parentElement;
        if (circuitInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolPhaseInput
        formFieldWrapper = schoolPhaseInput.parentElement?.parentElement;
        if (schoolPhaseInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolSectorInput
        formFieldWrapper = schoolSectorInput.parentElement?.parentElement;
        if (schoolSectorInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolLifecycleInput
        formFieldWrapper = schoolLifecycleInput.parentElement?.parentElement;
        if (schoolLifecycleInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // onboardingStatusInput
        formFieldWrapper = onboardingStatusInput.parentElement?.parentElement;
        if (onboardingStatusInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // nextActivityInput
        formFieldWrapper = nextActivityInput.parentElement?.parentElement;
        if (nextActivityInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // nextAppointmentInput
        formFieldWrapper = nextAppointmentInput.parentElement?.parentElement;
        if (nextAppointmentInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolWebsiteInput
        regEx = new RegExp(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/);
        formFieldWrapper = schoolWebsiteInput.parentElement?.parentElement;
        if (schoolWebsiteInput.value === '' || regEx.test(schoolWebsiteInput.value)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Please enter a valid URL');
        }
        // currentStatusInput
        formFieldWrapper = currentStatusInput.parentElement?.parentElement;
        if (currentStatusInput.value === '' ||
            (currentStatusInput.value.length > 30 && currentStatusInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        const isValid = formFields.every(formField => formField.classList.contains('valid'));
        isValid && generalDetailsUpdateForm.submit();
    });
};
// Handle Marketing Submit
const handleMarketingViewSubmit = () => {
    marketingActivitiesUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formFields = Array.from(marketingActivitiesUpdateForm.querySelectorAll('.form-field')).slice(0, -1);
        const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'));
        if (invalidFieldFound)
            return;
        let formFieldWrapper;
        // schoolPrincipalPainPointInput
        formFieldWrapper = schoolPrincipalPainPointInput.parentElement?.parentElement;
        if (schoolPrincipalPainPointInput.value === '' ||
            (schoolPrincipalPainPointInput.value.length > 30 && schoolPrincipalPainPointInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        // specialRequestInput
        formFieldWrapper = specialRequestInput.parentElement?.parentElement;
        if (specialRequestInput.value === '' ||
            (specialRequestInput.value.length > 30 && specialRequestInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        // specialRequestDateInput
        formFieldWrapper = specialRequestDateInput.parentElement?.parentElement;
        setValidity(formFieldWrapper, true);
        // stopperInput
        formFieldWrapper = stopperInput.parentElement?.parentElement;
        if (stopperInput.value === '' || (stopperInput.value.length > 30 && stopperInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        // supportRequiredInput
        formFieldWrapper = supportRequiredInput.parentElement?.parentElement;
        if (supportRequiredInput.value === '' ||
            (supportRequiredInput.value.length > 30 && supportRequiredInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        // lessonsLearntInput
        formFieldWrapper = lessonsLearntInput.parentElement?.parentElement;
        if (lessonsLearntInput.value === '' ||
            (lessonsLearntInput.value.length > 30 && lessonsLearntInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        // subscriptionOfferSgnatureDateInput
        formFieldWrapper = subscriptionOfferSgnatureDateInput.parentElement?.parentElement;
        setValidity(formFieldWrapper, true);
        const isValid = formFields.every(formField => formField.classList.contains('valid'));
        isValid && generalDetailsUpdateForm.submit();
    });
};
// Handle Attraction Activities Submit
const handleAttractionActivitiesSubmit = () => {
    attractionActivitiesUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formFields = Array.from(attractionActivitiesUpdateForm.querySelectorAll('.form-field')).slice(0, -1);
        const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'));
        if (invalidFieldFound)
            return;
        let formFieldWrapper;
        // principalBuyInInput
        formFieldWrapper = principalBuyInInput.parentElement?.parentElement;
        if (principalBuyInInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // sgbPresentationInput
        formFieldWrapper = sgbPresentationInput.parentElement?.parentElement;
        if (sgbPresentationInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // financeDocumentationInput
        formFieldWrapper = financeDocumentationInput.parentElement?.parentElement;
        if (financeDocumentationInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolDataInput
        formFieldWrapper = schoolDataInput.parentElement?.parentElement;
        if (schoolDataInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // smtEngagementInput
        formFieldWrapper = smtEngagementInput.parentElement?.parentElement;
        if (smtEngagementInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // ictChampionDemoInput
        formFieldWrapper = ictChampionDemoInput.parentElement?.parentElement;
        if (ictChampionDemoInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // educatorPresentationInput
        formFieldWrapper = educatorPresentationInput.parentElement?.parentElement;
        if (educatorPresentationInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // parentFlyerInput
        formFieldWrapper = parentFlyerInput.parentElement?.parentElement;
        if (parentFlyerInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // parentOnboardingInput
        formFieldWrapper = parentOnboardingInput.parentElement?.parentElement;
        if (parentOnboardingInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // weeklyOnboardingInput
        formFieldWrapper = weeklyOnboardingInput.parentElement?.parentElement;
        if (weeklyOnboardingInput.value === '') {
            setValidity(formFieldWrapper, false, 'This field is required');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // firstDateOfEngagingSchoolInput
        formFieldWrapper = firstDateOfEngagingSchoolInput.parentElement?.parentElement;
        setValidity(formFieldWrapper, true);
        // onboardingClosureDateInput
        formFieldWrapper = onboardingClosureDateInput.parentElement?.parentElement;
        setValidity(formFieldWrapper, true);
        const isValid = formFields.every(formField => formField.classList.contains('valid'));
        isValid && generalDetailsUpdateForm.submit();
    });
};
// Handle Address Info Submit
const handleAddressInfoSubmit = () => {
    schoolAddressUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formFields = Array.from(schoolAddressUpdateForm.querySelectorAll('.form-field')).slice(0, -1);
        const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'));
        if (invalidFieldFound)
            return;
        let formFieldWrapper;
        let regEx;
        let phoneNo;
        let emisNo;
        let email;
        let text;
        let postalCode;
        let quantile;
        // schoolEmisInput
        formFieldWrapper = schoolEmisInput.parentElement?.parentElement;
        emisNo = Number(schoolEmisInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!schoolEmisInput.value) {
            setValidity(formFieldWrapper, false, "EMIS can't be empty");
        }
        else if (emisNo === 0) {
            setValidity(formFieldWrapper, false, "EMIS can't be 0");
        }
        else if (emisNo < 0) {
            setValidity(formFieldWrapper, false, "EMIS can't be a negative number");
        }
        else if (!regEx.test(String(emisNo))) {
            setValidity(formFieldWrapper, false, "EMIS can't be a decimal");
        }
        else if (schoolEmisInput.value.length !== 9) {
            setValidity(formFieldWrapper, false, 'EMIS must be 9 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolPhoneNoInput
        formFieldWrapper = schoolPhoneNoInput.parentElement?.parentElement;
        phoneNo = Number(schoolPhoneNoInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!schoolPhoneNoInput.value) {
            setValidity(formFieldWrapper, false, "Phone No can't be empty");
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (schoolPhoneNoInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (schoolPhoneNoInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolAlternatePhoneInput
        formFieldWrapper = schoolAlternatePhoneInput.parentElement?.parentElement;
        phoneNo = Number(schoolAlternatePhoneInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!schoolAlternatePhoneInput.value) {
            setValidity(formFieldWrapper, true);
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (schoolAlternatePhoneInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (schoolAlternatePhoneInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // schoolEmailInput
        formFieldWrapper = schoolEmailInput.parentElement?.parentElement;
        email = schoolAlternatePhoneInput.value.trim();
        regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!email) {
            setValidity(formFieldWrapper, true);
        }
        else if (!regEx.test(email)) {
            setValidity(formFieldWrapper, false, 'Please, enter a valid email.');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // streetAddressInput
        formFieldWrapper = streetAddressInput.parentElement?.parentElement;
        text = streetAddressInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // postalAddressInput
        formFieldWrapper = postalAddressInput.parentElement?.parentElement;
        text = postalAddressInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // suburbInput
        formFieldWrapper = suburbInput.parentElement?.parentElement;
        text = suburbInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // townCityInput
        formFieldWrapper = townCityInput.parentElement?.parentElement;
        text = townCityInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // postalCodeInput
        formFieldWrapper = postalCodeInput.parentElement?.parentElement;
        postalCode = Number(postalCodeInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!postalCodeInput.value) {
            setValidity(formFieldWrapper, true);
        }
        else if (postalCode === 0) {
            setValidity(formFieldWrapper, false, "Postal code can't be only 0");
        }
        else if (postalCode < 0) {
            setValidity(formFieldWrapper, false, "Postal code can't be a negative");
        }
        else if (!regEx.test(String(postalCode))) {
            setValidity(formFieldWrapper, false, "Postal code can't be a decimal");
        }
        else if (postalCodeInput.value.length !== 4) {
            setValidity(formFieldWrapper, false, 'Postal code must be 4 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // municipalityInput
        formFieldWrapper = municipalityInput.parentElement?.parentElement;
        text = municipalityInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // quintileInput
        formFieldWrapper = quintileInput.parentElement?.parentElement;
        quantile = Number(quintileInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!quintileInput.value) {
            setValidity(formFieldWrapper, false, "Quantile can't be empty");
        }
        else if (quantile < 0) {
            setValidity(formFieldWrapper, false, "Quantile can't be a negative");
        }
        else if (!regEx.test(String(quantile))) {
            setValidity(formFieldWrapper, false, "Quantile can't be a zero or a decimal");
        }
        else if (quantile > 0 && quantile < 6) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, "Quantile can't be greater than 5");
        }
        // addressInfoCommentInput
        formFieldWrapper = addressInfoCommentInput.parentElement?.parentElement;
        if (addressInfoCommentInput.value === '' ||
            (addressInfoCommentInput.value.length > 30 && addressInfoCommentInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        const isValid = formFields.every(formField => formField.classList.contains('valid'));
        isValid && schoolAddressUpdateForm.submit();
    });
};
// Handle Principal Info Submit
const handlePrincipalsInfoSubmit = () => {
    principalInfoUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formFields = Array.from(principalInfoUpdateForm.querySelectorAll('.form-field')).slice(0, -1);
        const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'));
        if (invalidFieldFound)
            return;
        let formFieldWrapper;
        let regEx;
        let phoneNo;
        let text;
        let email;
        // principalNameInput
        formFieldWrapper = principalNameInput.parentElement?.parentElement;
        text = principalNameInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, false, "This can't be empty.");
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // principalMobileInput
        formFieldWrapper = principalMobileInput.parentElement?.parentElement;
        phoneNo = Number(principalMobileInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!principalMobileInput.value) {
            setValidity(formFieldWrapper, false, "Phone No can't be empty");
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (principalMobileInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (principalMobileInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // principalAlternateMobileInput
        formFieldWrapper = principalAlternateMobileInput.parentElement?.parentElement;
        phoneNo = Number(principalAlternateMobileInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!principalAlternateMobileInput.value) {
            setValidity(formFieldWrapper, true);
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (principalAlternateMobileInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (principalAlternateMobileInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // principalEmailAddressInput
        formFieldWrapper = principalEmailAddressInput.parentElement?.parentElement;
        email = principalEmailAddressInput.value.trim();
        regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!email) {
            setValidity(formFieldWrapper, false, "Email can't be empty.");
        }
        else if (!regEx.test(email)) {
            setValidity(formFieldWrapper, false, 'Please, enter a valid email.');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // billingContactNameInput
        formFieldWrapper = billingContactNameInput.parentElement?.parentElement;
        text = billingContactNameInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, false, "This can't be empty.");
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // billingContactPhoneNumberInput
        formFieldWrapper = billingContactPhoneNumberInput.parentElement?.parentElement;
        phoneNo = Number(billingContactPhoneNumberInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!billingContactPhoneNumberInput.value) {
            setValidity(formFieldWrapper, false, "Phone No can't be empty");
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (billingContactPhoneNumberInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (billingContactPhoneNumberInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // billingContactDesignationInput
        formFieldWrapper = billingContactDesignationInput.parentElement?.parentElement;
        text = billingContactDesignationInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, false, "This can't be empty.");
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // billingEmailAddressInput
        formFieldWrapper = billingEmailAddressInput.parentElement?.parentElement;
        email = billingEmailAddressInput.value.trim();
        regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!email) {
            setValidity(formFieldWrapper, false, "Email can't be empty.");
        }
        else if (!regEx.test(email)) {
            setValidity(formFieldWrapper, false, 'Please, enter a valid email.');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // billingDateInput
        formFieldWrapper = billingDateInput.parentElement?.parentElement;
        setValidity(formFieldWrapper, true);
        const isValid = formFields.every(formField => formField.classList.contains('valid'));
        isValid && principalInfoUpdateForm.submit();
    });
};
// Handle Stakeholders Info Submit
const handleStakeholdersInfoSubmit = () => {
    stakeholderInfoUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formFields = Array.from(stakeholderInfoUpdateForm.querySelectorAll('.form-field')).slice(0, -1);
        const invalidFieldFound = formFields.find(formField => formField.classList.contains('invalid'));
        if (invalidFieldFound)
            return;
        let formFieldWrapper;
        let regEx;
        let phoneNo;
        let text;
        let email;
        // sgbChairpersonNameInput
        formFieldWrapper = sgbChairpersonNameInput.parentElement?.parentElement;
        text = sgbChairpersonNameInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // sgbChairpersonPhoneInput
        formFieldWrapper = sgbChairpersonPhoneInput.parentElement?.parentElement;
        phoneNo = Number(sgbChairpersonPhoneInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!sgbChairpersonPhoneInput.value) {
            setValidity(formFieldWrapper, true);
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (sgbChairpersonPhoneInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (sgbChairpersonPhoneInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // sgbChairpersonEmailInput
        formFieldWrapper = sgbChairpersonEmailInput.parentElement?.parentElement;
        email = sgbChairpersonEmailInput.value.trim();
        regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!email) {
            setValidity(formFieldWrapper, true);
        }
        else if (!regEx.test(email)) {
            setValidity(formFieldWrapper, false, 'Please, enter a valid email');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact1NameInput
        formFieldWrapper = additionalContact1NameInput.parentElement?.parentElement;
        text = additionalContact1NameInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact1DesignationInput
        formFieldWrapper = additionalContact1DesignationInput.parentElement?.parentElement;
        text = additionalContact1DesignationInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact1MobileInput
        formFieldWrapper = additionalContact1MobileInput.parentElement?.parentElement;
        phoneNo = Number(additionalContact1MobileInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!additionalContact1MobileInput.value) {
            setValidity(formFieldWrapper, true);
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (additionalContact1MobileInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (additionalContact1MobileInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact1EmailInput
        formFieldWrapper = additionalContact1EmailInput.parentElement?.parentElement;
        email = additionalContact1EmailInput.value.trim();
        regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!email) {
            setValidity(formFieldWrapper, true);
        }
        else if (!regEx.test(email)) {
            setValidity(formFieldWrapper, false, 'Please, enter a valid email');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact2NameInput
        formFieldWrapper = additionalContact2NameInput.parentElement?.parentElement;
        text = additionalContact2NameInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact2DesignationInput
        formFieldWrapper = additionalContact2DesignationInput.parentElement?.parentElement;
        text = additionalContact2DesignationInput.value.trim();
        if (!text) {
            setValidity(formFieldWrapper, true);
        }
        else if (text.length <= 3) {
            setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact2MobileInput
        formFieldWrapper = additionalContact2MobileInput.parentElement?.parentElement;
        phoneNo = Number(additionalContact2MobileInput.value.trim());
        regEx = new RegExp(/^[1-9][0-9]*$/);
        if (!additionalContact2MobileInput.value) {
            setValidity(formFieldWrapper, true);
        }
        else if (phoneNo === 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be only 0");
        }
        else if (phoneNo < 0) {
            setValidity(formFieldWrapper, false, "Phone No can't be a negative");
        }
        else if (additionalContact2MobileInput.value[0] != '0') {
            setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
        }
        else if (!regEx.test(String(phoneNo))) {
            setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
        }
        else if (additionalContact2MobileInput.value.length !== 10) {
            setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // additionalContact2EmailInput
        formFieldWrapper = additionalContact2EmailInput.parentElement?.parentElement;
        email = additionalContact2EmailInput.value.trim();
        regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!email) {
            setValidity(formFieldWrapper, true);
        }
        else if (!regEx.test(email)) {
            setValidity(formFieldWrapper, false, 'Please, enter a valid email');
        }
        else {
            setValidity(formFieldWrapper, true);
        }
        // stakeholderInfoCommentInput
        formFieldWrapper = stakeholderInfoCommentInput.parentElement?.parentElement;
        if (stakeholderInfoCommentInput.value === '' ||
            (stakeholderInfoCommentInput.value.length > 30 && stakeholderInfoCommentInput.value.length < 500)) {
            setValidity(formFieldWrapper, true);
        }
        else {
            setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
        }
        const isValid = formFields.every(formField => formField.classList.contains('valid'));
        isValid && stakeholderInfoUpdateForm.submit();
    });
};
// Check School Name Validity
const checkSchoolNameValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    if (inputElement.value.trim().length <= 3) {
        // check greater than 3 characters
        setValidity(formFieldWrapper, false, 'School name must be greater than 3 characters');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check No of Learners Validity
const checkNoOfLearnersValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const totalLearners = Number(inputElement.value);
    const regEx = new RegExp(/^[1-9][0-9]*$/);
    if (!inputElement.value) {
        setValidity(formFieldWrapper, false, "No of learners can't be empty");
    }
    else if (totalLearners === 0) {
        setValidity(formFieldWrapper, false, "No of learners can't be 0");
    }
    else if (totalLearners < 0) {
        setValidity(formFieldWrapper, false, "No of learners can't be a negative number");
    }
    else if (!regEx.test(String(totalLearners))) {
        setValidity(formFieldWrapper, false, "No of learners can't be a decimal");
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Option Validity
const checkOptionValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    if (inputElement.value === '') {
        setValidity(formFieldWrapper, false, 'This field is required');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Date Validity
const checkDateValidiy = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    if (inputElement.value === '') {
        setValidity(formFieldWrapper, false, 'This field is required');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Optional Date Validity
const checkOptionalDateValidiy = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    setValidity(formFieldWrapper, true);
};
// Check URL Validity
const checkURLValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const regEx = new RegExp(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/);
    if (inputElement.value === '' || regEx.test(inputElement.value)) {
        setValidity(formFieldWrapper, true);
    }
    else {
        setValidity(formFieldWrapper, false, 'Please enter a valid URL');
    }
};
// Check Long Text Validity
const checkOptionalLongTextValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    if (inputElement.value === '' || (inputElement.value.length > 30 && inputElement.value.length < 500)) {
        setValidity(formFieldWrapper, true);
    }
    else {
        setValidity(formFieldWrapper, false, 'Content should be between 30 and 500 characters');
    }
};
// Check School EMIS Validity
const checkSchoolEMISValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const emisNo = Number(inputElement.value.trim());
    const regEx = new RegExp(/^[1-9][0-9]*$/);
    if (!inputElement.value) {
        setValidity(formFieldWrapper, false, "EMIS can't be empty");
    }
    else if (emisNo === 0) {
        setValidity(formFieldWrapper, false, "EMIS can't be 0");
    }
    else if (emisNo < 0) {
        setValidity(formFieldWrapper, false, "EMIS can't be a negative number");
    }
    else if (!regEx.test(String(emisNo))) {
        setValidity(formFieldWrapper, false, "EMIS can't be a decimal");
    }
    else if (inputElement.value.length !== 9) {
        setValidity(formFieldWrapper, false, 'EMIS must be 9 digits');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Phone Number Validity
const checkPhoneValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const phoneNo = Number(inputElement.value.trim());
    const regEx = new RegExp(/^[1-9][0-9]*$/);
    if (!inputElement.value) {
        setValidity(formFieldWrapper, false, "Phone No can't be empty");
    }
    else if (phoneNo === 0) {
        setValidity(formFieldWrapper, false, "Phone No can't be only 0");
    }
    else if (phoneNo < 0) {
        setValidity(formFieldWrapper, false, "Phone No can't be a negative");
    }
    else if (inputElement.value[0] != '0') {
        setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
    }
    else if (!regEx.test(String(phoneNo))) {
        setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
    }
    else if (inputElement.value.length !== 10) {
        setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Optional Phone Number Validity
const checkOptionalPhoneValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const phoneNo = Number(inputElement.value.trim());
    const regEx = new RegExp(/^[1-9][0-9]*$/);
    if (!inputElement.value) {
        setValidity(formFieldWrapper, true);
    }
    else if (phoneNo === 0) {
        setValidity(formFieldWrapper, false, "Phone No can't be only 0");
    }
    else if (phoneNo < 0) {
        setValidity(formFieldWrapper, false, "Phone No can't be a negative");
    }
    else if (inputElement.value[0] != '0') {
        setValidity(formFieldWrapper, false, 'Phone No must starts with 0');
    }
    else if (!regEx.test(String(phoneNo))) {
        setValidity(formFieldWrapper, false, "Phone No can't be a decimal");
    }
    else if (inputElement.value.length !== 10) {
        setValidity(formFieldWrapper, false, 'Phone No must be 10 digits');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Optional Postal Code Validity
const checkOptionalPostalCodeValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const postalCode = Number(inputElement.value.trim());
    const regEx = new RegExp(/^[1-9][0-9]*$/);
    if (!inputElement.value) {
        setValidity(formFieldWrapper, true);
    }
    else if (postalCode === 0) {
        setValidity(formFieldWrapper, false, "Postal code can't be only 0");
    }
    else if (postalCode < 0) {
        setValidity(formFieldWrapper, false, "Postal code can't be a negative");
    }
    else if (!regEx.test(String(postalCode))) {
        setValidity(formFieldWrapper, false, "Postal code can't be a decimal");
    }
    else if (inputElement.value.length !== 4) {
        setValidity(formFieldWrapper, false, 'Postal code must be 4 digits');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Optional Email Number Validity
const checkOptionalEmailValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const email = inputElement.value.trim();
    const regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!email) {
        setValidity(formFieldWrapper, true);
    }
    else if (!regEx.test(email)) {
        setValidity(formFieldWrapper, false, 'Please, enter a valid email');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Email Validity
const checkEmailValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const email = inputElement.value.trim();
    const regEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!email) {
        setValidity(formFieldWrapper, false, "Email can't be empty.");
    }
    else if (!regEx.test(email)) {
        setValidity(formFieldWrapper, false, 'Please, enter a valid email.');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Text Validity
const checkTextValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const text = inputElement.value.trim();
    if (!text) {
        setValidity(formFieldWrapper, false, "This can't be empty.");
    }
    else if (text.length <= 3) {
        setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// Check Optional Text Validity
const checkOptionalTextValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const text = inputElement.value.trim();
    if (!text) {
        setValidity(formFieldWrapper, true);
    }
    else if (text.length <= 3) {
        setValidity(formFieldWrapper, false, 'This should be atleast more than 3 characters');
    }
    else {
        setValidity(formFieldWrapper, true);
    }
};
// check Quantile Validity
const checkQuantileValidity = (e) => {
    const inputElement = e.target;
    const formFieldWrapper = inputElement.parentElement?.parentElement;
    const quantile = Number(inputElement.value.trim());
    const regEx = new RegExp(/^[1-9][0-9]*$/);
    if (!inputElement.value) {
        setValidity(formFieldWrapper, false, "Quantile can't be empty");
    }
    else if (quantile < 0) {
        setValidity(formFieldWrapper, false, "Quantile can't be a negative");
    }
    else if (!regEx.test(String(quantile))) {
        setValidity(formFieldWrapper, false, "Quantile can't be a zero or a decimal");
    }
    else if (quantile > 0 && quantile < 6) {
        setValidity(formFieldWrapper, true);
    }
    else {
        setValidity(formFieldWrapper, false, "Quantile can't be greater than 5");
    }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// General Details Form and Fields [General Details]
const generalDetailsUpdateForm = document.querySelector('#generalDetailsUpdateForm');
const schoolNameInput = generalDetailsUpdateForm.querySelector('#schoolNameInput');
const noOfLearnersInput = generalDetailsUpdateForm.querySelector('#noOfLearnersInput');
const circuitInput = generalDetailsUpdateForm.querySelector('#circuitInput');
const schoolPhaseInput = generalDetailsUpdateForm.querySelector('#schoolPhaseInput');
const schoolSectorInput = generalDetailsUpdateForm.querySelector('#schoolSectorInput');
const schoolLifecycleInput = generalDetailsUpdateForm.querySelector('#schoolLifecycleInput');
const onboardingStatusInput = generalDetailsUpdateForm.querySelector('#onboardingStatusInput');
const nextActivityInput = generalDetailsUpdateForm.querySelector('#nextActivityInput');
const nextAppointmentInput = generalDetailsUpdateForm.querySelector('#nextAppointmentInput');
const schoolWebsiteInput = generalDetailsUpdateForm.querySelector('#schoolWebsiteInput');
const currentStatusInput = generalDetailsUpdateForm.querySelector('#currentStatusInput');
// Form Filed Single Validation [General Details]
schoolNameInput.addEventListener('input', checkSchoolNameValidity);
noOfLearnersInput.addEventListener('input', checkNoOfLearnersValidity);
circuitInput.addEventListener('input', checkOptionValidity);
schoolPhaseInput.addEventListener('change', checkOptionValidity);
schoolSectorInput.addEventListener('change', checkOptionValidity);
schoolLifecycleInput.addEventListener('change', checkOptionValidity);
onboardingStatusInput.addEventListener('change', checkOptionValidity);
nextActivityInput.addEventListener('change', checkOptionValidity);
nextAppointmentInput.addEventListener('input', checkDateValidiy);
schoolWebsiteInput.addEventListener('input', checkURLValidity);
currentStatusInput.addEventListener('input', checkOptionalLongTextValidity);
// Form Submit Validation
handleGeneralDetailsSubmit();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Marketing Activities Form and Fields [Marketing Activities]
const marketingActivitiesUpdateForm = document.querySelector('#marketingActivitiesUpdateForm');
const schoolPrincipalPainPointInput = marketingActivitiesUpdateForm.querySelector('#schoolPrincipalPainPointInput');
const specialRequestInput = marketingActivitiesUpdateForm.querySelector('#specialRequestInput');
const specialRequestDateInput = marketingActivitiesUpdateForm.querySelector('#specialRequestDateInput');
const stopperInput = marketingActivitiesUpdateForm.querySelector('#stopperInput');
const supportRequiredInput = marketingActivitiesUpdateForm.querySelector('#supportRequiredInput');
const lessonsLearntInput = marketingActivitiesUpdateForm.querySelector('#lessonsLearntInput');
const subscriptionOfferSgnatureDateInput = marketingActivitiesUpdateForm.querySelector('#subscriptionOfferSgnatureDateInput');
// Form Filed Single Validation [General Details]
schoolPrincipalPainPointInput.addEventListener('input', checkOptionalLongTextValidity);
specialRequestInput.addEventListener('input', checkOptionalLongTextValidity);
specialRequestDateInput.addEventListener('input', checkOptionalDateValidiy);
stopperInput.addEventListener('input', checkOptionalLongTextValidity);
supportRequiredInput.addEventListener('input', checkOptionalLongTextValidity);
lessonsLearntInput.addEventListener('input', checkOptionalLongTextValidity);
subscriptionOfferSgnatureDateInput.addEventListener('input', checkOptionalDateValidiy);
// Form Submit Validation
handleMarketingViewSubmit();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const attractionActivitiesUpdateForm = document.querySelector('#attractionActivitiesUpdateForm');
const firstDateOfEngagingSchoolInput = attractionActivitiesUpdateForm.querySelector('#firstDateOfEngagingSchoolInput');
const principalBuyInInput = attractionActivitiesUpdateForm.querySelector('#principalBuyInInput');
const sgbPresentationInput = attractionActivitiesUpdateForm.querySelector('#sgbPresentationInput');
const financeDocumentationInput = attractionActivitiesUpdateForm.querySelector('#financeDocumentationInput');
const schoolDataInput = attractionActivitiesUpdateForm.querySelector('#schoolDataInput');
const smtEngagementInput = attractionActivitiesUpdateForm.querySelector('#smtEngagementInput');
const ictChampionDemoInput = attractionActivitiesUpdateForm.querySelector('#ictChampionDemoInput');
const educatorPresentationInput = attractionActivitiesUpdateForm.querySelector('#educatorPresentationInput');
const parentFlyerInput = attractionActivitiesUpdateForm.querySelector('#parentFlyerInput');
const parentOnboardingInput = attractionActivitiesUpdateForm.querySelector('#parentOnboardingInput');
const weeklyOnboardingInput = attractionActivitiesUpdateForm.querySelector('#weeklyOnboardingInput');
const onboardingClosureDateInput = attractionActivitiesUpdateForm.querySelector('#onboardingClosureDateInput');
firstDateOfEngagingSchoolInput.addEventListener('change', checkOptionalDateValidiy);
principalBuyInInput.addEventListener('change', checkOptionValidity);
sgbPresentationInput.addEventListener('change', checkOptionValidity);
financeDocumentationInput.addEventListener('change', checkOptionValidity);
schoolDataInput.addEventListener('change', checkOptionValidity);
smtEngagementInput.addEventListener('change', checkOptionValidity);
ictChampionDemoInput.addEventListener('change', checkOptionValidity);
educatorPresentationInput.addEventListener('change', checkOptionValidity);
parentFlyerInput.addEventListener('change', checkOptionValidity);
parentOnboardingInput.addEventListener('change', checkOptionValidity);
weeklyOnboardingInput.addEventListener('change', checkOptionValidity);
onboardingClosureDateInput.addEventListener('change', checkOptionalDateValidiy);
handleAttractionActivitiesSubmit();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const schoolAddressUpdateForm = document.querySelector('#schoolAddressUpdateForm');
const schoolEmisInput = schoolAddressUpdateForm.querySelector('#schoolEmisInput');
const schoolPhoneNoInput = schoolAddressUpdateForm.querySelector('#schoolPhoneNoInput');
const schoolAlternatePhoneInput = schoolAddressUpdateForm.querySelector('#schoolAlternatePhoneInput');
const schoolEmailInput = schoolAddressUpdateForm.querySelector('#schoolEmailInput');
const streetAddressInput = schoolAddressUpdateForm.querySelector('#streetAddressInput');
const postalAddressInput = schoolAddressUpdateForm.querySelector('#postalAddressInput');
const suburbInput = schoolAddressUpdateForm.querySelector('#suburbInput');
const townCityInput = schoolAddressUpdateForm.querySelector('#townCityInput');
const postalCodeInput = schoolAddressUpdateForm.querySelector('#postalCodeInput');
const municipalityInput = schoolAddressUpdateForm.querySelector('#municipalityInput');
const quintileInput = schoolAddressUpdateForm.querySelector('#quintileInput');
const addressInfoCommentInput = schoolAddressUpdateForm.querySelector('#addressInfoCommentInput');
schoolEmisInput.addEventListener('input', checkSchoolEMISValidity);
schoolPhoneNoInput.addEventListener('input', checkPhoneValidity);
schoolAlternatePhoneInput.addEventListener('input', checkOptionalPhoneValidity);
schoolEmailInput.addEventListener('input', checkOptionalEmailValidity);
streetAddressInput.addEventListener('input', checkOptionalTextValidity);
postalAddressInput.addEventListener('input', checkOptionalTextValidity);
suburbInput.addEventListener('input', checkOptionalTextValidity);
townCityInput.addEventListener('input', checkOptionalTextValidity);
postalCodeInput.addEventListener('input', checkOptionalPostalCodeValidity);
municipalityInput.addEventListener('input', checkOptionalTextValidity);
quintileInput.addEventListener('input', checkQuantileValidity);
addressInfoCommentInput.addEventListener('input', checkOptionalLongTextValidity);
handleAddressInfoSubmit();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const principalInfoUpdateForm = document.querySelector('#principalInfoUpdateForm');
const principalNameInput = principalInfoUpdateForm.querySelector('#principalNameInput');
const principalMobileInput = principalInfoUpdateForm.querySelector('#principalMobileInput');
const principalAlternateMobileInput = principalInfoUpdateForm.querySelector('#principalAlternateMobileInput');
const principalEmailAddressInput = principalInfoUpdateForm.querySelector('#principalEmailAddressInput');
const billingContactNameInput = principalInfoUpdateForm.querySelector('#billingContactNameInput');
const billingContactPhoneNumberInput = principalInfoUpdateForm.querySelector('#billingContactPhoneNumberInput');
const billingContactDesignationInput = principalInfoUpdateForm.querySelector('#billingContactDesignationInput');
const billingEmailAddressInput = principalInfoUpdateForm.querySelector('#billingEmailAddressInput');
const billingDateInput = principalInfoUpdateForm.querySelector('#billingDateInput');
principalNameInput.addEventListener('input', checkTextValidity);
principalMobileInput.addEventListener('input', checkPhoneValidity);
principalAlternateMobileInput.addEventListener('input', checkOptionalPhoneValidity);
principalEmailAddressInput.addEventListener('input', checkEmailValidity);
billingContactNameInput.addEventListener('input', checkTextValidity);
billingContactPhoneNumberInput.addEventListener('input', checkPhoneValidity);
billingContactDesignationInput.addEventListener('input', checkTextValidity);
billingEmailAddressInput.addEventListener('input', checkEmailValidity);
billingDateInput.addEventListener('input', checkOptionalDateValidiy);
handlePrincipalsInfoSubmit();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const stakeholderInfoUpdateForm = document.querySelector('#stakeholderInfoUpdateForm');
const sgbChairpersonNameInput = stakeholderInfoUpdateForm.querySelector('#sgbChairpersonNameInput');
const sgbChairpersonPhoneInput = stakeholderInfoUpdateForm.querySelector('#sgbChairpersonPhoneInput');
const sgbChairpersonEmailInput = stakeholderInfoUpdateForm.querySelector('#sgbChairpersonEmailInput');
const additionalContact1NameInput = stakeholderInfoUpdateForm.querySelector('#additionalContact1NameInput');
const additionalContact1DesignationInput = stakeholderInfoUpdateForm.querySelector('#additionalContact1DesignationInput');
const additionalContact1MobileInput = stakeholderInfoUpdateForm.querySelector('#additionalContact1MobileInput');
const additionalContact1EmailInput = stakeholderInfoUpdateForm.querySelector('#additionalContact1EmailInput');
const additionalContact2NameInput = stakeholderInfoUpdateForm.querySelector('#additionalContact2NameInput');
const additionalContact2DesignationInput = stakeholderInfoUpdateForm.querySelector('#additionalContact2DesignationInput');
const additionalContact2MobileInput = stakeholderInfoUpdateForm.querySelector('#additionalContact2MobileInput');
const additionalContact2EmailInput = stakeholderInfoUpdateForm.querySelector('#additionalContact2EmailInput');
const stakeholderInfoCommentInput = stakeholderInfoUpdateForm.querySelector('#stakeholderInfoCommentInput');
sgbChairpersonNameInput.addEventListener('input', checkOptionalTextValidity);
sgbChairpersonPhoneInput.addEventListener('input', checkOptionalPhoneValidity);
sgbChairpersonEmailInput.addEventListener('input', checkOptionalEmailValidity);
additionalContact1NameInput.addEventListener('input', checkOptionalTextValidity);
additionalContact1DesignationInput.addEventListener('input', checkOptionalTextValidity);
additionalContact1MobileInput.addEventListener('input', checkOptionalPhoneValidity);
additionalContact1EmailInput.addEventListener('input', checkOptionalEmailValidity);
additionalContact2NameInput.addEventListener('input', checkOptionalTextValidity);
additionalContact2DesignationInput.addEventListener('input', checkOptionalTextValidity);
additionalContact2MobileInput.addEventListener('input', checkOptionalPhoneValidity);
additionalContact2EmailInput.addEventListener('input', checkOptionalEmailValidity);
stakeholderInfoCommentInput.addEventListener('input', checkOptionalLongTextValidity);
handleStakeholdersInfoSubmit();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Extras
handleToggleUpdateView();
addCounterToTextAreas();
