var n=4;
$(document).ready(function(){
    if(localStorage.getItem('food')==null){
      for(i=1;i<n+1;i++){
        localStorage.setItem(""+i+"-data",JSON.stringify([{count: 0, bill: 0}]));
      }
    $.getJSON('main.json', function(data) {
        localStorage.setItem('food',JSON.stringify(data));
        let htm="";
        JSON.parse(localStorage.getItem("food")).forEach(function(val,index){
           htm+='<div draggable="true" id="'+index+'" ondragstart="return dragStart(event)"> <p>'+''+val.name+' '+'</p><p>'+''+val.price+' '+'</p></div>';
           document.getElementById("menu").innerHTML=htm;
        });
    }) ; 
}
else{
    let htm1="",htm2="",htm3="",htm4="";
    JSON.parse(localStorage.getItem("food")).forEach(function(val,index){
      
      if(val.category==="Main-course"){
        htm1+='<li id="'+''+index+''+'" draggable="true" ondragstart="return dragStart(event)"><a> <p>'+''+val.name+' '+'</p><p class="price">'+''+val.price+' '+'</p></a></li>';
        document.getElementById("myMenu1").innerHTML=htm1;
      }
      if(val.category==="desserts"){
        htm2+='<li id="'+''+index+''+'" draggable="true" ondragstart="return dragStart(event)"><a> <p>'+''+val.name+' '+'</p><p class="price">'+''+val.price+' '+'</p></a></li>';
        document.getElementById("myMenu2").innerHTML=htm2;
      }
      if(val.category==='Apptizers'){
        htm3+='<li id="'+''+index+''+'" draggable="true" ondragstart="return dragStart(event)"><a> <p>'+''+val.name+' '+'</p><p class="price">'+''+val.price+' '+'</p></a></li>';
        document.getElementById("myMenu3").innerHTML=htm3;
      }
      if(val.category==='Beverages'){
        htm4+='<li id="'+''+index+''+'" draggable="true" ondragstart="return dragStart(event)"><a> <p>'+''+val.name+' '+'</p><p class="price">'+''+val.price+' '+'</p></a></li>';
        document.getElementById("myMenu4").innerHTML=htm4;
      }
     });
     showTables();
}
});
function showTables(){
    for(let i=1;i<n+1;i++){
        if(localStorage.getItem('table-'+i+'')==null){
                let htm1="";
                   htm1+='<span>Rs.0.00 | Totalitems:0</span>';
                   document.getElementById('table-'+i+'').innerHTML=htm1;
                }
        else{
            const data=JSON.parse(localStorage.getItem(""+i+"-data"));
            let htm1="";
                   htm1+='<span>Rs.'+data[0].bill+' | Totalitems:'+data[0].count+'</span>';
                   document.getElementById("table-"+i+"").innerHTML=htm1;
        }
        }
}
function dragStart(ev) {
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target,0,0);
    return true;
 }
 function dragEnter(ev) {
    ev.preventDefault();
    return true;
 }
 function dragOver(ev) {
    return false;
 }
 function dragDrop(ev,i) {
    var src = ev.dataTransfer.getData("Text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    showTables();
    ev.stopPropagation();
    return false;
 }
 var el = document.getElementById('myMenu1'); 

  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchleave", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);

  function handleStart(ev) {
      ev.dataTransfer.effectAllowed='move';
        ev.dataTransfer.setData("Text", ev.target.id);
        ev.dataTransfer.setDragImage(ev.target,0,0);
        return true;
  }
  function handleCancel(ev){
      return false;
  }
  function handleMove(ev){
    return ;
}
function handleEnd(ev,i) {
   var src = ev.dataTransfer.getData("Text");
   item=JSON.parse(localStorage.getItem("food"));
   addItem(item[src],i);
   showTables();
   ev.stopPropagation();
   return false;
}
 function addItem(item,i){
     if(localStorage.getItem('table-'+i+'')==null){
        const oldItems=[];
        const newItem1={
            "name":item.name,
            "price":item.price,
            "count":1
        }
        oldItems.push(newItem1);
        localStorage.setItem('table-'+i+'',JSON.stringify(oldItems)); 
        const data=JSON.parse(localStorage.getItem(""+i+"-data"));
        data[0].count+=1;
        data[0].bill+=parseFloat(item.price);
        localStorage.setItem(""+i+"-data",JSON.stringify(data));

     }
     else{
         let flag=0;
            const oldItems1=(JSON.parse(localStorage.getItem('table-'+i+'')));
            const newItem={
                "name":item.name,
                "price":item.price,
                "count":1
            }; 
          for(j=0;j<oldItems1.length;j++){
              if(item.name==oldItems1[j].name){
                  oldItems1[j].count+=1;
                  flag+=1;
                  break;
              }
            }
            const data=JSON.parse(localStorage.getItem(""+i+"-data"));
              if(flag==0){
                oldItems1.push(newItem);
                data[0].count+=1;
              }
            localStorage.removeItem('table-'+i+'');
            localStorage.setItem('table-'+i+'',JSON.stringify(oldItems1));
            data[0].bill+=parseFloat(item.price);
            localStorage.setItem(""+i+"-data",JSON.stringify(data));
     }   
 }
 function fun(i){
     const items=JSON.parse(localStorage.getItem("table-"+i+""));
     document.getElementById('clos').innerHTML=`<button type="button" class="close" onclick="col(`+i+`)" data-dismiss="modal">&times;</button><h4 class="modal-title" id="modal-title"></h4>`;
     document.getElementById('target'+i+'').style.backgroundColor="white";
     if(items!=null){
         let total=0;     
    htm='Table-'+i+'|Order Details';
    document.getElementById("modal-title").innerHTML=htm;
    htm1='<table style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th> <th style="text-align: left">Price</th><th style="text-align: left"></th><th style="text-align: left"></th></tr>';
    for(let j=0;j<items.length;j++){
        htm1+='<tr><td>'+(j+1)+'</td><td>'+items[j].name+'</td><td>'+items[j].price+'</td><td><input type="number" id="'+j+'" value='+items[j].count+' onchange="return updateValue('+i+','+j+',this.value)" name="quantity"></td><td><span class="glyphicon glyphicon-trash" onclick="deleteItem('+i+','+j+')"></span></td></tr>';
        total+=items[j].price*items[j].count;
    }
    htm1+='<tr><td></td><td>Total:</td><td>'+total+'</td>';
    document.getElementById("modal-body").innerHTML=htm1;
}
    else{
        htm='Table-'+i+'|Order Details';
        document.getElementById("modal-title").innerHTML=htm;
        htm1='<table style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th><th style="text-align: left">Price</th><th style="text-align: left"></th><th style="text-align: left"></th></tr>';
        htm1+='<tr><td> </td></tr><tr><td> </td></tr><tr><td></td><td>Total:</td><td>0</td>';
        document.getElementById("modal-body").innerHTML=htm1;
    }

}
function updateValue(i,j,val){
    const items=JSON.parse(localStorage.getItem("table-"+i+""));
    const data=JSON.parse(localStorage.getItem(''+i+'-data'));
    data[0].bill-=items[j].price*items[j].count;
    items[j].count=parseInt(val);
    data[0].bill+=items[j].price*items[j].count;
    localStorage.removeItem("table-"+i+"");
    localStorage.removeItem(""+i+"-data");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem(""+i+"-data",JSON.stringify(data));
    fun(i);
    showTables();

}
function deleteItem(i,j){
    const items=JSON.parse(localStorage.getItem("table-"+i+""));
    const data=JSON.parse(localStorage.getItem(""+i+"-data"));
    data[0].count=data[0].count-1;
    data[0].bill=parseFloat(data[0].bill)-(parseInt(items[j].count)*parseInt(items[j].price));
    items.splice(j,1);
    localStorage.removeItem("table-"+i+"");
    localStorage.removeItem(""+i+"-data");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem(""+i+"-data",JSON.stringify(data));
    fun(i);
    showTables();
}
function generateBill(){
   const at=document.getElementById("modal-title").innerHTML;
   const items=JSON.parse(localStorage.getItem("table-"+at[6]+""));
   let total2=0;
    for(let j=0;j<items.length;j++)
      total2+=(items[j].price)*(items[j].count);
    localStorage.removeItem('table-'+at[6]+'');
    localStorage.setItem(""+at[6]+"-data",JSON.stringify([{count: 0, bill: 0}]));
    fun(parseInt(at[6]));
    showTables();
    document.getElementById('target'+at[6]+'').style.backgroundColor="rgb(41,40,40)";
    document.getElementById('target'+at[6]+'').style.color="white";
    alert("Total amount to be paid is: "+total2)
}
function myFunction() {
    let input, filter,txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    for (i = 1; i < 5; i++) {
      let tr=document.getElementById('target'+i+'');
        txtValue = 'table-'+i+'';
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }          
    }
  }

  function col(i){
    document.getElementById('target'+i+'').style.backgroundColor="rgb(41,40,40)";
    document.getElementById('target'+i+'').style.color="white";
  }
  function myFunc() {
   let input, filter, ul, li, a, i;
    input = document.getElementById("searchMenu");
    filter = input.value.toUpperCase();
    ul = document.querySelector(".menu-items");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        $(document).ready(function(){
          $('.sub-menu').slideDown();
          $('.dropdown').toggleClass('rotate');
        });
       
      } else {
        li[i].style.display = "none";
      }
      
    }
   
  }