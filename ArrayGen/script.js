var formula = ""

function update() {
    const formula = document.getElementById("form").value;
    const variableNames = extractVariables(formula);

    // Display variable inputs in the "inside" div
    const insideDiv = document.getElementById("inside");
    console.log(insideDiv)
    insideDiv.innerHTML = ""; // Clear previous inputs

    variableNames.forEach(variable => {
        const inputField = document.createElement("p");
        inputField.innerText = variable;
        insideDiv.appendChild(inputField);
    });
}

function extractVariables(formula) {
    const regex = /<([^>]+)>/g;
    const matches = formula.match(regex);

    if (!matches) {
        return []; // No placeholders found
    }

    // Extract variable names (remove angle brackets)
    const variableNames = matches.map(match => match.slice(1, -1));

    // Combine duplicate variable names into one
    const uniqueVariableNames = Array.from(new Set(variableNames));

    return uniqueVariableNames;
}
