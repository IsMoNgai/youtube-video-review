const url = new URL(location.href)
const videoid = url.searchParams.get('id')
const videotitle = url.searchParams.get('title')

const APILINK = "http://localhost:8000/api/v1/reviews/"

const main = document.getElementById('section')
const title = document.getElementById('title')

const div_card = document.createElement('div');
div_card.innerHTML = `
<div class="row">
<div class="column">
  <div class="card">
      New Review
      <p><strong>Review: </strong>
        <input type="text" id="new_review" value="">
      </p>
      <p><strong>User: </strong>
        <input type="text" id="new_user" value="">
      </p>
      <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
      </p>
  </div>
</div>
</div>
`
main.appendChild(div_card);

title.innerText = videotitle;

displayReviews(APILINK)

// Function to display search results
function displayReviews(url) {
    fetch(url + "video/" + videoid).then(res => res.json()).then(function(data){
        console.log(data);
        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML = `
                <div class="row">
                    <div class="column">
                    <div class="card" id="${review._id}">
                        <p><strong>Review: </strong>${review.review}</p>
                        <p><strong>User: </strong>${review.user}</p>
                        <p><a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">edit</a></p>
                        <p><a href="#" onclick="deleteReview('${review._id}')">delete</a></p>
                    </div>
                    </div>
                </div>
            `
            main.appendChild(div_card);
        })
    })
}

function editReview(id, review, user) {
    const div_card = document.getElementById(id);
    console.log(id)
    console.log(review)
    console.log(user)
    const reviewInputId = 'review' + id;
    const userInputId = 'user' + id;
    div_card.innerHTML = `
        <p><input type="text" id = "${reviewInputId}" placeholder="${review}" value = '${review}'>Review: </input></p>
        <p><input type="text" id = "${userInputId}" placeholder="${user}" value = '${user}'>User: </input></p>
        <p><a href='#' onclick = "saveReview('${reviewInputId}', '${userInputId}', '${id}')">save</a></p>
    `
}

function saveReview(reviewInputId, userInputId, id='') {
    const review = document.getElementById(reviewInputId).value
    const user = document.getElementById(userInputId).value

    if(id) {
        fetch(APILINK + id, {
            method: "PUT",
            headers: {
                'Accept' : 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({'user': user, 'review' : review})
        }).then(res => res.json()).then(res => {console.log(res);location.reload()})
    } else {
        fetch(APILINK + 'new', {
            method: "POST",
            headers: {
                'Accept' : 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({'user': user, 'review' : review, 'videoId' : videoid})
        }).then(res => res.json()).then(res => {console.log(res);location.reload()})
    }

}

function deleteReview(id) {
    fetch(APILINK + id, {
        method: 'DELETE'
    }).then(res => res.json()).then(res => {location.reload()})
}