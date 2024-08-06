//1.invocamos express
const express = require("express");
const app = express();

//2.seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Servir archivos estáticos desde el directorio "public"
app.use(express.static("public"));

//3.invocamos dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "/env/env" });

//4.el dire3ctorio public
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

//5.establecer el motor de plantillas
app.set("view engine", "ejs");

//6. invocamos scrip
const bcryptjs = require("bcryptjs");

//7. var. de session
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//console.log(__dirname);
//8. invocamos al modulo de conexion de base de datos
const connection = require("./database/db");
const conectar = require("./database/db");

//9. estableciendo las rutas

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/home", (req, res) => {
  res.render("home");
});


//10. Registracion

app.post("/register", (req, res) => {
  const usuario = req.body.usuario;
  const contraseña = req.body.contraseña; // Contraseña en texto plano

  connection.query(
    "INSERT INTO usuario SET ?",
    { usuario: usuario, contraseña: contraseña }, // Guardando la contraseña en texto plano
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("register", {
          alert: true,
          alertTitle: "Registro",
          alertMessage: "¡Registro Exitoso!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: "",
        });
      }
    }
  );
});



//////////////////////////////////
app.post("/ingresarPagina", (req, res) => {
  const correo = req.body.usuario;
  const contraseña = req.body.contraseña;
  req.session.usuario = correo;
  req.session.contraseña = contraseña;
  console.log(correo);
  conectar.query(
    "SELECT * FROM usuario WHERE usuario= ? AND contraseña = ?",
    [correo, contraseña],
    (error, result) => {
      if (error) {
        res.status(500).send("Error en el servidor");
      } else {
        if (result.length > 0) {
          console.log(result);
          res.render("login", {
            alert: true,
            alertTitle: "CONEXION EXITOSA!!",
            alertMessage: "INGRESANDO",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 2300,
            ruta: "home",
          });
        } else {
          res.render("login", {
            alert: true,
            alertTitle: "ERROR AL ACCEDER",
            alertMessage: "USUARIO O CONTRASEÑA INCORRECTA",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2300,
            ruta: "",
          });
        }
      }
    }
  );
});



app.listen(3000, (req, res) => {
  console.log("Servidor Corrindo http://localhost:3000");
});
