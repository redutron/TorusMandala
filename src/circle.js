'use strict';
/*
 * Torus Mandala drawing animation
 * @author:    Caleb Nii Tetteh Tsuru Addy(Virus) 
 * @date:      6th April, 2020 
 * @email:     100percentvirusdownloading@gmail.com 
 * @twitter:   @niitettehtsuru
 * @github :   https://github.com/niitettehtsuru/TorusMandala
 * @codepen:   https://codepen.io/niitettehtsuru/pen/MWwMLvN
 * @license:   GNU General Public License v3.0
 */ 
class Circle
{ 
    constructor(screenWidth,screenHeight,xCoordinateOfCircleCenter,yCoordinateOfCircleCenter,radius,listOfColors)
    {     
        this.screenWidth    = screenWidth; 
        this.screenHeight   = screenHeight; 
        this.radius         = radius;    
        this.listOfColors   = listOfColors;   
        this.xCoordinateOfCircleCenter  = xCoordinateOfCircleCenter; 
        this.yCoordinateOfCircleCenter  = yCoordinateOfCircleCenter;
        this.unitAngularIncrement       = Math.PI/16; //divides the main circle into 32 equal parts
        this.unitAngularVelocity        = 0; 
        this.numOfCirclesToDraw         = 0;//the number of circles to be drawn on the circumference of the main circle 
        //all the circles whose centers lie on the circumference of the main circle circle
        this.circumcircles  = this.getCircumCircles(this.radius,this.xCoordinateOfCircleCenter,this.yCoordinateOfCircleCenter);  
    }
    /**
    * Let node correspond to window resizing.
    * @param  {number} screenHeight The height of the screen. 
    * @param  {number} screenWidth  The width of the screen.  
    * @param  {number} dy           The percentage change in browser window height 
    * @param  {number} dx           The percentage change in browser window width  .  
    */
    refreshScreenSize(screenHeight,screenWidth,dx,dy)
    {   
        this.screenHeight       = screenHeight;  
        this.screenWidth        = screenWidth; 
        this.xCoordinateOfCircleCenter     *= dx; 
        this.yCoordinateOfCircleCenter     *= dy;
        //replace the old 'circumcircles' with new ones(the only noticeable difference between old and new will be the color)
        this.circumcircles  = this.getCircumCircles(this.radius,this.xCoordinateOfCircleCenter,this.yCoordinateOfCircleCenter); 
    }
    getCircumCircles(radius,xCoordinateOfCircleCenter,yCoordinateOfCircleCenter)
    { 
        var circumCircles = []; 
        var p1 = {x:xCoordinateOfCircleCenter, y:yCoordinateOfCircleCenter}; 
        radius *= 2; //amplify the radius
        var radiusY = radius; 
        var radiusX = radius;  
        var startAngle = 0;  
        var rotationAngle = 0; 
        var increment = this.unitAngularIncrement;//divide the circle into 32 equal parts  
        for (var i = startAngle * Math.PI; i < 2 * Math.PI; i += increment ) 
        {
            var xPos = p1.x - (radiusX * Math.sin(i)) * Math.sin(rotationAngle * Math.PI) + (radiusY * Math.cos(i)) * Math.cos(rotationAngle * Math.PI);
            var yPos = p1.y + (radiusY * Math.cos(i)) * Math.sin(rotationAngle * Math.PI) + (radiusX * Math.sin(i)) * Math.cos(rotationAngle * Math.PI);
            //get all the points on the circumference of the circle, separated at 'this.unitAngularIncrement' intervals.  
            //we'll be standing on these points to draw the mandala. 
            circumCircles.push({x:xPos,y:yPos,r:radius,color:this.getRandomColor()}); 
        }
        return circumCircles; 
    }
    getRandomColor()
    {  
        return this.listOfColors[parseInt(this.getRandomNumber(0, this.listOfColors.length))]; 
    }  
    /**
    * Returns a random number between min (inclusive) and max (exclusive)
    * @param  {number} min The lesser of the two numbers. 
    * @param  {number} max The greater of the two numbers.  
    * @return {number} A random number between min (inclusive) and max (exclusive)
    */
    getRandomNumber(min, max) 
    {
        return Math.random() * (max - min) + min;
    }  
    drawPointsOnMainCircle(ctx)//same as the centers of all the circles to be drawn on the circumference of the main circle
    {
        this.circumcircles.forEach(function(circumcircle)
        {
            ctx.beginPath(); 
            ctx.arc(circumcircle.x,circumcircle.y,4,0,2*Math.PI);
            ctx.fillStyle = circumcircle.color; 
            ctx.fill(); 
            ctx.strokeStyle = circumcircle.color;
            ctx.stroke();  
        });
    }
    draw(ctx)//draw the main circle and all the other circles with their centers on its circumference
    {    
        var numOfCirclesToDraw = this.numOfCirclesToDraw; 
        var unitAngularVelocity = this.unitAngularVelocity;
        var xCoordinateOfCircleCenter = this.xCoordinateOfCircleCenter;
        var yCoordinateOfCircleCenter = this.yCoordinateOfCircleCenter; 
        //draw main circle
        ctx.beginPath(); 
        ctx.arc(this.xCoordinateOfCircleCenter,this.yCoordinateOfCircleCenter,2*this.radius,0,2*Math.PI); 
        ctx.stroke();  
        this.drawPointsOnMainCircle(ctx);  
        this.circumcircles.some(function(circumcircle,index)
        {  
            if(index === numOfCirclesToDraw)//if this is the newest circle to be drawn
            {    
                //draw pieces of the circle until circle is complete
                ctx.beginPath(); 
                ctx.arc(circumcircle.x,circumcircle.y,circumcircle.r,0,unitAngularVelocity);  
                ctx.strokeStyle = circumcircle.color;
                ctx.stroke(); 
                //draw the tip of the drawing pencil
                //(Based on formula for finding a point on a circle's circumference given radius,center and angle)
                var pencilTipx = circumcircle.x + circumcircle.r * Math.cos(unitAngularVelocity);
                var pencilTipy = circumcircle.y + circumcircle.r * Math.sin(unitAngularVelocity);
                ctx.beginPath(); 
                ctx.arc(pencilTipx,pencilTipy,4,0,2*Math.PI);
                ctx.fillStyle = circumcircle.color; 
                ctx.fill(); 
                ctx.strokeStyle = circumcircle.color;
                ctx.stroke();  
                //draw a line from the center to the tip of the pencil
                ctx.strokeStyle = 'black'; 
                ctx.lineWidth = 2; 
                ctx.beginPath();  
                ctx.moveTo(circumcircle.x, circumcircle.y);  
                ctx.lineTo(pencilTipx, pencilTipy);   
                ctx.stroke();
                ctx.closePath(); 
                //draw a line from the center of main circle to circumference of this circle
                ctx.strokeStyle = 'black'; 
                ctx.lineWidth = 2; 
                ctx.beginPath();  
                ctx.moveTo(circumcircle.x, circumcircle.y);  
                ctx.lineTo(xCoordinateOfCircleCenter, yCoordinateOfCircleCenter);   
                ctx.stroke();
                ctx.closePath(); 
            } 
            else //if circle is not the newest(has been fully drawn before)
            {
                ctx.beginPath(); 
                ctx.arc(circumcircle.x,circumcircle.y,circumcircle.r,0,2*Math.PI); 
                ctx.strokeStyle = circumcircle.color;
                ctx.stroke();
            }  
            return (index === numOfCirclesToDraw);//don't draw all the circles on the circumference(yet), only the number specified at every point in time
        }); 
    }    
    update(deltaTime)
    {     
        this.unitAngularVelocity += 2*this.unitAngularIncrement;
        if(this.unitAngularVelocity > 2 * Math.PI/*360 degrees. Meaning reset if circle drawing is complete*/)
        {
            this.unitAngularVelocity = 0; 
            this.numOfCirclesToDraw++;
        } 
        if(this.numOfCirclesToDraw > this.circumcircles.length )//if all circles have been drawn, reset
        {
            this.numOfCirclesToDraw = 0; 
            this.circumcircles  = this.getCircumCircles(this.radius,this.xCoordinateOfCircleCenter,this.yCoordinateOfCircleCenter); 
        } 
    }      
}