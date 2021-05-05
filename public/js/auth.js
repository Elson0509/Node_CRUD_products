const auth = () => {
    const token = localStorage.getItem('token')
    try{
        if(!token){
            return
        }
        else{
            $.get(`users/${token}`, (data) => {
                setUserStatus(data)
                return data
            })
            .fail((err) => {
                localStorage.clear()
                return 
            })
        }
    }
    catch(err){
        localStorage.clear()
        return
    }
}

const setUserStatus = (data) => {
    if(data){
        const userFound = `<span class="mr-4 text-light">Welcome, ${data.username}</span>
        <button type="button" class="btn btn-danger" onclick="logout()">Logout</button>`
        $('#userStatus').html(userFound)
    }        
}

const logout = () => {
    localStorage.clear()
    token = ''
    alert('Logout from the system!')
    const userFound = `<span class="mr-4 text-light">Welcome</span>
    <button type="button" class="btn btn-primary" onclick="login()">Login</button>`
        $('#userStatus').html(userFound)
}

const login = () => {
    window.location.href = '/login';
}