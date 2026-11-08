namespace SpriteKind {
    export const Star = SpriteKind.create()
}
// CREAR ESTRELLAS
function createStars () {
    for (let index = 0; index < 5; index++) {
        star = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . b b . . . . . . . 
            . . . . . . b 5 5 b . . . . . . 
            . . . b b b 5 5 1 1 b b b . . . 
            . . . b 5 5 5 5 1 1 5 5 b . . . 
            . . . . b d 5 5 5 5 d b . . . . 
            . . . . c b 5 5 5 5 b c . . . . 
            . . . . c 5 d d d d 5 c . . . . 
            . . . . c 5 d c c d 5 c . . . . 
            . . . . c c c . . c c c . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Star)
        star.setPosition(randint(10, 150), randint(10, 105))
    }
}
// CHOCAR CON ENEMIGOS
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, enemy) {
    info.changeLifeBy(-1)
    enemy.setPosition(randint(20, 140), randint(20, 100))
})
// CREAR ENEMIGO
function createEnemy () {
    enemy = sprites.create(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, SpriteKind.Enemy)
    enemy.setPosition(randint(20, 140), randint(20, 100))
    enemy.setVelocity(40, 30)
    enemy.setBounceOnWall(true)
}
// NIVEL 2
function startLevel2 () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Star)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    scene.setBackgroundColor(13)
    player2.setPosition(80, 100)
    game.splash("NIVEL 2", "Recoge 5 estrellas mas")
    createStars()
    createEnemy()
    createEnemy()
}
// PERDER
info.onLifeZero(function () {
    game.splash("¡PERDISTE!", "Intenta otra vez")
    game.over(false)
})
// RECOGER ESTRELLAS
sprites.onOverlap(SpriteKind.Player, SpriteKind.Star, function (sprite, star) {
    star.destroy()
    info.changeScoreBy(1)
    if (info.score() == 5 && !(level2)) {
        level2 = true
        startLevel2()
    }
    if (info.score() == 10) {
        game.splash("¡GANASTE!", "Mision completada")
        game.over(true)
    }
})
let level2 = false
let enemy: Sprite = null
let star: Sprite = null
let player2: Sprite = null
// CREAR JUGADOR
player2 = sprites.create(img`
    ....ffffff..............
    ....ffacccf.........cf..
    .....ffacccfff.....cbf..
    ....ccaaaaaaaac...cbbf..
    ...c9babbbaaaaacccbbaf..
    ..c999bbaaaaaaaaaabafc..
    .cab991aaaaaaaaaaaaafcc.
    caaab1111baaaaaaaaccaacf
    faaaaaa199aaaacccccccaaf
    .faaaaaaaaaaacaaacffffff
    ..ffaaaaaaacbbaaaaff....
    ....fffffffffbbaaaafc...
    ............ffbbaaaac...
    ............fffcaaaac...
    .............ffffffff...
    ........................
    `, SpriteKind.Player)
controller.moveSprite(player2, 100, 100)
player2.setStayInScreen(true)
info.setScore(0)
info.setLife(3)
// NIVEL 1
scene.setBackgroundColor(9)
game.splash("AVENTURA ESPACIAL", "Recoge 5 estrellas")
createStars()
createEnemy()
