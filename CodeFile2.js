var playing = false;
var width= 350, height = 400, padding=20;
var svg_A = d3.select("#svg_A").attr("width", width).attr("height", height).style("margin", "auto").style("padding", "5px").style("border", "3px solid black");
var svg_B = d3.select("#svg_B").attr("width", width).attr("height", height).style("margin", "auto").style("padding", "5px").style("border", "3px solid black");
var svg_C = d3.select("#svg_C").attr("width", width).attr("height", height).style("margin", "auto").style("padding", "5px").style("border", "3px solid black");
svg_A.append("text").attr("text-anchor","center").attr("x",120).attr("y",310).attr("font-family", "IBM Plex Sans Condensed', sans-serif").style("opacity",0.2).attr("font-size","175px").text("A");
svg_B.append("text").attr("text-anchor","center").attr("x",120).attr("y",310).attr("font-family", "IBM Plex Sans Condensed', sans-serif").style("opacity",0.2).attr("font-size","175px").text("B");
svg_C.append("text").attr("text-anchor","center").attr("x",120).attr("y",310).attr("font-family", "IBM Plex Sans Condensed', sans-serif").style("opacity",0.2).attr("font-size","175px").text("C");
d3.select("#svg_AA").append("text").attr("text-anchor","center").attr("x",600).attr("y",38).attr("font-family", "IBM Plex Sans Condensed', sans-serif").style("opacity",0.5).attr("font-size","30px").text("A").style("margin", "auto").style("padding", "2px");
d3.select("#svg_BB").append("text").attr("text-anchor","center").attr("x",600).attr("y",38).attr("font-family", "IBM Plex Sans Condensed', sans-serif").style("opacity",0.5).attr("font-size","30px").text("B").style("margin", "auto").style("padding", "2px");
d3.select("#svg_CC").append("text").attr("text-anchor","center").attr("x",600).attr("y",38).attr("font-family", "IBM Plex Sans Condensed', sans-serif").style("opacity",0.5).attr("font-size","30px").text("C").style("margin", "auto").style("padding", "2px");

d3.select("#sliderA").on("input", generate_A);
var Slider_A = d3.select("#sliderA").property("value");
d3.select("#sliderB").on("input", generate_B);
var Slider_B = d3.select("#sliderB").property("value");
d3.select("#sliderC").on("input", generate_C);
var Slider_C = d3.select("#sliderC").property("value");
var Astep = [], Bstep = [], Cstep = [], temp_MatrixA, temp_MatrixB, temp_MatrixC, Points = [];
var Min_X = padding, Max_X = width - padding, Min_y = padding,  Max_Y = height - padding;
var MatrixA_x, MatrixA_y, MatrixB_x, MatrixB_y, MatrixC_x, MatrixC_y, MatrixA_d = 0, MatrixB_d = 0, MatrixC_d = 0;                   
var MatrixA = [], MatrixB = [], MatrixC = [], MatrixAA = [], MatrixBB = [], MatrixCC = [], Matrix_DataA, Matrix_DataB, Matrix_DataC, rendered_points, m;
var flag =0, count =0, data_vertical = 0, data_horiz = 0, c_X=0, c_Y=0;

load_svgs();

function load_svgs()
{
    Cal_A();
    Cal_B();
    Cal_C();
    Cal_AA();
    Cal_BB();
    Cal_CC();
}

function myFunction()
{
  location.replace("Home.html")
}

function Cal_AA()
{
    var AAstep = [];
    MatrixA_ddx = 1200/(Slider_A*Slider_B);
    var MatrixAA = [];
    var MatrixAA_y = 25;
    var MatrixAA_x = 10;
    for(i=0;i<Slider_A;i++)
    {
        temp_MatrixAA=[];
        for(j=0;j<Slider_B;j++)
        {
            var MatrixAA_d ={ x : MatrixAA_x , y : MatrixAA_y};
            temp_MatrixAA.push(MatrixAA_d);
            MatrixAA.push(MatrixAA_d);
            MatrixAA_x = MatrixAA_x + MatrixA_ddx;
        }
        AAstep.push(temp_MatrixAA);
        MatrixAA_x = MatrixAA_x + 5; 
    }
    Generate_MatrixAA(MatrixAA);
}

function Cal_BB()
{
    BBstep = [];
    MatrixB_ddx = 1200/(Slider_C*Slider_B);
    MatrixBB = [];
    var MatrixBB_x = 10;
    MatrixBB_y = 25 ;
    for(i=0;i<Slider_B;i++)
    {
        temp_MatrixBB = [];
        for(j=0;j<Slider_C;j++)
        {
            MatrixBB_d ={ x : MatrixBB_x , y : MatrixBB_y};
            MatrixBB.push(MatrixBB_d);
            temp_MatrixBB.push(MatrixBB_d);
            MatrixBB_x = MatrixBB_x + MatrixB_ddx;
        }
        BBstep.push(temp_MatrixB);
        MatrixBB_x = MatrixBB_x + 5;
    }
    Generate_MatrixBB(MatrixBB);
}

function Cal_CC()
{
    CCstep = [];
    MatrixC_ddx = 1200/(Slider_C*Slider_A);
    MatrixCC=[];
    MatrixCC_y = 25;
    MatrixCC_x = 10;
    for(i=0;i<Slider_A;i++)
    {
        temp_MatrixCC=[];
        for(j=0;j<Slider_C;j++)
        {
            MatrixCC_d ={ x : MatrixCC_x , y : MatrixCC_y};
            MatrixCC.push(MatrixCC_d);
            temp_MatrixCC.push(MatrixCC_d);
            MatrixCC_x = MatrixCC_x + MatrixC_ddx;
        }
        CCstep.push(temp_MatrixC);
        MatrixCC_x = MatrixCC_x + 5;
    }
    Generate_MatrixCC(MatrixCC);
}

function generate_A()
{
    Slider_A = d3.select("#sliderA").property("value");
    Cal_A();
    Cal_C();
    Cal_AA();
    Cal_CC();
}   

function generate_B()
{
    Slider_B = d3.select("#sliderB").property("value");
    Cal_A();
    Cal_B();
    Cal_AA();
    Cal_BB();
}

function generate_C()
{
    Slider_C = d3.select("#sliderC").property("value");
    Cal_B();
    Cal_C();
    Cal_BB();
    Cal_CC();
}

function Cal_A()
{
    Astep = [];
    MatrixA_dx = (Max_X - Min_X)/(Slider_B-1);
    MatrixA_dy = (Max_Y - Min_y)/(Slider_A-1);
    MatrixA = [];
    MatrixA_y = Min_y ;
    for(i=0;i<Slider_A;i++)
    {
        temp_MatrixA=[];
        MatrixA_x = Min_X;
        for(j=0;j<Slider_B;j++)
        {
            MatrixA_d ={ x : MatrixA_x , y : MatrixA_y};
            temp_MatrixA.push(MatrixA_d);
            MatrixA.push(MatrixA_d);
            MatrixA_x = MatrixA_x + MatrixA_dx;
        }
        Astep.push(temp_MatrixA);
        MatrixA_y= MatrixA_y + MatrixA_dy; 
    }
    Generate_MatrixA();
}  

function Cal_B()
{
    Bstep = [];
    MatrixB_dx = (Max_X - Min_X)/(Slider_C-1);
    MatrixB_dy = (Max_Y - Min_y)/(Slider_B-1);
    MatrixB = [];
    MatrixB_y = Min_y ;
    for(i=0;i<Slider_B;i++)
    {
        temp_MatrixB = [];
        MatrixB_x = Min_X;
        for(j=0;j<Slider_C;j++)
        {
            MatrixB_d ={ x : MatrixB_x , y : MatrixB_y};
            MatrixB.push(MatrixB_d);
            temp_MatrixB.push(MatrixB_d);
            MatrixB_x = MatrixB_x + MatrixB_dx;
        }
        MatrixB_y= MatrixB_y + MatrixB_dy;
        Bstep.push(temp_MatrixB);
    }
    Generate_MatrixB();
}  
function Cal_C()
{
    Cstep = [];
    MatrixC_dx = (Max_X - Min_X)/(Slider_C-1);
    MatrixC_dy = (Max_Y - Min_y)/(Slider_A-1);
    MatrixC=[];
    MatrixC_y = Min_y ;
    for(i=0;i<Slider_A;i++)
    {
        temp_MatrixC=[];
        MatrixC_x = Min_X;
        for(j=0;j<Slider_C;j++)
        {
            MatrixC_d ={ x : MatrixC_x , y : MatrixC_y};
            MatrixC.push(MatrixC_d);
            temp_MatrixC.push(MatrixC_d);
            MatrixC_x = MatrixC_x + MatrixC_dx;
        }
        MatrixC_y= MatrixC_y + MatrixC_dy;
        Cstep.push(temp_MatrixC);
    }
    Generate_MatrixC();
} 

function Generate_MatrixA()
{ 
    m=Slider_A;
    Matrix_DataA = d3.select("#svg_A").selectAll(".matrixA").data(MatrixA);
    Matrix_DataA.enter().append("circle").merge(Matrix_DataA).attr("r",5).attr("cx", (d) => d.x).attr("cy",(d) => d.y).classed("matrixA", true);
    Matrix_DataA.exit().remove();

}

function Generate_MatrixAA(MatrixAA)
{ 
    Matrix_DataAA = d3.select("#svg_AA").selectAll(".matrixAA").data(MatrixAA);
    Matrix_DataAA.enter().append("circle").merge(Matrix_DataAA).attr("r",1).attr("cx", (d) => d.x).attr("cy",(d) => d.y).classed("matrixAA", true);//
    Matrix_DataAA.exit().remove();

}

function Generate_MatrixB()
{
    Matrix_DataB = d3.select("#svg_B").selectAll(".matrixB").data(MatrixB);
    Matrix_DataB.enter().append("circle").merge(Matrix_DataB).attr("r",5).attr("cx", (d) => d.x).attr("cy",(d) => d.y).classed("matrixB", true);
    Matrix_DataB.exit().remove();
}

function Generate_MatrixBB(MatrixBB)
{
    Matrix_DataBB = d3.select("#svg_BB").selectAll(".matrixBB").data(MatrixBB);
    Matrix_DataBB.enter().append("circle").merge(Matrix_DataBB).attr("r",1).attr("cx", (d) => d.x).attr("cy",(d) => d.y).classed("matrixBB", true);
    Matrix_DataBB.exit().remove();
}

function Generate_MatrixC()
{
    Matrix_DataC = d3.select("#svg_C").selectAll(".matrixC").data(MatrixC);
    Matrix_DataC.enter().append("circle").merge(Matrix_DataC).attr("r",5).attr("cx", (d) => d.x).attr("cy",(d) => d.y).classed("matrixC", true);
    Matrix_DataC.exit().remove(); 
}

function Generate_MatrixCC(MatrixCC)
{
    Matrix_DataCC = d3.select("#svg_CC").selectAll(".matrixCC").data(MatrixCC);
    Matrix_DataCC.enter().append("circle").merge(Matrix_DataCC).attr("r",1).attr("cx", (d) => d.x).attr("cy",(d) => d.y).classed("matrixCC", true);
    Matrix_DataCC.exit().remove(); 
}

function radioMode()
{
    generate_Methods()
}

// function generate_Method()
// {
//     var mode = document.getElementsByName("mode");
//     var method_Naive, method_Trans, method_Tile;
//     var TILE_SIZE =8, ran=0;
//     if(mode[0].checked)
//     {
//         for (var i = 0; i < Slider_A ; i++)
//         {
//                 for (var k = 0; k < Slider_C; k++)
//                 {
//                     for(var j = 0; j < Slider_B; ++j)
//                     {
//                     }
                    
//                 }     
                
//         }
//         console.log(method_Naive)
//     }
//     else if(mode[1].checked)
//     {
//         for (var i = 0; i < Slider_A ; i++)
//         {
//             //console.log(Astep[i][ran])
//             for (var k = 0; k < Slider_C; k++)
//             {
//                 console.log(Bstep[i][k])
//                 for(var j = 0; j < Slider_B; ++j)
//                 {
//                     ran=j;
                    
//                     //console.log(Cstep[k][j])
// //console.log("-------------------")
//                    // C2[i][k] += A[i][j] * Bt[k][j];
//                 }
//             }
//         }
//     }
//     else if(mode[2].checked)
//     {
//         for (var i0 = 0; i0 < Slider_A; i0 += TILE_SIZE)
//         {
//           for (var j0 = 0; j0 < Slider_B; j0 += TILE_SIZE)
//             {
//             for (var k0 = 0; k0 < Slider_C; k0 += TILE_SIZE)
//                 {
//               for (var i1 = i0; i1 < i0 + TILE_SIZE; ++i1)
//                 {
//                 for (var j1 = j0; j1 < j0 + TILE_SIZE; ++j1)
//                     {
//                   for (var k1 = k0; k1 < k0 + TILE_SIZE; ++k1)
//                         {
//                     // C3[i1][j1] += A[i1][k1] * Bt[j1][k1];

//                         }
//                     }
//                 }
//                 }
//             }
//         }
//     }
// }

// function generate_Memory_Methods()
// {
//     var point=0;
//     d3.select("#svg_AA").selectAll(".matrixAA").transition().duration(150)//.delay(200).ease(d3.easeBounce)
//     .style("fill",function(d)
//     {if((d.x<=AAstep[point].x)){return "red";}
//     }).attr("r", function(d)
//     {if(d.x<=AAstep[point].x)
//         {return "3";}
//         else
//         {return "1";}
//     })
//         .transition().duration(100).style("fill",function(d,i)
//         {if((d.x<=AAstep[point].x))
//             {return "black";}
//         })
//         .transition().duration(450).style("fill",function(d,i)
//         {
//             if((d.x<=AAstep[point].x))
//             {return "red";}
//         })
//         .attr("r", function(d)
//         {
//             if(d.x<=AAstep[point].x)
//             {return "3";}
//             else
//             {return "1";}
//             });

//         point=+Slider_B;
// }

function generate_Methods()
{
    var mode = document.getElementsByName("mode");
    if((data_vertical==Slider_C)&&(data_horiz==(Slider_A-1)))
    {
        return ;
    }
    if(data_vertical==Slider_C)
    {
        data_horiz++;
        data_vertical=0;
    }
    console.log(Astep)
    console.log(Astep[0][2])
    d3.select("#svg_A").selectAll(".matrixA").transition().delay(200).duration(450).ease(d3.easeBounce).style("fill",function(d,i)
    {if((d.y==Astep[data_horiz][2].y)){return "red";}
    }).attr("r", function(d,i)
    {if(d.y==Astep[data_horiz][2].y)
        {return "10";}
        else
        {return "5";}
    })
        .transition().duration(100).style("fill",function(d,i)
        {if((d.y==Astep[data_horiz][2].y))
            {return "black";}
        })
        .transition().duration(450).style("fill",function(d,i)
        {
            if((d.y==Astep[data_horiz][2].y))
            {return "red";}
        })
        .attr("r", function(d,i)
        {
            if(d.y==Astep[data_horiz][2].y)
            {return "10";}
            else
            {return "5";}
            });
    if(mode[0].checked)
    {
    d3.select("#svg_B").selectAll(".matrixB").transition().delay(200).duration(1000).ease(d3.easeBounce)
    .style("fill",function(d,i){
        if((d.x==Bstep[0][data_vertical].x))
        {return "red";}
    })
    .attr("r", function(d,i){
        if(d.x==Bstep[0][data_vertical].x)
        {return "10";}
        else
        {return "5";}
        });
    }
    else if(mode[1].checked)
    {
        d3.select("#svg_B").selectAll(".matrixB").transition().delay(200).duration(1000).ease(d3.easeBounce)
        .style("fill",function(d,i){
            if((d.y==Bstep[data_vertical][2].y))
            {return "red";}
        })
        .attr("r", function(d,i){
            if(d.y==Bstep[data_vertical][2].y)
            {return "10";}
            else
            {return "5";}
            });
    }
    if(flag == 0)
    {
        d3.select("#svg_C").selectAll(".matrixC").transition().duration(600)//.ease(d3.easeBounce)
         .style("fill",function(d,i){
        if((d.x==Cstep[data_horiz][data_vertical].x)&&(d.y==Cstep[data_horiz][data_vertical].y))
        {
            return "green";
        }
     })
     .attr("r",function(d,i){
      
        if((d.x==Cstep[data_horiz][data_vertical].x)&&(d.y==Cstep[data_horiz][data_vertical].y))
        {
            return "10";
        }
        else
        {
            return "5";
        }
     })
     .transition().duration(600).ease(d3.easeBounce)
     .style("fill",function(d,i){
        if((d.x==Cstep[data_horiz][data_vertical].x)&&(d.y==Cstep[data_horiz][data_vertical].y))
        {
            return "green";
        } 
     })
        .attr("r",function(d,i){
      
        if((d.x==Cstep[data_horiz][data_vertical].x)&&(d.y==Cstep[data_horiz][data_vertical].y))
        {
            return "10";
        }
        else
        {
            return "5";
        }
     })
     .style("fill",function(d,i){
        if((d.x==Cstep[data_horiz][data_vertical].x)&&(d.y==Cstep[data_horiz][data_vertical].y))
        {
            return "red";
        } 
     })
    }  
    data_vertical++;
    count++;  
    if (playing)
    setTimeout(step, 500)  
}

function btn_step()
{      
    generate_Methods();
    generate_Memory_Methods();
}

function btn_play()
{
    flag=0;
            if (d3.select("#btn_Play").property("value") == "Play") {
                d3.select("#btn_Play").text("Pause")
                d3.select("#btn_Play").property("value", "Pause")
                playing = true
                step()
            }
            else {
                d3.select("#btn_Play").text("Play")
                d3.select("#btn_Play").property("value", "Play")
                playing = false
            }
}

function btn_reset()
{
location.reload(); 
}

function step() 
{    
    generate_Methods();
}