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
class Painter
{
    constructor(screenWidth,screenHeight)
    {      
        this.screenWidth   = screenWidth;
        this.screenHeight  = screenHeight; 
        this.listOfColors  = //html color names
        [   
            "red","darkred","green","darkgreen","lightgoldenrodyellow", "pink","gold","khaki","violet","darkviolet","darkolivegreen", "silver",
            "orange","darkblue","midnightblue","fuchsia","blueviolet","darkgray","dimgray","darksalmon", "tan","darkseagreen","teal","darkkhaki",
            "lime","forestgreen","darkslategray","peru","chocolate","darkmagenta","purple","darkorange","tomato","maroon","hotpink","cyan",
            "darkturquoise","darkcyan", "olive","green","gray","gainsboro","indigo", "mediumblue","slateblue","orangered","goldenrod","brown", 
            "navy","greenyellow","yellowgreen","magenta","indianred","black","steelblue","royalblue","firebrick","deeppink", "deepskyblue",
            "lawngreen","crimson","salmon","blue","dodgerblue"
        ]; 
        this.circles      = this.getCircles();
    } 
    getCircles() 
    {
        var circles = []; 
        circles.push(new Circle(this.screenWidth,this.screenHeight,this.screenWidth/2,this.screenHeight/2,60,this.listOfColors));  
        return circles;  
    }  
    /**
    * Let canvas respond to window resizing.
    * @param  {number} screenHeight The height of the screen. 
    * @param  {number} screenWidth  The width of the screen.  
    */
    refreshScreenSize(screenHeight,screenWidth)
    { 
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        { 
            var dy              = screenHeight/this.screenHeight;//percentage change in browser window height 
            var dx              = screenWidth/this.screenWidth;  //percentage change in browser window width  
            this.screenHeight   = screenHeight;  
            this.screenWidth    = screenWidth;   
            this.circles.forEach(function(circle)
            { 
                circle.refreshScreenSize(screenHeight,screenWidth,dx,dy);//adjust the screen size of each node  
            });
        } 
    } 
    update(deltaTime)
    {       
        this.circles.forEach(function (circle) 
        {          
            circle.update(deltaTime); 
        });     
    }  
    draw(ctx)
    {     
        this.circles.forEach(function(circle)
        {  
            circle.draw(ctx); 
        });  
    }   
}
