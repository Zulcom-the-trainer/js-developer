import {
    addEmployeeFormSurnameErrorID,
    addEmployeeFormUsernameErrorID,
    addPaneSectionID,
    employeePlaceholderID,
    searchPaneSectionID,
    toggleShowAddPaneButtonID,
    toggleShowSearchPaneButtonID
} from "./constants";

export const toggleShowAddPaneButtonElement = document.getElementById(toggleShowAddPaneButtonID)
export const toggleShowSearchPaneButtonElement = document.getElementById(toggleShowSearchPaneButtonID)
export const addPaneSectionElement = document.getElementById(addPaneSectionID);
export const searchPaneSectionElement = document.getElementById(searchPaneSectionID);
export const placeholderElement = document.getElementById(employeePlaceholderID)
export const addEmployeeFormElement = document.forms['addEmployeeForm'];
export const searchEmployeeFormElement = document.forms['searchEmployeeForm'];
export const addEmployeeUsernameFieldErrorElement = document.getElementById(addEmployeeFormUsernameErrorID);
export const addEmployeeSurnameFieldErrorElement = document.getElementById(addEmployeeFormSurnameErrorID);