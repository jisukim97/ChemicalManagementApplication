export const login = ({ user, lab }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('lab', JSON.stringify(lab))
}

export const getUser = () => {
    const user = localStorage.getItem('user')
    try {
        return JSON.parse(user)
    } catch (e) {
        return null
    }
}

export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('lab')
}

export const getLab = () => {
    const lab = localStorage.getItem('lab')
    try { 
        return JSON.parse(lab)
    } catch (e) {
        return null
    }
}