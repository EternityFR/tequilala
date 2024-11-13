function loadJSON() {
    const quotasurl = './Quotas.json?nocache=' + new Date().getTime();
    const ventesurl = './Ventes.json?nocache=' + new Date().getTime();
    fetch(quotasurl)
        .then(response => response.json())
        .then(data => {
            populatequotasTable(data)
            getFileModificationDate();
        })
        .catch(error => console.error('Erreur de chargement du fichier JSON:', error));

    fetch(ventesurl)
        .then(response => response.json())
        .then(data => {
            populateventesTable(data)
        })
        .catch(error => console.error('Erreur de chargement du fichier JSON:', error));
}
function populatequotasTable(data) {
    const tableBody = document.querySelector("#quotasTable tbody");
    tableBody.innerHTML = "";

    for (const name in data) {
        if (data.hasOwnProperty(name)) {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            const bottlesCell = document.createElement("td");
            const hoursCell = document.createElement("td");
            const bonusCell = document.createElement("td");

            nameCell.textContent = name;
            bottlesCell.textContent = data[name].Bouteilles;
            if (data[name].Bouteilles >= 2000) {
                bottlesCell.style.color = "green";
            } else {
                bottlesCell.style.color = "red";
                bottlesCell.textContent += " / 2000";
            }

            hoursCell.textContent = data[name].Heures;
            if (data[name].Bouteilles <= 2999) {
                bonus = "0$";
            } else if (data[name].Bouteilles >= 3000 && data[name].Bouteilles <= 3999) {
                bonus = "15 000$";
            } else if (data[name].Bouteilles >= 4000 && data[name].Bouteilles <= 4999) {
                bonus = "20 000$";
            } else if (data[name].Bouteilles >= 5000 && data[name].Bouteilles <= 5999) {
                bonus = "25 000$";
            } else if (data[name].Bouteilles >= 6000 && data[name].Bouteilles <= 6999) {
                bonus = "30 000$";
            } else if (data[name].Bouteilles >= 7000 && data[name].Bouteilles <= 7999) {
                bonus = "35 000$";
            } else if (data[name].Bouteilles >= 8000 && data[name].Bouteilles <= 8999) {
                bonus = "40 000$";
            } else if (data[name].Bouteilles >= 9000 && data[name].Bouteilles <= 9999) {
                bonus = "45 000$";
            } else if (data[name].Bouteilles >= 10000 && data[name].Bouteilles <= 14999) {
                bonus = "50 000$";
            } else if (data[name].Bouteilles >= 15000 && data[name].Bouteilles <= 19999) {
                bonus = "75 000$";
            } else if (data[name].Bouteilles >= 20000) {
                bonus = "100 000$";
            }

            bonusCell.textContent = bonus;

            row.appendChild(nameCell);
            row.appendChild(bottlesCell);
            row.appendChild(hoursCell);
            row.appendChild(bonusCell);
            tableBody.appendChild(row);
        }
    }
}
function populateventesTable(data) {
    const tableBody = document.querySelector("#ventesTable tbody");
    tableBody.innerHTML = "";

    for (const name in data) {
        if (data.hasOwnProperty(name)) {
            if (data[name].Ventes != "0$") {

                const row = document.createElement("tr");

                const nameCell = document.createElement("td");
                const ventesCell = document.createElement("td");

                nameCell.textContent = name;
                ventesCell.textContent = data[name].Ventes;

                row.appendChild(nameCell);
                row.appendChild(ventesCell);
                tableBody.appendChild(row);
            }
        }
    }
}
function getFileModificationDate() {
    const url = './Quotas.json?nocache=' + new Date().getTime();
    fetch(url, { method: 'HEAD' })
        .then(response => {
            const lastModified = response.headers.get('last-modified');
            if (lastModified) {
                const date = new Date(lastModified);
                const formattedDate = date.toLocaleString();
                document.getElementById("date-modification").textContent = `Dernière mise à jour : ${formattedDate}`;
            } else {
                console.error('La date de mise à jour n\'est pas disponible.');
            }
        })
        .catch(error => console.error('Erreur lors de la récupération de la date de mise à jour:', error));
}
window.onload = loadJSON;