import { HTTP } from "./http";

function getDataLeague() {
    return new Promise(function (resolve, reject) {
        HTTP.get("getAllLeagues")
            .then(response => {
                resolve(response.data.league);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getDataMatch() {
    return new Promise(function (resolve, reject) {
        HTTP.get("getFixturesByDateInterval")
            .then(response => {
                resolve(response.data.match);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getAllFixtures(id) {
    let favour = [];
    if (localStorage.getItem("favour")) {
        favour = JSON.parse(localStorage.getItem("favour"));
    }
    return new Promise(function (resolve, reject) {
        HTTP.get("allFixtures_" + id)
            .then(response => {
                let data = [];
                response.data.match.forEach((item, i) => {
                    let favoriteStatus = false;
                    favour.forEach((tip, i) => {
                        if (item.id === tip.id) {
                            favoriteStatus = true;
                        }
                    });
                    item["favoriteStatus"] = favoriteStatus;
                    data.push(item);
                });
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function getDataArticle() {
    return new Promise(function (resolve, reject) {
        HTTP.get("https://newsapi.org/v2/top-headlines?sources=talksport&apiKey=0e05cfcfe2724a07846e6f1ade74520f")
            .then(response => {
                resolve(response.data.articles);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getDataLive() {
    return new Promise(function (resolve, reject) {
        HTTP.get("getLiveScore")
            .then(response => {
                let data = response.data.match;
                if (data.length > 1) {
                    resolve(data);
                } else {
                    resolve([data]);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function checkIfUpdate(lastData) {
    if (lastData) {
        let dataNow = new Date();
        let prevData = new Date(lastData)
        let delta = dataNow - prevData;
        let minutes = Math.round(delta / (60 * 1000));
        let hours = Math.floor(minutes / 60);
        return (hours >= 1) ? true : false;
    } else {
        return true;
    }

}



export { getAllFixtures, getDataLeague, getDataMatch, getDataArticle, checkIfUpdate, getDataLive };