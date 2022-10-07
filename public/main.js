const tasks = document.querySelectorAll('.deleteBtn');
const item = document.querySelectorAll('.item span');
const itemCompleted = document.querySelectorAll('.item span.completed');

Array.from(tasks).forEach((x)=>{
         console.log(x.parentNode.childNodes[1].innerText);
         x.addEventListener('click', deleteTask)

});

Array.from(item).forEach((x)=>{
    // console.log(x.parentNode.childNodes[1].innerText);
    x.addEventListener('click', markComplete)
})
Array.from(itemCompleted).forEach(x=>{
    x.addEventListener('click', markUnComplete)
})

async function markUnComplete(){
    const taskUpdate  = this.parentNode.childNodes[1].innerText;

    try{
        // 'markComplete is used as endpoint in server.js
        //fetch and route must match
        const response = await fetch('markUnComplete', {
            method:'put',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'taskFromJS': taskUpdate
            })
        })
        //grab response from server side as data 
        const data = await response.json();
        console.log(data)
        // get request will be triggered
        location.reload()
    }catch(err){
        console.log(err);
    }
}


async function markComplete(){
    console.log("works");
    const taskUpdate  = this.parentNode.childNodes[1].innerText;

    try{
        // 'markComplete is used as endpoint in server.js
        //fetch and route must match
        const response = await fetch('markComplete', {
            method:'put',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'taskFromJS': taskUpdate
            })
        })
        //grab response from server side as data 
        const data = await response.json();
        console.log(data)
        // get request will be triggered
        location.reload()
    }catch(err){
        console.log(err);
    }
}


// Array.from(edit).forEach((element)=>{
//     element.addEventListener('click', editTask)
        
// })

// function editTask(){
//     console.log("hello")
// }

async function deleteTask(){
    console.log("parentNode", this.parentNode.childNodes);
    const deleteItem = this.parentNode.childNodes[1].innerText;
    try{
        const res = await fetch('deleteTask',{
            method:'delete',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                'task': deleteItem
            })
            })
        const data = await res.json()
        console.log("data is " , data)
        // location.reload();
    }
    catch(err){
        console.log(err);
    }
}


// async function editTask(){
// //     const task = this.parentNode.childNodes[1].innerText;
   
//     console.log(this.parentNode.childNodes[1].innerText);
// }try{
//     const response = await fetch('deleteTask',{
//         method: 'delete',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             'task': task
//         })
        

//     })
//     const data = await response.json()
//     }catch(error){
//         console.log(error);
// }


// edit.addEventListener('click', _ =>{
//     //We need to tell the server we’re sending JSON data by setting the Content-Type headers to application/json.

//     fetch('/task', {
//         method:'put',
//         headers:{'Content-Type': 'application/json'},
//         body:JSON.stringify({
//             task:'test from main.js'
//         })
//     })
// })