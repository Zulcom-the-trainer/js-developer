import * as ui from './ui/ui';

export * from './ui/ui';

export function runUI() {
    ui.runUI();
}

export {searchPaneSectionID} from "./ui/constants";
export {toggleShowSearchPaneButtonID} from "./ui/constants";
export {paneClassName} from "./ui/constants";
export {toggleShowAddPaneButtonID} from "./ui/constants";
export {hiddenElementClassName} from "./ui/constants";
export {inputFieldValidationErrorClassName} from "./ui/constants";
export {employeeTableTemplateID} from "./ui/constants";
export {addEmployeeFormSurnameErrorID} from "./ui/constants";
export {addEmployeeFormUsernameErrorID} from "./ui/constants";
export {employeePlaceholderID} from "./ui/constants";
export {addEmployeeSurnameFieldErrorElement} from "./ui/elements";
export {addEmployeeUsernameFieldErrorElement} from "./ui/elements";
export {searchEmployeeFormElement} from "./ui/elements";
export {addEmployeeFormElement} from "./ui/elements";
export {placeholderElement} from "./ui/elements";
export {searchPaneSectionElement} from "./ui/elements";
export {addPaneSectionElement} from "./ui/elements";
export {toggleShowSearchPaneButtonElement} from "./ui/elements";
export {toggleShowAddPaneButtonElement} from "./ui/elements";
export {findByNameSurnameManagerEmployee} from "./server";
export {findByNameEmployeeOnServer} from "./server";
export {removeEmployeeOnServer} from "./server";
export {addEmployeeOnServer} from "./server";
export {handleServerError} from "./server";