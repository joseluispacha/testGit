function PersonaController() {

}

var personaController = null;
function getPersonaController() {
	if(personaController == null) {
		personaController = new PersonaController();
	}
	return personaController;
}