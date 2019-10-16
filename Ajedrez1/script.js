





//FUNCTIONS
var filas = 'abcdefgh'.toLocaleUpperCase().split('');
filas.slice(0, 8)
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str=str.substr(0,index) + chr + str.substr(index+1);
    
}


function encontrar_casilla(pos){
    var casillas=Tablero1.boxes;
    for(var j = 0; j<casillas.length;j++){
        if(casillas[j].coordinate==pos){
            return casillas[j];
            
        }
    }
    
}


function move_torre(position, positions){
    var n = parseInt(position[1]);
    var n1=filas.indexOf(position[0]);
    var position1=position;
    var position2=position;
    var position3=position;

    //Arriba
    var i=1;
    var pos_aux= position;
    while( i<n ){
        
        position=setCharAt(position,1,parseInt(position[1])-1);
        if(encontrar_casilla(position).ficha.color==encontrar_casilla(pos_aux).ficha.color){ break;
        }else{ positions.push(position); i++;}
        
    }
    //Abajo

    var i=1;
    pos_aux= position1;
    while( i<=8-n ){
        
        position1=setCharAt(position1,1,parseInt(position1[1])+1);
        if(encontrar_casilla(position1).ficha.color==encontrar_casilla(pos_aux).ficha.color){ break;
        }else{ positions.push(position1); i++;}
        
    }
    //Derecha
    
    var i=1;
    pos_aux= position2;
    while( i<8-n1){
        
        position2=setCharAt(position2, 0, filas[filas.indexOf(position2[0])+1]);
        if(encontrar_casilla(position2).ficha.color==encontrar_casilla(pos_aux).ficha.color){ break;
        }else{ positions.push(position2); i++;}
        
    }
    //Izquierda
    
    var i=1;
    pos_aux= position3;
    while( i<=n1){
        
        position3=setCharAt(position3, 0, filas[filas.indexOf(position3[0])-1]);
        if(encontrar_casilla(position3).ficha.color==encontrar_casilla(pos_aux).ficha.color){ break;
        }else{ positions.push(position3); i++;}
        
    }
    return positions;
}

function create_all_diagonals(){
    var bottomToTop=true;
    var Ylength = 8;
    var Xlength = 8;
    var maxLength = Math.max(Xlength, Ylength);
    var temp;
    var temp1;
    var diagonales_izq = [];
    var diagonales_der = [];
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        temp1 = [];
        for (var y = Ylength - 1; y >= 0; --y) {
            var x = k - Ylength + y ;
            var x1 = k - y;
            if (x >= 0 && x < Xlength) {
                temp.push(filas[x]+(y+1));
            }
            if (x1 >= 0 && x1 < Xlength) {
                temp1.push(filas[x1]+(y+1));
            }
        }
        if(temp.length > 0) {
            diagonales_izq.push(temp.join(''));
        }
        if(temp.length > 0) {
            diagonales_der.push(temp1.join(''));
        }
    }
    diagonales_izq.push("H1")
    diagonales_der.push("A1");
    var diagonales = diagonales_izq.concat(diagonales_der);
    return diagonales;

}

function move_alfil(position, positions){
    var diag= create_all_diagonals();
    for(var i =0; i<diag.length; i++){
        if(diag[i].includes(position)){
            for(var j=0; j<(diag[i].length); j+=2){
                
                var str = diag[i].substring(j, j+2);
                if(str!=position){positions.push(str);}
                
            }
        }
    }
    return positions;
}
function move_alfil2(position, positions){
    var n = parseInt(position[1]);
    var n1=filas.indexOf(position[0]);
    //Arriba-Derecha
    var i=1;
    var j=1;
    var pos_aux= position;
    while( i<n ){
        while( j<8-n1){
        
            position=setCharAt(position,1,parseInt(position[1])-1);
            position=setCharAt(position, 0, filas[filas.indexOf(position[0])+1]);

            if(encontrar_casilla(position).ficha.color==encontrar_casilla(pos_aux).ficha.color){ break;
            }else{ positions.push(position); i++; j++;}
            
        
        }
        
    }
    

    
    
}

///////////////////////////////


//Ficha------------------------------------
//_---------------------------------------------

function Ficha( activo, habilitada, casilla, color, nombre )
{
    this.activo=activo;
    this.habilitada=habilitada;
    this.casilla=casilla;
    this.color=color;
    this.nombre=nombre;
}
Ficha.prototype.setactivo = function( activo ) {
    this.activo = activo;
}
Ficha.prototype.getactivo = function() {
    return this.activo;
}

Ficha.prototype.sethabhabilitada = function(habilitada ) {
    this.habhabilitada =habilitada;
}
Ficha.prototype.gethabhabilitada = function() {
    return this.habhabilitada;
}

Ficha.prototype.setcasilla = function( casilla ) {
    this.casilla = casilla;
}
Ficha.prototype.getcasilla = function() {
    if(this.getactivo()==false){
        return NaN;
    }else{return this.casilla;}
    
}


Ficha.prototype.getcolor = function() {
    return this.color;
}


Ficha.prototype.setnombre = function( nombre ) {
    this.nombre = nombre;
}
Ficha.prototype.getnombre = function() {
    return this.nombre;
}

Ficha.prototype.movimiento=function(){
    var position= this.getcasilla();
    var positions=[];

    if(this.getnombre()=="peon"){
        var position2=position;
        var position3=position;
        if(this.getcolor()=="blanca"){ 
            
            position=setCharAt(position,1,parseInt(position[1])-1)
            position2=setCharAt(position2,1,parseInt(position2[1])-1)
            position3=setCharAt(position3,1,parseInt(position3[1])-1)
            position2=setCharAt(position2, 0, filas[filas.indexOf(position2[0])-1]);
            position3=setCharAt(position3, 0, filas[filas.indexOf(position3[0])+1]);

        }
        else if(this.getcolor()=="negra"){ 
            position=setCharAt(position,1,parseInt(position[1])+1)
            position2=setCharAt(position2,1,parseInt(position2[1])+1)
            position3=setCharAt(position3,1,parseInt(position3[1])+1)
            position2=setCharAt(position2, 0, filas[filas.indexOf(position2[0])-1]);
            position3=setCharAt(position3, 0, filas[filas.indexOf(position3[0])+1]);
        }
        positions.push(position);
        positions.push(position2);
        positions.push(position3);
        
        
    }


    else if(this.getnombre()=="torre"){
        
        positions=move_torre(position, positions);


    }else if(this.getnombre()=="alfil"){

        positions = move_alfil2(position, positions);

    }else if(this.getnombre()=="reina"){
        positions= move_torre(position, positions).concat(move_alfil(position, positions));
    }else if(this.getnombre()=="rey"){
        position1=position;
        var position2=position;
        var position3=position;

        position=setCharAt(position,1,parseInt(position[1])-1);
        if(position[1]>=1) positions.push(position);
        
   
        position1=setCharAt(position1,1,parseInt(position1[1])+1);
        if(position1[1]<=8) positions.push(position1);
       
    
        position2=setCharAt(position2, 0, filas[filas.indexOf(position2[0])+1]);
        positions.push(position2);

        position3=setCharAt(position3, 0, filas[filas.indexOf(position3[0])-1]);
        positions.push(position3);
    }
    return positions;
}





//_---------------------------------------------
//_---------------------------------------------

//Casilla--------------------------------------

function Casilla( coordinate, ficha)
{
    this.coordinate=coordinate;
    this.ficha=ficha;
}
Casilla.prototype.setficha=function(new_ficha){
    this.ficha=new_ficha
}
Casilla.prototype.getficha=function(){
    if(this.ficha=="NaN"){
        return "NaN";
    }else{return this.ficha;}
}
Casilla.prototype.delete=function(){
    
    this.ficha.setactivo(false);
    var ficha_aux = document.getElementById(this.coordinate+"img");
    ficha_aux.parentNode.removeChild(ficha_aux);
}

//_---------------------------------------------
//_---------------------------------------------

//Tablero--------------------------------------
function Tablero( turn , boxes)
{
    this.turn=turn;
    this.boxes=boxes;
}
Tablero.prototype.setturn=function(turn){
    this.turn=turn
}

Tablero.prototype.getturn=function(){
    return this.turn;
}

let boxes = [];
var turno = "blanca";
let Tablero1= new Tablero(turno, boxes)

function makeRows(rows, cols) {
    filas = 'abcdefgh'.toLocaleUpperCase().split('');
    filas.slice(0, rows)
    columnas = $.map($(Array(cols)), function (val, i) { return i + 1; })
    console.log(filas);
    console.log(columnas);

    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    
    w = 0;
    r = 0;
    l = 0;
    for (c = 0; c < (rows * cols); c++) {

        // console.log(w)
        let cas = new Casilla()
        let piece = new Ficha()
        let casilla = "casilla-blanca";
        piece.color="blanca";
        if (w % 2 == 0) {
            casilla = "casilla-negra"
            
        }

        w++;

        let cell = document.createElement("div");
        // cell.innerText = filas[r] + columnas[l];

        cell.setAttribute("id", filas[r] + columnas[l])
        cell.setAttribute("ondrop", "drop(event)")
        cell.setAttribute("ondragenter", "dragEnter(event)")
        cell.setAttribute("ondragleave", "dragLeave(event)")
        cell.setAttribute("ondragover", "allowDrop(event)")
        container.appendChild(cell).className = casilla;
        Tablero1.boxes.push(cas);

        cas.coordinate=filas[r] + columnas[l]



        if (l == 0) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                ficha.setAttribute("style", "background-image: url('img/rook_black.svg')");
                piece.setnombre("torre");
                piece.color="negra";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);


            }
            if (r == 1 || r == 6) {
                ficha.setAttribute("style", "background-image: url('img/knight_black.svg')");
                piece.setnombre("caballo");
                piece.color="negra";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            if (r == 2 || r == 5) {
                ficha.setAttribute("style", "background-image: url('img/bishop_black.svg')");
                piece.setnombre("alfil");
                piece.color="negra";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            if (r == 3) {
                ficha.setAttribute("style", "background-image: url('img/king_black.svg')");
                piece.setnombre("rey");
                piece.color="negra";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            if (r == 4) {
                ficha.setAttribute("style", "background-image: url('img/queen_black.svg')");
                piece.setnombre("reina");
                piece.color="negra";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            cas.ficha=piece;
            cell.appendChild(ficha);
        }

        if (l == 1) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            ficha.setAttribute("style", "background-image: url('img/pawn_black.svg')");
            cell.appendChild(ficha);

            piece.setnombre("peon");
            piece.color="negra";
            piece.setactivo(true);
            piece.setcasilla(cas.coordinate);
            cas.ficha=piece;
        }

        if (l == 6) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            ficha.setAttribute("style", "background-image: url('img/pawn_white.svg')");
            cell.appendChild(ficha);

            piece.setnombre("peon");
            piece.color="blanca";
            piece.setactivo(true);
            piece.setcasilla(cas.coordinate);
            cas.ficha=piece;
        }

        if (l == 7) {
            let ficha = document.createElement("div")
            ficha.setAttribute("id", filas[r] + columnas[l] + "img");
            ficha.setAttribute("draggable", "true");
            ficha.setAttribute("ondragstart", "dragStart(event)");
            ficha.setAttribute("class", "fondo-ficha");
            if (r == 0 || r == 7) {
                ficha.setAttribute("style", "background-image: url('img/rook_white.svg')");
                
                piece.setnombre("torre");
                piece.color="blanca";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            if (r == 1 || r == 6) {
                ficha.setAttribute("style", "background-image: url('img/knight_white.svg')");

                piece.setnombre("caballo");
                piece.color="blanca";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            if (r == 2 || r == 5) {
                ficha.setAttribute("style", "background-image: url('img/bishop_white.svg')");

                piece.setnombre("alfil");
                piece.color="blanca";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            if (r == 3) {
                ficha.setAttribute("style", "background-image: url('img/king_white.svg')");

                piece.setnombre("rey");
                piece.color="blanca";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            if (r == 4) {
                ficha.setAttribute("style", "background-image: url('img/queen_white.svg')");

                piece.setnombre("reina");
                piece.color="blanca";
                piece.setactivo(true);
                piece.setcasilla(cas.coordinate);
            }
            cell.appendChild(ficha);
            cas.ficha=piece;
        }else if (cas.ficha===undefined){ cas.ficha="NaN"; }

        

        r++;
        if ((c + 1) % 8 == 0 & w != 0) {
            r = 0
            l++
            if (((c + 1) / 8) % 2 == 0) { w = 0 } else { w = 1 }
        }


    };
    
};

function button1(){
    makeRows(8, 8);
    Tablero1.turn="blanca";
    
    var element = document.getElementById("quien");
    element.parentNode.removeChild(element);
    var element = document.getElementById("btt2");
    element.parentNode.removeChild(element);
    var element = document.getElementById("btt3");
    element.parentNode.removeChild(element);
}



function button2(){
    makeRows(8, 8);
    Tablero1.turn="negra";
    
    var element = document.getElementById("quien");
    element.parentNode.removeChild(element);
    var element = document.getElementById("btt2");
    element.parentNode.removeChild(element);
    var element = document.getElementById("btt3");
    element.parentNode.removeChild(element);
}


Ficha.prototype.posibilidades=function(){
    var position = this.getcasilla();
    var positions = this.movimiento(position);
    var casillas = Tablero1.boxes;
    var posibles= [];
    
    if(Tablero1.turn!=this.getcolor()){
        return posibles;
    }else{
        for(var i=0; i<positions.length; i++){
            for(var j = 0; j<casillas.length;j++){
                if(casillas[j].coordinate==positions[i]){
                    // console.log("si estoy");
                    if(casillas[j].ficha=="NaN"||casillas[j].ficha.getcolor()!=this.getcolor() ){
                        posibles.push(positions[i]);
                    }
                    
                }
            }
        }
    }
    
    return posibles;
    
}

Ficha.prototype.move=function(new_pos){
    if(this.posibilidades().includes(new_pos)){
        
        var casillas = Tablero1.boxes;
        var casilla_antes;
        for(var j = 0; j<casillas.length;j++){
            if(casillas[j].coordinate==this.getcasilla()){
                casilla_antes=casillas[j];
                
            }
        }
        
        for(var j = 0; j<casillas.length;j++){
            if(casillas[j].coordinate==new_pos){
                // console.log("si estoy");
                if(casillas[j].getficha()!="NaN"){
                    casillas[j].delete();

                }
                this.setcasilla(new_pos);

                casillas[j].setficha(this);
                casilla_antes.setficha("NaN");
            }
        }
        
    }

}

//////////////////////////////////

//Vemos en qué casilla estamos en ese momento
var casilla_actual=new Object();



function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
    casilla_actual = event.dataTransfer.getData("Text");
}

function dragEnter(event) {
    // Encontramos nuestros posibles movimientos
    let posibles= encontrar_casilla(casilla_actual[0]+casilla_actual[1]).ficha.posibilidades();
    console.log(posibles);
    var posi= event.target.id.includes("img")? event.target.id.substring(0,event.target.id.length-3): event.target.id;
    

    posibles.map(function(pos){ if(pos==posi){ event.target.className += " posible";}})

    if ( event.target.className.includes("posible") == true  ) {
     
        event.target.style.border = "3px dotted red";
    }
}


function dragLeave(event) {
    // event.target.id = event.target.id.includes("img")? event.target.id.substring(0,event.target.id.length-3): event.target.id;
    if (event.target.className.includes("posible") == true ) {
   
        event.target.style.border = "";
        event.target.className = event.target.className.replace(" posible",'');

    }
}


function allowDrop(event) {
    
    event.preventDefault();

}


function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    var sale = document.getElementById(data);
    var pos = event.target.id.includes("img")? event.target.id.substring(0,event.target.id.length-3): event.target.id;

    if (event.target.className.includes("posible") ==true ){
        sale.setAttribute("id", pos +"img");
        document.getElementById(pos).appendChild(sale);
        event.target.className = event.target.className.replace(" posible",'');
        event.target.style.border = "";
        encontrar_casilla(casilla_actual[0]+casilla_actual[1]).ficha.move(pos);
        Tablero1.turn = Tablero1.turn==="blanca"?"negra":"blanca";
        document.getElementById("turno").innerHTML = "Juegan: "+ Tablero1.turn+"s";
    }
}

