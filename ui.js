import {addEmployee, formatDate, getAge, getEmployeesOptions, removeEmployee, searchEmployee} from "./service";
import {DATA} from "./employees-json";

const employeePlaceholderID = "employeesPlaceholder"
const addEmployeeFormUsernameErrorID = "addEmployeeForm-error-username"
const addEmployeeFormSurnameErrorID = "addEmployeeForm-error-surname"
const employeeTableTemplateId = "employeeTableTemplate"
const placeholderElement = document.getElementById(employeePlaceholderID)
const addEmployeeFormElement = document.forms['addEmployeeForm'];
const searchEmployeeFormElement = document.forms['searchEmployeeForm'];
const addEmployeeUsernameFieldErrorElement = document.getElementById(addEmployeeFormUsernameErrorID);
const addEmployeeSurnameFieldErrorElement = document.getElementById(addEmployeeFormSurnameErrorID);
let employeeTableTemplate;
addEmployeeFormElement.addEventListener('submit', addEmployeeUI);
searchEmployeeFormElement.addEventListener('submit', searchEmployeeUI);
searchEmployeeFormElement.addEventListener('reset', resetEmployeeUI);

/**
 * Выводит список сотрудников на страницу
 * @param employees
 */
function showEmployees(employees) {
    clearEmployeeElement();
    const fragment = employeeTableTemplate.content.firstElementChild.cloneNode(true);
    const tbody = fragment.querySelector('tbody');
    for (const employee of employees) {
        const employeeRow = tbody.firstElementChild.cloneNode(true);
        const employeeRowCells = Array.from(employeeRow.children).reduce((acc, cell) => {
            acc[cell.dataset.field] = cell
            return acc;
        }, {});
        employeeRowCells['id'].textContent = employee.id;
        employeeRowCells['department'].textContent = employee.department;
        employeeRowCells['name'].textContent = `${employee.name} ${employee.surname}`;
        if (Array.isArray(employee.phones)) {
            employeeRowCells['phones'].textContent = employee.phones;
        }
        if (employee.dateOfBirth) {
            employeeRowCells['dateOfBirth'].textContent = formatDate(employee.dateOfBirth);
            employeeRowCells['age'].textContent = getAge(employee.id);
        }
        employeeRowCells['actions'].addEventListener('click', () => removeEmployeeUI(employee.id))
        const targetSelectElement = fillSelect(employeeRowCells['managerSelect'].firstElementChild, getEmployeesOptions(), employee.managerId ?? -1
        )
        targetSelectElement.addEventListener('change', () => {
            employee.managerRef = Number.parseInt(targetSelectElement.value, 10);
        })
        employeeRowCells['managerSelect'].replaceChild(
            employeeRowCells['managerSelect'].firstElementChild,
            targetSelectElement)

        tbody.appendChild(employeeRow);
    }
    tbody.firstElementChild.remove();
    placeholderElement.appendChild(fragment);
}

/**
 * Обработчик кнопки удаления сотрудника
 * @param id
 */
function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(DATA.employees);
}


/**
 *
 */
function clearEmployeeElement() {
    placeholderElement.innerHTML = '';
}

export function runUI() {
    employeeTableTemplate = document.getElementById(employeeTableTemplateId)
    showEmployees(DATA.employees);
    const searchSelect = searchEmployeeFormElement.elements['managerRef'];
    searchSelect.parentNode.replaceChild(searchSelect,
        fillSelect(searchSelect, getEmployeesOptions(),  -1)
    )
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
        addEmployee(usernameValue, surnameValue);
        showEmployees(DATA.employees);
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

function searchEmployeeUI(submitEvent) {
    submitEvent.preventDefault();
    const name = searchEmployeeFormElement.elements['name'].value
    const surname = searchEmployeeFormElement.elements['surname'].value
    const managerRef = searchEmployeeFormElement.elements['managerRef'].value
    const employees = searchEmployee(name, surname, Number.parseInt(managerRef,10));
    showEmployees(employees);
}

function resetEmployeeUI() {
    showEmployees(DATA.employees);
}
