const topicInput = document.getElementById('topic-input');
const desctiptionInput = document.getElementById('description-input');
const numberInput = document.getElementById('timer-input');

const listItems = document.getElementById('list-container');
function addTask() {
    if (topicInput.value === '' || desctiptionInput.value === '' || numberInput.value === '') {
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
        span.innerHTML = "\u00d7";
        listItem.appendChild(span);
    } 
    topicInput.value = '';
    desctiptionInput.value = '';
    numberInput.value = '';
    checkTime();
}

listItems.addEventListener('click', function (e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
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
    }
}, false);

function checkTime() {
    const listElements = document.querySelectorAll('.list-item');
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