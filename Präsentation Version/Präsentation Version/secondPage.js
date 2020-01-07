var secondPoint = new Array()
var secondWidth = new Array()
var secondStep = new Array()
var secondPlace = new Array()
var secondClick = [false, false, false, false]
var secondDirection = 0;
var secondBigger = new Array()
var secondSmall = new Array()

function secondPage(x, y, distance, direction, place)
{
    secondDirection = direction
    secondPlace = place
    var index1 = getBundeslandIndex(bundeslands[place[0][0]], place[0][1] + 1991)
    var startWidth1 = data[index1].Durchschnittl_Förderungsbetrag_pro_Person * rate

    secondWidth[0] = data[index1].Studierende_Förderungsbetrag_pro_Person * rate
    secondBigger[0] = secondWidth[0]*data[index1].Studierende_Geförderte_Personen * Math.pow(rate, 3.2)
    secondSmall[0] = secondWidth[0] / 2

    secondWidth[1] = data[index1].Schüler_Förderungsbetrag_pro_Person * rate
    secondBigger[1] = secondWidth[1]*data[index1].Schüler_Geförderte_Personen * Math.pow(rate, 3.2)
    secondSmall[1] = secondWidth[1] / 2

    var index2 = getBundeslandIndex(bundeslands[place[1][0]], place[1][1] + 1991)
    var startWidth2 = data[index2].Durchschnittl_Förderungsbetrag_pro_Person * rate

    secondWidth[2] = data[index2].Studierende_Förderungsbetrag_pro_Person * rate
    secondBigger[2] = secondWidth[2]*data[index2].Studierende_Geförderte_Personen * Math.pow(rate, 3.2)
    secondSmall[2] = secondWidth[2] / 2

    secondWidth[3] = data[index2].Schüler_Förderungsbetrag_pro_Person * rate
    secondBigger[3] = secondWidth[3]*data[index2].Schüler_Geförderte_Personen * Math.pow(rate, 3.2)
    secondSmall[3] = secondWidth[3] / 2

    for(var index = 0; index < secondBigger.length; index++)
    {
        if(secondBigger[index] < 2 * secondWidth[index])
        {
            secondBigger[index] = 2 * secondWidth[index]
        }
    }

    var length = startWidth1 + distance + startWidth2
    var width = startWidth1 > startWidth2 ? startWidth1 : startWidth2

    if(direction == 0)
    {
        x11 = x - length/2
        y11 = y - width/2 - 0.5 * startWidth1

        x21 = x + length/2 - startWidth2
        y21 = y - width/2 - 0.5 * startWidth2

        if(startWidth1 < startWidth2)y11 += (startWidth2-startWidth1) * (1 - 0.5)
        else y21 += (startWidth1 - startWidth2) * (1 - 0.5)

        x12 = x11
        y12 = y11 + startWidth1

        x22 = x21
        y22 = y21 + startWidth2

        //右下角
        x11 += startWidth1
        y11 += startWidth1

        //右上角
        x12 += startWidth1

        //左下角
        y21 += startWidth2

        //左上角
    }
    else
    {
        x11 = x - width/2 - 0.5 * startWidth1
        y11 = y  - length/2

        x21 = x - width/2 - 0.5 * startWidth2
        y21 = y + length/2 - startWidth2

        if(startWidth1 < startWidth2)x11 += (startWidth2-startWidth1) * (1 - 0.5)
        else x21 += (startWidth1 - startWidth2) * (1 - 0.5)

        x12 = x11 + startWidth1
        y12 = y11

        x22 = x21 + startWidth2
        y22 = y21

        //右下角
        x11 += startWidth1
        y11 += startWidth1

        //左下角
        y12 += startWidth1

        //右上角
        x21 += startWidth2

        //左上角
    }

    secondPoint[0] = [x11, y11]
    secondStep[0] = (secondWidth[0] - startWidth1) * 0.1

    secondPoint[1] = [x12, y12]
    secondStep[1] = (secondWidth[1] - startWidth1) * 0.1

    secondPoint[2] = [x21, y21]
    secondStep[2] = (secondWidth[2] - startWidth2) * 0.1

    secondPoint[3] = [x22, y22]
    secondStep[3] = (secondWidth[3] - startWidth2) * 0.1

    toSecondDelay = timeTotal / 10

    setTimeout("secondPageAnimation("
        + startWidth1 + ","
        + startWidth1 + ","
        + startWidth2 + ","
        + startWidth2 + ","
        + direction + ")",
        300)
    //secondPageAnimation(startWidth1, startWidth1, startWidth2, startWidth2, direction)
}

function secondPageAnimation(width1, width2, width3, width4, direction)
{
    canvasInit($("#myCanvas"))

    drawingRect(new Rect(new Point(secondPoint[0][0] - width1, secondPoint[0][1] - width1),
        width1, toColor[secondPlace[0][0]][0]))
    if(direction == 0)
    {
        drawingRect(new Rect(new Point(secondPoint[1][0]- width2, secondPoint[1][1]),
            width2, toColor[secondPlace[0][0]][1]))
        drawingRect(new Rect(new Point(secondPoint[2][0], secondPoint[2][1] - width3),
            width3, toColor[secondPlace[1][0]][0]))
    }
    else
    {
        drawingRect(new Rect(new Point(secondPoint[1][0], secondPoint[1][1] - width2),
            width2, toColor[secondPlace[0][0]][1]))
        drawingRect(new Rect(new Point(secondPoint[2][0] - width3, secondPoint[2][1]),
            width3, toColor[secondPlace[1][0]][0]))
    }

    drawingRect(new Rect(new Point(secondPoint[3][0], secondPoint[3][1]),
        width4, toColor[secondPlace[1][0]][1]))

    var signal = true

    if(Math.abs(width1 - secondWidth[0]) > Math.abs(secondStep[0]))
    {
        width1 += secondStep[0]
        signal = false
    }
    else width1 = secondWidth[0]

    if(Math.abs(width2 - secondWidth[1]) > Math.abs(secondStep[1]))
    {
        width2 += secondStep[1]
        signal = false
    }
    else width2 = secondWidth[1]

    if(Math.abs(width3 - secondWidth[2]) > Math.abs(secondStep[2]))
    {
        width3 += secondStep[2]
        signal = false
    }
    else width3 = secondWidth[2]

    if(Math.abs(width4 - secondWidth[3]) > Math.abs(secondStep[3]))
    {
        width4 += secondStep[3]
        signal = false
    }
    else width4 = secondWidth[3]

    if(signal) return

    setTimeout("secondPageAnimation("
        + width1 + ","
        + width2 + ","
        + width3 + ","
        + width4 + ","
        + direction + ")",
        timeTotal/10)
}

function secondPageClick(index)
{
    var step1 = (secondBigger[index] - secondWidth[index]) * 0.1
    var step2 = (secondSmall[index] - secondWidth[index]) * 0.1

    var model = secondClick[index]
    secondClick[index] = !secondClick[index]

    if(model)
    {
        secondPageClickAnimation(index, secondBigger[index], secondSmall[index], -step1, -step2, true)
    }
    else
    {
        secondPageClickAnimation(index, secondWidth[index], secondWidth[index], step1, step2, false)
    }
}

function secondPageClickAnimation(index, bigger, small, step1, step2, model)
{
    canvasInit($("#myCanvas"))

    if(index == 0)
    {
        drawingRect(new Rect(new Point(secondPoint[0][0] - bigger, secondPoint[0][1] - bigger),
            bigger, toColor[secondPlace[0][0]][0]), 0.5)
        drawingRect(new Rect(new Point(secondPoint[0][0] - small, secondPoint[0][1] - small),
            small, toColor[secondPlace[0][0]][0]), 1)
    }
    else
    {
        if(secondClick[0])
        {
            drawingRect(new Rect(new Point(secondPoint[0][0] - secondBigger[0], secondPoint[0][1] - secondBigger[0]),
                secondBigger[0], toColor[secondPlace[0][0]][0]), 0.5)
            drawingRect(new Rect(new Point(secondPoint[0][0] - secondSmall[0], secondPoint[0][1] - secondSmall[0]),
                secondSmall[0], toColor[secondPlace[0][0]][0]), 1)
        }
        else
        {
            drawingRect(new Rect(new Point(secondPoint[0][0] - secondWidth[0], secondPoint[0][1] - secondWidth[0]),
                secondWidth[0], toColor[secondPlace[0][0]][0]), 1)
        }
    }

    if(secondDirection == 0)
    {
        if(index == 1)
        {
            drawingRect(new Rect(new Point(secondPoint[1][0] - bigger, secondPoint[1][1]),
                bigger, toColor[secondPlace[0][0]][1]), 0.5)
            drawingRect(new Rect(new Point(secondPoint[1][0] - small, secondPoint[1][1]),
                small, toColor[secondPlace[0][0]][1]), 1)
        }
        else
        {
            if(secondClick[1])
            {
                drawingRect(new Rect(new Point(secondPoint[1][0] - secondBigger[1], secondPoint[1][1]),
                    secondBigger[1], toColor[secondPlace[0][0]][1]), 0.5)
                drawingRect(new Rect(new Point(secondPoint[1][0] - secondSmall[1], secondPoint[1][1]),
                    secondSmall[1], toColor[secondPlace[0][0]][1]), 1)
            }
            else
            {
                drawingRect(new Rect(new Point(secondPoint[1][0] - secondWidth[1], secondPoint[1][1]),
                    secondWidth[1], toColor[secondPlace[0][0]][1]), 1)
            }
        }

        if(index == 2)
        {
            drawingRect(new Rect(new Point(secondPoint[2][0], secondPoint[2][1] - bigger),
                bigger, toColor[secondPlace[1][0]][0]), 0.5)
            drawingRect(new Rect(new Point(secondPoint[2][0], secondPoint[2][1] - small),
                small, toColor[secondPlace[1][0]][0]), 1)
        }
        else
        {
            if(secondClick[2])
            {
                drawingRect(new Rect(new Point(secondPoint[2][0], secondPoint[2][1] - secondBigger[2]),
                    secondBigger[2], toColor[secondPlace[1][0]][0]), 0.5)
                drawingRect(new Rect(new Point(secondPoint[2][0], secondPoint[2][1] - secondSmall[2]),
                    secondSmall[2], toColor[secondPlace[1][0]][0]), 1)
            }
            else
            {
                drawingRect(new Rect(new Point(secondPoint[2][0], secondPoint[2][1] - secondWidth[2]),
                    secondWidth[2], toColor[secondPlace[1][0]][0]), 1)
            }
        }
    }
    else
    {
        if(index == 1)
        {
            drawingRect(new Rect(new Point(secondPoint[1][0], secondPoint[1][1] - bigger),
                bigger, toColor[secondPlace[0][0]][1]), 0.5)
            drawingRect(new Rect(new Point(secondPoint[1][0], secondPoint[1][1] - small),
                small, toColor[secondPlace[0][0]][1]), 1)
        }
        else
        {
            if(secondClick[1])
            {
                drawingRect(new Rect(new Point(secondPoint[1][0], secondPoint[1][1] - secondBigger[1]),
                    secondBigger[1], toColor[secondPlace[0][0]][1]), 0.5)
                drawingRect(new Rect(new Point(secondPoint[1][0], secondPoint[1][1] - secondSmall[1]),
                    secondSmall[1], toColor[secondPlace[0][0]][1]), 1)
            }
            else
            {
                drawingRect(new Rect(new Point(secondPoint[1][0], secondPoint[1][1] - secondWidth[1]),
                    secondWidth[1], toColor[secondPlace[0][0]][1]), 1)
            }
        }

        if(index == 2)
        {
            drawingRect(new Rect(new Point(secondPoint[2][0] - bigger, secondPoint[2][1]),
                bigger, toColor[secondPlace[1][0]][0]), 0.5)
            drawingRect(new Rect(new Point(secondPoint[2][0] - small, secondPoint[2][1]),
                small, toColor[secondPlace[1][0]][0]), 1)
        }
        else
        {
            if(secondClick[2])
            {
                drawingRect(new Rect(new Point(secondPoint[2][0] - secondBigger[2], secondPoint[2][1]),
                    secondBigger[2], toColor[secondPlace[1][0]][0]), 0.5)
                drawingRect(new Rect(new Point(secondPoint[2][0] - secondSmall[2], secondPoint[2][1]),
                    secondSmall[2], toColor[secondPlace[1][0]][0]), 1)
            }
            else
            {
                drawingRect(new Rect(new Point(secondPoint[2][0] - secondWidth[2], secondPoint[2][1]),
                    secondWidth[2], toColor[secondPlace[1][0]][0]), 1)
            }
        }
    }
    if(index == 3)
    {
        drawingRect(new Rect(new Point(secondPoint[3][0], secondPoint[3][1]),
            bigger, toColor[secondPlace[1][0]][1]), 0.5)
        drawingRect(new Rect(new Point(secondPoint[3][0], secondPoint[3][1]),
            small, toColor[secondPlace[1][0]][1]), 1)
    }
    else
    {
        if(secondClick[3])
        {
            drawingRect(new Rect(new Point(secondPoint[3][0], secondPoint[3][1]),
                secondBigger[3], toColor[secondPlace[1][0]][1]), 0.5)
            drawingRect(new Rect(new Point(secondPoint[3][0], secondPoint[3][1]),
                secondSmall[3], toColor[secondPlace[1][0]][1]), 1)
        }
        else
        {
            drawingRect(new Rect(new Point(secondPoint[3][0], secondPoint[3][1]),
                secondWidth[3], toColor[secondPlace[1][0]][1]), 1)
        }
    }

    var signal = true
    if(model)
    {
        if(Math.abs(bigger - secondWidth[index]) > Math.abs(step1))
        {
            bigger += step1
            signal = false
        }
        else if(bigger != secondWidth[index])
        {
            bigger = secondWidth[index]
            signal = false
        }

        if(Math.abs(small - secondWidth[index]) > Math.abs(step2))
        {
            small += step2
            signal = false
        }
        else if(small != secondWidth[index])
        {
            small = secondWidth[index]
            signal = false
        }
    }
    else
    {
        if(Math.abs(bigger - secondBigger[index]) > Math.abs(step1))
        {
            bigger += step1
            signal = false
        }
        else if(bigger != secondBigger[index])
        {
            bigger = secondBigger[index]
            signal = false
        }

        if(Math.abs(small - secondSmall[index]) > Math.abs(step2))
        {
            small += step2
            signal = false
        }
        else if(small != secondSmall[index])
        {
            small = secondSmall[index]
            signal = false
        }
    }
    if(signal)return

    setTimeout("secondPageClickAnimation("
        + index + ","
        + bigger + ","
        + small + ","
        + step1 + ","
        + step2 + ","
        + model + ")",
        timeTotal/10)
}