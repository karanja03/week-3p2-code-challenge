document.addEventListener("DOMContentLoaded", () => {
    //grabbing every element we need
    const filmsList = document.getElementById("films");
    const filmTitle = document.getElementById("film-title");
    const filmRuntime = document.getElementById("film-runtime");
    const filmShowtime = document.getElementById("film-showtime");
    const filmDescription = document.getElementById("film-description");
    const filmAvailability = document.getElementById("film-availability");
    const filmPoster = document.getElementById("film-poster");
   
  
    //  function to create a film item in the menu
    function createFilmItem(film) {
      const li = document.createElement("li");
      li.textContent = film.title;
     li.classList.add("film", "item");
      li.addEventListener("click", () => {
        updateFilmDetails(film);
      });
      return li;
    }
  
    //  function to update the film details on the page
    function updateFilmDetails(film) {
      filmTitle.textContent = film.title;
      filmRuntime.textContent = `Runtime: ${film.runtime} minutes`;
      filmShowtime.textContent = `Showtime: ${film.showtime}`;
      filmDescription.textContent = film.description;
      filmAvailability.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`;
      filmPoster.src = film.poster;
  
      if (film.capacity - film.tickets_sold === 0) {
        buyTicketBtn.textContent = "Sold Out";
        buyTicketBtn.disabled = true;
      } else {
        buyTicketBtn.textContent = "Buy Ticket";
        buyTicketBtn.disabled = false;
      }
    }
  
    // Make GET request to retrieve movies data
    fetch("http://localhost:3000/films")
      .then(response => response.json())
      .then(data => {
        // Populate films menu
        for(const film of data) {
          const filmItem = createFilmItem(film);
          filmsList.appendChild(filmItem);
        }
        const firstFilm = data[0];
        updateFilmDetails(firstFilm);
      });
  
        // Display details for the first film
        
      
  
    // Handle buy ticket button click
    const buyTicketBtn = document.getElementById("buy-ticket-btn");
    buyTicketBtn.addEventListener("click", () => {
      const availableTicketsElement = document.getElementById("film-availability");
      const availableTickets = parseInt(availableTicketsElement.textContent.split(" ")[2]);
      availableTicketsElement.textContent = `Tickets available: ${availableTickets - 1}`;
  
      if (availableTickets - 1 === 0) {
        buyTicketBtn.textContent = "Sold Out";
        buyTicketBtn.disabled = true;
        filmsList.firstElementChild.classList.add("sold-out");
      }
    });
  })
  

