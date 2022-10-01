export const checkURL = url => {
    const arrURL = url.split("api/");
    if (arrURL.length == 2) return arrURL[1];
    else false;
};