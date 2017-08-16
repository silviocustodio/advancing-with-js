
//========================= create a list (array) of products =========================================
var list =  [

    {"desc": "rice", "amount": "1", "value": "5.40" },
    {"desc": "beer", "amount": "12", "value": "1.65" },
    {"desc": "meat", "amount": "1", "value": "25.40" }

];

//========================= calculate total values from the list  =========================================

function getTotal(list) {

    var total = 0;
    for (var key in list){

        total += list [key].value * list [key].amount

    }

    return total;

}

//========================= Scroll through each line of the list to find out how many array products ====================================

function setList() {
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';

    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) + '</td><td>'+ list[key].amount + '</td><td>'+ formatValue(list[key].value)  + '</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button> <button class="btn btn-default" onclick="deleteData('+key+');">Delete</button></td></tr>';
    }

    table += '</tbody>';

    document.getElementById("listTable").innerHTML = table;

}

//========================= format the text of input  =========================================

function formatDesc(desc) {

    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1)  // bring the first character from string and change it to upper, slice concatenate with the rest of word
     return str;


}

//========================= format type of value  =========================================

function formatValue(value) {


    var str = parseFloat(value).toFixed(2) + ""// change string to float, and put 2 numbers after comma, and  use + "" to change to string again
    str = str.replace(".", ","); // change . to ,
    str = "$ " + str; // to put $ + value
    return str;


}

//========================= get value of input typed by user =========================================

function addData() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc, "amount":amount, "value":value }); //gets the values and put it in the list, on first line
    setList(list);
    console.log(getTotal(list));

}

//===================== edit product ===============================================

function setUpdate(id) {

    var obj = list[id]; // Get the array index, editing details of product from the list, of the corresponding line
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block"; // display just when edit is clicked
    document.getElementById("btnAdd").style.display = "none"; // display none, because it is editing


    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';

}

//===================== reset form ===============================================

function resetForm() {

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block"; // return to normal state


    document.getElementById("inputIDUpdate").innerHTML = "";

}

//===================== update data - form  ===============================================


function updateData() {

    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value =document.getElementById("value").value;

    list[id] = {"desc":desc, "amount":amount, "value":value};

    resetForm();
    setList(list);


}

//===================== delete data ===============================================

function deleteData(id) {

    if (confirm("Delete this item?")){

        if(id === list.length - 1){
            list.pop(); //delete the last object of list
        }else if(id ===0){

            list.shift(); //delete the first object of lst
        }else{
            var arrAuxIni = list.slice(0,id) //get element from 0 to one element before o id
            var arrAuxEnd = list.slice(id + 1)//get element from a number after id to all elements until the end of this list
            list = arrAuxIni.concat(arrAuxEnd); //create array again without element with the id typed
        }

        setList();
    }

}



//===================== update the list ===============================================

setList(list);
console.log(getTotal(list));

