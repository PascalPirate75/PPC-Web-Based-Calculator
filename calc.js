var nums = [];
var ops = [];
var runningTotal = 0;
var clear = true;
var memSet = false;
var memClr = false;
var opBlock = "no";
var clearCount = 0;
var keyCodeKey = false;
var CodeCharToggle = "Char";
var memPad2Selectors =[];
// var rowShowing = $("#memPad2SelectionContainer").child().;


function myRound(n, p) {
 
 var lP = 1;
 if (typeof p !== "undefined") {lP = p;}
 else if (typeof myRoundPersision !== "undefined") {lP = myRoundPersision;}
 else lP = 1000000;
 
 t = Math.round(n*lP)/lP;
 
 return t;

}

function getLastElm(elm) {
 
 return elm[elm.length-1];
 
}
    
    
 $(function(){
  
  
function PrintElem(elem) {
//http://stackoverflow.com/questions/2255291/print-the-contents-of-a-div

    var mywindow = window.open('', 'PRINT', 'height=600,width=900');

    mywindow.document.write('<html><head><title>Reciept</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1 style="color: gold; text-align: center;">Pascal Pirates Calculator</h1>');
    mywindow.document.write('<div style="text-align: right;">' + document.getElementById(elem).innerHTML + '</div>');
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

$("#print").click(function () {
   
    // $(this).hide();
   
    PrintElem("calcPaper");
    
    // $(this).show();

}); 
  

function alertStatus(m, d) {
 
   var t = d || 2000;
   var p = $("#status");
   p.text(m);
   p.show();
   try { 
    
   if (typeof alertTimmer !== "undefined") clearTimeout(alertTimmer);
 
   } catch(e) {
     console.log(e);
   }
   
   alertTimmer = setTimeout(function(){p.hide();}, t);

}  
  
  
  $("#sm2KeyToggle").on("click", function(){ // when dashed arrow is clicked open list of row replacements
   
   $("#memPad2SelectionContainer").toggle();
 
  });
  
  
  $("#memPad2SelectionContainer").on("mouseleave", function(){
   
     $(this).hide();

  });
  
  $(".memPad2Slector").on("click", function(){ // when replacement is clicked replacement is switched in
 
      target = $("." + $(this).data( "value" ));
      
      target.siblings().addClass("hideMe");
      $(".capKey").removeClass("hideMe");
      target.removeClass("hideMe");

      alertStatus($(this).attr("title"));
      
      $("#memPad2SelectionContainer").toggle();
   
  });

    
    
    
    $(".conv").on("click", function(){ //When on of the conversions is clicked multiplies it by what is in window
     
       $("#calcDisplay").val(myRound(Number($("#calcDisplay").val()) * Number($(this).data("value"))));
     
    });
  
  
    $("#neg").on("click", function(){ //toggle number in calculator between neg and positive
     
       $("#calcDisplay").val(Number($("#calcDisplay").val()) * -1);
     
    });
  
  
    $(".hKey").on("click", function(){ //adds hex number to calc display when clicked
     
        if ($("#baseKey").text() == "h"){
         
          var tmp = $("#calcDisplay").val();
          $("#calcDisplay").val(tmp + $(this).text());
        
        }
    });
  
  
    $("#baseKey").on("click", function(e){  //toggles base
        e.stopPropagation();
        switch ($("#baseKey").text()) {
         
         case "d":
           $("#baseKey").text("h");
           $("#baseKey").toggleClass("setClassGreen");
           $("#calcDisplay").val(Number($("#calcDisplay").val()).toString(16).toUpperCase());
           $("#baseKey").prop("title", "Hexadecimal, Cycle base to Binary.");
           $(".hKey").removeClass("setClassGrey");
           alertStatus("Hexadecimal, no math");

          break;
          
         case "h":
           $("#baseKey").text("b");
           $("#calcDisplay").val(Number(parseInt($("#calcDisplay").val(), 16)));
           $("#calcDisplay").val(Number($("#calcDisplay").val()).toString(2).toUpperCase());
           $("#baseKey").prop("title", "Binary, Cycle base to Decimal.");
           $(".hKey").addClass("setClassGrey");
           $(".calcNum").addClass("setClassGrey");
           $(".binKey").removeClass("setClassGrey");
           alertStatus("Bianary, no math");

          break;
          
         default:
           $("#baseKey").text("d");
           $("#baseKey").toggleClass("setClassGreen");
           $("#calcDisplay").val(Number(parseInt($("#calcDisplay").val(), 2)));
           $("#baseKey").prop("title", "Decimal, Cycle base to Hexadecimal.");
           $(".calcNum").removeClass("setClassGrey");
           alertStatus("Decimal");

        }
        
        if ($("#calcDisplay").val() == "0" || $("#calcDisplay").val() == "NAN" || $("#calcDisplay").val() == "NaN") {
         
           $("#calcDisplay").val("");
         
        }
     
    });
    

    $(".trig").on("click", function(){  //runs trig functions on current number in window
     
       switch($(this).data("value")) {
        
        case "sin":
          $("#calcDisplay").val(Math.sin(Number($("#calcDisplay").val())));
        break;
        case "cos":
          $("#calcDisplay").val(Math.cos(Number($("#calcDisplay").val())));
        break;
        case "tan":
          $("#calcDisplay").val(Math.tan(Number($("#calcDisplay").val())));
        break;
        case "asin":
          $("#calcDisplay").val(Math.asin(Number($("#calcDisplay").val())));
        break;
        case "acos":
          $("#calcDisplay").val(Math.acos(Number($("#calcDisplay").val())));
        break;
        case "atan":
          $("#calcDisplay").val(Math.atan(Number($("#calcDisplay").val())));
        break;
       
        
       }

    });
  
    $(".sm2Key").on("click", function(e){
         e.stopPropagation();
         
         switch ($(this).data( "value")) {
          
            case "pi":
          
               $("#calcDisplay").val("3.14159265359");

            break;
            
            case "f": 
               var factorial=(n)=>Array.from({length:n},(v,k)=>k+1).reduce((a,b)=>a*b,1)
               $("#calcDisplay").val(factorial(Number($("#calcDisplay").val())));
               
            break;
            

         }       
                
         

    });
  
  
    $(".sideKey").on("click", function(e){
     
       e.stopPropagation();
         
       switch ($(this).data( "value" )) {
        
         case "abs":
           $("#calcDisplay").val(Math.abs($("#calcDisplay").val()));//Math.abs($("#calcDisplay").val())
         break;
         
         case "power":
           $(this).addClass("setClassGreen");
           nums.push($("#calcDisplay").val());
           $("#calcDisplay").val("");
           opBlock = "power";          
          
         break;
          
         case "root":
           $("#calcDisplay").val(Math.sqrt($("#calcDisplay").val()));
         break;
          
         case "nroot":
           $(this).addClass("setClassGreen");
           nums.push($("#calcDisplay").val());
           $("#calcDisplay").val("");
           opBlock = "nroot";
           
           
         break;
          
         case "square":
           $("#calcDisplay").val(Math.pow($("#calcDisplay").val(), 2));
         break;

         case "Inverse":
            
            $("#calcDisplay").val(1/Number($("#calcDisplay").val()));
            
         break;
                 
                 
         case "keyCode":
          $(this).toggleClass("setClassGreen");
          
          if (!keyCodeKey) {
           keyCodeKey=true;
           $("#calcDisplay").focus();
             $("#calcDisplay").on("keydown", function(e){
                e.stopPropagation();
  	             e.preventDefault();
  	             $("#calcDisplay").val(e.keyCode);
           });
           } else {
             keyCodeKey = false;
             $("#calcDisplay").off("keydown");
           }
          break;

          case "toggleCodeChar":
            $(this).toggleClass("setClassGreen");
            
            
            if (CodeCharToggle == "Char") {
               $(this).text("Code");
               CodeCharToggle = "Code";
               $("#calcDisplay").val(($("#calcDisplay").val()).charCodeAt(0));
 
            } else {
               $(this).text("Char");
               CodeCharToggle = "Char";
               $("#calcDisplay").val(String.fromCharCode(Number($("#calcDisplay").val())));

            }

          break;
          
          default:
             
       }
 
    });
  
   
   function clearPrvProblem() {
    
     // console.log(getLastElm(ops) != "*NEW*", ops.length > 1, ops.length);
     while (getLastElm(ops) != "*NEW*" && ops.length > 1) {
      
       t = ops.pop();
      // console.log (t, ops);
     }
     while (getLastElm(nums) != "*NEW*" && nums.length > 1) {
      
       t = nums.pop();
      // console.log(t, ops);
     }
     
     s = $("#calcPaper").html();
     var i = s.lastIndexOf("<br>");
     s = s.substring(0, i);
     i = s.lastIndexOf("<br>");
     s = s.substring(0, i) + "<br>";
     
     
     $("#calcPaper").html(s);//.replace(/\r?\n?[^\r\n]*$/, "")
     
   // clear to last "*NEW*"
    
    
   }
  
  
    $(".smKey").on("click", function(e){
     
       e.stopPropagation();
       switch ($(this).data( "value" )) {//.attr("data-value").data( "foo", 52 );
        
          case "clear":

            if (clearCount == 1) {
              $("#calcPaper").html("");
              nums = [];
              ops = [];
              clearCount = 0;
            } else if (clearCount === 0) {
               setTimeout(function(){clearCount = 0;}, 750);
               clearCount = 1;
               $("#calcDisplay").val("");
            }
            
            
            break;
          case "toggle": 
            $("#calcPaper").toggle();
            $("#print").toggle();
            break;
          case "prev": 
            clearPrvProblem();
            break;
          case "bSp":
            var tempTxt = $("#calcDisplay").val();
            $("#calcDisplay").val(tempTxt.substring(0, tempTxt.length - 1));
            break;
           
          case "set": 
            memSet = true;
            $(this).addClass("setClassGreen");//.css({"background-color" : "green"});//
            // alert("Set Memory");
            break;
          case "clr": 
            memClr = true;
            $(this).addClass("setClassGreen");//.css({"background-color" : "green"});
            // alert("Clear Memory");
            break;
            
             
          default:
            if (memSet) {
               $("#smKeySet").removeClass( "setClassGreen" );//.css({"background-color" : "#f3f0f0"});
               $(this).addClass( "setClassGold" );//css({"background-color" : "gold"});
               $(this).data( "mem", $("#calcDisplay").val());
               $(this).prop({"title" : $("#calcDisplay").val()});
               memSet = false;
               
            } else if (memClr) {
               $("#smKeyClr").removeClass( "setClassGreen" );//.css({"background-color" : "#f3f0f0"});
               $(this).removeClass( "setClassGold" );//css({"background-color" : "#f3f0f0"});
               $(this).prop({"title" : "Empty Memory Storage."});
               $(this).data( "mem", "");
               memSet = false;
             
            } else {
             
               $("#calcDisplay").val($(this).data( "mem"));
             
            }
            // alert($(this).data( "mem"));

        
       }

     
    });
 
    
    $("#calcPaper").hide();
    $("#print").hide();
    $(".hKey").addClass("setClassGrey");
    
    
    $(".calcNum").on("click", function(){
       
       var lastOp = getLastElm(ops);
       if (lastOp == "=") {
        ops.push("*NEW*");
        nums.push("*NEW*");
        clear = false;
       }
       
             
       if ($("#baseKey").text() == "b") {
          var key = $(this).text();
          // console.log(key, $(this).text());
          if (key != "1" && key != "0") {
            // console.log("in");
            return false;
          }
        
       }

       if (!clear) { 
        $(".calcOp").removeClass("setClassGreen");//.css({"background-color" : "#f3f0f0"});

        clear = true;
        $("#calcDisplay").val("");

       }
       var tmp = $("#calcDisplay").val();
       $("#calcDisplay").val(tmp + $(this).text());
     
    });
    
    



    $(".calcOp").on("click", function(){


       if (opBlock != "no") {

           var tmpN = nums.pop();
           nums.push(tmpN);
         
           switch (opBlock) {
           
           case "nroot" :
         
            $("#calcDisplay").val(Math.round(Math.pow(Number(tmpN), 1/Number($("#calcDisplay").val()))));
            $(".sideKey").removeClass("setClassGreen");
           break;

           case "power" :
         
            $("#calcDisplay").val(Math.pow(Number(tmpN), Number($("#calcDisplay").val())));
            $(".sideKey").removeClass("setClassGreen");

           break;
            
           default:
           

          }
        

        opBlock = "no";        
        return true;
       }

     
       clear = false;
           
       $(".calcOp").removeClass("setClassGreen");

       $(this).addClass("setClassGreen");//css({"background-color" : "green"});
       
       if (nums.length < 1 || getLastElm(nums) == "*NEW*") {
        

        ops.push($(this).text());
        nums.push(Number($("#calcDisplay").val()));
        
        runningTotal = getLastElm(nums);
    
        return true;
        
       }
     
       var thisOp = $(this).text();
       var lastOp = ops.pop();
          
       var lastNum = nums.pop();
       var thisNum = Number($("#calcDisplay").val());




 if (lastOp == "=" && thisOp == "=") {
  
    lastOp = ops.pop(); 
    ops.push(lastOp);
    thisNum = lastNum;
    // $(this).css({"background-color" : "#f3f0f0"});

 } else if (lastOp == "=" && thisOp != "=" || lastOp == "*NEW*") {
  
    ops.push(lastOp);
    ops.push(thisOp);
  // $(this).css({"background-color" : "#f3f0f0"});

    return true;
  
 } else {
  
 }
 
if (thisOp == "=") $(this).removeClass("setClassGreen");//.css({"background-color" : "#f3f0f0"});

 
$("#calcPaper").append(runningTotal + " " + lastOp + " ");
 
   ops.push(lastOp);
   ops.push(thisOp);

   nums.push(lastNum);
   nums.push(thisNum);


       
       switch (lastOp.charCodeAt(0)) {
        
        case 43:
          runningTotal = runningTotal + thisNum;
   
          break;
        case 45:
          runningTotal = runningTotal - thisNum;

          break;
        case 61:

          break;               
        case 215:
          runningTotal = runningTotal * thisNum;

          break;         
        case 247:
          runningTotal = runningTotal / thisNum;
          
       }
     
     // console.log(runningTotal, ops, nums);
     
     
       $("#calcDisplay").val(runningTotal);
     
       // if (thisNum != runningTotal) {
     
       $("#calcPaper").append(thisNum + " = " + runningTotal + "<br>");
       
   
       
       $("#calcPaper").scrollTop(100000);
       
      
    });
  
    $("body").show();
  
 });

