document.querySelector(".ratings");
let comments = [];
let page;
if(window.location.href.includes("AF1"))page = "af1";
if(window.location.href.includes("AM270"))page = "w270";
if(window.location.href.includes("AM270Black"))page = "b270";
if(window.location.href.includes("AMP"))page = "amp";
if(window.location.href.includes("airmax97"))page = "a97";
if(window.location.href.includes("CruzrOne"))page = "c1";

addMessageFormSubmitListener();

/**
 * Adds submit event listener to HTML form
 */
function addMessageFormSubmitListener() {
    const messageForm = document.querySelector('.newRating');
    messageForm.addEventListener('submit', handleMessageFormSubmit);
}

async function handleMessageFormSubmit(event) {
    event.preventDefault();
    const messageForm = event.target;
    const username = messageForm.username.value;
    const rating = messageForm.rating.value;
    const content = document.querySelector(".contentOfReview").value;
    let div = document.createElement("div");
        div.classList.add("review");
        div.innerHTML = `<h4 class="user">${username}</h4>
            <p class="reviewcontent">${content}</p>
            <p class="rating">${rating}</p>
        `;
        document.querySelector(".ratings").appendChild(div);
    
    messageForm.reset();
    await fetchRestEndpoint("/api/comments/"+page, "POST",{
        username: username,
        rating: rating,
        content:content
    });
    
}

getShoes();
async function getShoes(){
    comments = Array.from(await fetchRestEndpoint("/api/comments/"+page, "GET"));
    
    comments.forEach(((element,index) => {
        let div = document.createElement("div");
        div.classList.add("review");
        div.innerHTML = `<img class="iconPerson" src="../pic/person.png"><h4 class="user">${element.username}</h4>
            <p class="reviewcontent">${element.content}</p>
            <p class="rating">${element.rating}</p>
        `;
        element.comments.forEach((comment, cindex)=>{
            let div2 = document.createElement("div");
            div2.classList.add("comment");

            div2.innerHTML = `<h5 class="user">${comment.username}</h5>
            <p class="commentcontent">${comment.content}</p>`;

            div.appendChild(div2);
        })
        document.querySelector(".ratings").appendChild(div);

    
    }))
}

async function fetchRestEndpoint(route, method, data) {
    const options = { method };

    if (data) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const res = await fetch(route, options);

    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
        error.response = res;
        throw error;
    }

    if (res.status !== 204) {
        return await res.json();
    }
}