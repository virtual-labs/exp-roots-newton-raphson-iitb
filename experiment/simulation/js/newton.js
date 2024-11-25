function f(xx) {
    // let eq_drop = <HTMLSelectElement>document.getElementById('equ-select'); //id to be change
    var eq = equ;
    // alert(xx);
    var scope = { x: xx };
    //var eq1 = "-0.03^1.5"
    //alert(math.eval(eq1, scope));
    return math.eval(eq, scope);
}
// x^2-cos(x), exp(x)*cos(x)-1.4
//initial guess 0 1 x1=0 and x2=1
function df(xx) {
    var scope = { x: xx };
    let eq = df_equ;
    //var eq1 = "-0.03^1.5"
    //alert(math.eval(eq1, scope));
    return math.eval(eq, scope);
}
function newton(x1) {
    let table = [];
    for (let i = 0; i < 8; i++) {
        table[i] = [];
        let x2 = x1 - f(x1) / df(x1);
        table[i][0] = i + 1;
        table[i][1] = x1;
        table[i][2] = f(x1);
        table[i][3] = df(x1);
        table[i][4] = x2;
        table[i][5] = f(x2);
        x1 = x2;
    }
    return table;
}
//# sourceMappingURL=newton.js.map