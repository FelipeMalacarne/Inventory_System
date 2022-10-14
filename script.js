//global inventory
let my_inv = [
    {
        "id": 1,
        "name":"voodka",
        "min": 50,
        "qnt": 30,
        "status": false
    },
    {
        "id": 2,
        "name":"red label",
        "min": 50,
        "qnt": 30,
        "status": false
    },
    {
        "id": 3,
        "name":"gin",
        "min": 50,
        "qnt": 30,
        "status": false
    }
    
]

get_local_storage_array();

//item constructor function
function item(id, name, min, qnt) {
    this.id = id;
    this.name = name;
    this.min = min;
    this.qnt = qnt;
    if (qnt >= min){
        this.status = true;
    }else{
        this.status = false;
    }
}

function store_inv_array(){   
    localStorage.setItem("items", JSON.stringify(my_inv));
}
function get_local_storage_array(){
    if(localStorage.getItem("items") != null){ 
        my_inv = JSON.parse(localStorage.getItem("items"));
    }
}

//adds objects to the global inventory
function add_new_item_to_inv(new_item) {
    if (!my_inv.some(item => item.name === new_item.name)){
        my_inv.push(new_item)
        my_inv.sort((a, b) => a.id - b.id);
    }
    else{
        alert("Error: " + new_item.name + " already exists");
  }
}
function increment_item(increment, id){
    if (increment > 0){
        my_inv[id].qnt += parseInt(increment);
        if(my_inv[id].min <= my_inv[id].qnt){
            my_inv[id].status = true;
        }else{
            my_inv[id].status = false;
        }
    }
    store_inv_array();
    load_all_displays();
}
function decrement_item(decrement, id){
    if (decrement > 0){
        my_inv[id].qnt -= parseInt(decrement);
        if(!(my_inv[id].min <= my_inv[id].qnt)){
            my_inv[id].status = false;
        }else{
            my_inv[id].status = true;
        }
    }
    store_inv_array();
    load_all_displays();
}
function delete_item(){
    const index = my_inv.findIndex(object => {
        return object.id == this.value;
      });


    my_inv.splice(index, 1);
    store_inv_array();
    load_all_displays();

}


//Adds a item to the domain
function add_item_to_domain(item_obj) {
    const display= document.querySelector('#itens')
    const item = document.createElement('div');
    const item_right = document.createElement('div');
    const item_left = document.createElement('div');
    
    const id = document.createElement('div');
    const name = document.createElement('div');
    const min = document.createElement('div'); 
    const qnt = document.createElement('div');
    const status = document.createElement('div');
    
    
    item_right.classList.add('item-half');
    item_left.classList.add('item-half');
    item_right.classList.add('item-right');
    item_left.classList.add('item-left');
    item.classList.add('item');

    id.textContent = "#" + item_obj.id;
    name.textContent = item_obj.name;
    min.textContent = item_obj.min;
    qnt.textContent = item_obj.qnt;
    status.textContent = item_obj.status;


    item_left.appendChild(id);
    item_left.appendChild(name);

    item_right.appendChild(min);
    item_right.appendChild(qnt);
    item_right.appendChild(status);

    item.appendChild(item_left);
    item.appendChild(item_right);
    display.appendChild(item);

}
function add_input_item_to_DOM(new_item, func) {
    const display= document.querySelector(`#itens-${func}`)
    const item = document.createElement('div');
    const item_right = document.createElement('div');
    const item_left = document.createElement('div');

    const id = document.createElement('div');
    const name = document.createElement('div');
    const min = document.createElement('div'); 
    const qnt = document.createElement('div');
    const btn = document.createElement('button');
    const input = document.createElement('input');

    input.classList.add(`${func}-qnt`);
    input.type = "number";

   
    
    item_right.classList.add('item-half');
    item_left.classList.add('item-half');
    item_right.classList.add('item-right');
    item_left.classList.add('item-left');

    item.classList.add('item');


    id.textContent =  "#" + new_item.id;
    name.textContent = new_item.name;
    min.textContent = new_item.min;
    qnt.textContent = new_item.qnt;

    item_left.appendChild(id);
    item_left.appendChild(name);

    item_right.appendChild(min);
    item_right.appendChild(qnt);
    if(func ==='del'){
        btn.textContent = 'Delete';
        btn.classList.add('del-btn');
        btn.value = new_item.id;
        btn.onclick = delete_item
        item_right.appendChild(btn);
    }else{
        item_right.appendChild(input);
    }

    item.appendChild(item_left);
    item.appendChild(item_right);
    display.appendChild(item);
    
}

//load display with inventory data
function load_main_display(){
    //clear display DOM structure
    const parent = document.getElementById("itens");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    //add all items to display DOM
    my_inv.forEach(element => { add_item_to_domain(element)});
}
function load_add_display(){
    const parent = document.getElementById("itens-add");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    //add all items to display DOM
    my_inv.forEach(element => { add_input_item_to_DOM(element,'add')});
}
function load_rm_display() {
    const parent = document.getElementById("itens-rm");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    //add all items to display DOM
    my_inv.forEach(element => { add_input_item_to_DOM(element,'rm')});
}
function load_del_display(){
    const parent = document.getElementById("itens-del");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    my_inv.forEach(element => { add_input_item_to_DOM(element,'del')});

}
function load_all_displays(){
    load_main_display();
    load_add_display();
    load_rm_display(); 
    load_del_display();

}
load_all_displays();


///func = "add", "new", "rm", "del"
function open_popup(func){
    document.getElementById(`${func}-popup-background`).style.display = "flex";
}
function close_popup(func){
    document.getElementById(`${func}-popup-background`).style.display = "none";
}
function assign_id(){
    let new_id;
    for(let i = 0; i < my_inv.length; i++){
        if(i + 1 != my_inv[i].id){
            new_id = i + 1;
            break;
        }else{
            new_id =  my_inv.length + 1;
        }
    }
    if(my_inv.length === 0){
        new_id = 1;
    }
    return new_id;

}

//Submit add popup
const btn_send_add = document.querySelector('#send-add')
btn_send_add.addEventListener("click", (e) => {
    e.preventDefault();

    const inputs_node_list = document.querySelectorAll('.add-qnt')
    let inputs_value_list = [];

    for (const input of inputs_node_list.values()) {
        inputs_value_list.push(input.value);
        input.value = '';
    }
    for (let i = 0; i < inputs_value_list.length; i++) {
        increment_item(inputs_value_list[i], i)
    }
  
    close_popup('add')
})

//Submit new popup
const btn_send_new = document.querySelector('#send-new')
btn_send_new.addEventListener("click", (e) => {
    e.preventDefault();

    const new_name = document.querySelector('#new-name')
    const new_min = document.querySelector('#new-min')
    const new_qnt = document.querySelector('#new-qnt')
    const new_id = assign_id();
   
    const new_item = new item(new_id, new_name.value, parseInt(new_min.value), parseInt(new_qnt.value))
    add_new_item_to_inv(new_item);
    store_inv_array()

    new_name.value = '';
    new_min.value = '';
    new_qnt.value = '';

    load_all_displays();
    close_popup('new')
})

//Submit rm popup
const btn_send_rm = document.querySelector('#send-rm')
btn_send_rm.addEventListener("click", (e) => {
    e.preventDefault();

    const inputs_node_list = document.querySelectorAll('.rm-qnt')
    let inputs_value_list = [];

    for (const input of inputs_node_list.values()) {
        inputs_value_list.push(input.value);
        input.value = '';
    }
    for (let i = 0; i < inputs_value_list.length; i++) {
        decrement_item(inputs_value_list[i], i)
    }
  
    close_popup('rm')
})
