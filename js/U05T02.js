//21 28 martes 1:30; audiovisual primer proyecto o segundo ;


var shoppList = [];
var colorActivo;

function functionLoad() {
	createInterface();
	createForm();
	createList();
	getLocal();
}

function createInterface() {
	var title = document.createElement("h1");
	title.setAttribute("id", "HelloMoto");

	var textoTitle = document.createTextNode("Carrito De Compra");

	title.appendChild(textoTitle);

	document.body.appendChild(title);

	var carrito = document.createElement("button");
	carrito.setAttribute("id", "carrito");
	carrito.setAttribute("class", "carrito");
	document.body.appendChild(carrito);

	var botones = document.createElement("div");
	botones.setAttribute("id", "botones");

	var selectAll = document.createElement("button");
	selectAll.setAttribute("id", "selectAll");
	selectAll.setAttribute("onclick", "selectThemAll('select')");
	selectAll.setAttribute("class", "select");
	botones.appendChild(selectAll);

	var selectNone = document.createElement("button");
	selectNone.setAttribute("id", "selectNone");
	selectNone.setAttribute("class", "noSelect");
	selectNone.setAttribute("onclick", "selectThemAll('none')");
	botones.appendChild(selectNone);

	var deleteSelected = document.createElement("button");
	deleteSelected.setAttribute("id", "deleteSelected")
	deleteSelected.setAttribute("class", "delete");
	deleteSelected.setAttribute("onclick", "deleteThem()");
	botones.appendChild(deleteSelected);

	var orderBt = document.createElement("button");
	orderBt.setAttribute("id", "orderBt");
	orderBt.setAttribute("class", "order");
	orderBt.setAttribute("onclick", "order()");
	botones.appendChild(orderBt);

	document.body.appendChild(botones);
}

function createForm() {
	var myForm = document.createElement("div");
	myForm.setAttribute("id", "myForm");
	
	var label1 = document.createElement("label");
	label1.setAttribute("value","Cantidad");
	label1.setAttribute("for","amount");
	myForm.appendChild(label1);
	
	var numField = createInput("number", "amount", "");
	numField.setAttribute("min", 0);
	myForm.appendChild(numField);

	var label2 = document.createElement("label");
	label2.setAttribute("value","Unidad");
	label2.setAttribute("for","unidad");
	myForm.appendChild(label2);
	
	var ddl = document.createElement("select");
	ddl.setAttribute("id", "unidad")
	ddl.appendChild(createDDLOpcion("Kg"));
	ddl.appendChild(createDDLOpcion("g"));
	ddl.appendChild(createDDLOpcion("l"));
	ddl.appendChild(createDDLOpcion("ml"));
	ddl.appendChild(createDDLOpcion("U"));
	ddl.appendChild(createDDLOpcion("Bottles"));
	myForm.appendChild(ddl);

	var label3 = document.createElement("label");
	label3.setAttribute("for","product");
	label3.setAttribute("value","Producto");
	myForm.appendChild(label3);
	
	var textBox = createInput("text", "product", "");
	textBox.setAttribute("placeholder", "Producto");
	myForm.appendChild(textBox);

	var but = createInput("button", "add", "Añadir");
	but.setAttribute("onclick", "addProduct()");
	myForm.appendChild(but);

	var textoColor = document.createTextNode(" Elige un color:");
	myForm.appendChild(textoColor);

	var colores = createInput("button", "colorChoise1", "");
	colores.style.backgroundColor="#002345"
	colores.setAttribute("onclick","changeColor('#002345')")
	myForm.appendChild(colores);
	
	var colores1 = createInput("button", "colorChoise2", "");
	colores1.style.backgroundColor="green"
	colores1.setAttribute("onclick","changeColor('green')")
	myForm.appendChild(colores1);
	
	var colores2 = createInput("button", "colorChoise3", "");
	colores2.style.backgroundColor="red"
	colores2.setAttribute("onclick","changeColor('red')")
	myForm.appendChild(colores2);
	
	var colores3 = createInput("button", "colorChoise4", "");
	colores3.style.backgroundColor="#FFF"
	colores3.setAttribute("onclick","changeColor('#FFF')")
	myForm.appendChild(colores3);

	document.body.appendChild(myForm);
}

function changeColor(color)
{
	colorActivo = color;
}

function createDDLOpcion(value) {
	var opcion = document.createElement("option");
	opcion.setAttribute("value", value);
	var texto = document.createTextNode(value);
	opcion.appendChild(texto);
	return opcion;
}

function createList() {
	var shoppingList = document.createElement("div")
	shoppingList.setAttribute("id", "shoppingList");

	document.body.appendChild(shoppingList);
}

function createInput(type, id, value) {
	var input = document.createElement("input");
	input.setAttribute("type", type);
	input.setAttribute("id", id);
	input.setAttribute("value", value);

	return input;
}

function ObjetoComp(config)
{
	this.texto = config.texto;
	this.color = config.color;
	this.colorDEC = 0;
}



ObjetoComp.prototype.create = function()
{
	var listElement = document.createElement("div");

	var check = createInput("checkbox", "", this.texto);
	check.setAttribute("name", "checkList");
	listElement.appendChild(check);

	var textos = document.createTextNode(this.texto);
	listElement.appendChild(textos);

	listElement.style.backgroundColor = this.color;
	
	//convertir el color en numero decimal
	var colores = this.color;
	colores = colores+"";
	var ca = colores.split("#");
	this.colorDEC = parseInt(ca[1],16);

	document.getElementById("shoppingList").appendChild(listElement);
};

function addProduct()
{
	//create Element
	var amounts = document.getElementById("amount").value;
	var products = document.getElementById("product").value;
	var units = document.getElementById("unidad").value;
	var colors = colorActivo;
	var textos = (amounts + " " + units + " " +products);
	
	
	createObjeto(textos,colors);
	safeLocal();
}

function createObjeto(textos,colors)
{
	var objeto;
	
	objeto = new ObjetoComp({
		texto : textos,
		color : colors
	});

	shoppList.push(objeto);

	objeto.create();	
}

function selectThemAll(what)
{

	var nodes = document.getElementById("shoppingList").childNodes;
	for (var i = 0; i < nodes.length; i++) {
		if (what == 'select') {
			nodes[i].firstChild.checked = true; //.setAttribute("checked",true);
		} else {
			nodes[i].firstChild.checked = false; //setAttribute("checked",false);
		}
	}
}

function deleteThem()
{
	var borrar = [];
	var nodes = document.getElementById("shoppingList").children;
	var nodes2 =[];
	for(var i = 0 ; i < nodes.length; i++)
	{
		nodes2.push(nodes[i]);
	}
	var cont = 0;
	nodes2.forEach(function(Element)
	{
		if (Element.firstChild.checked == true) {
			document.getElementById("shoppingList").removeChild(Element); //.setAttribute("checked",true);
			
		} else {
			
			borrar.push(shoppList[cont]);
			
		}
		cont ++;
	})
	
	shoppList = borrar;
	safeLocal();
	
	
}

function order()
{
	var nodes = document.getElementById("shoppingList").childNodes;
	var colores = {};
	shoppList.sort(function(a, b){
		return b.colorDEC - a.colorDEC
		
		});	
	node = document.getElementById("shoppingList");
	while(node.childNodes.length >=1)
	{
		node.removeChild(node.firstChild);
	}
	shoppList.forEach(
		function(Element)
		{
			Element.create();
		}
	
	)
	safeLocal();
}

function sort(element1,element2)
{
	if(element1-element2 >= 0)
	{
		return true;
	}
	else
	{
		return false;
	}
	//(element1,element2) => element2.color - element2.color;
}

function safeLocal()
{
	var colors = [];
	var textos = [];
	for(var i = 0 ; i < shoppList.length ; i++)
	{
		colors[i] = shoppList[i].color;
		textos[i] = shoppList[i].texto;
	}
	var saveItem1 = JSON.stringify(colors);
	var saveItem2 = JSON.stringify(textos);
	localStorage.setItem("colores",saveItem1);
	localStorage.setItem("textos",saveItem2);
}

function getLocal()
{
	var getLocalColors = localStorage["colores"];
	var getLocalTextos = localStorage["textos"];
	var colors = [];
	var textos = [];
	shoppList = [];
	if(getLocalColors != undefined || getLocalTextos != undefined )
	{
	colors = JSON.parse(getLocalColors);
	textos = JSON.parse(getLocalTextos);
		for(var i = 0; i < colors.length ; i++)
		{
			createObjeto(textos[i],colors[i]);
		}
	}
	
}
document.body.addEventListener('onreadystatechange', functionLoad(), false);
