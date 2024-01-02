const express = require('express');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');


app.get("/", (req, res)=>{
    res.send("Hi, home route is working fine!! ")
})

app.get('/indexpage', (req, res)=>{
    res.render("index");  //no need to specify path as it will automatically access VIEWS folder
});

app.post("/order", async (req, res)=>{
    const amount = req.body.amount;

    var instance = new Razorpay({ 
        key_id: 'rzp_test_Hq6vzgPXtxCufz', 
        key_secret: 'g3Q790WBqMuYH2YMg2Z4gA0v' 
        //this needs to go in .env file
    });

    var options = {
        amount: amount*100, //amount in the smallest currency unit(paise)
        currency: "INR",
        receipt: "order_receipt_11",
        notes:{
            key1:"val1",
            key2: "val2"
        }
    };

    // instance.orders.create(options);

    const myOrder = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        amount,
        order: myOrder
    });

})


app.listen(4001, ()=>console.log(`Server is running at port 4000.....`));