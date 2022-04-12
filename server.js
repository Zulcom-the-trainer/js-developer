import {jsonToEmployees} from "./model/Employee";

const SERVER_BASE_URL = 'http://localhost:3333';

export function handleServerError(e) {
    console.error(e)
    document.write('Произошла ошибка сервера')
}

export function addEmployeeOnServer(name, surname) {
    return fetch(`${SERVER_BASE_URL}/employees`, {
        method: 'POST',
        body: JSON.stringify({
            name, surname
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch(handleServerError)
}

/**
 * Удаляет сотрудника на сервере
 * @param id
 * @returns {Promise<Response | void>}
 */
export function removeEmployeeOnServer(id) {
    return fetch(`${SERVER_BASE_URL}/employees/${id}`, {
        method: 'delete'
    }).catch(handleServerError)
}

/**
 * Search for Employee by his name
 * @param name {string}
 * @returns {Promise<Employee[]>}
 */
function findByNameEmployeeOnServer(name) {
    const params = new URLSearchParams()
    params.set('name', name)
    return fetch(`${SERVER_BASE_URL}/employees/search/findByName?` + params.toString())
        .then(res => res.json())
        .then((res) => res._embedded.employees)
        .then(jsonToEmployees)
}

/**
 * Поиск сотрудников по имени+фамилии+руководителю
 * @param name {string}
 * @param surname {string}
 * @param managerId {number}
 * @returns {Promise<Employee[]>}
 */
export function findByNameSurnameManagerEmployee(name, surname, managerId) {
    const params = new URLSearchParams()
    params.set('name', name)
    params.set('surname', surname)
    params.set('managerId', managerId)
    return fetch(`${SERVER_BASE_URL}/employees/search/findByNameSurnameManager?` + params.toString())
        .then(res => res.json())
        .then((res) => res._embedded.employees)
        .then(jsonToEmployees)
}