const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/getdata", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send("err");
        } else {
            res.send(data);
        }
    });
});

app.get("/getsingledata/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send("err");
        } else {
            const newdata = JSON.parse(data);
            const product = newdata.find((el) => el.id == id);

            if (product) {
                res.send(product);
            } else {
                res.send("product not found");
            }
        }
    });
});

app.delete("/deleteproduct/:productid", (req, res) => {
    const { productid } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let newdata = JSON.parse(data);
            newdata = newdata.filter((el) => el.id != productid);
            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("product deleted");
                }
            });
        }
    });
});

app.patch("/updateproduct/:productid", (req, res) => {
    const { productid } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        let newdata = JSON.parse(data);
        const index = newdata.findIndex((el) => el.id == productid);
        if (index != -1) {
            newdata[index] = { ...newdata[index], ...req.body };
            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("product updated");
                }
            });
        } else {
            res.send("product not found");
        }
    });
});

app.post("/addproduct", (req, res) => {
    const newproduct = req.body;

    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const newdata = JSON.parse(data);
            
            // Generate a unique ID based on the current length of the array
            const id = newdata.length > 0 ? (Math.max(...newdata.map(product => product.id)) + 1) : 1;
            newproduct.id = id;  // Set the id to the new product

            newdata.push(newproduct);

            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("product added");
                }
            });
        }
    });
});

app.listen(8080, () => {
    console.log("server is running on port 8080");
});
