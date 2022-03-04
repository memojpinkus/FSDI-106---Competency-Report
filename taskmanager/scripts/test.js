//object constructor
function Dog(name, age){
    this.name = name;
    this.age = age;
}

class Cat{
    //auto called when creating objects
    constructor(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;
    }
}

function objects(){
    //object literal
    let d1 = {
        name: "Fido",
        age: 3
    };

    let d2 = {
        name: "Lola",
        age: 4
    };
    console.log(d1);
    console.log(d2);

    //object constructor
    let d3 = new Dog("Mona", 10);
    let d4 = new Dog("Sukha", 3);
    console.log(d3, d4);

    //classes
    let c1 = new Cat("Sir Meows-a-lot", 3 ,"White");
    let c2 = new Cat("Perry", 2, "Brown");
    console.log(c1,c2);
}

//exec the fn
objects();

function testRequest(){
    // https://restclass.azurewebsites.net/api/test
    $.ajax({
        type: "GET",
        url: "https://restclass.azurewebsites.net/api/test",
        success: function(response){
            console.log("Server says: ", response)
        },
        error: function(error){
            console.log("Request failed", error)
        }
    });
}

testRequest();