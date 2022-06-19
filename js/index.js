const monsterContainer = document.querySelector('#monster-container')
const createMonster = document.querySelector('#create-monster')
const monsterForm = document.createElement('form')
const forwardButton = document.querySelector('#forward')
const backButton = document.querySelector('#back')
monsterForm.setAttribute('id','monster-form')
createMonster.appendChild(monsterForm)
let pageNum = 2

monsterForm.addEventListener('submit',e =>{
    e.preventDefault()
    console.log(e)
    let monster = {
        name: e.target[0].value,
        age: e.target[1].value,
        description: e.target[2].value
    }
    newMonster(monster)
})

forwardButton.addEventListener('click', e =>{
    console.log(e)
    loadMoreMonsters()

} )

function loadMoreMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(monsters =>{
        console.log(monsters)
        pageNum++
        console.log(pageNum)
        monsters.forEach(monster =>{
            // console.log(monster)
            renderMonster(monster)
            
        })

    })
}

function createForm(){
    let monsterNameInput = document.createElement('input')
    let monsterAgeInput = document.createElement('input')
    let monsterBioInput = document.createElement('input')
    let monsterButton = document.createElement('button')
    monsterNameInput.setAttribute('id','name')
    monsterAgeInput.setAttribute('id','age')
    monsterBioInput.setAttribute('id','description')
    monsterNameInput.placeholder = 'name...'
    monsterAgeInput.placeholder = 'age...'
    monsterBioInput.placeholder = 'description...'
    monsterButton.innerHTML = 'Create'
    let monsterFormArray = [monsterNameInput, monsterAgeInput, monsterBioInput, monsterButton]
    appendChildren(monsterForm, monsterFormArray)
}

function newMonster(monster){
    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers:{'Content-Type':'application/json', 'accept':'application/json'},
        body: JSON.stringify(monster)
    }

    )}

function loadMonsters(){
    fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
    .then(resp => resp.json())
    .then(monsters =>{
        console.log(monsters)
        monsters.forEach(monster =>{
            // console.log(monster)
            renderMonster(monster)
            
        })

    })
}


function renderMonster(monster){
    let newMonsterDiv = document.createElement('div')
    let newMonsterH2 = document.createElement('h2')
    let newMonsterH4 = document.createElement('h4')
    let newMonsterP = document.createElement('p')
    let newMonsterElementArray = [newMonsterH2, newMonsterH4, newMonsterP]
    newMonsterP.innerHTML = monster.description
    newMonsterH4.innerHTML = monster.age
    newMonsterH2.innerHTML = monster.name
    monsterContainer.appendChild(newMonsterDiv)
    appendChildren(newMonsterDiv, newMonsterElementArray)
}

function appendChildren(parent, children){
    children.forEach(child =>{
        parent.appendChild(child);
    })
}


loadMonsters()
createForm()