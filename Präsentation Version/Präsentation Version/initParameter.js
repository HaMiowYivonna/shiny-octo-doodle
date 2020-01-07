var maxR = 0
var rate = 0
var disH = 0
var disV = 0
var timeTotal = 500

var color = [
                "#F08767","#F9B54F","#FFD54F","#FEF077",
                "#DAE178","#AED081","#83C284","#4DB6AC",
                "#5EC2D7","#55C1F0","#6EB1E2","#7985C1",
                "#8E75B3","#A56BAA","#EC6392","#E67373"
            ]
var toColor = [
                ["#DF7057","#EFAE8A"],["#E1973E","#FAC68C"],["#D1A72F","#FED998"],["#C6B646","#F8F0AF"],
                ["#e2e794","#e9edb1"],["#bdd99a","#cee2b3"],["#a5d1a6","#bddcbc"],["#7ec8c1","#a2d5d1"],
                ["#2ea8c1","#97d4e2"],["#0d89be","#94d5f3"],["#3892d0","#98c8eb"],["#4e5ea7","#9ca5d1"],
                ["#6c5294","#b1a1cb"],["#814c85","#aa7eae"],["#e8457d","#ef81a7"],["#e25656","#ef9e9e"]
            ]

var bundeslands = new Array()

function init()
{
    var max = 0
    for(var i = 0; i < data.length; i++)
    {
        if(data[i].Durchschnittl_Förderungsbetrag_pro_Person > max)
        {
            max = data[i].Durchschnittl_Förderungsbetrag_pro_Person
        }

        if(bundeslands.length == 0)
        {
            bundeslands[0] = data[i].Bundesland
        }
        else if(data[i].Bundesland != bundeslands[bundeslands.length-1])
        {
            bundeslands[bundeslands.length] = data[i].Bundesland
        }
    }
    var maxH = $(window).get(0).innerWidth / (2015-1991+1)
    var maxV = $(window).get(0).innerHeight / 16

    maxR = maxV
    disH = maxH - maxV

    rate = (maxR+0.0) / max
}

function addFirstPageListening()
{
    moveVaild = true
    clickCount = 0
    clickChoice = new Array()

    $("#myCanvas").unbind()

    $("#myCanvas").mousemove(function(event)
    {
        if(!moveVaild)return;
        canvasInit($("#myCanvas"))
        var place = getPlace(event)
        drawingJahre(place[1] + 1991)
        drawingBundesland(place[0])
    })

    $("#myCanvas").click(function(event)
    {
        moveVaild = false
        var place = getPlace(event)
        if(clickCount == 0)
        {
            clickChoice[0] = place
            clickCount += 1
        }
        else
        {
            if((place[0] == clickChoice[0][0] || place[1] == clickChoice[0][1])
                && (clickChoice[0][0] + clickChoice[0][1] != place[0] + place[1]))
            {
                clickChoice[1] = place
                
                if(clickChoice[0][0] > clickChoice[1][0] || clickChoice[0][1] > clickChoice[1][1])
                {
                    var temp = clickChoice[0][0]
                    clickChoice[0][0] = clickChoice[1][0]
                    clickChoice[1][0] = temp

                    temp = clickChoice[0][1]
                    clickChoice[0][1] = clickChoice[1][1]
                    clickChoice[1][1] = temp
                }
                addTransitionPageListening()
                transition(clickChoice)
                clickCount = 0
            }
            clickCount = 1
        }
    })
}

function addTransitionPageListening()
{
    $("#myCanvas").unbind()
}

function addSecondPageListening()
{
    secondClick = [false, false, false, false]

    $("#myCanvas").unbind()

    $("#myCanvas").click(function (event)
    {

        var clickIndex = -1
        //var signal = true

        var widths = new Array()
        for(var index = 0; index < secondClick.length; index++)
        {
            if(secondClick[index])widths[index] = secondBigger[index]

            else widths[index] = secondWidth[index]
        }

        if(event.clientX >= secondPoint[0][0]- widths[0]
            && event.clientX <= secondPoint[0][0]
            && event.clientY >= secondPoint[0][1]- widths[0]
            && event.clientY <= secondPoint[0][1])
        {
            //if(!secondClick[0])clickIndex = 0
            //else secondClick[0] = !secondClick[0]
            //signal = false
            clickIndex = 0
        }

        if(secondDirection == 0)
        {
            if(event.clientX >= secondPoint[1][0]- widths[1]
                && event.clientX <= secondPoint[1][0]
                && event.clientY >= secondPoint[1][1]
                && event.clientY <= secondPoint[1][1] + widths[1])
            {
                //if(!secondClick[1])clickIndex = 1
                //else secondClick[1] = !secondClick[1]
                //signal = false
                clickIndex = 1
            }
            if(event.clientX >= secondPoint[2][0]
                && event.clientX <= secondPoint[2][0] + widths[2]
                && event.clientY >= secondPoint[2][1] - widths[2]
                && event.clientY <= secondPoint[2][1])
            {
                //if(!secondClick[2])clickIndex = 2
                //else secondClick[2] = !secondClick[2]
                //signal = false
                clickIndex = 2
            }
        }
        else
        {
            if(event.clientX >= secondPoint[1][0]
                && event.clientX <= secondPoint[1][0] + widths[1]
                && event.clientY >= secondPoint[1][1] - widths[1]
                && event.clientY <= secondPoint[1][1])
            {
                //if(!secondClick[1])clickIndex = 1
                //else secondClick[1] = !secondClick[1]
                //signal = false
                clickIndex = 1
            }
            if(event.clientX >= secondPoint[2][0] - widths[2]
                && event.clientX <= secondPoint[2][0]
                && event.clientY >= secondPoint[2][1]
                && event.clientY <= secondPoint[2][1] + widths[2])
            {
                //if(!secondClick[2])clickIndex = 2
                //else secondClick[2] = !secondClick[2]
                //signal = false
                clickIndex = 2
            }
        }
        if(event.clientX >= secondPoint[3][0]
            && event.clientX <= secondPoint[3][0] + widths[3]
            && event.clientY >= secondPoint[3][1]
            && event.clientY <= secondPoint[3][1] + widths[3])
        {
            //if(!secondClick[3])clickIndex = 3
            //else secondClick[3] = !secondClick[3]
            //signal = false
            clickIndex = 3
        }
        if(clickIndex == -1)
        {
            addFirstPageListening()
            firstPage(secondPlace[0][0], secondPlace[0][1]+1991)//可以替换成firstPage()
            return
        }
        //if(clickIndex > -1)secondClick[clickIndex] = true
        secondPageClick(clickIndex)
    })
}

function getPlace(event)
{
    for(var row = 0; row < 16; row++)
    {
        for(var col = 0; col < 25; col++)
        {
            var x = col * (maxR + disH)
            var y = row * maxR

            if(event.clientX >= x && event.clientX <= x+maxR
                && event.clientY >= y && event.clientY <= y+maxR)
            {
                var place = [row, col]
                return place
            }
        }
    }
}

function sleep(millisecond)
{
    var now = new Date()
    var exitTime = now.getTime() + millisecond
    while (true)
    {
        now = new Date()
        if (now.getTime() > exitTime)return
    }
}

function show()
{
    init()
    firstPage()
    addFirstPageListening()
}