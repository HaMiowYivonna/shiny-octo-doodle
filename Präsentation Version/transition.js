function Point(x, y)
{
	this.x = x
	this.y = y
}

function Rect(point, width, color)
{
	this.point = point
	this.width = width
	this.color = color
}

function getBundeslandIndex(Bundesland, Jahre)
{
	for(var i = 0; i < data.length; i++)
	{
		if(data[i].Bundesland == Bundesland && data[i].Jahre == Jahre)
		{
			return i
		}
	}
	return -1
}

var transitionPlace = new Array()

function transition(place)
{
	transitionPlace = place

	var index1 = getBundeslandIndex(bundeslands[place[0][0]], place[0][1] + 1991)
	var width1 = data[index1].Durchschnittl_Förderungsbetrag_pro_Person * rate

	var point1 = new Point((data[index1].Jahre - 1991) * (maxR + disH), maxR * (place[0][0]+1) - width1)
	var rect1 = new Rect(point1, width1, color[place[0][0]])

	var index2 = getBundeslandIndex(bundeslands[place[1][0]], place[1][1] + 1991)
	var width2 = data[index2].Durchschnittl_Förderungsbetrag_pro_Person * rate

	var point2 = new Point((data[index2].Jahre - 1991) * (maxR + disH), maxR * (place[1][0]+1) - width2)
	var rect2 = new Rect(point2, width2, color[place[1][0]])

	toRect(rect1, rect2, 3)
}

function drawingRect(rect, alpha)
{
	var canvas = $("#myCanvas")
	var context = canvas.get(0).getContext('2d')

	context.fillStyle = rect.color
	context.globalAlpha = alpha
	context.fillRect(rect.point.x, rect.point.y, rect.width, rect.width)
}

function toRect(rect1, rect2, distance)
{
	var step = 4
	var delay = 0
	var direction = 0 //0 => H, 1 => V
	if(rect1.point.x == rect2.point.x)
	{
		delay = timeTotal / ((Math.abs(rect1.point.y-rect2.point.y)-distance) / step)
		direction = 1
	}
	else
	{
		delay = timeTotal / ((Math.abs(rect1.point.x-rect2.point.x)-distance) / step)
		direction = 0
	}

	toRectAnimation(rect1.point.x, rect1.point.y, rect1.width, rect1.color,
		 rect2.point.x, rect2.point.y, rect2.width, rect2.color, distance, direction, step, delay)
}

function toRectAnimation(x1, y1, width1, color1, x2, y2, width2, color2, distance, direction, step, delay)
{
	canvasInit($("#myCanvas"))
	if(direction == 0) //水平运动
	{
		var localY1 = y1, localY2 = y2
		if(localY1 < localY2)localY2 -= Math.abs(width1-width2) / 2
		else if(localY2 < localY1)localY1 -= Math.abs(width1-width2) / 2

		drawingRect(new Rect(new Point(x1,localY1),width1,color1), 1)
		drawingRect(new Rect(new Point(x2,localY2),width2,color2), 1)

		var middel = (x1 + x2) / 2
		if(x1 < middel)x1 += step
		else x1 -= step

		if(x2 < middel)x2 += step
		else x2 -= step

		var width = x1 < x2 ? width1 : width2

		if(Math.abs(x1 - x2) <= width + distance)
		{
			if(x1 < x2)
			{
				x2 = x1 + width1 + distance
			}
			rect1 = new Rect(new Point(x1, y1), width1, color1)
			rect2 = new Rect(new Point(x2, y2), width2, color2)
			toCenter(rect1, rect2, direction, distance)
			return
		}
	}
	else //竖直运动
	{
        var localX1 = x1, localX2 = x2
        if(localX1 < localX2)localX2 -= Math.abs(width1-width2) / 2
        else if(localX2 < localX1)localX1 -= Math.abs(width1-width2) / 2

		drawingRect(new Rect(new Point(localX1,y1),width1,color1), 1)
        drawingRect(new Rect(new Point(localX2,y2),width2,color2), 1)

		var middel = (y1 + y2) / 2
		if(y1 < middel)y1 += step
		else y1 -= step

		if(y2 < middel)y2 += step
		else y2 -= step

		var width = y1 < y2 ? width1 : width2

		if(Math.abs(y1 - y2) <= width + distance)
		{
			if(y1 < y2)
			{
				y2 = y1 + width1 + distance
			}
			rect1 = new Rect(new Point(x1, y1), width1, color1)
			rect2 = new Rect(new Point(x2, y2), width2, color2)
			toCenter(rect1, rect2, direction, distance)
			return
		}
	}
	setTimeout("toRectAnimation("
		+ x1 + "," 
		+ y1 + "," 
		+ width1 + ",'" 
		+ color1 + "'," 
		+ x2 + "," 
		+ y2 + "," 
		+ width2 + ",'" 
		+ color2 + "'," 
		+ distance + "," 
		+ direction + ","
		+ step + ","
		+ delay + ")",
		 delay)
}

function toCenter(rect1, rect2, direction, distance)
{
	var startX, startY, step = 4, delay = 0

	var endX = $(window).get(0).innerWidth / 2
	var endY = $(window).get(0).innerHeight / 2

	if(direction == 0) //水平运动
	{
		startY = rect1.width > rect2.width ? rect1.point.y + rect1.width / 2 : rect2.point.y + rect2.width / 2

		if(rect1.x < rect2.x)
		{
			startX = (rect1.point.x + rect2.point.x + rect2.width) / 2
			
			delay = 2*timeTotal / ((Math.abs(startX - endX)+Math.abs(startY - endY)) / step)
			
			toPointAnimation(startX, startY, rect1.width, rect2.width,
			 rect1.color, rect2.color, distance, endX, endY, direction, step, delay, false)
		}
		else
		{
			startX = (rect1.point.x + rect2.point.x + rect1.width) / 2
		
			delay = 2*timeTotal / ((Math.abs(startX - endX)+Math.abs(startY - endY)) / step)

			toPointAnimation(startX, startY, rect1.width, rect2.width,
			 rect1.color, rect2.color, distance, endX, endY, direction, step, delay, false)
		}
	}
	else //竖直运动
	{
		startX = rect1.width > rect2.width ? rect1.point.x + rect1.width / 2 : rect2.point.x + rect2.width / 2

		if(rect1.y < rect2.y)
		{
			startY = (rect1.point.y + rect2.point.y + rect2.width) / 2
			
			delay = 2*timeTotal / ((Math.abs(startX - endX)+Math.abs(startY - endY)) / step)
			
			toPointAnimation(startX, startY, rect1.width, rect2.width,
			 rect1.color, rect2.color, distance, endX, endY, direction, step, delay, false)
		}
		else
		{
			startY = (rect1.point.y + rect2.point.y + rect1.width) / 2
		
			delay = 2*timeTotal / ((Math.abs(startX - endX)+Math.abs(startY - endY)) / step)
			
			toPointAnimation(startX, startY, rect1.width, rect2.width,
			 rect1.color, rect2.color, distance, endX, endY, direction, step, delay, false)
		}
	}

	//sleep(millisecond)

		// setTimeout("toCenter("
		// + rect1 + "," 
		// + rect2 + "," 
		// + distance + "," 
		// + direction + ","
		
		//  delay)
}

function toPointAnimation(startX, startY, width1, width2, color1, color2, distance, endX, endY, direction, step, delay, model)
{
	canvasInit($("#myCanvas"))

	if(model)direction = (direction+1)%2

	var length = width1 + distance + width2
	var width = width1 > width2 ? width1 : width2

	var x1, y1, x2, y2

	if(direction == 0)
	{
		if(model)
		{
			x1 = startX - width/2
			y1 = startY  - length/2

			x2 = startX - width/2
			y2 = startY + length/2 - width2

            var localX1 = x1, localX2 = x2
            if(width1 < width2)localX1 += Math.abs(width1-width2) / 2
            else if(width2 < width1)localX2 += Math.abs(width1-width2) / 2

            drawingRect(new Rect(new Point(localX1,y1),width1,color1), 1)
            drawingRect(new Rect(new Point(localX2,y2),width2,color2), 1)

			direction = (direction+1)%2
		}
		else
		{
			x1 = startX - length/2
			y1 = startY - width/2

			x2 = startX + length/2 - width2
			y2 = startY - width/2

            var localY1 = y1, localY2 = y2
            if(width1 < width2)localY1 += Math.abs(width1-width2) / 2
            else if(width2 < width1)localY2 += Math.abs(width1-width2) / 2

            drawingRect(new Rect(new Point(x1,localY1),width1,color1), 1)
            drawingRect(new Rect(new Point(x2,localY2),width2,color2), 1)
		}

		if(startX < endX)startX += step
		else if(startX > endX)startX -= step

		if(Math.abs(startX - endX) <= step)
		{
			if(startX != endX)startX = endX
			else
			{
                if(model)
                {
                    copyRectAnimation(startX, startY, width1, width2, color1, color2, distance, direction, 0)
                    return
                }
			}
			model = true
		}
	}
	else
	{
		if(model)
		{
			x1 = startX - length/2
			y1 = startY - width/2

			x2 = startX + length/2 - width2
			y2 = startY - width/2

            var localY1 = y1, localY2 = y2
            if(width1 < width2)localY1 += Math.abs(width1-width2) / 2
            else if(width2 < width1)localY2 += Math.abs(width1-width2) / 2

            drawingRect(new Rect(new Point(x1,localY1),width1,color1), 1)
            drawingRect(new Rect(new Point(x2,localY2),width2,color2), 1)

			direction = (direction+1)%2
		}
		else
		{
			x1 = startX - width/2
			y1 = startY  - length/2

			x2 = startX - width/2
			y2 = startY + length/2 - width2

            var localX1 = x1, localX2 = x2
            if(width1 < width2)localX1 += Math.abs(width1-width2) / 2
            else if(width2 < width1)localX2 += Math.abs(width1-width2) / 2

            drawingRect(new Rect(new Point(localX1,y1),width1,color1), 1)
            drawingRect(new Rect(new Point(localX2,y2),width2,color2), 1)
		}

		if(startY < endY)startY += step
		else if(startY > endY)startY -= step

		if(Math.abs(startY - endY) <= step)
		{
			if(startY != endY)startY = endY
			else
			{
                if(model)
                {
                    copyRectAnimation(startX, startY, width1, width2, color1, color2, distance, direction, 0)
                    return
                }
			}
			model = true
		}
	}

	setTimeout("toPointAnimation("
		+ startX + "," 
		+ startY + "," 
		+ width1 + "," 
		+ width2 + ",'" 
		+ color1 + "','"
		+ color2 + "'," 
		+ distance + ","  
		+ endX + "," 
		+ endY + "," 
		+ direction + ","
		+ step + ","
		+ delay + ","
		+ model + ")",
		 delay)
}

function copyRectAnimation(x, y, width1, width2, color1, color2, distance, direction, step)
{
	canvasInit($("#myCanvas"))
	
	var length = width1 + distance + width2
	var width = width1 > width2 ? width1 : width2

	if(direction == 0)
	{
		x11 = x - length/2
        y11 = y - width/2 - step * width1

        x21 = x + length/2 - width2
        y21 = y - width/2 - step * width2

		if(width1 < width2)y11 += (width2 - width1) * (1 - step)
		else y21 += (width1 - width2) * (1 - step)

		drawingRect(new Rect(new Point(x11,y11),width1,color1), 1)
		drawingRect(new Rect(new Point(x21,y21),width2,color2), 1)
		
		x12 = x11
		y12 = y11 + 2 * step * width1

		x22 = x21
		y22 = y21 + 2 * step * width2

		drawingRect(new Rect(new Point(x12,y12),width1,color1), 1)
		drawingRect(new Rect(new Point(x22,y22),width2,color2), 1)

		step += 0.05

        if(step > 0.5)
        {
            addSecondPageListening()
            secondPage(x, y, distance, direction, transitionPlace)
            return
        }
	}
	else
	{
		x11 = x - width/2 - step * width1
		y11 = y  - length/2

		x21 = x - width/2 - step * width2
		y21 = y + length/2 - width2

		if(width1 < width2)x11 += (width2 - width1) * (1 - step)
		else x21 += (width1 - width2) * (1 - step)

		drawingRect(new Rect(new Point(x11,y11),width1,color1), 1)
		drawingRect(new Rect(new Point(x21,y21),width2,color2), 1)

		x12 = x11 + 2 * step * width1
		y12 = y11

		x22 = x21 + 2 * step * width2
		y22 = y21

		drawingRect(new Rect(new Point(x12,y12),width1,color1), 1)
		drawingRect(new Rect(new Point(x22,y22),width2,color2), 1)

        step += 0.05

        if(step > 0.5)
		{
            addSecondPageListening()
			secondPage(x, y, distance, direction, transitionPlace)
			return
		}
	}

    setTimeout("copyRectAnimation("
        + x + ","
        + y + ","
        + width1 + ","
        + width2 + ",'"
        + color1 + "','"
        + color2 + "',"
        + distance + ","
        + direction + ","
        + step + ")",
        timeTotal / 10)
}