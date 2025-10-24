function convertCGPA() {
  
  // checking empty input field
  var cgpa = document.getElementById("cgpa_input").value;
  if(cgpa == ""){
    document.getElementById("error_msg").innerHTML = "Enter valid CGPA (i.e. between 0 & 10)";
    return;
  }
  
  var cgpa = Number(cgpa);
  var grade;
  var per;
  var cls;
  
  // validating range of input CGPA
  if(cgpa < 0 || cgpa > 10){
    document.getElementById("error_msg").innerHTML = "Enter valid CGPA (i.e. between 0 & 10)";
    return;
  }
  else{
    document.getElementById("error_msg").innerHTML = "";
  }
  
  // Calculating grade & percentage
  if(cgpa < 4){
    grade = "F";
    per = "NA";
  }
  else if(cgpa < 4.75){
    grade = "D";
    per = Math.round((6.6*cgpa + 13.6) * 100) / 100;
  }
  else if(cgpa < 5.25){
    grade = "C";
    per = Math.round((10*cgpa - 2.5) * 100) / 100;
  }
  else if(cgpa < 5.75){
    grade = "B";
    per = Math.round((10*cgpa - 2.5) * 100) / 100;
  }
  else if(cgpa < 6.75){
    grade = "B+";
    per = Math.round((5*cgpa + 26.5) * 100) / 100;
  }
  else if(cgpa < 8.25){
    grade = "A";
    per = Math.round((10*cgpa - 7.5) * 100) / 100;
  }
  else if(cgpa < 9.5){
    grade = "A+";
    per = Math.round((12*cgpa - 25) * 100) / 100;
  }
  else{
    grade = "O";
    per = Math.round((20*cgpa - 100) * 100) / 100;
  }
  
  // Calculating class
  if(cgpa < 4)
    cls = "Fail";
  else if(cgpa < 5.5)
    cls = "Pass";
  else if(cgpa < 6.25)
    cls = "Second Class"
  else if(cgpa < 6.75)
    cls = "Higher Second Class";
  else if(cgpa < 7.75)
    cls = "First Class";
  else
    cls = "First Class with Dist";

  // Filling the output table
  document.getElementById("op_cgpa").innerHTML = cgpa.toFixed(2);
  document.getElementById("op_grade").innerHTML = grade;
  document.getElementById("op_per").innerHTML = per === "NA" ? per : per + "%";
  document.getElementById("op_class").innerHTML = cls;
}

// Click convert button when enter is pressed in input field
document.getElementById("cgpa_input").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("convert_btn").click();
  }
});

// Clear error message when user starts typing
document.getElementById("cgpa_input").addEventListener("input", function() {
  if (this.value !== "") {
    document.getElementById("error_msg").innerHTML = "";
  }
});

// function to export table data to excel file
function exportTableToExcel(tableID){
  
  if(document.getElementById("op_cgpa").innerHTML == '-'){
    document.getElementById("error_msg").innerHTML = "Enter valid CGPA (i.e. between 0 & 10)";
    return;
  }
  
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  // Specify file name
  var filename = 'cgpa.xls';

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if(navigator.msSaveOrOpenBlob){
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob( blob, filename);
  }else{
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
}