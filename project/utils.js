export function getDataFromDoc(doc){
    const data = doc.data();
    data.id = doc.id;
    return data;
}
// lay du lieu tu get many documents
export function getDataFromDocs(data) {
    return data.docs.map(getDataFromDoc)
}
