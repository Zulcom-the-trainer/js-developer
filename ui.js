const employeePlaceholderID = "employeesPlaceholder"
const addEmployeeFormUsernameErrorID = "addEmployeeForm-error-username"
const addEmployeeFormSurnameErrorID = "addEmployeeForm-error-surname"
const employeeTableTemplateId = "employeeTableTemplate"
const placeholderElement = document.getElementById(employeePlaceholderID)
const addEmployeeFormElement = document.forms['addEmployeeForm'];
const addEmployeeUsernameFieldErrorElement = document.getElementById(addEmployeeFormUsernameErrorID);
const addEmployeeSurnameFieldErrorElement = document.getElementById(addEmployeeFormSurnameErrorID);
let employeeTableTemplate;
window.addEventListener('load', runUI);
addEmployeeFormElement.addEventListener('submit', addEmployeeUI);

addEmployeeFormElement.addEventListener('submit', function () {
    console.log(arguments)
})
addEmployeeFormElement.removeEventListener('submit', function () {
    console.log(arguments)
});


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
        const employeeRowCells = Array.from(employeeRow.children).reduce(function (acc, cell) {
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
        tbody.appendChild(employeeRow);
    }

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

function runUI() {
    employeeTableTemplate = document.getElementById(employeeTableTemplateId)
    showEmployees(DATA.employees);
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

