// 1. Implement the daily / weekly / monthly buttons functionality

const buttons = [
  { filter: "daily", element: document.querySelector(".daily") },
  { filter: "weekly", element: document.querySelector(".weekly") },
  { filter: "monthly", element: document.querySelector(".monthly") },
];

const cards = [
  { category: "Work", element: document.querySelector(".tracking-card--work") },
  { category: "Play", element: document.querySelector(".tracking-card--play") },
  { category: "Study", element: document.querySelector(".tracking-card--study") },
  { category: "Exercise", element: document.querySelector(".tracking-card--exercise") },
  { category: "Social", element: document.querySelector(".tracking-card--social") },
  { category: "Self Care", element: document.querySelector(".tracking-card--self-care") }
];

buttons.forEach(({filter, element}) => {
    element.addEventListener("click", (e) => {
        console.log(`${filter} clicked`);

        // radio buttons functionality
        buttons.forEach(button => button.element.classList.remove("active"));
        e.target.classList.add("active");

        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                updateUI(data, filter);
            })
            .catch((response) => console.log(response));
    });
});

function updateUI(data, filter) {
    
    // prepare relevant data
    const dataFiltered = data.map(({ title, timeframes }) => ({
        title,
        ...timeframes[filter]
    }));

    console.log(`${filter} data:`, dataFiltered);

    // update DOM
    let period;
    switch (filter) {
        case("daily"):
            period = "Day";
            break;
        case("weekly"):
            period = "Week";
            break;
        case("monthly"):
            period = "Month";
            break;
        default:
            period = "";
    }

    cards.forEach((card) => {

        // match card with its data
        const match = dataFiltered.find(item => item.title === card.category);
        
        card.element.querySelector(".tracking-card__current").textContent = `${match.current}hrs`;
        card.element.querySelector(".tracking-card__previous").textContent = `Last ${period} - ${match.previous}hrs`;
    });
}
