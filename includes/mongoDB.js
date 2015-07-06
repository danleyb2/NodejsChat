var mongo=require('mongodb').MongoClient;

var url="mongodb://localhost:27017/exampleDb";
var mongoDbObj;


mongo.connect(url,function (err,db){
    if(err){
        console.log('Connection Error'+err);
    }else {
        console.log('Connected to DB');
        mongoDbObj= {
            db: db,
            data:db.collection('usercollection')
        };
        me={
            "username" : "donald",
            "email":"noma@outlook.com"
        };

        var col=db.collection('test',function(err,collection){

        });
        var doc1={'hello':'doc3'};
        var doc2=[{'hello':'doc1'},{'hello':'doc2'}];
       // col.insert(doc1);
        //col.insert(doc2);



        //inserting data
        //mongoDbObj.data.insert(me);
        /*update specific data
         mongoDbObj.data.update({"username":"danleyb2"},{$set:{"email":"daan@gmul.com"}},function(err,result){
         console.log(result);
         });
         //update all data
         mongoDbObj.data.update({"username":"danleyb2"},{"email":"email"},function(err,result){
         console.log(result);
         });
         */

        /*
         //delete all data in a collection

         mongoDbObj.data.remove(function(err,result){

         });
         //delete specific
         mongoDbObj.data.remove({"username":"username"},function(err,result){

         });
         */


        col.find().toArray(function(err,result){
            if(err){
                console.log("Error occured "+err);
            }else{
                console.log(result);
            }
        });


        /*

         var collection = db.get('usercollection');
         collection.find({}, {}, function (e, docs) {
         console.log(docs);
         });
         */


        //db.close();
    }
});