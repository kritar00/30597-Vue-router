import axios from 'axios'

async function deleteData(URL, id) {
    await axios.delete(`${URL}/${id}`);
}
async function postData(URL, value) {
    await axios.post(URL, value);
}
async function putData(URL, data) {
    console.log(data);
    await axios.put(`${URL}/${data.id}`, data);
}
async function getData(URL) {
    return await axios.get(URL);
}

export { deleteData, postData, putData, getData }