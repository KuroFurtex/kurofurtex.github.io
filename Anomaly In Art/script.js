var rep = false;
var artwork = {
    image: ["fika",
        "rai",
        "red",
        "strawberry-cat",
        "sunflow",
        "sunflow-cat"],
    name: ["Fika",
        "Rai",
        "Red Flories",
        "Strawberry cat",
        "Sunflow",
        "Catflow"],
    anomaly: [0,
        0,
        0,
        0,
        0,
        0
    ],
    anoma: ["normal",
        "normal",
        "normal",
        "normal",
        "normal",
        "normal"
    ]};
var aType = ["normal", "color", "duplicate", "displacement", "demetia"]
var choosen = 0;
var execute = 0;
var aCount = 0;
var repoArt = 0;
var rA = [1, 2, 3, 4, 5, 6];
var repoType = 0;
var reportCount = 0;
var sound = new Howl({
    src: ['audio/sfx.mp3'],
    sprite: {
        removed: [0, 3000],
        notFound: [4800, 3000],
        change: [9600, 1000],
        hide: [12000, 1000],
        show: [14400, 200]
    }
});
var forget = new Howl({
    src: ['audio/demetia.mp3'],
    loop: true,
    volume: 0.1
});
var forgetPlaying = false;
var forgetMaxVolume = 1;
var spawnTime = 15;
var isStart = false;
var artLocate = "R3DZ3R";
var diffBalance = 0;
var displayAF = true;
//modifier -----------------------------------------
var instantRep = false;
var anomalyFind = false;
var kuroCo = false;

document.addEventListener("keydown", event => {
    if (isStart) {
        if (event.key == "D" || event.key == "d") {
            next();
        } else if (event.key == "A" || event.key == "a") {
            previous();
        }
    }
});

function switchMod(mod) {
    if (mod == "instantReport") {
        instantRep = !instantRep;
        document.getElementById("description").innerHTML = "Instantly report Anomaly without waiting (But theres cooldown)";
        if (instantRep) {
            document.getElementById("send2").style.display = "block";
            document.getElementById("m1").style.backgroundColor = "#404040";
        } else {
            document.getElementById("send2").style.display = "none";
            document.getElementById("m1").style.backgroundColor = "black";
        }
    }
    if (mod == "anomalyFinder") {
        anomalyFind = !anomalyFind;
        document.getElementById("description").innerHTML = "Specify what anomaly on the art you're monitoring";
        if (anomalyFind) {
            document.getElementById("m2").style.backgroundColor = "#404040";
            document.getElementById("anomalyFi").style.display = "block";
        } else {
            document.getElementById("m2").style.backgroundColor = "black";
            document.getElementById("anomalyFi").style.display = "none";
        }
    }
    if (mod == "kuroCode") {
        kuroCo = !kuroCo;
        document.getElementById("description").innerHTML = "Turn game font into a strange symbols";
        if (kuroCo) {
            document.getElementById("m3").style.backgroundColor = "#404040";
            document.body.style.fontFamily = "KuroCode";
        } else {
            document.getElementById("m3").style.backgroundColor = "black";
            document.body.style.fontFamily = "Century Gothic";
        }
    }
}

function hasDemetiaAnomaly() {
    for (var cfde = 0; cfde < artwork.anomaly.length; cfde++) {
        if (artwork.anomaly[cfde] === 4) {
            return true;
        }
    }
    return false;
}

function updateVolume(value) {
    forget.volume(value)
    forgetMaxVolume = 1;
    console.log("Volume: " + value);
}

function updateDiff(value) {
    spawnTime = value;
    document.getElementById("diffValue").innerHTML = value + " Seconds";
    console.log("Diff: " + value);
}


function startGame(artist) {
    for (var lart = 0; lart < artwork.image.length; lart++) {
        if (artist == 'r3dz3r') {
            artwork.image[lart] = r3dz3r.image[lart];
            artwork.name[lart] = r3dz3r.name[lart];
            artLocate = r3dz3r.artistName;
            var moni = r3dz3r.monitor;
        }
        if (artist == 'changed') {
            artwork.image[lart] = changed.image[lart];
            artwork.name[lart] = changed.name[lart];
            artLocate = changed.artistName;
            var moni = changed.monitor;
        }
        var lart2 = "a" + (lart + 1);
        var artNameType = document.getElementById(lart2);
        artNameType.innerText = artwork.name[lart];
    }
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
    }
    var event = setInterval(roulette, 10);
    document.getElementById("monitoring").innerHTML = "Currently Monitoring : " + moni;
    document.getElementById("mainMenu").style.height = "0vh";
    document.getElementById("mainMenu").style.padding = "0";
    isStart = true;
    sound.play('notFound');
    update();
}

function displayRep() {
    rep = !rep;
    if (rep) {
        document.getElementById("report").style.height = "45%";
        document.getElementById("report").style.padding = "5px";
        sound.play('show');
    } else {
        document.getElementById("report").style.height = "0px";
        document.getElementById("report").style.padding = "0px";
        sound.play('hide');
    }
}

function previous() {
    choosen--;
    if (choosen < 0) {
        choosen = 5;
    }
    update();
    sound.play('change');
}

function next() {
    choosen++;
    if (choosen > 5) {
        choosen = 0;
    }
    update();
    sound.play('change');
}

function roulette() {
    execute = execute + 0.01;
    if (execute > (spawnTime - 1)) {
        runEvent();
        execute = 0;
    }
    if (execute == Math.floor((spawnTime / 2) - 1)) {
        displayAF = !displayAF;
        update();
        console.log("test");
    }
}

function runEvent() {
    var summon = Math.floor(Math.random(0, 1) * 6);
    var sType = Math.floor(Math.random(0, 1) * 4 + 1);
    if (artwork.anomaly[summon] == 0) {
        artwork.anomaly[summon] = sType;
        if (sType == 4) {
            artwork.anoma[summon] = aType[4];
        } else {
            artwork.anoma[summon] = aType[sType] + "-" + Math.floor(Math.random(0, 1) * 2 + 1);
        }
        aCount++;
        console.log(artwork.name[summon] + "=" + artwork.anoma[summon] + " - Current Anomaly : " + aCount)
    } else {
        console.log("[FAILED] - " + artwork.name[summon] + "=" + artwork.anoma[summon] + " - Current Anomaly : " + aCount)
    }
    update();
}

function update() {
    var source = "Image/" + artLocate + "/" + artwork.image[choosen] + "/" + artwork.anoma[choosen] + ".png";
    document.getElementById("image").style.backgroundImage = "url(" + source + ")";
    document.getElementById("artName").innerHTML = artwork.name[choosen];
    if (!displayAF) {
        document.getElementById("anomalyFi").innerHTML = "[DISABLED]";
    } else {
        if (artwork.anoma[choosen] == "normal") {
            document.getElementById("anomalyFi").innerHTML = "No anomaly";
        } else {
            document.getElementById("anomalyFi").innerHTML = artwork.anoma[choosen];
        }
    }
    var hasDemetia = hasDemetiaAnomaly();

    // Play or stop the "forget" audio based on the presence of the "demetia" anomaly
    if (hasDemetia && !forgetPlaying) {
        forget.play();
        forgetPlaying = true;
    } else if (!hasDemetia && forgetPlaying) {
        forget.stop();
        forgetPlaying = false;
    }
    if (artwork.anomaly[choosen] == 4) {
        forget.volume(forgetMaxVolume);
    } else {
        forget.volume(0.1);
    }
    if (aCount > 2) {
        document.getElementById("warning").style.opacity = 1;
    } else {
        document.getElementById("warning").style.opacity = 0;
    }
    if (artwork.anomaly[choosen] > 0) {
        document.getElementById("alert").style.opacity = 1;
    } else {
        document.getElementById("alert").style.opacity = 0;
    }
    if (aCount > 4) {
        document.getElementById("lose").style.height = "100vh";
        document.getElementById("lose").style.padding = "40vh 0 40vh 0";
        document.getElementById("endResu").innerHTML = "You reported " + reportCount + " anomalies"
        clearInterval(event);
        isStart = false;
    }
}

function setRepoArt(reArt) {
    for (var i2 = 0; i2 < 6; i2++) {
        var aID2 = "a" + (i2 + 1);
        var element = document.getElementById(aID2);
        if (element) {
            element.style.backgroundColor = "#00000000";
        }
    }

    var aCH = "a" + reArt;
    var selectedElement = document.getElementById(aCH);
    if (selectedElement) {
        selectedElement.style.backgroundColor = "#FFFFFF20";
    }
    repoArt = reArt;
}

function setRepoType(reType) {
    for (var u2 = 0; u2 < 4; u2++) {
        var lID2 = "l" + (u2 + 1);
        var element = document.getElementById(lID2);
        if (element) {
            element.style.backgroundColor = "#00000000";
        }
    }

    var lCH = "l" + reType;
    var selectedElement = document.getElementById(lCH);
    if (selectedElement) {
        selectedElement.style.backgroundColor = "#FFFFFF20";
    }
    repoType = reType;
}

function report() {
    var reportButton = document.getElementById("send");
    reportButton.innerText = "Reporting...";
    reportButton.disabled = true;

    setTimeout(function() {
        document.getElementById("result").style.height = "100vh";
        document.getElementById("result").style.padding = "40vh 0 40vh 0";
        if (repoType == artwork.anomaly[repoArt - 1]) {
            document.getElementById("resu").innerHTML = "REMOVED"
            artwork.anomaly[repoArt - 1] = 0;
            artwork.anoma[repoArt - 1] = aType[0];
            sound.play('removed');
            aCount--;
            reportCount++;
        } else {
            document.getElementById("resu").innerHTML = "NOT FOUND"
            sound.play('notFound')
        }
        reportButton.innerText = "Report!";
        reportButton.disabled = false;
        diffBalance++;
        if (diffBalance > 10) {
            clearInterval(event);
            spawnTime = spawnTime - 0.01;
            console.log(spawnTime);
            var event = setInterval(roulette, 10);
            diffBalance = 0;
        }
        update();
    },
        5000);

    setTimeout(function() {
        document.getElementById("result").style.height = "0vh";
        document.getElementById("result").style.padding = "0";
    },
        7500);
}

function instantReport() {
    var reportButton2 = document.getElementById("send2");
    document.getElementById("result").style.height = "100vh";
    document.getElementById("result").style.padding = "40vh 0 40vh 0";
    if (repoType == artwork.anomaly[repoArt - 1]) {
        document.getElementById("resu").innerHTML = "REMOVED"
        artwork.anomaly[repoArt - 1] = 0;
        artwork.anoma[repoArt - 1] = aType[0];
        sound.play('removed');
        aCount--;
        reportCount++;
        diffBalance++;
    } else {
        document.getElementById("resu").innerHTML = "NOT FOUND"
        sound.play('notFound')
    }
    if (diffBalance > 10) {
        clearInterval(event);
        spawnTime = spawnTime - 0.01;
        console.log(spawnTime);
        var event = setInterval(roulette, 10);
        diffBalance = 0;
    }
    update();

    setTimeout(function() {
        document.getElementById("result").style.height = "0vh";
        document.getElementById("result").style.padding = "0";
        reportButton2.innerText = "Reloading...";
        reportButton2.disabled = true;
    },
        1500);

    setTimeout(function() {
        reportButton2.innerText = "Instant Report!";
        reportButton2.disabled = false;
    }, 15000)
}

document.getElementById("report").style.height = "0px";
document.getElementById("report").style.padding = "0px";