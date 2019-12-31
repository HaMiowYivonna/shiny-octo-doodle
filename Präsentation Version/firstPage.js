var moveVaild = true
var clickCount = 0
var clickChoice = new Array()

function firstPage(BundeslandIndex, Jahre)
{
    canvasInit($("#myCanvas"))
    drawingBundesland(BundeslandIndex)
    drawingJahre(Jahre)
}

function firstPage()
{
	canvasInit($("#myCanvas"))
	drawingJahre(2015)
}

//绘制某个州所有年份的数据
function drawingBundesland(BundeslandIndex)
{
	var canvas = $("#myCanvas")
	var context = canvas.get(0).getContext('2d')

	for(var i = data.length-1; i >= 0; i--)
	{
		if(data[i].Bundesland == bundeslands[BundeslandIndex])
		{
			context.fillStyle = color[BundeslandIndex]
			var width = data[i].Durchschnittl_Förderungsbetrag_pro_Person * rate
			var x = (data[i].Jahre - 1991) * (maxR + disH) + maxR / 2 - width / 2
			var y = maxR * (BundeslandIndex + 1) - maxR / 2 - width / 2
			context.fillRect(x,y,width,width)
		}
	}
}

//绘制某一年所有州的数据
function drawingJahre(Jahre)
{
	var canvas = $("#myCanvas")
	var context = canvas.get(0).getContext('2d')
	var BundeslandIndex = 0
	for(var i = 0; i < data.length; i++)
	{
		if(data[i].Jahre == Jahre)
		{
			context.fillStyle = color[BundeslandIndex]
			var width = data[i].Durchschnittl_Förderungsbetrag_pro_Person * rate
			
			var x = (Jahre - 1991) * (maxR + disH) + maxR / 2 - width / 2
			var y = maxR * (BundeslandIndex + 1)  - maxR / 2 - width / 2
			
			context.fillRect(x,y,width,width)
			BundeslandIndex += 1
		}
	}
}