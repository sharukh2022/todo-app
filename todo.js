    var inputField=document.getElementById('todo-input-field');
    var todoList=document.getElementById('todo-list');
    function getTODOsFromLocalStorage(){
        var todoListStorage=localStorage.getItem('todo-list');
        if(todoListStorage===null){
            todoListStorage=[];
        }
        else{
          todoListStorage=JSON.parse(todoListStorage);
        }
        console.log(todoListStorage);
        return todoListStorage;
    }
    function renderTODOFromStorage(message,id){
        if(message){
            var newCard=createNewCard(message,id);
            var firstElem=todoList.firstElementChild;
            todoList.insertBefore(newCard,firstElem); 
        }
        else{
            alert("TODO can't be empty!!")
        }
    }
    function renderTODOsFromLocalStorage(){
        var todoListFromStorage=getTODOsFromLocalStorage();
        if(todoListFromStorage!==[]){
            for(var i=0; i<todoListFromStorage.length; i++){
                console.log(todoListFromStorage[i]);
                renderTODOFromStorage(todoListFromStorage[i].message,todoListFromStorage[i].id)
            }
        }
    }
    renderTODOsFromLocalStorage();
    function createNewCard(msg,id){
        var todoItem=document.createElement('div')
        todoItem.className='todo-list';
        todoItem.id=id;
        var todoMsgContainer=document.createElement('div');
        todoMsgContainer.className='todo-msg-container';
        todoItem.appendChild(todoMsgContainer);
        var todoMsg=document.createElement('h3');
        todoMsg.className='todo-message';
        todoMsg.innerHTML=msg;
        todoMsgContainer.appendChild(todoMsg);
        var innerDiv=document.createElement('div');
        todoMsgContainer.appendChild(innerDiv);
        var deleteIcon=document.createElement('i');
        deleteIcon.className='fas fa-trash-alt';
        deleteIcon.onclick=function(){
            var selectedElem=document.getElementById(todoItem.id);
            selectedElem.remove();
            var todoListFromStorage=JSON.parse(localStorage.getItem('todo-list'));
            var accessID=todoItem.id;
            var IDstr=accessID.charAt(4)
            var IDnum=Number(IDstr);
            todoListFromStorage.splice(IDnum-1,1)
            for(position=0;position<todoListFromStorage.length;position++){
                    todoListFromStorage[position].id='todo'+(position+1);
                }
            console.log(todoList);
            var newArr=[]
            for(i=0;i<todoListFromStorage.length;i++){
                    newArr[i]='todo'+(todoListFromStorage.length-i)
                }

            localStorage.removeItem('todolist');
            for(i=0;i<todoListFromStorage.length;i++){
                var divToUpdtd=document.getElementsByClassName('todo-list');
                divToUpdtd[i].id=newArr[i]
                }
            localStorage.setItem('todo-list',JSON.stringify(todoListFromStorage));
        }
        innerDiv.appendChild(deleteIcon);
        var editIcon=document.createElement('i');
        editIcon.className='fas fa-edit';
        editIcon.style.marginLeft='10px'
        innerDiv.appendChild(editIcon);
        var todoEditContainer=document.createElement('div');
        todoEditContainer.className='todo-edit-container';
        var newInputField=document.createElement('input');
        newInputField.type='text'
        newInputField.placeholder='Todo here';
        newInputField.className='new-input';
        newInputField.value=msg;
        todoEditContainer.appendChild(newInputField);
        var updateBtn=document.createElement('button');
        updateBtn.innerHTML='update';
        updateBtn.className='update-btn';
        todoEditContainer.appendChild(updateBtn);
        updateBtn.onclick=function(){
            todoMsg.innerHTML=newInputField.value;
            todoEditContainer.style.display='none'
            todoMsgContainer.style.display='flex';
            var todoListLocalStorage=JSON.parse(localStorage.getItem('todo-list'));
            var accessID=todoItem.id;
            var accessIDnum=accessID.charAt(4);
            var IDnum=Number(accessIDnum)
            var updated=todoListLocalStorage[IDnum-1];
            updated.message=newInputField.value;
            localStorage.removeItem('todolist');
            localStorage.setItem('todo-list',JSON.stringify(todoListLocalStorage));
        }
        todoItem.appendChild(todoEditContainer)
        editIcon.onclick=function(){
            todoMsgContainer.style.display='none'
            todoEditContainer.style.display='flex'
            todoEditContainer.style.justifyContent='center'
        }
        return todoItem;
    }
   
    var todoForm=document.getElementById('login-form');
    todoForm.onsubmit=function(e){
        e.preventDefault();
    }
    
    var btnClick=document.getElementById('btn-add-todo');
    function handleTODOcreation(){
        var message=inputField.value
        if(message){
            var todoListFromLocalStorage=getTODOsFromLocalStorage();
            var id='todo'+(todoListFromLocalStorage.length+1);
            var newCard=createNewCard(message,id);
            var firstElem=todoList.firstElementChild;
            todoList.insertBefore(newCard,firstElem);
            inputField.value='';
            var todoObj={
                id:newCard.id,
                message:message
            } 
            var todoListStorage=getTODOsFromLocalStorage();
            todoListStorage.push(todoObj)
            
            localStorage.setItem('todo-list',JSON.stringify(todoListStorage))
            
        }
        else{alert("TODO can't be empty!!")}
    }
    inputField.oninput=function(e){
        if(e.key==='Enter'){
            handleTODOcreation()
            }
        
        
    
}
    btnClick.onclick=function(){
       handleTODOcreation()
    }


















   
    
        
     