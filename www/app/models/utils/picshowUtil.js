export const fetchCarInfo = async(nowid)=>{
    const {result} = await fetch(`/api/carinfo/${nowid}`).then(data=>data.json());

    return result;
}
export const fetchCarLikes = async(nowid)=>{
    const {results} = await fetch(`/api/carlike/${nowid}`).then(data=>data.json());

    return results;
}
export const fetchCarImages = async(nowid)=>{
    const {images} = await fetch(`/api/carimages/${nowid}/`).then(data=>data.json());
    console.log(images);

    return images;
}