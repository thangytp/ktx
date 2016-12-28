    // $(function(){
    // $(".dropdown").hover(
    //         function() {
    //             $('.dropdown-menu-2').css('display', 'none');
    //             $('.dropdown-menu-3').css('display', 'none');
    //             $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
    //             $(this).toggleClass('open');
    //             $('b', this).toggleClass("caret caret-up");
    //         },
    //         function() {
    //             $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
    //             $(this).toggleClass('open');
    //             $('b', this).toggleClass("caret caret-up");
    //         });
    // });
    // $(function(){
    // $(".dropdown-2").hover(
    //         function() {
    //             $('.dropdown-menu-2').css('display', 'block');
    //             $('.dropdown-menu-2', this).stop( true, true ).fadeIn("fast");
    //             $(this).toggleClass('open');
    //             $('b', this).toggleClass("caret caret-up");
    //         },
    //         function() {
    //             $('.dropdown-menu-2', this).stop( true, true ).fadeOut("fast");
    //             $(this).toggleClass('open');
    //             $('b', this).toggleClass("caret caret-up");
    //         });
    // });
    // $(function(){
    // $(".dropdown-3").hover(
    //         function() {
    //             $('.dropdown-menu-3').css('display', 'block');
    //             $('.dropdown-menu-3', this).stop( true, true ).fadeIn("fast");
    //             $(this).toggleClass('open');
    //             $('b', this).toggleClass("caret caret-up");
    //         },
    //         function() {
    //             $('.dropdown-menu-3', this).stop( true, true ).fadeOut("fast");
    //             $(this).toggleClass('open');
    //             $('b', this).toggleClass("caret caret-up");
    //         });
    // });

   $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();

    });
   $(document).ready(function(){
        $('#sidebar-left .sidebar-menu li').click(function(){
            $('li').removeClass("active");
            $(this).addClass("active");
        });
    });
    $(document).ready(function(){
      $('.dropdown-submenu a.test').on("click", function(e){
        $(this).next('ul').css('display','block');
        var dcss = $(this).next('ul').css('display');

        if(dcss == 'none'){
            $(this).next('ul').css('display','block');
        }
        else $(this).next('ul').css('display','none');
        
        e.stopPropagation();
        e.preventDefault();
      });
    });

    $('#mobileNavbar a > a > a').click(function(event) {
        
        $('.navbar-toggle').click();
    });
    
