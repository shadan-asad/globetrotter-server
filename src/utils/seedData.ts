import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/destination.model";
import connectDB from "../config/db";

// Load environment variables
dotenv.config();

// Sample data from the requirements
const starterData = [
  {
    city: "Paris",
    country: "France",
    clues: [
      "This city is home to a famous tower that sparkles every night.",
      "Known as the 'City of Love' and a hub for fashion and art.",
    ],
    fun_fact: [
      "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
      "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
    ],
    trivia: [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia.",
    ],
  },
  {
    city: "Tokyo",
    country: "Japan",
    clues: [
      "This city has the busiest pedestrian crossing in the world.",
      "You can visit an entire district dedicated to anime, manga, and gaming.",
    ],
    fun_fact: [
      "Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!",
      "More than 14 million people live in Tokyo, making it one of the most populous cities in the world.",
    ],
    trivia: [
      "The city has over 160,000 restaurants, more than any other city in the world.",
      "Tokyo's subway system is so efficient that train delays of just a few minutes come with formal apologies.",
    ],
  },
  {
    city: "New York",
    country: "USA",
    clues: [
      "Home to a green statue gifted by France in the 1800s.",
      "Nicknamed 'The Big Apple' and known for its Broadway theaters.",
    ],
    fun_fact: [
      "The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.",
      "Times Square was once called Longacre Square before being renamed in 1904.",
    ],
    trivia: [
      "New York City has 468 subway stations, making it one of the most complex transit systems in the world.",
      "The Empire State Building has its own zip code: 10118.",
    ],
  },
  {
    "city": "London",
    "country": "UK",
    "clues": [
      "Home to Big Ben and Buckingham Palace.",
      "Known for its red double-decker buses and iconic black cabs."
    ],
    "fun_fact": [
      "The Great Fire of London in 1666 destroyed a large portion of the city but also helped to eradicate the plague.",
      "London's iconic Big Ben is actually the name of the bell, not the clock tower."
    ],
    "trivia": [
      "London has over 170 museums, many of which are free to enter.",
      "The city has been inhabited since Roman times, when it was called Londinium."
    ]
  },
  {
    "city": "Rome",
    "country": "Italy",
    "clues": [
      "Home to the Colosseum and the Vatican City.",
      "Known for its ancient ruins and delicious pasta."
    ],
    "fun_fact": [
      "Rome's Trevi Fountain famously collects around €3,000 in coins daily, which are donated to charity.",
      "The Pantheon, built in 126 AD, has the world's largest unreinforced concrete dome."
    ],
    "trivia": [
      "Rome has more fountains than any other city in the world.",
      "The city was founded in 753 BC, according to legend by Romulus and Remus."
    ]
  },
  {
    "city": "Sydney",
    "country": "Australia",
    "clues": [
      "Home to a distinctive opera house with sail-shaped roofs.",
      "Known for its beautiful harbor and surfing beaches."
    ],
    "fun_fact": [
      "The Sydney Opera House's roof is covered in over 1 million tiles.",
      "Sydney is built around the world's largest natural harbor."
    ],
    "trivia": [
      "Sydney has more than 100 beaches.",
      "The city was originally called Sydney Cove."
    ]
  },
  {
    "city": "Dubai",
    "country": "UAE",
    "clues": [
      "Home to the world's tallest building, the Burj Khalifa.",
      "Known for its luxurious shopping malls and man-made islands."
    ],
    "fun_fact": [
      "Dubai's police force uses supercars like Lamborghinis and Ferraris.",
      "The Palm Jumeirah is a man-made archipelago shaped like a palm tree."
    ],
    "trivia": [
      "Dubai's indoor ski resort, Ski Dubai, was the first of its kind in the Middle East.",
      "The city has a 'Gold Souk' with hundreds of jewelry shops."
    ]
  },
  {
    "city": "Barcelona",
    "country": "Spain",
    "clues": [
      "Known for the unique architecture of Antoni Gaudí, including the Sagrada Familia.",
      "Famous for its vibrant street life and beaches."
    ],
    "fun_fact": [
      "The Sagrada Familia has been under construction for over 130 years and is still not finished.",
      "Barcelona's La Rambla is a famous pedestrian street known for its flower stalls and street performers."
    ],
    "trivia": [
      "Barcelona is the capital of Catalonia.",
      "The city has a rich history dating back to Roman times."
    ]
  },
  {
    "city": "Singapore",
    "country": "Singapore",
    "clues": [
      "Known for its clean streets and futuristic architecture, like the Gardens by the Bay.",
      "A city-state famous for its diverse food scene and strict laws."
    ],
    "fun_fact": [
      "Singapore has a 'vertical forest' called the Gardens by the Bay, with supertrees that light up at night.",
      "Changi Airport has been voted the world's best airport multiple times."
    ],
    "trivia": [
      "Singapore is one of the world's only three city-states.",
      "The Merlion, a mythical creature with a lion's head and a fish's body, is the city's symbol."
    ]
  },
  {
    "city": "Cairo",
    "country": "Egypt",
    "clues": [
      "Home to the Great Pyramids of Giza and the Sphinx.",
      "Known for its rich history and the Nile River."
    ],
    "fun_fact": [
      "The Great Pyramid of Giza was built as a tomb for Pharaoh Khufu and is the oldest of the Seven Wonders of the Ancient World.",
      "Cairo is the largest city in Africa and the Arab world."
    ],
    "trivia": [
      "The Egyptian Museum in Cairo houses the world's most extensive collection of pharaonic antiquities.",
      "Cairo is often called 'The City of a Thousand Minarets' due to its many mosques."
    ]
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing destinations
    await Destination.deleteMany({});
    console.log("Existing destination data cleared");

    // Insert starter data
    await Destination.insertMany(starterData);
    console.log("Starter data seeded successfully");

    // Disconnect from the database
    mongoose.disconnect();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
