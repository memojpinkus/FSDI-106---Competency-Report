var nonImportantClass = "far fa-start";
var importantClass = "fas fa-start";
var isImportant = false;
var isFormVisible = false;
$("#show").hide();

function toggleImportant(){
    console.log("Icon clicked!")

    if(isImportant){
        //non important
        isImportant=false;
        $("#iImportant").removeClass(importantClass);
        $("#iImportant").addClass(nonImportantClass);
    }
    else{
        //important
        $("#iImportant").removeClass(nonImportantClass);
        $("#iImportant").addClass(importantClass);
        isImportant=true;
    }
}

function toggleVisible(){
    console.log("Visible click")

    if(isFormVisible){
        isFormVisible = false;
        $("#hide").hide();
        $("#show").show();
        $(".control").hide();
    }
    else{
        isFormVisible = true;
        $("#hide").show();
        $("#show").hide();
        $(".control").show();
    }
}

function saveTask(){
    console.log("Saving task...");

    let title = $("#txtTitle").val();
    let date = $("#selDate").val();
    let contact = $("#txtContact").val();
    let location = $("#txtLocation").val();
    let desc = $("#txtDescription").val();
    let color = $("#selColor").val();

    //validate
    if(title.length<5){
        //show an error
        alert("title should be at least 5 chars long");
        return;
    }

    if(!date){
        //show an error
        alert("Due date is required");
        return;
    }

    let task = new Task(isImportant, title, date, contact, location, desc, color);
    let dataStr = JSON.stringify(task);

    console.log(task);
    console.log(dataStr);

    //save the task
    $.ajax({
        type:"POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: dataStr,
        contentType: "application/json",
        success: function(data){
            let savedTask = JSON.parse(data);

            displayTask(savedTask);
        },
        error: function(error){
            console.log("Save failed ", error)
        }
    });

    //display
    displayTask(task);

    //clear form
    clearForm();
}

function clearForm(){
    $("#txtTitle").val("");
    $("#selDate").val("");
    $("#selColor").val("#000000");
    $("#txtContact").val("");
    $("#txtLocation").val("");
    $("#txtDescription").val("");
}

function displayTask(task){
    //create the syntax
    let syntax = `<div id="${task._id}" class="task">
        <h5>${task.title}</h5>
        <p>${task.desc}</p>
        <label class="date">${task.dueDate}</label>
        <label class="location">${task.location}</label>
        <label class="contact">${task.contact}</label>
        <button onclick="deleteTask('${task._id}')" class="btn btn-sm btn-danger">Remove</button>
    </div>`;

    //append the xyntax to an element on the screen
    $("#tasks-list").append(syntax);
}

function deleteTask(id){
    console.log("deleting task ", id);
    $("#"+id).remove();
    //http DELETE request with the id 
    
}

//DELETE https://fsdiapi.azurewebsites.net/api/tasks/clear/<name>
/*
    create the button on HTML (Id)
    click event to call a fn (clearTasks)
    create the fn
    send and ajax delete request to clear the data
*/

function clearData(){
    $.ajax({
        type: 'DELETE',
        url: 'https://fsdiapi.azurewebsites.net/api/tasks/clear/GuillermoJ',
        success: () => {
            console.log("Data cleared");
            $("#tasks-list").html(""); //clear the contents of the div
        },
        error: (details) => {
            console.log("Clear failed", details);
        }
    });
}

function retrieveTasks(){
    $.ajax({
        type:"GET",
        url:"https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(data){
            let list = JSON.parse(data); //from string to object/array

            for(let i = 0; i < list.length; i++){
                let task = list[i];
                if(task.name === "GuillermoJ"){
                    displayTask(task);
                }
            }
        },
        error: function(error){
            console.error("Retrieve failed ", error);
        }
    })
}

function init(){
    console.log("Task manager");

    //events
    $("#iImportant").click(toggleImportant);
    $("#show").click(toggleVisible);
    $("#hide").click(toggleVisible);
    $("#btnSave").click(saveTask);
    $('#btnDeleteTasks').click(clearData);

    //load data
}

window.onload = init;