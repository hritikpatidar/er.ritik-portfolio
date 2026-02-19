
// Local Storage
export const getItemLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem(key)
        return item
    }
    return ""
}

export const getJsonObjLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const obj = localStorage.getItem(key)
        return obj && obj !== "undefined" ? JSON.parse(obj) : false
    }
    return ""
}

export const setItemLocalStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value)
    }
}

export const removeItemLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key)
    }
}

export const clearLocalStorage = () => {
    if (typeof window !== "undefined") {
        const value = getItemLocalStorage("ribbonCut")
        localStorage.clear()
        if (value) setItemLocalStorage("ribbonCut", value)
    }
}

// Session Storage
export const getItemSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const item = sessionStorage.getItem(key)
        return item
    }
    return ""
}

export const setItemSessionStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem(key, value)
    }
}

export const removeItemSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem(key)
    }
}
