const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const uPass = require("./scrt/scrt");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/members";
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on(
  "error",
  console.log.bind(console, "There was an error connecting to the database...")
);
db.once("open", () => {
  console.log("Connected to the database...");
});

app.use(express.static(`public`));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Global variable
let passwordHash;

// GET REQUESTS

// Home
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/html/index.html`);
});

// Contact
app.get("/contact", (req, res) => {
  res.sendFile(`${__dirname}/public/html/contact.html`);
});

app.get("/thank-you-for-contacting-me", (req, res) => {
  return res.sendFile(
    `${__dirname}/public/html/thank-you-for-contacting-me.html`
  );
});

app.post("/thank-you", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const Transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "katlegokatwavebeats@gmail.com",
      pass: uPass.uPass,
    },
  });

  const mailOptions = {
    to: "katlegokatwavebeats@gmail.com",
    from: email,
    subject: "E-mail from " + name + " through your website...",
    text: message,
  };

  Transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(404);
      return res.redirect("/404-error");
    } else {
      return res.redirect("/thank-you-for-contacting-me");
    }
  });
});

// Blog
app.get("/blog", (req, res) => {
  res.redirect("/sign-in");
});

app.get("/blog/recent-posts", (req, res) => {
  res.sendFile(`${__dirname}/public/html/blog.html`);
});

// Signing in to access my blog
app.get("/blog/user/my-blog", async (req, res) => {
  //This is from the sign in form
  const email = req.query.email;
  const password = req.query.password;

  await db.collection("users").findOne({ email: email }, (err, user) => {
    if (err) throw err;
    else if (!user) {
      // If a user is not found, the following happens
      res.status(401);
      console.log("Unable to find a user...");
      return res.redirect("/401-error");
    } else {
      passwordHash = user.password; //Assigning the global varibale to the password of the user with the entered e-mail

      // Comparing the password entered by the user with the hashed one in the Database.
      // use the bcrypt.compare() method.
      // the firs parameter is the password entered by the user.
      // the second parameter is the hashed password inside the database.
      // the third parameter is a callback function with two paramenters being "err" for error and "passMatch",
      // to validate if the passwords match or not.
      bcrypt.compare(password, passwordHash, (err, passMatch) => {
        if (err) throw err;
        else if (!passMatch) {
          res.status(401);
          // Logging message to tell us that the password entered dont match with the hashed password.
          console.log("Password don't match with the hash...");
          // redirecting the user to 404 page if the password entered dont match with the hashed password.
          return res.redirect("/invalid");
        } else {
          // Else if the user is found, the following happens
          console.log("Found one user...");
          return res.redirect("/blog/recent-posts");
        }
      });
    }
  });
});

app.get("/blog/where-to-learn-web-development-for-free", (req, res) => {
  res.sendFile(`${__dirname}/public/html/web-development-resources.html`);
});

app.get("/blog/learn-css-grid-layout", (req, res) => {
  res.sendFile(`${__dirname}/public/html/css-grid-layout.html`);
});

app.get("/blog/overcome-rejection", (req, res) => {
  res.sendFile(`${__dirname}/public/html/overcome-rejection.html`);
});

// Music
app.get("/music", (req, res) => {
  res.sendFile(`${__dirname}/public/html/music.html`);
});

app.get("/music/tracks", (req, res) => {
  res.sendFile(`${__dirname}/public/html/tracks.html`);
});

app.get("/music/beats", (req, res) => {
  res.sendFile(`${__dirname}/public/html/beats.html`);
});

// About
app.get("/about", (req, res) => {
  res.sendFile(`${__dirname}/public/html/about.html`);
});

// Sign in
app.get("/sign-in", (req, res) => {
  res.sendFile(`${__dirname}/public/html/sign-in.html`);
});

// Sign up
app.get("/sign-up", (req, res) => {
  res.sendFile(`${__dirname}/public/html/sign-up.html`);
});

app.post("/sign-in", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.confirmPassword;

  // Hashing the password that the user entered
  // We use bcrypt.genSalt() method to generate a salt.
  // The first parameter is the saltRound which is an intiger, the higher the number,
  // the harder it will be for a hacker to hack it
  // The second parameter is a callback with two parameters being "err" to return an error,
  // then salt parameter which contain the salt that is generated.
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    } else {
      // If there are no errors, then we can use the bcrypt.hash() method to hash the password.
      // The first parameter of the method is the password entered by a user
      // The second parameter is the that has been generated.
      // The third parameter is a callback function which takes two parameters being "err" which returns the error
      // and "hash" which contains the hash generated from the salt.
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          throw err;
        } else {
          passwordHash = hash; // PasswordHash is the global variable which has the hash of users in the database.
          console.log(hash);
          db.collection("users").insertOne(
            {
              name: name,
              email: email,
              password: passwordHash,
            },
            (err, user) => {
              if (err) throw err;
              console.log("Inserted one document...");
              return res.redirect("/sign-in");
            }
          );
        }
      });
    }
  });
});

// changing password
app.get("/forgot-password", (req, res) => {
  res.sendFile(`${__dirname}/public/html/forgot-password.html`);
});

app.get("/change-password", (req, res) => {
  const email = req.query.email;
  const password = req.query.confirmPassword;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          throw err;
        } else {
          passwordHash = hash;
          console.log(hash);
          db.collection("users").updateOne(
            {
              email: email,
            },
            // To update a document use the "$set" inside code block to make {$set: {WHAT_YOU_WANT_TO_UPDATE: ITS_VALUE}}
            {
              $set: {
                password: passwordHash,
              },
            },
            (err, userUpdate) => {
              if (err) {
                throw err;
              } else if (userUpdate.result.n == 0) {
                res.status(404);
                console.log(`Unable to update the user...`);
                return res.redirect("/404-error");
              } else {
                console.log(`Updated one document...\n${userUpdate}`);
                return res.redirect("/sign-in");
              }
            }
          );
        }
      });
    }
  });
});

// Projects
app.get("/projects", (req, res) => {
  res.sendFile(`${__dirname}/public/html/projects.html`);
});

// Errors
app.get("/404-error", (req, res) => {
  res.sendFile(`${__dirname}/public/html/404-error.html`);
});

app.get("/401-error", (req, res) => {
  res.sendFile(`${__dirname}/public/html/401-error.html`);
});

app.get("/invalid", (req, res) => {
  res.sendFile(`${__dirname}/public/html/invalid.html`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
