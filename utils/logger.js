"use strict"

export function log(action, details) {
    let time = new Date().toLocaleTimeString();
    return `[${time}] ${action}: ${details}`;
}