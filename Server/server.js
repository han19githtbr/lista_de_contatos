const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const cors = require("cors");
const multer = require('multer');
const path = require("path");
const bodyParser = require('body-parser');
const { useParams } = require("react-router-dom");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("Images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'app/Images')));

// Configuração de armazenamento
const diskStorage = multer.diskStorage({
    // destination:  (req, file, cb) => {
    //     cb(null, path.join(__dirname,'../Images'))
    // },
    destination: path.join(__dirname,'Images'),
    filename:  (req, file, cb) => {
        cb(null, Date.now() + '-grupo-1-toti-' + file.originalname)
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        // cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage : diskStorage 
});

const db = new sqlite3.Database('./BD.db', (err) => {
    if (err) {
        console.log("Erro ao abrir base de dados " + err.message);
    } else {
        console.log("Conectado com o Banco de Dados")
    }
});

// lista de contatos 
app.all("/list", (req,res) => {
    let SQL = "SELECT * FROM contato";
    db.all(SQL, (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            // console.log(teste);
            res.send(teste);
        }
    })
})

// lista de grupos 
app.all("/list-group", (req,res) => {
    let SQL = "SELECT * FROM grupo";
    db.all(SQL, (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            // console.log(teste);
            res.send(teste);
        }
    })
})


app.all("/group", (req, res) => {
    let SQL = "SELECT * FROM grupo";
    db.all(SQL, (err, result) => {
        if(err) console.log(err);
        else{
            const teste = JSON.stringify(result);
            // console.log(teste);
            res.send(teste);
        }
    })
})
//seleccionar un contacto
app.get('/contact/:id', (req,res) => {
    const {id} =req.params;
    let SQL = 'SELECT * FROM contato WHERE id = ?';
    db.get(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            console.log(teste);
            res.send(teste);
        }
    })
})

//seleccionar un grupo
app.get('/group/:id', (req,res) => {
    const {id} =req.params;
    let SQL = 'SELECT * FROM grupo WHERE id = ?';
    db.get(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            console.log(teste);
            res.send(teste);
        }
    })
})

//seleccionar contactos de un grupo
app.all('/groupcontact/:id', (req,res) => {
    const {id} =req.params;
        let SQL = `SELECT * FROM contato WHERE id_contact_group = ?`;
    db.all(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            console.log(teste);
            res.send(teste);
        }
    })
})

//Crear un contacto
app.post("/addcontact", upload.single('image'), (req,res) => {
    // console.log("File: "+ req.file)
    // const file = req.file.filename
    console.log("Body: ",req)
    const {name} = req.body;
    const {phone} = req.body;
    const {email} = req.body;
    const {adress} = req.body;
    const {id_cont_social} = req.body;
    const {id_contact_group} = req.body;
    const {id_work} = req.body;
    req.file == null ? img = "user.png" : img = req.file.filename;
    // var img = req.file.filename;
    // var img = `'\'http://localhost:3001/${req.file.filename}'\'`;
     
    
    // res.send("pronto");
    // res.json({name,site})

    res.json({name, phone, email, adress,img, id_cont_social,id_contact_group,id_work})
    let SQL ="INSERT INTO contato (name, phone, email, adress, pic, id_cont_social, id_contact_group, id_work) VALUES ( ?,?,?,?,?,?,?,? )";

    db.run(SQL,[name,phone,email,adress,img,id_cont_social,id_contact_group,id_work],(err, result) => {
        if(err) console.log(err);
        else console.log(result)
    })

    // app.delete("/delete/:id", (req, res) => {
        // const {id} = req.params;
        let SQL1 = "(SELECT MAX(id) FROM contato)-1";
        let SQL2 = `DELETE FROM contato WHERE id = ${SQL1}`;
        db.run(SQL2, [SQL1], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
    //   });

    // let SQLP = "SELECT MAX(id) FROM contato";
    // db.get(SQLP,(err,result) => {
    //     if(err) console.log(err);
    //     else{
    //         console.log("result add img: ",result)
    //         let SQLI =`UPDATE contato SET pic = ? WHERE id = ${SQLP}`;
    //         res.json({img})
    //         db.post(SQLI,[img,id],(err,result) =>{
    //             if(err) console.log(err);
    //     else console.log(result)
    //         })
    //     }
    // })
    // console.log(name)
})


app.post("/addgroup", upload.single('image'), (req, res) => {
    const {name} = req.body;
    const {descrisption} = req.body;
    // img = req.file.filename;
    req.file == null ? img = "icone_group.jpeg" : img = req.file.filename;

    res.json({name, descrisption, img})
    let SQL = "INSERT INTO grupo (name, descrisption, img) VALUES ( ?, ?, ? )";

    db.run(SQL,[name, descrisption, img], (err, result) => {
        if(err) console.log(err);
        else console.log(result)
    })
})


//Actualizar un contacto
app.post('edit/photo',upload.single('image'), (req,res) => {
    // let id = useParams()
    // const {id} =req.params;
    console.log("BodyUpdate: ",req)
    // const {id} = req.body
    // const {name} = req.body
    // const {phone} = req.body
    // const {email} = req.body
    // const {adress} = req.body
    // img = req.file.filename;
    // const {id_cont_social} = req.body
    // const {id_contact_group} = req.body
    // const {id_work} = req.body

    // console.log("**************file**************: ",file)
     if(req.file == undefined){
        let SQLGET = "SELECT * FROM contato WHERE id=?"
        db.get(SQLGET,[id], (error,result) => {
            console.log(result)
            let pic = result.pic;
            let SQL ="UPDATE contato SET pic = ? WHERE id = ?";
            db.run(SQL,[pic,id],(err, result) => {
                if(err) console.log(err);
                else console.log(result)
            })
        })
     }else {
        let pic = req.file.filename
        let SQL ="UPDATE contato SET pic = ? WHERE id = ?";
        db.run(SQL,[pic,id],(err, result) => {
                if(err) console.log(err);
                else console.log(result)
            })
     }
    // let SQL ="UPDATE contato SET name = ?, phone = ?, email = ?, adress = ?, pic = ?, id_cont_social = ?, id_contact_group = ?, id_work = ? WHERE id = ?";
    // // console.log(req)
    // db.run(SQL,[name, phone, email, adress, img, id_cont_social, id_contact_group, id_work, id],(err, result) => {
    //     if(err) console.log(err);
    //     else console.log(result)
    // })
    console.log(id)
    console.log(req.body)
})

app.put('/edit/:id', (req,res) => {
    let id = useParams()
    // const {id} =req.params;
    console.log("BodyUpdate: ",req)
    // const {id} = req.body
    const {name} = req.body
    const {phone} = req.body
    const {email} = req.body
    const {adress} = req.body
    const {id_cont_social} = req.body
    const {id_contact_group} = req.body
    const {id_work} = req.body

    // console.log("**************file**************: ",file)
     
    let SQL ="UPDATE contato SET name = ?, phone = ?, email = ?, adress = ?, id_cont_social = ?, id_contact_group = ?, id_work = ? WHERE id = ?";
    // console.log(req)
    db.run(SQL,[name, phone, email, adress, id_cont_social, id_contact_group, id_work, id],(err, result) => {
        if(err) console.log(err);
        else console.log(result)
    })
    console.log(id)
    console.log(req.body)
})


//Eliminar un contacto
app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM contato WHERE id = ?";
    db.run(SQL, [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  //Eliminar un grupo
app.delete("/delete-group/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM grupo WHERE id = ?";
    db.run(SQL, [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


  app.listen(3001, () => {
    console.log("Inicializando servidor")
});