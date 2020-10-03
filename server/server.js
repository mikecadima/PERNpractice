require("dotenv").config()
const express = require("express");
const cors = require("cors")
const db = require("./db")

const morgan = require("morgan")
const app = express()

app.use(cors())
//express
app.use(express.json())

//third party middleware morgan
// app.use(morgan("dev"))

// app.use((req,res, next)=>{
//     console.log("something");
//     next()
// })
// app.use((req,res, next)=>{
//     res.status(404).json({
//         status: "fail",
//     })
//     console.log("middleware works");
//     next();
// })

//routes http://localhost:3001/getRestaurants
// app.get("/getRestaurants", (req,res) => {
//     res.status(404).json({
//         status: "success",
//         restaurant: "mcdonalds"
//     })
// })

//get all restaurants
app.get("/api/v1/restaurants", async (req,res) => {
    try{
        // const results = await db.query("select * from restaurants;");
        const restaurantRatingData = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;")
        
        res.status(200).json({
            status: "success",
            results: restaurantRatingData.rows.length,
            data: { 
            // restaurant: ["mcdonalds", "wendys"]
            restaurants: restaurantRatingData.rows
        }
        })
    }catch (err) {
console.log(err)
    }

})
//get one restaurant
app.get("/api/v1/restaurants/:id", async(req,res)=>{
    console.log(req.params.id)
    try{
        const restaurant = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1; ",
            [req.params.id]
            )
            const reviews = await db.query(
                "select * from reviews where restaurant_id = $1 ",
                [req.params.id]
                )

            res.status(200).json({
                status: "success",
                data:{
                    restaurant: restaurant.rows[0],
                    reviews: reviews.rows
                },
            })

            console.log(results.rows[0])
            }catch (err) {
        console.log(err)
            }
        })
app.get("/api/v1/restaurants/:id/reviews", ()=>{

})

//create a restaurant
app.post("/api/v1/restaurants", async (req,res)=>{
    console.log(req.body);
    try{
const results = await db.query(
    "INSERT INTO restaurants (name, location, price_range) values ($1,$2, $3) returning *",
    [req.body.name, req.body.location, req.body.price_range]
    )
    console.log(results)
    res.status(201).json({
        status: "success",
        data:{
            restaurant: "mcdonalds",
        }
    })
    }catch (err) {
console.log(err)
    }
    
})

//update restaurants
app.put("/api/v1/restaurants/:id",async (req,res) =>{
    try{
const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",[
    req.body.name, req.body.location, req.body.price_range, req.params.id
])
console.log(results)
res.status(200).json({
    status: "success",
    data: {
        restaurant: results.row[0],
    }
})
    }catch (err){

    }
    console.log(req.params.id)
    console.log(req.body)

    res.status(200).json({
        status: "success",
        data: {
            restaurant: "mcdonalds",
        }
    })
})

//delete restaurant
app.delete("/api/v1/restaurants/:id",(req,res)=>{
    try {
const results = db.query("DELETE FROM restaurants where id = $1", [req.params.id])
res.status(204).json({
    status: "success"
})
    }catch (err){
console.log(err)
    }
    
})

app.post("/api/v1/restaurants/:id/addReview",async(req,res)=>{
    try{
const newReview = await db.query(
    "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1,$2,$3,$4) returning * ;", [req.params.id,
req.body.name, req.body.review, req.body.rating])
console.log(newReview)
res.status(201).json({
    status: "success",
    data: {
        review: newReview.rows[0],
    }
})
    }catch (err){
console.log(err)
    }
})
const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`)
})