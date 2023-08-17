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
// Handle GeneralFormSubmit
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
        // isValid && generalDetailsUpdateForm.submit()
        isValid && console.log(1);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// General Details Form and Fields [General Details]
const generalDetailsUpdateForm = document.querySelector('#generalDetailsUpdateForm');
const schoolNameInput = generalDetailsUpdateForm.querySelector('#schoolNameInput');
const noOfLearnersInput = generalDetailsUpdateForm.querySelector('#noOfLearnersInput');
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
// Extras
handleToggleUpdateView();
addCounterToTextAreas();
