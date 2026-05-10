
var obj = {
    name:"abhay",
    age:"29"
}

var stringified_obj = JSON.stringify(obj);

localStorage.setItem("user",stringified_obj)