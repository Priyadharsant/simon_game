let game = "off";
let level = 1;
let colors = ['green','red','blue','yellow'];
let random = [];   
let click = 0;     
let btn = $("button"); 
let level_lbl = $(".level");
let max_level = $(".max-level");
let alert_msg = $(".on_alert");
let game_over = $('.end');
let next_level = $('.next')
let bg = $('body');
let sound = document.querySelector('audio');
function simon() {
    console.log('Level : ' + level);
    
    level_lbl.text("Level : "+level)
    
    random.push(colors[Math.floor(Math.random() * 4)]);
    console.log("Sequence: " + random.join(", "));

    
    for (let i = 0; i < random.length; i++) {
        setTimeout(() => {
            let $btn = $('#' + random[i]);
            $btn.addClass('blink');

            setTimeout(() => {
                $btn.removeClass('blink');
            }, 300);

        }, i * 1000); 
    }

    if (level > localStorage.getItem('max_level')) {
        max_level.text('Max-level : ' + level)
        localStorage.setItem('max_level', level)
    }
    level++;
    click = 0;
}

$(".btn").click(function() {
    let $click = $(this)
    let chosen = $click.attr("id"); 
    
    if(game === 'off')
    {
        alert_msg.show();   
    }
    else{
        alert_msg.hide()
    }
    
    
    if (chosen === random[click]) {
        click++;

       
        if (click === random.length) {
            next_level.text("Level "+level)
            next_level.show();
            setTimeout(() => {
                next_level.hide();
            }, 800);
            setTimeout(simon,1500);
        }
    } else {
        console.log("Wrong! Game Over");
        sound.play();
        level_lbl.text("Level : 0")
        game = "off";
        level = 1;
        random = [];
        game_over.show(); 
        bg.addClass("redbg")
        btn.removeClass("btn-inactive") 
        setTimeout(() => {
                game_over.hide(); 
                bg.removeClass("redbg")
            },1500);
        
        start();
    }
});
alert_msg.hide()
game_over.hide()
next_level.hide();
function start(){
    if(localStorage.getItem('max_level') === null)
    {
        localStorage.setItem('max_level', 0)
    }
    else{
        max_level.text('Max-level : ' + localStorage.getItem('max_level'))
    }
    btn.click(function () {
        if (game === 'off') {
            alert_msg.hide()
            game = 'on';
            btn.addClass("btn-inactive")
            game_over.hide()
            simon();
        }
    });
}

 
start();
