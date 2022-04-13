import {jsonToEmployees} from "./model/Employee";

import axios from 'axios';

const employeesServer = axios.create({baseURL: 'http://localhost:3333/employees'});

export function handleServerError(error) {
    if (error.response.data.message) {
        console.warn('server error', error.response.data.message)
    }
    if (error.message) {
        console.warn('request error', error.message)
    } else {
        console.error('unknown error occurred', error)
    }
}

employeesServer.interceptors.response.use(response => response, handleServerError)

export async function getEmployeesFromServer() {
    const res = employeesServer.get('');
    return res.data._embedded.employees.map(jsonToEmployees);

}

export function addEmployeeOnServer(name, surname) {
    return employeesServer.post('', {name, surname})
}

/**
 * Удаляет сотрудника на сервере
 * @param id
 * @returns {Promise<Response | void>}
 */
export function removeEmployeeOnServer(id) {
    return employeesServer.delete(`/${id}`)
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
    return employeesServer.get(`/search/findByNameSurnameManager?${params.toString()}`)
        .then((res) => res.data._embedded.employees)
        .then(jsonToEmployees)
}