const express =require('express');

const router = express.Router();

router.get("/add-product", (req, res, next) => {
    console.log("In anoda middleware!");
    res.send(
      "<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Send</button></form>"
    );
    next();
  });
  
  router.post("/product", (req, res, next) => {
    const body =req.body
    console.log(body);
    res.redirect('/')
  });
  
  

module.exports = router