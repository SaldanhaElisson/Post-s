class Post {
  constructor(){
    this.id;
    this.postIdHere
    this.body;
    this.userId;
    this.postMain;
    this.title;
    this.companyName;
    this.name;
    this.userName;
    this.comentarios
  }
  
  // sorteando um numero aleatorio 
  static creatNumberRandom(min, max){
    return Math.round(Math.random() * (max - min) + min);
  }
  
  
  // pegando os dados na API dos usarios de acordo com o post sorteado
  async getUser() {
    let user;
    await fetch(`https://jsonplaceholder.typicode.com/users/${this.userId}`).then(async (response) => {
      await response.json().then( async (arr) => {
           user = arr
           
    }) 
  })
  

  this.name = user.name
  this.userName = user.username
  this.companyName = user["company"].name     
}
  
 // função responsavel em pegar o post no API de acordo com um numero aleatorio sorteado
  async getPost(postIdHere){
    this.postIdHere = postIdHere
    let postMain = new Object()
    await fetch(`https://jsonplaceholder.typicode.com/posts`).then(async (response) => {
    await response.json().then( async (arr) => {
           postMain =  await arr.find(x => x.id == this.postIdHere)
    })
      
     this.postMain = postMain;
})

    // colocando os dados obtidos pelo fetch de acordo com as variaveis 
    this.userId = postMain.userId
    this.body = postMain.body
    this.title = postMain.title;
    
    
  }

  printContentPostMain(){

    // colocando os a descrissão e o titulo no post principal
    test.innerContent('.content', this.body)
    test.innerContent('.title', this.title)
    test.innerContent('.nome', `Nome: ${this.name}`)
    test.innerContent('.userN', `Username: ${this.userName}`)
    test.innerContent('.CompanyName', this.companyName)

  }



  // responsavel por colocar os dados nos post secundarios
  printContentPostSecond(post){

    // pegando campos
    const PostOnehere = document.querySelector(post)
    const userName = PostOnehere.querySelector('.userName')
    const tituloPostSecond = PostOnehere.querySelector('.tituloPostSecond')
    const description = PostOnehere.querySelector('.description')
    const titleAndName = PostOnehere.querySelector('.titleAndName')


    titleAndName.setAttribute('id', this.postIdHere)
    PostOnehere.setAttribute('id', this.postIdHere)
    description.setAttribute('id', this.postIdHere)
    tituloPostSecond.setAttribute('id', this.postIdHere)
    userName.setAttribute('id', this.postIdHere)


    //limpando campos
    description.innerHTML = ""
    userName.innerHTML = ""
    tituloPostSecond.innerHTML = ""

    // colocando dados
    description.innerHTML = this.body
    userName.innerHTML = ` UserName: ${this.userName} `
    tituloPostSecond.innerHTML = this.title


  }


  //pegando comentarios de acordo com o post
  async getComent(postIdHere){
    let comentarios;
    await fetch(`https://jsonplaceholder.typicode.com/comments`).then(async (response) => {
    await response.json().then( async (arr) => {

      this.comentarios = arr.filter( (x) => { 
        if (x.postId == this.postIdHere){
            return x
      }
    } )

    let cardComent = document.querySelector('.comentarios')
    cardComent.innerHTML =""
    

    this.comentarios.forEach(element => {
      const comentario = test.printComentarios(element.body, element.name)
      cardComent.appendChild(comentario)
    });
     
    })
})
        
  }

  // inserindo dados na interface
   innerContent(campo, conteudo){
    const content = document.querySelector(campo);
    
    content.innerHTML = ""
    content.innerHTML = conteudo
  }
 

  printComentarios(body, name){
    
    const comentDiv = document.createElement('div')
    comentDiv.setAttribute('class', 'comentario')

    const pUsername = document.createElement('p')
    pUsername.setAttribute('class', 'userComent')
    pUsername.innerHTML = ""
    pUsername.innerHTML = name

    const pComentBody = document.createElement('p')
    pComentBody.setAttribute('class', 'comentBody')
    pComentBody.innerHTML = ""
    pComentBody.innerHTML = body

    comentDiv.appendChild(pUsername)
    comentDiv.appendChild(pComentBody)

    return comentDiv
  }
  
}

//Post principal
let postIdHere = Post.creatNumberRandom(0, 100);
const test =  new Post()

//Post's secundarios



async function startSecondPosts(){
  const postIdOne = Post.creatNumberRandom(0, 100)
  const postOne = new Post ()

  const postIdTwo = Post.creatNumberRandom(0, 100)
  const postTwo = new Post ()

  const postIdThree= Post.creatNumberRandom(0, 100)
  const postThree = new Post ()



  //post secundario - primeiro
  await postOne.getPost(postIdOne)
  await postOne.getUser()
  postOne.printContentPostSecond('.one')

  // post secundario - segundo
  await postTwo.getPost(postIdTwo)
  await postTwo.getUser()
  postTwo.printContentPostSecond('.two')

  // post secundario - terceiro
  await postThree.getPost(postIdThree)
  await postThree.getUser()
  postThree.printContentPostSecond('.three')
}

async function start() { 
  

  //post prinicpal
  await test.getPost(postIdHere)
  await test.getUser()
  test.printContentPostMain();
  await test.getComent()
  test.printComentarios()

  await startSecondPosts()

}               

start()

// selecionando o Post
const PostOnehere = document.querySelector('.one')
const PostTwohere = document.querySelector('.two')
const PostThreehere = document.querySelector('.three')


PostOnehere.addEventListener('click', (e) => { clickPost(e.target.id)})
PostTwohere.addEventListener('click', (e) => { clickPost(e.target.id)})
PostThreehere.addEventListener('click', (e) => { clickPost(e.target.id)})


async function clickPost(elemento){
  postIdHere = elemento
  await test.getPost(postIdHere)
  await test.getUser()
  test.printContentPostMain();
  await test.getComent()
  test.printComentarios()

  await startSecondPosts()

}