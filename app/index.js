import './index.css';
$(function(){

    var carouselBox = (function (){

        function Carousel($ct){
            this.$ct = $ct;
            this.init();
        }

        Carousel.prototype.init = function(){

            var $imgBox = this.$imgBox = this.$ct.find('.imgBox'),
                imgLi = this.imgLi = this.$ct.find('.imgBox>li'),
                btnNext = this.btnNext = this.$ct.find('.next-arrow'),
                btnPre = this.btnPre =  this.$ct.find('.pre-arrow'),
                pageIndex = this.pageIndex = 0;

            this.sliderLi = this.$ct.find('.slider>li');
            $imgBox.append(imgLi.first().clone());
            $imgBox.prepend(imgLi.last().clone());
            $imgBox.width( (imgLi.length+2)*imgLi.width());
            $imgBox.css({left:-imgLi.width()});

            this.bindClick(pageIndex);
            this.slideClick();
        }

        Carousel.prototype.bindClick = function (){
            this.isAnimate = false;
            var _this = this;
            this.btnNext.on('click', function ()
            {

                _this.playNext(1);
            });

            this.btnPre.on('click', function ()
            {
                _this.playPre(1);
            });
        }

        Carousel.prototype.playNext = function (len){
            if(this.isAnimate){return}
            this.isAnimate = true;
            var _this = this;
            this.$imgBox.animate({
                //-=在原来的基础上去减小
                left: '-=' + this.imgLi.width()*len

            },function ()
            {
                 _this.pageIndex += len;

                if( _this.pageIndex == _this.imgLi.length)
                {
                     _this.pageIndex = 0;
                     _this.$imgBox.css({left:-_this.imgLi.width()})
                }
                 _this.setSlider();
                 _this.isAnimate = false;
            });
        }

        Carousel.prototype.playPre = function (len){
            var _this = this;
            if(this.isAnimate){return}
            this.isAnimate = true;
            this.$imgBox.animate({
                //-=在原来的基础上去减小
                left: '+=' + this.imgLi.width()*len
            },function ()
            {
                _this.pageIndex -= len;

                if(_this.pageIndex < 0)
                {
                    _this.pageIndex = _this.imgLi.length-1;
                    _this.$imgBox.css({left:-_this.imgLi.width()*_this.imgLi.length})
                }
            _this.setSlider();
            _this.isAnimate = false;
            });
        }

        Carousel.prototype.slideClick = function (){
            var _this = this;

            this.sliderLi.click(function ()
            {
                var index = $(this).index();
                if(index > _this.pageIndex)
                {
                    _this.playNext(index - _this.pageIndex);
                }else if(index < _this.pageIndex){
                    _this.playPre(_this.pageIndex - index);
                }
            });
        }

        Carousel.prototype.setSlider = function (){
             this.sliderLi.removeClass('active').eq(this.pageIndex).addClass('active');
        }

        return{
            start: function ($ct){
                $ct.each(function (index,node){
                    //把原生对象jq化
                    new Carousel($(node));
                })
            }
        }
    })()

    carouselBox.start($('.carousel'));


    /*以下是懒加载*/
    var Lazy = (function(){
        var num = 2;
        $('.btn').on('click', function(){

            for(var i=0; i<2; i++){
               num +=1;
               var html = '';
               html += '<li><a href="#">';
               html += '<img src="http://cdn.jirengu.com/book.jirengu.com/img/'+num+'.jpg ">'
               html += '</a></li>';
               $('#services>.container').append(html)
            }
        })

    })()

    /*回到顶部*/
    var backTop = (function (){

        function GoTop(){
            var divBtn = $('<div class="goTopBtn"><a href="javascript:void(0)">回到顶部</a></div>');
            $('body').append(divBtn);
            this.num = 500;
            this.contentScroll(this.num);
        };


        GoTop.prototype.contentScroll = function (num){
            var _this = this;
            $(window).on('scroll',function (){
                if($(window).scrollTop() > num){
                    $('.goTopBtn').show();
                    _this.click();
                }else{
                    $('.goTopBtn').hide();
                };
            });
        }

        GoTop.prototype.click = function (){
            $('.goTopBtn').click(function(){
                $(window).scrollTop(0);
            })
        }

        var goTop = new GoTop();
    })()




})
