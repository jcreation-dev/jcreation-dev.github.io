$('.chips').chips();
$('.collapsible').collapsible();
$('.chips-placeholder').chips({
    placeholder: 'Enter a element',
    secondaryPlaceholder: '+element',
});

let cycle = 0;


$('#historyCo').carousel({
    fullWidth: true,
    onCycleTo: function()
    {
        cycle += 1;
        if(cycle == 3)
        {
            cycle = 0;  
             $("#btnHistorySkipFinish").text("Finish");
        }
        else
        {
            $("#btnHistoryNext").removeClass("hide");
        }
    }
});




if (!!!localStorage.yeah) {
    localStorage.yeah = 1;
    $('#modal1').modal().modal('open');
}

$('.tap-target').tapTarget();
 $('.fixed-action-btn').floatingActionButton();

$('.tooltipped').tooltip();


$('.chips-autocomplete').chips({
    limit: 30,
    onChipAdd: function () {


        let universalSet = $('#universalSet')[0].M_Chips.chipsData;

        let newAdded = $(this)[0].chipsData[($(this)[0].chipsData.length - 1)].tag;

        let exist = checkExist(universalSet, newAdded);

        if (exist) {
            console.log("OK");
        } else {
            alert("The element you just entered is not belong in universal set");
            $(this.$el).chips('deleteChip', ($(this)[0].chipsData.length - 1));
        }

        processVenn();
        
        if(!!currentFunc[0])
        {
            window[currentFunc[0]](currentFunc[1]);
        }
    },

    onChipDelete: function () {
        
        if(this.el.id == "universalSet")
        {
            let universalSet = reformat($('#universalSet')[0].M_Chips.chipsData);
            let firstSet = reformat($('#firstSet')[0].M_Chips.chipsData);
            let secondSet = reformat($('#secondSet')[0].M_Chips.chipsData);

            for (let fSet = 0; fSet < firstSet.length; fSet++) {
                let meron = false;
                for (let uSet = 0; uSet < universalSet.length; uSet++) {
                    if(universalSet[uSet] == firstSet[fSet])
                    {
                        meron = true;
                    }
                }

                if(!meron)
                {
                    $("#firstSet").chips('deleteChip', fSet);
                }
            }

            for (let sSet = 0; sSet < secondSet.length; sSet++) {
                let meron = false;
                for (let uSet = 0; uSet < universalSet.length; uSet++) {
                    if(universalSet[uSet] == secondSet[sSet])
                    {
                        meron = true;
                    }
                }

                if(!meron)
                {
                    $("#secondSet").chips('deleteChip', sSet);
                }
            }


            if(threeSet)
            {
                let thirdSet = reformat($('#thirdSet')[0].M_Chips.chipsData);
                for (let tSet = 0; tSet < thirdSet.length; tSet++) {
                    let meron = false;
                    for (let uSet = 0; uSet < universalSet.length; uSet++) {
                        if(universalSet[uSet] == thirdSet[tSet])
                        {
                            meron = true;
                        }
                    }

                    if(!meron)
                    {
                        $("#thirdSet").chips('deleteChip', tSet);
                    }
                }
            }
        }
       
        processVenn();
        if(!!currentFunc[0])
        {
            window[currentFunc[0]](currentFunc[1]);
        }
    }
});


$("#btnSetting").click(function()
{
    window.location = "index.html";
})



function checkExist(set, data) {
    for (let element = 0; element < set.length; element++) {
        if (set[element].tag === data) {
            return true
        }
    }
    return false
}

let threeSet = false;
let currentFunc = ["", ""];


$("#bitResult").change(function()
{
    if(currentFunc[0] == "complementClick" || currentFunc[0] == "powerClick" || currentFunc[0] == "cartesianClick")
    {
        window[currentFunc[0]](currentFunc[1]);
    }
})

$("#threeSet").change(function () {
    
    if (this.checked) {
        threeSet = true;
        $("#leftSpan").css("shape-outside", "polygon(100% 0%, 40% 0%, 74.24% 11.79%, 62.66% 20.51%, 53.93% 30.64%, 50.51% 40.38%, 49.93% 47.18%, 25.96% 56.28%, 12% 65%, 2.27% 74.74%, -1.68% 86.03%, 0% 100%, 100% 100%)");
        $("#rightSpan").css("shape-outside", "polygon(0% 0%, 60% 0%, 25.55% 11.67%, 37.13% 20.51%, 45.44% 30.13%, 49.28% 38.97%, 48.39% 46.92%, 69% 53.97%, 88% 65%, 95% 75%, 100% 85%, 100% 100%, 0% 100%)");
        $("#middleSpan1").css("shape-outside", "polygon(0% 0%, 3% 0%, 127% 7%, 76.27% 19.1%, 39.58% 28.79%, 17.35% 37.15%, 5.64% 46.25%, 8.28% 51.94%, 99.16% 51.99%, 100% 100%, 0% 100%)");
        $("#middleSpan2").css("shape-outside", "polygon(144.92% -12.5%, 1.23% -11.76%, -1.94% 12.41%, 34.31% 20.1%, 67.21% 29.28%, 86.11% 39.63%, 98.33% 52.35%, -3.34% 52.2%, 0% 100%, 100% 100%)");

        $(".thirdPhane").removeClass("hide");
    } else {
        threeSet = false;


        $("#leftSpan").css("shape-outside", "polygon(100% 0%, 40% 0%, 74.09% 11.62%, 60.76% 22.33%, 53.3% 32.44%, 49.03% 41.14%, 49.79% 50.26%, 53% 58.26%, 59.69% 66.67%, 73.53% 79.82%, 44.3% 88.93%, 5.15% 89.02%, 100% 100%)");
        $("#rightSpan").css("shape-outside", "polygon(0% 0%, 59% 0%, 22.94% 10.63%, 41% 25%, 47% 34%, 49.3% 41.4%, 48.76% 50.41%, 45.82% 59.34%, 39.18% 68.3%, 26.03% 79.53%, 46.75% 87.19%, 96.66% 88.83%, 0% 100%)");
        $("#middleSpan1").css("shape-outside", "polygon(163% 3%, 47% 24%, -1.98% 50.73%, 19.8% 73.47%, 75.22% 88.57%, 152% 98%, 4% 99%, 0% 2%)");
        $("#middleSpan2").css("shape-outside", "polygon(100% 0%, -100% 0%, 55.63% 23.14%, 78.07% 34.73%, 96% 49%, 87% 70%, 65.41% 77.23%, 36.76% 85.88%, -1.44% 93.01%, -2.41% 101.39%, 107% 100%)");

        $(".thirdPhane").addClass("hide");
    }
    processVenn();
})

$(".inpName").keyup(function () {
    $("." + $(this).attr("data")).text($(this).val());
})





function unionClick(sets, parag) {
    let union;


    union = unionOper(reformat($('#' + sets[0])[0].M_Chips.chipsData), reformat($('#' + sets[1])[0].M_Chips.chipsData), reformat($('#' + sets[0])[0].M_Chips.chipsData));

    if (sets.length > 2) {
        union = unionOper(union, reformat($('#' + sets[2])[0].M_Chips.chipsData), union);
    }

    union.sort(function (a, b) {
        return a - b
    });

    
    let setOne = getSetName(sets[0]);
    let setTwo = getSetName(sets[1]);
    let setThree = !!sets[2] ? getSetName(sets[2]) : "";

    $("#setVaryInfo").html(`
        <p>|<span class="name${setOne[1]}">${setOne[0]}</span> &cup; <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " &cup; <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""}| = ${union.length}</p>

        <p><span class="name${setOne[1]}">${setOne[0]}</span> &cup; <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " &cup; <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""} = {${elemStringify(union)}}</p>
    `);

    currentFunc[0] = "unionClick";
    currentFunc[1] = sets;

    $("#mainVenn").removeClass("hide");
    $("#oneVennCircle").addClass("hide");

    if(!!parag)
    {
        hightLightAnswer(parag);
    }
    

    console.log(union);
}

function intersectionClick(sets, parag) {
    console.log(sets);
    let intersection = intersectionOper(reformat($('#' + sets[0])[0].M_Chips.chipsData), reformat($('#' + sets[1])[0].M_Chips.chipsData));

    // SEARCH MUNA HND PA ALAM
    if (sets.length > 2) {
        intersection = intersectionOper(intersection, reformat($('#' + sets[2])[0].M_Chips.chipsData));
    }

    intersection.sort(function (a, b) {
        return a - b
    });

    let setOne = getSetName(sets[0]);
    let setTwo = getSetName(sets[1]);
    let setThree = !!sets[2] ? getSetName(sets[2]) : "";

    $("#setVaryInfo").html(`
        <p>|<span class="name${setOne[1]}">${setOne[0]}</span> &cap; <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " &cap; <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""}| = ${intersection.length}</p>

        <p><span class="name${setOne[1]}">${setOne[0]}</span> &cap; <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " &cap; <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""} = {${elemStringify(intersection)}}</p>
    `);

    

    currentFunc[0] = "intersectionClick";
    currentFunc[1] = sets;

    $("#mainVenn").removeClass("hide");
    $("#oneVennCircle").addClass("hide");

    if(!!parag)
    {
        hightLightAnswer(parag);
    }

    console.log(intersection);
}

function differenceClick(sets, parag) {
    let differ = differenceOper(reformat($('#' + sets[0])[0].M_Chips.chipsData), reformat($('#' + sets[1])[0].M_Chips.chipsData));

    differ.sort(function (a, b) {
        return a - b
    });

    let setOne = getSetName(sets[0]);
    let setTwo = getSetName(sets[1]);

    $("#setVaryInfo").html(`
        <p>|<span class="name${setOne[1]}">${setOne[0]}</span> - <span class="name${setTwo[1]}">${setTwo[0]}</span>| = ${differ.length}</p>
        <p><span class="name${setOne[1]}">${setOne[0]}</span> - <span class="name${setTwo[1]}">${setTwo[0]}</span> = {${elemStringify(differ)}}</p>
    `);

    currentFunc[0] = "differenceClick";
    currentFunc[1] = sets;

    $("#mainVenn").removeClass("hide");
    $("#oneVennCircle").addClass("hide");

    if(!!parag)
    {
        hightLightAnswer(parag);
    }

    console.log(differ);
}

function symmetricClick(sets, parag) {
    let asym = symmetricOper(reformat($('#' + sets[0])[0].M_Chips.chipsData), reformat($('#' + sets[1])[0].M_Chips.chipsData));

    if (sets.length > 2) {
        asym = symmetricOper(asym, reformat($('#' + sets[2])[0].M_Chips.chipsData));
    }

    asym.sort(function (a, b) {
        return a - b
    });

    let setOne = getSetName(sets[0]);
    let setTwo = getSetName(sets[1]);
    let setThree = !!sets[2] ? getSetName(sets[2]) : "";

    $("#setVaryInfo").html(`
        <p>|<span class="name${setOne[1]}">${setOne[0]}</span> &oplus; <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " &oplus; <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""}| = ${asym.length}</p>

        <p><span class="name${setOne[1]}">${setOne[0]}</span> &oplus; <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " &oplus; <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""} = {${elemStringify(asym)}}</p>
    `);


    currentFunc[0] = "symmetricClick";
    currentFunc[1] = sets;

    $("#mainVenn").removeClass("hide");
    $("#oneVennCircle").addClass("hide");

    if(!!parag)
    {
        hightLightAnswer(parag);
    }

    console.log(asym);
}


function complementClick(set) {
    let complement = differenceOper(reformat($('#universalSet')[0].M_Chips.chipsData), reformat($('#' + set)[0].M_Chips.chipsData));

    complement.sort(function (a, b) {
        return a - b
    });

    currentFunc[0] = "complementClick";
    currentFunc[1] = set;

    let setName = getSetName(set);
    
    let strComp = elemStringify(complement);
    $("#letterOne").text(strComp);
    $("#letterOne").attr("data-tooltip", strComp);

    $("#mainVenn").addClass("hide");
    $("#oneVennCircle").removeClass("hide");
    $(".nameOneSet").html("<h3 class='name"+ setName[1] +"'>"+ setName[0] +"</h3>" +"<sup>c</sup>");

    $("#setVaryInfo").html(`
        <p>|<span class="name${setName[1]}">${setName[0]}</span> <sup>c</sup>| = ${complement.length}</p>
        <p><span class="name${setName[1]}">${setName[0]}</span> <sup>c</sup> = {${strComp}}</p>
    `);
}

function powerClick(set) {
    let powerset = powerSet(reformat($('#' + set)[0].M_Chips.chipsData));

    let setName = getSetName(set);
    
    currentFunc[0] = "powerClick";
    currentFunc[1] = set;

    let strPower = powerCartElemStringify(powerset, true);
    $("#letterOne").html(strPower);
    $("#letterOne").attr("data-tooltip", strPower);

    $("#mainVenn").addClass("hide");
    $("#oneVennCircle").removeClass("hide");
    $(".nameOneSet").html("P(<h3 class='name"+ setName[1] +"'>"+ setName[0] +"</h3>)");

    $("#setVaryInfo").html(`
        <p>|P(<span class="name${setName[1]}">${setName[0]}</span>)| = ${powerset.length}</p>
        <p>P(<span class="name${setName[1]}">${setName[0]}</span>) = {${strPower}}</p>
    `);
}


function cartesianClick(sets) {
    let cartesian = cartesianOper(reformat($('#' + sets[0])[0].M_Chips.chipsData), reformat($('#' + sets[1])[0].M_Chips.chipsData), !!sets[2] ? reformat($('#' + sets[2])[0].M_Chips.chipsData) : false);

    currentFunc[0] = "cartesianClick";
    currentFunc[1] = sets;

    let setOne = getSetName(sets[0]);
    let setTwo = getSetName(sets[1]);
    let setThree = !!sets[2] ? getSetName(sets[2]) : "";
 
    let strCart = powerCartElemStringify(cartesian, false);
    $("#letterOne").text(strCart);
    $("#letterOne").attr("data-tooltip", strCart);

    $("#mainVenn").addClass("hide");
    $("#oneVennCircle").removeClass("hide");
    $(".nameOneSet").html("<h3 class='name"+ setOne[1] +"'>"+ setOne[0] +"</h3>" + " <h3>×</h3> " + "<h3 class='name"+ setTwo[1] +"'>"+ setTwo[0] +"</h3>" + (!!setThree ? " <h3>×</h3> " + "<h3 class='name"+ setThree[1] +"'>"+ setThree[0] +"</h3>" : ""));

    $("#setVaryInfo").html(`
        <p>|<span class="name${setOne[1]}">${setOne[0]}</span> × <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " × <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""}| = ${cartesian.length}</p>

        <p><span class="name${setOne[1]}">${setOne[0]}</span> × <span class="name${setTwo[1]}">${setTwo[0]}</span>${!!sets[2] ? " × <span class='name"+ setThree[1] +"'>"+ setThree[0] +"</span>":""} = {${strCart}}</p>
    `);
    console.log(cartesian);
}






function processVenn() {
    if (!threeSet) {
        let left = differenceOper(reformat($('#firstSet')[0].M_Chips.chipsData), reformat($('#secondSet')[0].M_Chips.chipsData));
        let right = differenceOper(reformat($('#secondSet')[0].M_Chips.chipsData), reformat($('#firstSet')[0].M_Chips.chipsData));
        let middle = intersectionOper(reformat($('#firstSet')[0].M_Chips.chipsData), reformat($('#secondSet')[0].M_Chips.chipsData));
        
        $("#setInfo").html("<p>|<span class='nameU'>"+ $("#uSetName").val() +"</span>| = "+ $('#universalSet')[0].M_Chips.chipsData.length +"</p><p>|<span class='nameA'>"+ $("#fSetName").val() +"</span>| = "+ $('#firstSet')[0].M_Chips.chipsData.length +"</p><p>|<span class='nameB'>"+ $("#sSetName").val() +"</span>| = "+ $('#secondSet')[0].M_Chips.chipsData.length +"</p>");

        let strRight = elemStringify(right);
        let strLeft = elemStringify(left);
        let strMiddle = elemStringify(middle);

        $("#letterB").text(strRight);
        $("#letterA").text(strLeft);
        $("#letterAB").text(strMiddle);

        $("#letterA").attr("data-tooltip", strLeft);
        $("#letterB").attr("data-tooltip", strRight);
        $("#letterAB").attr("data-tooltip", strMiddle);
    } else {
        let A_inter_B = intersectionOper(reformat($('#firstSet')[0].M_Chips.chipsData), reformat($('#secondSet')[0].M_Chips.chipsData));

        let A_inter_C = intersectionOper(reformat($('#firstSet')[0].M_Chips.chipsData), reformat($('#thirdSet')[0].M_Chips.chipsData));

        let B_inter_C = intersectionOper(reformat($('#secondSet')[0].M_Chips.chipsData), reformat($('#thirdSet')[0].M_Chips.chipsData));

        $("#setInfo").html("<p>|<span class='nameU'>"+ $("#uSetName").val() +"</span>| = "+ $('#universalSet')[0].M_Chips.chipsData.length +"</p><p>|<span class='nameA'>"+ $("#fSetName").val() +"</span>| = "+ $('#firstSet')[0].M_Chips.chipsData.length +"</p><p>|<span class='nameB'>"+ $("#sSetName").val() +"</span>| = "+ $('#secondSet')[0].M_Chips.chipsData.length +"</p><p>|<span class='nameC'>"+ $("#tSetName").val() +"</span>| = "+ $('#thirdSet')[0].M_Chips.chipsData.length +"</p>");


        let AB_inter_AC = intersectionOper(A_inter_B, A_inter_C);
        let center = intersectionOper(AB_inter_AC, B_inter_C);

        let AB = differenceOper(A_inter_B, center);
        let AC = differenceOper(A_inter_C, center);
        let BC = differenceOper(B_inter_C, center);


        let ABACcenter = center.concat(AB, AC);
        let ABBCcenter = center.concat(AB, BC);
        let ACBCcenter = center.concat(AC, BC);

        let A = differenceOper(reformat($('#firstSet')[0].M_Chips.chipsData), ABACcenter);
        let B = differenceOper(reformat($('#secondSet')[0].M_Chips.chipsData), ABBCcenter);
        let C = differenceOper(reformat($('#thirdSet')[0].M_Chips.chipsData), ACBCcenter);

        let strA = elemStringify(A);
        let strB = elemStringify(B);
        let strC = elemStringify(C);
        let strAB = elemStringify(AB);
        let strAC = elemStringify(AC);
        let strBC = elemStringify(BC);
        let strCenter = elemStringify(center);

        $("#letterA").text(strA);
        $("#letterB").text(strB);
        $("#letterC").text(strC);
        $("#letterAB").text(strAB);
        $("#letterAC").text(strAC);
        $("#letterBC").text(strBC);
        $("#letterABC").text(strCenter);

        $("#letterA").attr("data-tooltip", strA);
        $("#letterB").attr("data-tooltip", strB);
        $("#letterC").attr("data-tooltip", strC);
        $("#letterAB").attr("data-tooltip", strAB);
        $("#letterAC").attr("data-tooltip", strAC);
        $("#letterBC").attr("data-tooltip", strBC);
        $("#letterABC").attr("data-tooltip", strCenter);
    }
}

function unionOper(firstSet, secondSet, union) {
    for (let sSet = 0; sSet < secondSet.length; sSet++) {
        let ok = true;

        for (let fSet = 0; fSet < firstSet.length; fSet++) {
            if (secondSet[sSet] === firstSet[fSet]) {
                ok = false;
            }
        }

        if (ok) {
            union.push(secondSet[sSet]);
        }
    }

    return union
}

function intersectionOper(firstSet, secondSet) {
    let intersection = [];

    for (let sSet = 0; sSet < secondSet.length; sSet++) {
        for (let fSet = 0; fSet < firstSet.length; fSet++) {
            if (secondSet[sSet] === firstSet[fSet]) {
                intersection.push(secondSet[sSet]);
            }
        }
    }
    return intersection
}

function differenceOper(firstSet, secondSet) {
    let difference = [];

    for (let fSet = 0; fSet < firstSet.length; fSet++) {
        let ok = true;

        for (let sSet = 0; sSet < secondSet.length; sSet++) {
            if (secondSet[sSet] === firstSet[fSet]) {
                ok = false
            }
        }

        if (ok) {
            difference.push(firstSet[fSet])
        }
    }
    return difference
}

function symmetricOper(firstSet, secondSet) {

    for (let felem = 0; felem < firstSet.length; felem++) {
        for (let selem = 0; selem < secondSet.length; selem++) {
            if (firstSet[felem] == secondSet[selem]) {
                firstSet.splice(felem, 1);
                secondSet.splice(selem, 1);
                felem -= 1;
                break;
            }
        }
    }

    let asym = firstSet.concat(secondSet);
    return asym
}

function powerSet(set) {
    let raws = Math.pow(2, set.length),
        truthTable = [],
        powerSet = [];

    console.log("RAW: " + raws);
    for (let element = 0; element < set.length; element++) {
        let division = raws / Math.pow(2, (element + 1)),
            val = true;
        console.log(division);
        for (let raw = 0; raw < raws; raw++) {
            if ((raw % division) == 0 && raw != 0) {
                val = !val;
            }

            if (element == 0) {
                truthTable[raw] = [];
            }

            truthTable[raw][element] = val;
        }
    }

    for (let raw = 0; raw < truthTable.length; raw++) {
        let subset = "",
            bracket1 = "{",
            bracket2 = "}";

        let meron = false;
        for (let val = 0; val < truthTable[raw].length; val++) {

            if (truthTable[raw][val]) {
                if (meron) {
                    subset += ", " + set[val];
                } else {
                    subset += set[val];
                }

                meron = true
            }
        }

        meron ? powerSet.push(bracket1 + subset + bracket2) : powerSet.push(subset);
    }



    powerSet.sort(function (ela, elb) {
        let arEla = ela.split(",");
        let arElb = elb.split(",");
        return arEla.length - arElb.length
    })

    return powerSet
}

function cartesianOper(firstSet, secondSet, thirdSet) {
    let cartesian = [];

    for (let fSet = 0; fSet < firstSet.length; fSet++) {
        for (let sSet = 0; sSet < secondSet.length; sSet++) {
            if (!!thirdSet) {
                for (let tSet = 0; tSet < thirdSet.length; tSet++) {
                    cartesian.push("(" + firstSet[fSet] + ", " + secondSet[sSet] + ", " + thirdSet[tSet] + ")");
                }
            } else {
                cartesian.push("(" + firstSet[fSet] + ", " + secondSet[sSet] + ")");
            }
        }
    }

    return cartesian
}



function getSetName(set)
{
    if (set == "firstSet") {
        return [$("#fSetName").val(), "A"];
    }
    else if(set == "secondSet") {
        return [$("#sSetName").val(), "B"];
    }
    else if(set == "thirdSet")
    {
        return [$("#tSetName").val(), "C"];
    }
    return [$("#uSetName").val(), "U"];
}

function hightLightAnswer(parag)
{
    $(".tooltipped").css("text-decoration", "none");

    for (let par = 0; par < parag.length; par++) {
        $("#" + parag[par]).css("text-decoration", "underline grey");
    }
}

function reformat(set) {
    let newSet = [];
    for (let el = 0; el < set.length; el++) {
        newSet.push(set[el].tag);
    }
    return newSet
}

function elemStringify(set) {
    let strSet = "";

    if ($("#bitResult")[0].checked) {
        let universalSet = reformat($('#universalSet')[0].M_Chips.chipsData);

        for (let elem = 0; elem < set.length; elem++) {

            let bit = "";
            for (let uElem = 0; uElem < universalSet.length; uElem++) {
                bit += universalSet[uElem] == set[elem] ? "1" : "0";
            }

            strSet += !!elem ? ", " + bit : bit;
        }

    } else {
        for (let elem = 0; elem < set.length; elem++) {
            strSet += !!elem ? ", " + set[elem] : set[elem];
        }
    }


    return strSet;
}

function powerCartElemStringify(multiSet, power)
{
    let strPower = power ? "&empty;" : "";
    let universalSet = reformat($('#universalSet')[0].M_Chips.chipsData);

    for (let subset = 0; subset < multiSet.length; subset++) {
        if(!!multiSet[subset])
        {
            if($("#bitResult")[0].checked)
            {
                let sets = multiSet[subset].substr(1);
                sets = sets.slice(0, -1);
                sets = sets.replace(/\s+/g, "");
                let arrSet = sets.split(",");

                let strSubset = power ? "{" : "(";
                for (let elem = 0; elem < arrSet.length; elem++) {

                    let bit = "";
                    for (let uElem = 0; uElem < universalSet.length; uElem++) {
                        bit += universalSet[uElem] == arrSet[elem] ? "1" : "0";
                    }

                    strSubset += !!elem ? ", " + bit : bit;
                }

                strSubset += power ? "}" : ")";

                strPower += !!subset || power ? ", " + strSubset : strSubset;
            }
            else
            {
                strPower += !!subset || power ? ", " + multiSet[subset] : multiSet[subset];
            }
        }
    }

    return strPower;
}