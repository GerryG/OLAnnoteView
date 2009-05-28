
var db;
//Open this page's local database.

function init() {
 

	if (!window.google || !google.gears) {
    return;
  }

  try {
    db = google.gears.factory.create('beta.database', '1.0');
  } catch (ex) {
    alert('Could not create database: ' + ex.message);
  }

 
  
  if (db) {
    db.open("myStudentDb");
	try{
		var query ="create table if not exists Student (StudentId int, Name varchar(255), Address varchar(255), Course varchar(255),Timestamp int)"; 
	db.execute(query);
	}catch(ex1)
	{alert('Exc: ' + ex1.message)}
  }
  
 
}

function closedb() {
	db.close();
}

function dropTable(){
	db.execute("Drop Table Student");
}

function handleStudentEntry(id,name,address,course) {

	if (!google.gears.factory || !db) {
    return;
      }

 
  var currTime = new Date().getTime();

  // Insert the new item.
  // The Gears database automatically escapes/unescapes inserted values.
  
  try{
  db.execute('insert into Student values (?, ?, ?, ?,?)', [id,name,address,course, currTime]);
  }catch(e){alert('Exc' + e.message);}
  
  return 'done';
  
}

function displayStudents() {
  var recentPhrases = new Array();

  try {

    
    var rs = db.execute('select * from Student');
    var index = 0;
    while (rs.isValidRow()) {
      recentPhrases[index] = rs.field(0);
      recentPhrases[index+1] = rs.field(1);
      recentPhrases[index+2] = rs.field(2);
      recentPhrases[index+3] = rs.field(3);
      recentPhrases[index+4] = rs.field(4);    
      index =index + 5;
      rs.next();
    }
    rs.close();

  } catch (e) {
    throw new Error(e.message);
  }
  
  return recentPhrases;
  }

  
function handleUpdateStudent(id, course) {
  
  if (!google.gears.factory || !db) {
    return;
  }

	db.execute('update Student set Course=? where StudentId=?',  [course,id])
  
  
  }

  function handleStudentRemoval(id) {
  if (!google.gears.factory || !db) {
    return;
  }
  try{
  db.execute('delete from Student where StudentId=?', [id]);
  }catch(ex){
  	return ex;
  }
  
  return "done";
  
  }

