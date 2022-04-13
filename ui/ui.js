import {getEmployeesOptions} from "../service";
import {jsonToEmployees} from "../model/Employee";
import {
    employeeTableTemplateID,
    hiddenElementClassName,
    inputFieldValidationErrorClassName,
    paneClassName
} from "./constants";
import {
    addEmployeeFormElement,
    addEmployeeFormSubmitButtonElement,
    addEmployeeSurnameFieldErrorElement,
    addEmployeeUsernameFieldErrorElement,
    addPaneSectionElement,
    placeholderElement,
    searchEmployeeFormElement,
    searchPaneSectionElement,
    toggleShowAddPaneButtonElement,
    toggleShowSearchPaneButtonElement
} from "./elements";
import {
    addEmployeeOnServer,
    findByNameSurnameManagerEmployee, getEmployeesFromServer,
    handleServerError,
    removeEmployeeOnServer
} from "../server";

let employeeTableTemplate;
export let employeesArray;

toggleShowAddPaneButtonElement.addEventListener('click', () => openTab(addPaneSectionElement));
toggleShowSearchPaneButtonElement.addEventListener('click', () => openTab(searchPaneSectionElement));
addEmployeeFormElement.addEventListener('submit', addEmployeeUI);
searchEmployeeFormElement.addEventListener('submit', searchEmployeeUI);
searchEmployeeFormElement.addEventListener('reset', resetEmployeeUI);


export async function runUI() {
    employeeTableTemplate = document.getElementById(employeeTableTemplateID)
    employeesArray = await getEmployeesFromServer()
    const searchSelect = searchEmployeeFormElement.elements['managerRef'];
    const employeesOptions = [{
        text: '',
        value: -1,
    },
        ...getEmployeesOptions(employeesArray)
    ]
    searchSelect.parentNode.replaceChild(searchSelect,
        fillSelect(searchSelect, employeesOptions, -1)
    )
}

/**
 * Выводит список сотрудников на страницу
 * @param {Employee[]} employees
 */
async function showEmployees(employees) {
    clearEmployeeElement();
    const fragment = employeeTableTemplate.content.firstElementChild.cloneNode(true);
    const tbody = fragment.querySelector('tbody');
    const employeeRow = tbody.firstElementChild.cloneNode(true);
    tbody.firstElementChild.remove();
    placeholderElement.appendChild(fragment);
    for (const employee of employees) {
        const iEmployeeRow = employeeRow.cloneNode(true);
        const employeeRowCells = Array.from(iEmployeeRow.children).reduce((acc, cell) => {
            acc[cell.dataset.field] = cell
            return acc;
        }, {});
        employeeRowCells['id'].textContent = employee.id;
        employeeRowCells['department'].textContent = employee.department;
        employeeRowCells['name'].textContent = employee.fullName();
        employeeRowCells['phones'].textContent = employee.phones;
        employeeRowCells['dateOfBirth'].textContent = employee.dateOfBirth;
        employeeRowCells['age'].textContent = employee.age;
        /*  try {
              employeeRowCells['total'].textContent = await employee.total()
          } catch (e) {
              employeeRowCells['total'].textContent = `bonus is too big: ${e}`
          }*/
        employeeRowCells['actions'].addEventListener('click', () => removeEmployeeUI(employee.id))
        const targetSelectElement = fillSelect(employeeRowCells['managerSelect'].firstElementChild, getEmployeesOptions(employeesArray), employee.managerId ?? -1
        )
        targetSelectElement.addEventListener('change', () => {
            employee.managerRef = Number.parseInt(targetSelectElement.value, 10);
        })
        employeeRowCells['managerSelect'].replaceChild(
            employeeRowCells['managerSelect'].firstElementChild,
            targetSelectElement)
        tbody.appendChild(iEmployeeRow);
    }
}

/**
 * Обработчик кнопки удаления сотрудника
 * @param id
 */
function removeEmployeeUI(id) {
    removeEmployeeOnServer(id)
        .then(getEmployeesFromServer)
        .then(showEmployees)
}


/**
 *
 */
function clearEmployeeElement() {
    placeholderElement.innerHTML = '';
}

function addEmployeeUI(submitEvent) {
    submitEvent.preventDefault();
    const usernameInputElement = addEmployeeFormElement.elements.username;
    const surnameInputElement = addEmployeeFormElement.elements.surname;
    const usernameValue = usernameInputElement.value;
    /** пользовательский ввод фамилии сотрудника */
    const surnameValue = surnameInputElement.value;
    if (usernameValue.length === 0) {
        addEmployeeUsernameFieldErrorElement.textContent = 'Имя сотрудника должно быть задано';
    }
    if (surnameValue.length === 0) {
        addEmployeeSurnameFieldErrorElement.textContent = 'Фамилия сотрудника должна быть задана';
    }
    if (usernameValue.length > 0 && surnameValue.length > 0) {
        addEmployeeUsernameFieldErrorElement.textContent = ''
        addEmployeeSurnameFieldErrorElement.textContent = ''
        addEmployeeFormSubmitButtonElement.disabled = true
        addEmployeeOnServer(usernameValue, surnameValue)
            .then(getEmployeesFromServer)
            .then(showEmployees)
            .finally(() => {

                addEmployeeFormSubmitButtonElement.disabled = false;
            })
        addEmployeeFormElement.reset();
    }
}

/**
 * @typedef SelectOption
 * @property {string} text отображаемое значение
 * @property {number} value id значения
 */
/**
 *
 * @param {HTMLSelectElement} select <select> element
 * @param {SelectOption[]} values список значений
 * @param {number} selectedValue выбранное значение
 * @returns {HTMLSelectElement}
 */
function fillSelect(select, values, selectedValue) {
    for (const value of values) {
        const optionElement = document.createElement('option');
        optionElement.text = value.text;
        optionElement.value = value.value;
        if (selectedValue === value.value) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    }
    return select
}

function setFieldError(input) {
    input.classList.add(inputFieldValidationErrorClassName)
}

function resetFieldError(input) {
    input.classList.remove(inputFieldValidationErrorClassName)
}

function searchEmployeeUI(submitEvent) {
    submitEvent.preventDefault();
    const name = searchEmployeeFormElement.elements['name']
    const surname = searchEmployeeFormElement.elements['surname']
    const managerRef = searchEmployeeFormElement.elements['managerRef']
    const validationErrors = []
    if (!name.value || name.value.length === 0) {
        validationErrors.push('name')
    }
    if (!surname.value || surname.value.length === 0) {
        validationErrors.push('surname')
    }
    if (managerRef.value === "-1") {
        validationErrors.push('managerRef')
    }
    if (!validationErrors.length) {
        /*  const employees = searchEmployee(employeesArray, name.value, surname.value, Number.parseInt(managerRef, 10));*/
        findByNameSurnameManagerEmployee(name.value, surname.value, Number.parseInt(managerRef.value, 10))
            .then(showEmployees)
    } else {
        resetFieldError(name)
        resetFieldError(surname)
        resetFieldError(managerRef)
        if (validationErrors.includes('name')) {
            setFieldError(name);
        }
        if (validationErrors.includes('surname')) {
            setFieldError(surname);
        }
        if (validationErrors.includes('managerRef')) {
            setFieldError(managerRef)
        }

    }

}

function resetEmployeeUI() {
    showEmployees(employeesArray);
}

function openTab(element) {
    const panes = document.querySelectorAll(`.${paneClassName}`);
    panes.forEach((element) => {
        element.classList.add(hiddenElementClassName)
        element.setAttribute('aria-selected', 'false')
    })
    element.classList.remove(hiddenElementClassName);
    element.setAttribute('aria-selected', 'true')
}