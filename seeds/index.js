const mongoose= require('mongoose');
const cities= require('./cities');
const {places, descriptors}= require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB= async () => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const randomPrice = Math.floor(Math.random()*20) + 10; 
        const camp= new Campground({
            author: '63283ab9e536ae4939e2bb08',
            location: `${cities[random1000].city}, ${cities[random1000].state}`, 
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio expedita maiores delectus a nulla asperiores modi obcaecati illum voluptas reiciendis quas voluptatem suscipit dolor, vitae facere architecto temporibus minima quo.', 
            price: 100,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [ 
                {
                  url: 'https://res.cloudinary.com/dzs47tflx/image/upload/v1663679240/YelpCamp/fvzatoac8d87hl42otnd.jpg',
                  filename: 'YelpCamp/fvzatoac8d87hl42otnd',
                },
                {
                  url: 'https://res.cloudinary.com/dzs47tflx/image/upload/v1663679247/YelpCamp/d9igl2qpburkix0fjo2b.jpg',
                  filename: 'YelpCamp/d9igl2qpburkix0fjo2b',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})