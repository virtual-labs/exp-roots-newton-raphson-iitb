let maindiv = (document.getElementById('pannelcreate'));
function activity1() {
    let text = `

   <div class='divide'>
   <div style='margin-top: 2vw;'>
   <h4 class="center-text fs-28px fb-700">Roots of Equation: Newton Raphson Method</h4>
   <br><br>
   
   <h4 class="fb-700 fs-28px" style="text-align:center">Activity 1</h4>
      <br><br>

      <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
   </div>
   </div>
   `;
    maindiv.innerHTML = text;
}
//for starting first activity
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    temp_btn && temp_btn.remove();
    let btn_text = get_collapse_btn_text('Select Equation', 'act1-div');
    let text = `
      ${btn_text}
      <div class='collapse center-text divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='act1-div'>
         <h4  style='text-align: left;' class='fb-800 fs-20px'>Step 1: </h4>
         <br>

         <div id='equ-select-div'>
            <div class="row justify-content-center " style="align-items:center;">
               <div class="col-md-5 fs-18px fb-500">
                  Select Equation
               </div>
               <div class="col-md-5">
                  <select class='form-select fs-16px' id='equ-select' onchange="equ_inp();">
                     <option value="0">------ Select Equation ------</option>
                     <option value="x^2-cos(x)">
                        x^2-cos(x)
                     </option>
                     <option value="exp(x)*cos(x)-1.4">
                        exp(x)*cos(x)-1.4
                     </option>
                     <option value='cos(x)-x*exp(x)'>
                        cos(x)-x*exp(x)
                     </option>
                  </select>
               </div>
            </div>
            <br>
            <button class='btn btn-info std-btn' style='margin: auto;' id='act1-btn-1' onclick='internal_calculations_1();'  disabled >Next</button>
         </div>
      </div>
   `;
    maindiv.innerHTML += text;
    setTimeout(() => MathJax.typeset(), 100);
    hide_all_steps();
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
}
function internal_calculations_1() {
    let outer_div = (document.getElementById('act1-div'));
    let div = (document.getElementById('equ-select-div'));
    let btn = (document.getElementById('act1-btn-1'));
    btn && btn.remove();
    act1_table_data1 = [];
    root_val_3 = 0;
    func_val_3 = 0;
    act1_table_data1 = newton(1);
    root_val_3 = act1_table_data1[2][4];
    func_val_3 = act1_table_data1[2][5];
    div.innerHTML = '';
    div.innerHTML = `
      <p class="fs-18px fb-500">Selected equation = ${equ}</p>
      <p class="fs-18px fb-500">df(x) = ${df_equ}</p>

   `;
    outer_div.innerHTML += `
   <br>
   <div style="text-align:left;" class="fs-18px">
      Initial guess x1 = 1
      <br>
      x2 = x1 - f(x1) / df(x1)
   </div>
   <br>
   <div id="act1-tb-box1">
      
   </div>
   <button class='btn btn-info std-btn' style='margin: auto; display:none;' id='act1-btn-2' onclick='display_chart();' >Plot Graph</button>

   <br>
   <div id="graph-div" style="display:none;">
      <canvas id="act1-graph"></canvas>
      <br>
      <button class='btn btn-info std-btn' style='margin: auto;' id='act1-btn-3' onclick='load_questions();' >Next</button>
   </div>
   `;
    let header = ['iter', 'x1', 'f(x1)', 'df(x1)', 'x2', 'f(x2)'];
    let tb_box = (document.getElementById('act1-tb-box1'));
    let tab = new Verify_Rows_Cols(header, act1_table_data1, [0, 1], [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5],
    ], '', tb_box, true, false, after_verify_table1);
    tab.load_table();
}
function display_chart() {
    let btn = (document.getElementById('act1-btn-2'));
    btn && btn.remove();
    let div = (document.getElementById('graph-div'));
    div.style.display = 'block';
    var ctx = document.getElementById('act1-graph');
    ctx.style.backgroundColor = 'white';
    ctx.style.marginTop = '5px';
    // ctx.style.marginLeft = '10%';
    ctx.style.padding = '10px';
    ctx.style.borderRadius = '8px';
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    let x = act1_table_data1.map((data) => data[0]);
    let y = act1_table_data1.map((data) => data[4]);
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: x,
            datasets: [
                {
                    label: 'x2',
                    data: y,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0,
                    showLine: true,
                },
            ],
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'x2',
                        font: { size: 14, weight: 'bold' },
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'iter',
                        font: { size: 14, weight: 'bold' },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `x2 vs iter`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } },
            },
        },
    });
}
function after_verify_table1() {
    let header = ['iter', 'x1', 'f(x1)', 'df(x1)', 'x2', 'f(x2)'];
    let tb_box = (document.getElementById('act1-tb-box1'));
    let btn = (document.getElementById('act1-btn-2'));
    btn.style.display = 'block';
    tb_box.innerHTML = '';
    let t = new Show_Table_Custom_Fixed(header, act1_table_data1, tb_box, 5);
    t.load_table();
}
function equ_inp() {
    let sel_inp = (document.getElementById('equ-select'));
    let btn = (document.getElementById('act1-btn-1'));
    if (sel_inp.value != '0') {
        btn.disabled = false;
        equ = sel_inp.value;
        df_equ = df_equations[equations.indexOf(equ)];
    }
    else {
        btn.disabled = true;
        equ = '';
        df_equ = '';
    }
}
function load_questions() {
    let btn = (document.getElementById('act1-btn-3'));
    btn && btn.remove();
    let outer_div = (document.getElementById('act1-div'));
    outer_div.innerHTML += `
   <br>

   <div id="question-div">
      <div class="row justify-content-center" style="align-items:center">
         <div class="col-md-5">
            What is function value of 3<sup>rd</sup> iteration?
         </div>
         <div class="col-md-4">
            <input type='number' id='func-val-inp' class='form-control fs-16px' />
         </div>
      </div>
      <br>
      <div class="row justify-content-center" style="align-items:center">
         <div class="col-md-5">
            What is root value of 3<sup>rd</sup> iteration?
         </div>
         <div class="col-md-4">
            <input type='number' id='root-val-inp' class='form-control fs-16px' />
         </div>
      </div>
      <br>
      <button class='btn btn-info std-btn' style='margin: auto;' id='act1-btn-4' onclick='verify_answer();' >Verify</button>
      <button class='btn btn-info std-btn' style='margin: auto; display:none;' id='act1-btn-5' onclick='exp_complete();' >Next</button>
   </div>
   `;
    display_chart();
}
function verify_answer() {
    let graph_div = (document.getElementById('graph-div'));
    let btn = (document.getElementById('act1-btn-4'));
    let next_btn = (document.getElementById('act1-btn-5'));
    let root_inp = (document.getElementById('root-val-inp'));
    let func_inp = (document.getElementById('func-val-inp'));
    console.log(func_val_3, root_val_3);
    if (!verify_values(parseFloat(func_inp.value), parseFloat(func_val_3.toFixed(5)))) {
        func_inp.style.border = '1px solid red';
        alert('Incorrect function value for 3rd iteration');
        return;
    }
    else {
        func_inp.style.border = '1px solid #ced4da';
        func_inp.disabled = true;
    }
    if (!verify_values(parseFloat(root_inp.value), parseFloat(root_val_3.toFixed(5)))) {
        root_inp.style.border = '1px solid red';
        alert('Incorrect root value for 3rd iteration');
        return;
    }
    else {
        root_inp.style.border = '1px solid #ced4da';
        root_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    graph_div.innerHTML = '';
    graph_div.innerHTML = `
   <canvas id="act1-graph"></canvas>
   `;
    display_chart();
    btn.remove();
    next_btn.style.display = 'block';
}
function exp_complete() {
    let btn = (document.getElementById('act1-btn-5'));
    btn && btn.remove();
    alert('Experiment completed');
}
activity1();
//# sourceMappingURL=activity1.js.map