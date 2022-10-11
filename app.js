const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// variables
let main=document.querySelector('main');
let form=document.querySelector('form');

// when the page first entered the 1 page movie will be automaticlly displayd
function getFirstPageMovies(){
    // Fetch the Url of top ranked and get data
     fetch(apiUrl)
     .then(response=>response.json())
     .then(firstPageData=>{
        // console.log(firstPageData)
        // add the movies of the first page to the Dom
        firstPageData.results.forEach((result)=>{
            addMovieToThePageFrom(result)
        })
     })
}


getFirstPageMovies();



// this function will be responsible for creating
//  an new element movie for each result and add it
//  to the page
function addMovieToThePageFrom(data){
    let movie=document.createElement("div");
   movie.classList.add('movie');
   main.append(movie);
   movie.innerHTML=`
   <img src=${IMGPATH+data.poster_path}>
   <h2 >${data.title}</h2>
   <span>${data.vote_average}</span>
   `  
//    colorize the Vote According to its value
   let Vote;
   (data.vote_average <=5)? Vote="lowVote":(data.vote_average <=7.5)? Vote="mediumVote":Vote="highVote";
   movie.querySelector('span').classList.add(Vote);

}




form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let SearchTerm=form.firstElementChild.value;
    // check if the input not empty and contains valid string
    let regex=/^[A-Za-z0-9]*$/;
    if (!SearchTerm || !regex.test(SearchTerm)) {
        alert('Please enter a valid movie name')
        return;
    }
     fetch(SEARCHAPI + SearchTerm)
     .then(res=>res.json())
     .then(data=>{

        // lets first check if we got some valid results or not
         let searchedMovies=data.results;
         if (searchedMovies.length===0){
             alert('opps there is no movie with this name ')
             return;
         }

        // lets now update the dom according to results
          main.innerHTML='';
        //   filter results by movies that has an image
          let searchedMoviesThatHasImages=searchedMovies.filter(element=>element.poster_path)
          
          searchedMoviesThatHasImages.forEach(element=>{
          addMovieToThePageFrom(element);
         })

     })
   
    
})


// fetch("https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=saw")
// .then(res=>res.json())
// .then(data=>console.log(data))

form.querySelector('input').addEventListener('input',function(){
    if(this.value.length===0){
        main.innerHTML='';
        getFirstPageMovies();
    }
})