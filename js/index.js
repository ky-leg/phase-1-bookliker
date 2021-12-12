document.addEventListener("DOMContentLoaded", function() {
    const url = 'http://localhost:3000/books'
    getBooks();
    

    function getBooks(){
        fetch(`${url}`)
        .then((resp) => resp.json())
        .then((arr) => appendToDOM(arr))
    }

    function getDetails(id) {
        fetch(`${url}/${id}`)
        .then((resp) => resp.json())
        .then((arr) => addDetailsToDOM(arr))
    }
    
    function appendToDOM(arr){
        const list = document.getElementById("list")
        for (const key in arr) {
            const id = arr[key].id 
            const li = document.createElement('li')
            const h1 = document.createElement('h1')
            const btn = document.createElement('button')
            h1.addEventListener("click", e => addDetails(e))
            h1.id = id
            li.id = `${id}a`
            const title = arr[key].title
            
            btn.id = id
            btn.innerText = 'LIKE'
            btn.addEventListener('click', e => postLiker(id))
            h1.innerText = title
            li.append(h1, btn)
            list.appendChild(li)
        }
    }

    function addDetails(e){
        const id = e.target.id
        getDetails(id)
    }

    function addDetailsToDOM(arr){
        const id = arr.id
        const li = document.getElementById(`${id}a`)
        const imgURL = arr.img_url
        const description = arr.description
        const author = arr.author
        const title = arr.title
        const likers = arr.users 
        const users = []
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const ul = document.createElement('ul')
        h3.innerText = "Likers :)"
        div.appendChild(h3)
        ul.id = `${id}div`


        for (const key in likers) {
            const li = document.createElement('li')
            li.innerText = likers[key].username
            ul.appendChild(li)
        }

        div.appendChild(ul)


        const h1 = document.createElement('h1')
        h1.innerText = title

        const img = document.createElement('img')
        img.src = imgURL

        const p1 = document.createElement('p')
        const p2 = document.createElement('p')

        const h2 = document.createElement('h2')
        const btn = document.createElement('button')
        btn.id = id
        btn.innerText = 'LIKE'
        btn.addEventListener('click', e => postLiker(id))
        h2.innerText = author

        p1.innerText = description
        p2.innerText = users

        li.innerText = ""
        li.append(h1, img, h2, p1, p2, div, btn)
    }

    function postLiker(id){
        const ul = document.getElementById(`${id}div`)
        const li = document.createElement('li')
        li.innerText = 'lcdSS' 
        ul.append(li)

        fetch(`${url}/${id}/users`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
            body: JSON.stringify({
                "id": `${id}`,
                "username": `lcdSS` 
            })
        })
    }
});

