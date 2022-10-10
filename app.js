const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// when the page first entered the 1 page movie will be automaticlly displayd
function getFirstPageMovies(){
    // Fetch the Url of top ranked and get data
     fetch(apiUrl)
     .then(response=>response.json())
     .then(firstPageData=>{
        console.log(firstPageData)
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
   document.body.append(movie);
   movie.innerHTML=`
   <img src=${IMGPATH+data.poster_path}>
   <h2 >${data.title}</h2>
   <span>${data.vote_average}</span>
   `  
   let Vote;
     if (data.vote_average<=5){
        Vote="lowVote";
     }
     else if (data.vote_average<=7.5){
        Vote='mediumVote';
     }
     else {
        Vote='highVote';
     }

     movie.querySelector('span').classList.add(Vote);

   
}


// function colorizeVote(vote){
//   let span=document.querySelector('span');
//   if ()
// }