function Temperature(slots) {
    if (slots) {
        this.type = slots.type;
        this.name = slots.Nom;
        this.value = slots.Valeur;
    }
}

let temp = new Temperature(fetchTemperature())
