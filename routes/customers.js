
// - list customer 
exports.list = function(req, res) {
  req.getConnection(function(err,connection) {
        connection.query('SELECT * FROM customer',function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
            res.render('customers',{page_title:"Customers List- Node.js",data:rows});
         });
    });
  
};

// - add customer 
exports.add = function(req, res) {
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

// - get edit customer 
exports.edit = function(req, res) {

    var id = (req.query.id) ? req.query.id : req.params.id ;
    var id_trim = id.replace(/[^\w\s]/gi, '') ;

    req.getConnection(function(err,connection) {
        connection.query('SELECT * FROM customer WHERE id = ?',[id_trim],function(err,rows) {
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
         });
    }); 
};

// - insert customer 
exports.save = function(req,res) {
    
    var input = JSON.parse(JSON.stringify(req.body));

    var name = (req.query.name) ? req.query.name : input.name ;
    var name_trim = name.replace(/[^\w\s]/gi, '') ;

    var address = (req.query.address) ? req.query.address : input.address ;
    var address_trim = name.replace(/[^\w\s]/gi, '') ;

    var email = (req.query.email) ? req.query.email : input.email ;
    var email_trim = email.replace(/[^\w\s]/gi, '') ;

    var phone = (req.query.phone) ? req.query.phone : input.phone ;
    var phone_trim = phone.replace(/[^\w\s]/gi, '') ;

    req.getConnection(function (err, connection) {
        
        var data = {
            name    : name_trim,
            address : address_trim,
            email   : email_trim,
            phone   : phone_trim
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows) {
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
    });
};

// - update customer 
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    var id = (req.query.id) ? req.query.id : req.params.id ;
    var id_trim = id.replace(/[^\w\s]/gi, '') ;

    var name = (req.query.name) ? req.query.name : input.name ;
    var name_trim = name.replace(/[^\w\s]/gi, '') ;

    var address = (req.query.address) ? req.query.address : input.address ;
    var address_trim = name.replace(/[^\w\s]/gi, '') ;

    var email = (req.query.email) ? req.query.email : input.email ;
    var email_trim = email.replace(/[^\w\s]/gi, '') ;

    var phone = (req.query.phone) ? req.query.phone : input.phone ;
    var phone_trim = phone.replace(/[^\w\s]/gi, '') ;

    req.getConnection(function (err, connection) {
        var data = {
            name    : name_trim,
            address : address_trim,
            email   : email_trim,
            phone   : phone_trim
        };
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id_trim], function(err, rows) {
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};

// - delete customer 
exports.delete_customer = function(req,res) {

      var id = (req.query.id) ? req.query.id : req.params.id ;
      var id_trim = id.replace(/[^\w\s]/gi, '') ;

      req.getConnection(function (err, connection) {
        connection.query("DELETE FROM customer  WHERE id = ? ",[id_trim], function(err, rows) {
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
        });
        
     });
};


