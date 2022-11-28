import axios from 'axios'

async function deleteData(URL, id) {
    await axios.delete(`${URL}/${id}`);
}
async function postData(URL, value) {
    await axios.post(URL, value);
}
async function putData(URL, value) {
    await axios.put(`${URL}/${value.id}`, value);
}
async function getData(URL) {
    return await axios.get(URL);
    // data.value = response.data;
}

export { deleteData, postData, putData, getData }