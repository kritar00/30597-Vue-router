import axios from 'axios'

async function deleteData(URL, id) {
    await axios.delete(`${URL}/${id}`);
}
async function postData(URL, value) {
    await axios.post(URL, value);
}
async function putData(URL, data) {
    await axios.put(`${URL}/${data.value.id}`, data.value);
}
async function getData(URL) {
    return await axios.get(URL);
    // data.value = response.data;
}

export { deleteData, postData, putData, getData }