class First {
    hello() {
        console.log('Привет я метод родителя!');
    };
};
class Second extends First{
    hello() {
        super.hello();
        console.log('А я наследуемый метод!');
    };
};
let a = new First;
a.hello();
let b = new Second;
b.hello();
