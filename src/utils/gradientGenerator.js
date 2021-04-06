export default function(length) {
    const gradientList = ["from-primary to-epic", "from-primary to-green", "from-primary to-legendary", "from-epic to-legendary", "from-epic to-primary", "from-green to-primary", "from-legendary to-primary", "from-legendary to-epic"];
    const returnList = [];

    for(let i = 0; i <= length - 1; i++) {
        const randomGradient = gradientList.splice(Math.floor(Math.random() * gradientList.length), 1);
        returnList.push(randomGradient[0]);
    }

    return returnList;
}