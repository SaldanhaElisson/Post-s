class Post {
  constructor(id, postId){
    this.id = id;
    this.postIdHere = postIdHere;
    this.body;
    this.userId;
    this.postMain;
    this.title;
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
    
    
    
    // colocando os dados nos respectivos campos
    // test.innerContent('.nome')
    // test.innerContent('.title')
    // test.innerContent('.content')
    // test.innerContent('.title')
     
}
  
 // função responsavel em pegar o post no API de acordo com um numero aleatorio sorteado
  async getPost(){
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
    
    // colocando os a descrissão e o titulo no post principal
    test.innerContent('.content', this.body)
    test.innerContent('.title', this.title)
    
  }
  
  
  // inserindo dados na interface
   innerContent(campo, conteudo){
    const content = document.querySelector(campo);
    
    content.innerHTML = ""
    content.innerHTML = conteudo
  }
 
  
}

const postIdHere = Post.creatNumberRandom(0, 100);
const test =  new Post(0 , postIdHere)

async function start() { 
  await test.getPost()
  await test.getUser()
}               

start()

// let postIdhere = Post.creatNumberRandom(0, 10);

// fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response) => {
//     response.json().then((arr) => {
//        console.log(arr)
//   })
// })






