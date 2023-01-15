const baseURL = 'http://localhost:5000/'
export async function fetchHotel(){
    const respond = await fetch(`${baseURL}hotel_list`)
    const data = await respond.json()
    return data;
}
