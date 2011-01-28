$.fn.livescape = function(options){
            var landscape = this;
            this.w = (options.width)?(options.width):(0);
            this.h = (options.height)?(options.height):(0);
            this.bg_url = (options.background_image)?(options.background_image):("");
            
            

            if(this.w!=0)
                $(this).width(this.w);
            
            if(this.h!=0)
                $(this).height(this.h);
            
            if(this.bg_url!="")
                $(this).css('background-image',"url("+this.bg_url+")");
            
            $(this).css('position',"relative");
            
            $.each(options.objects,function(){
                    var obj = this;
                    
                    var jqob = $('<div class="moving-object"><img src="'+this.image+'"/></div>');
                    if(obj.href){
                        var target = (obj.target)?(obj.target):("")
                        var jqob = $('<div class="moving-object"><a target="'+target+'" href="'+obj.href+'"><img style="border:0 none;" src="'+this.image+'"/></a></div>');
                    }
                    
                    $(jqob).css("position","absolute");
                    if(obj.fade)
                        $(jqob).css('display',"none");
                    $(jqob).appendTo(landscape);
                    
                    var range_sx_min = (this.range_sx_min)?(this.range_sx_min):(0);
                    var range_sx_max = (this.range_sx_max)?(this.range_sx_max):($(landscape).width());
                    var range_ex_min = (this.range_ex_min)?(this.range_ex_min):(0);
                    var range_ex_max = (this.range_ex_max)?(this.range_ex_max):($(landscape).width());
                    
                    var range_sy_min = (this.range_sy_min)?(this.range_sy_min):(0);
                    var range_sy_max = (this.range_sy_max)?(this.range_sy_max):($(landscape).height());
                    var range_ey_min = (this.range_ey_min)?(this.range_ey_min):(0);
                    var range_ey_max = (this.range_ey_max)?(this.range_ey_max):($(landscape).height());
                    
                    obj.anim = function(){
                    
                        
                        
                        var random_x_start = range_sx_min + Math.random()*(range_sx_max-range_sx_min);
                        var random_x_end = range_ex_min + Math.random()*(range_ex_max-range_ex_min);
                        var random_y_start = range_sy_min + Math.random()*(range_sy_max-range_sy_min);
                        var random_y_end = range_ey_min + Math.random()*(range_ey_max-range_ey_min);

                        var start_x = (this.start_x)?(this.start_x):(random_x_start.toString()+"px");
                        var start_y = (this.start_y)?(this.start_y):(random_y_start.toString()+"px");
                        var end_x = (this.end_x)?(this.end_x):(random_x_end.toString()+"px");
                        var end_y = (this.end_y)?(this.end_y):(random_y_end.toString()+"px");
                        var duration = (obj.duration)?(obj.duration):(parseInt(Math.random()*10000));
                        
                        var angle = 180*Math.atan2(parseInt(end_y)-parseInt(start_y), parseInt(end_x)-parseInt(start_x))/Math.PI;
                        
                        if(parseInt(end_x) < parseInt(start_x))
                            angle = 180+angle;
            
                        
                        $(jqob).css("left",start_x);
                        $(jqob).css("top",start_y);
                        if(this.autorotate){
                            $(jqob).css("-webkit-transform", "rotate("+angle+"deg)");
                            $(jqob).css("-moz-transform", "rotate("+angle+"deg)");
                        }
                        $(jqob).fadeIn();
                        $(jqob).animate({left:end_x, top:end_y},duration,function(){
                                if(obj.fade)
                                    $(jqob).fadeOut("normal",function(){
                                            if(obj.loop){
                                                var pause = (obj.pause)?(obj.pause):(0);
                                                setTimeout(function(){obj.anim()},pause);                                    
                                            }
                                        });
                                else
                                    if(obj.loop){
                                        var pause = (obj.pause)?(obj.pause):(0);
                                        setTimeout(function(){obj.anim()},pause);                                    
                                    }
                            }); 
                    }
                    obj.anim();
                });
        }
