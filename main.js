
var deletebu = '<i class="material-icons">delete</i>';
var completebu = '<i class="material-icons" >check_circle</i>';

var data = (localStorage.getItem('todolist'))?(JSON.parse(localStorage.getItem('todolist'))):{
    
    todo: [],
    completed: [] 
    
};
rendertodo(); 



function buttonclick()
{
    var value = document.getElementById("item").value;
    if(value)
        {
          
           addtodolist(value);
            document.getElementById("item").value = null;
            
              data.todo.push(value);        
        }
}

document.getElementById("item").addEventListener('keydown',function(e){
    var value = document.getElementById("item").value;
    if(e.code==='Enter'&& value)
    {
        
           addtodolist(value);
            document.getElementById("item").value = null;
            
              data.todo.push(value);    
    }
     
})

function rendertodo()
{
    if(!data.todo.length&&!data.completed.length)return;
    
    for(var i =0;i<data.todo.length;i++)
    {
        var value = data.todo[i];
        addtodolist(value,false);
        
    }
    
    
    
        for(var j=0;j<data.completed.length;j++)
        {
            var value = data.completed[j];
            addtodolist(value,true);
    }
}

function dataobj()
{  
    localStorage.setItem('todolist' , JSON.stringify(data));
}

function removeitem()
{
    var item = this.parentNode.parentNode
    var parent = item.parentNode; 
    
    var idd = parent.id;
    
    var valui = item.textContent;
    var value = valui.substr(0,valui.length-18);
    
        
   if(idd=='todo')
       {
             data.todo.splice(data.todo.indexOf(value),1); 
       }
    else
        {
              data.completed.splice(data.completed.indexOf(value),1); 
        }
    
    dataobj();
    
    parent.removeChild(item);

}

function completeit()
{
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    
    var idd = parent.id;
    
    var valui = item.textContent;
    
    
    
    var value = valui.substr(0,valui.length-18);
    
   if(idd=='todo')
       {
             data.todo.splice(data.todo.indexOf(value),1); 
            data.completed.push(value);
       }
    else
        {
              data.completed.splice(data.completed.indexOf(value),1); 
            data.todo.push(value);
        }
    
     
    var target = (idd === 'todo')?document.getElementById('completed'): document.getElementById('todo');
    
       dataobj();
    
      parent.removeChild(item);
    
      target.insertBefore(item,target.childNodes[0]);
}

function addtodolist(metext ,completed)
{
    
    var list  = (completed)?(document.getElementById('completed')):document.getElementById('todo');

   var thing = document.createElement('li');
    thing.innerText = metext;
    
    var buttons = document.createElement('div');
    buttons.classList.add('buttons');
    
    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = deletebu;
    
    
    remove.addEventListener('click',removeitem);
    
    var complete = document.createElement('button');
    complete.classList.add('complete')
    complete.innerHTML = completebu;
    
     complete.addEventListener('click',completeit);
    

    
    buttons.appendChild(remove);
    buttons.appendChild(complete)
    thing.appendChild(buttons); 
    
    dataobj();
    
    list.insertBefore(thing,list.childNodes[0]);
}


