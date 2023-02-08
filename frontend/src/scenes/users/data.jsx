

export async function  getData(userService){
    const response = await userService.all()
    const usersMapped = [...response.data];
    usersMapped.map((user) =>{
        return user
    })
    return usersMapped;
}
