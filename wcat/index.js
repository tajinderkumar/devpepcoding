#!/usr/bin/env node

const fs = require("fs");

let arguments = process.argv.slice(2);
// console.log(arguments)
// console.log(process.argv)

let flags = [];
let filenames = [];
let secondaryargs = [];

for(let i of arguments){
    if(i[0]=="-"){
        flags.push(i);
    }else if(i[0] == "%"){
        secondaryargs.push(i.slice(1));
    }
    else{
        filenames.push(i);
    }
}

for(let file of filenames){
    let filedata = fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        if (flag == "-rs") { // this will remove all spaces
            filedata = removeAll(filedata, " ")
        }
        if(flag == "-rn"){ // this will remove all new lines
            filedata = removeAll(filedata, "\r\n")
        }
        if(flag == "-rsc"){ //this will remove special character provided in flag
            for(let secondaryarg of secondaryargs){
                filedata =removeAll(filedata,secondaryarg)
            } 
        }
        if(flag == "-sn"){  // this will add numbering to all non empty lines
            filedata = addNumberingToLine(filedata)
            for(let data of filedata){
                console.log(data)
            }
        }
        if(flag == "-s"){ //this will add numbering to all the lines
            filedata = filedata.split("\r\n");
            let i = 1;
            for (let data of filedata) {
                    console.log(i + " " + data);
                    i += 1;
                }
            }   
        if(flag == "-rel"){ //this will remove extra line i.e it allow only one empty line
            filedata = filedata.split("\r\n");
            let countextra = 1;
            for(let data of filedata){
                if(data != ""){
                    console.log(data)
                    countextra=1;
                }else if(data == '' && countextra == 1){
                    console.log(data);
                    countextra+=1;
                }
            }

        }
    }
    console.log(filedata)
    // console.log(newfiledata)
}

function removeAll(str,toremove){     
    return str.split(toremove).join("");
}


function addNumberingToLine(data){  // this function will add numbering to all non empty lines
    let filedata = data.split("\r\n");
    let newdata = [];
    let i = 1;
    for (let data of filedata) {
        if (data != "") {
            newdata.push(i + " " + data);
            i += 1;
        } else {
            newdata.push(data);
        }
    }
    return newdata

}