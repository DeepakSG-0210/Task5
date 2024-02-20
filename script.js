const topicInput = document.getElementById('topic-input');
const desctiptionInput = document.getElementById('description-input');
const numberInput = document.getElementById('timer-input');

const listItems = document.getElementById('list-container');
function addTask() {
    if (topicInput.value.trim() === '' || desctiptionInput.value.trim() === '' || numberInput.value.trim() === '') {
        alert('Please fill in all fields');
    } else {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <p><b>${topicInput.value}</b> - ${desctiptionInput.value} : <em>
            ${numberInput.value} minutes </em><i class='fa-solid fa-pencil'></i></p>
        `;
        listItems.appendChild(listItem);
        let span = document.createElement("span");
        span.innerHTML = "&#128465";
        listItem.appendChild(span);
    } 
    topicInput.value = '';
    desctiptionInput.value = '';
    numberInput.value = '';
    checkTime();
    saveData();
}

listItems.addEventListener('click', function (e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    } else if(e.target.classList.contains("fa-pencil")){
        const taskInfo = listItems.querySelector('p');
        const [topic, description, time] = taskInfo.textContent.split(" - ");
        taskInfo.parentElement.remove();
        topicInput.focus();
        topicInput.value = topic;
        desctiptionInput.value = description.split(':')[0].trim();
        topicInput.value = document.getElementById('topic-input').value;;
        desctiptionInput.value = document.getElementById('description-input').value;
        numberInput.value = document.getElementById('timer-input').value;
        saveData();
    }
}, false);

function checkTime() {
    const listElements = document.querySelectorAll('.list-item');
    // console.log(listElements);
    listElements.forEach(function (item) {
        const time = item.querySelector('em').textContent;
        let timeM = time.match(/(\d+)/);
        changeColorWithDelay(item, 'red', timeM[0] * 60 * 1000);
    });
}

function changeColorWithDelay(item, color, delay) {
    setTimeout(function () {
        item.style.color = color;
    }, delay);
}

function saveData() {
    localStorage.setItem('listItems', listItems.innerHTML);
}

function loadData() {
    listItems.innerHTML = localStorage.getItem('listItems');
}

loadData();