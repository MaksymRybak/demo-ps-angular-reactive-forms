link al corso ...
https://blogs.msmvps.com/deborahk/angular-2-reactive-forms-problem-solver/
https://app.pluralsight.com/library/courses/angular-2-getting-started/table-of-contents
https://github.com/DeborahK/Angular-ReactiveForms

Introduzione
	esiste template driven approach e quello reactive
	viene definito il modello della form con i vincoli di validazione
	abbiamo form building blocks e form builder che semplifica ulteriormente la costruzione di form
Template driven vs reactive forms
	x capire se reactive forms e' ok x il nostro progetto e' importante capire le opzioni delle forme
	x costruire le forme usiamo form blocks
		x gestire i valori inseriti si usa il concetto dello stato
		lo stato definisce se il valore di un controllo e' stato cambiato (dirty) o e' rimasto invariato (pristine)
		l'insieme degli stati dei controlli di una form definiscono lo stato della form stessa
			valid state - se tutte le regole di validazione sono state soddisfate
			errors - errori di validazione
		in piu' abbiamo lo stato visited
			touched - 
			untouched - 
		x tracciare lo stato usiamo i building blocks e form model
			usato sia per l'approccio template driven che quello reactive
			FormControl - traccia lo stato di un controllo
			FormGroup - traccia lo stato di un insieme di controlli
		Form model
			e' una struttura di dati che contiene 
				- lo stato di controlli
				- i valori di controlli
			il modello della form viene usato ogni volta che vogliamo accedere ai valori inseriti nella forma
			dal metodo template a quello reactive cambia solo il modo con quale viene creata la forma (la struttura e' identica in entrambi i casi)
				template approach
					creiamo form element -> input element -> data binding -> le regole di validazione -> messaggi degli errori, in background
					angular crea automaticamente la Form model 
				reactive forms
					noi creiamo la Form model
					le regole di validazione
					messaggi di validazione
					NOTA: il binding avviene con le proprieta' presenti nel modello della form e NON proprieta' del componente come abbiamo nell'approccio al template
	direttive
		x template driven
			ngForm (non viene usata direttamente dal nostro codice, viene assegnata automaticamente da angular ad un controllo <form>)
			ngModel (x two way data binding)
			ngModelGroup
			x accedere al model della form dal codice, esportiamo il riferimento a ngForm usando l'attributo #nome (es. #signupForm="ngForm")
				#nome definisce una variabiledi riferimento
				possiamo usare il nome come riferimento al modello della form (es. [disabled="!signupForm.valid)
				attributo name viene usato x referenziare il controllo (Form Control)
				esportiamo lo stato di un controllo usando la direttiva #name (es. #firstNameVar="ngModel"), #name e' la variabile di riferimento dello stato del
				controllo
		x reactive approach 
			dobbiamo importare ReactiveFormsModule
			ci da accesso alle direttive come
				formGroup
				formControl
				formControlName
				formGroupName
				formArrayName
			qui siamo noi che creiamo il modella della form nella classe del componente
		NOTA: tra un approccio e altro abbiamo direttive diverse
	sintassi nel caso di template forms:
		vedi cmq le slide
		attributo name di un controllo serve x associare correttamente il controllo al gruppo di controlli, all'interno di form model
	sintassi nel caso di reactive forms:
		attributo [formGroup]="signupForm" come esempio, signupForm e' la il nostro modello della form creato a livello della classe del componente
		ogni controllo ha l'attributo formControlName x fare il binding tra il controllo e il modello 
	cmq l'approccio reactive consente modificare dinamicamente le form in modo piu' agevole (es. aggiungendo nuovi elementi nella form)
Costruzione delle form reactive
	questo approccio comporta alla scrittura piu' codice del componente che HTML
	NOTA: x le forme semplici va benissimo anche l'approccio template driven!
	creazione della Form Model
		abbiamo bisogno di almeno uno FormGroup (modella la nostra form)
		un FormControl x ogni controllo di input (NOTA: possiamo avere anche dei controlli di cui non dobbiamo tracciare niente sulla nostra form)
		sono permessi FormGroup e FormControl innestati
		possiamo avere anche FormArrays x raggruppare FormGroup e FormControl
		la creazione del FormGroup principale puo' avvenire nel metodo ngOnInit(), cosi siamo sicuri che il componente e template sono stati gia' caricati (creati)
	NOTA: abbiamo DataModel - il modello dei dati che usiamo nel nostro componente (ed e' quello che viene scambiato tra il componente e il BE,
		e FormModel - il modello che rappresenta la nostra form, dati scambiati tra il componente e la form HTML)
	Per poter usare le direttive reactive dobbiamo importare il modulo ReactiveFormsModule
		le direttive reactive servono x fare il binding tra il template e il form model
		x passare dal metodo template driven a quello reactive, eliminiamo le direttive name, #nameVar, e [(prop)], e aggiungiamo la direttiva formControlName 
			x ogni campo di input, e formGroupName per il controllo <form>
			NOTA: questo passaggio toglie il two-way data binding, dobbiamo usare setValue() e patchValue(), metodi della classe FormGroup
			setValue() - x settare tutti i valori della form, patchValue() - x settare solo una parte di valori della nostra form
		x organizzare meglio il codice del nostro componente, possiamo usare la classe FormBuilder
	FormBuilder
		permette di creare FormModel partendo da una configurazione, puo' essere vista come la factory usata x creare FormGroups e FormControls
		FormBuilder viene fornito in forma di un servizio
		iniettabile usando il costruttore del componente
		per i controlli impostiamo il valore di default e volendo anche il flag se il controllo e' abilitato o no
		x sfruttare tutti i vantaggi delle form reative la validazione deve essere spostata da HTML al codice del componente
Validazione
	se parliamo del template driven, usiamo attributi appropriati nel template HTML
	se parliamo di reactive forms, abbiamo tutta la logica di validazione a livello della classe del componente, che ci da' piu' flessibilita' ad implementare le 
		logiche anche complesse
	continuiamo ad usare FormBuilder x configurare le regole di validazione dei singoli campi
		viene usata la sintassi array, [], x definire le specifiche di un campo della form
		angular ci fornisce gia' una classe Validators, che prevede le regole basi di validazione
		x specificare piu' validatori, nel secondo parametro dell'array passiamo un array delle regole di validazione
			il terzo parametro di tale array accetta un validatore assincrono, che viene usato di solito x fare una richiesta di validazione al servizio di BE
			il validatore assincrono non viene eseguito finche' non passano tutti i validatori precedenti
	cambiare le regole di validazione a runtime
		per aggiungere una regola di validazione viene usato il metodo setValidators() del controllo di interesse
		per eliminare tutti validatori chiamiamo il metodo clearValidators()
		x rieseguire i validatori di un controllo chiamiamo il metodo updateValueAndValidity()
		da capire bene il posto appropriato dove mettere la logica di aggiornamento di validatori di un componente (per esempio il metodo che scatta on click)
	validatori custom
		viene definita una funzione che accetta come parametro il riferimento al controllo/i da validare e ritorna un oggetto che definisce le regole non soffisfatte
			o null se tutto ok
		se il validatore viene usato solo dal componente, ha senso di definire la funzione sopra la classe del componente
			altrimenti e' meglio creare un file dedicato ai validatori condivisi a livello dell'app / modulo
	validatore custom con parametri
		dobbiamo introdurre una funzione factory che ritorna il tipo ValidatorFn, e quindi il return della funzione e' la funzione di validazione che al suo
		interno usa i parametri passati nella funzione factory (o wrapper..)
	validazione cross field
		a livello della classe di componente definiamo FormGroup innestati, usando sempre FormBuilder
		all'interno di template HTML associamo i nomi alle direttive formGroupName e formControlName
			abbiamo anche una semplificazione x recuperare il risultato di validazione dei singoli controlli all'interno di una formGroup innestata
			vedi la demo
	validazione cross field - validatori custom
		l'approccio e' simile a quello visto prima, definiamo la funzione di validazione rispettando la firma convenzionata
		se dobbiamo passare dei parametri in piu' a tale funzione di validazione, definiamo la funzione factory/wrapper, vista prima
		il validatore da associare alla FormGroup innestata viene specificato usando la notation di un oggetto con la property validator di tipo riferimento 
			alla fn di validazione
		NOTA: in questo caso la fn di validazione e' specificata a livello dell'intera FormGroup e non x un singolo controllo
		a livello di template HTML usiamo il nome della FormGroup x recuperare l'esito di validazione 
			ricordiamo sempre che il validatore e' a livello dell'intera FormGroup!
Riagire alle modifiche di una form
	come osservare le modifiche
		possiamo mettersi in ascolto su qualsiasi modifica di una FormGroup o FormControl
		viene sfruttata la property valueChanges e statusChanges (x ascoltare i cambiamenti dei risultati di validazione)
		sono property di tipo Observable, quindi possiamo fare subscribe
		le due property sono esposte a livelli di FormGroup, FormControl e Form stessa
	come reagire alle modifiche
		non serve piu' gestire evento (click) a livello di template, e' sufficiente mettersi in ascolto sulle modifiche dei valori come e' stato riportato prima
		possiamo gestire i messaggi di errori a livello di componente, senza usare le direttive html
	x ritardare la validazione dei dati inseriti possiamo usare 'reactive transformation'
		e' utile se non vogliamo mostrare subito i msg degli errori ma aspettare al meno che cambi il focus (mouse va su un controllo diverso)
	trasformazioni reactive
		consente 'pilotare' la gestione degli eventi
		ci sono vari operatori che possiamo usare,
			- debounceTime, ignora gli eventi finche non passa un determinato tempo senza nessun evento
				es. debounceTime(1000), aspetta 1sec prima di sollevare un'altro evento
				in questo modo non mostriamo nessuno messaggio di validazione finche' l'utente non ha finito di inserire i valori
			- throttleTime, imette il valore, dopo ignora altri valori x un determinato periodo di tempo
			- distinctUntilChange, sopprime i valori dupplicati inseriti in sequenza
Dupplicazione dinamica degli elementi di input
	step da seguire x eseguire una duplicazione: 
		1. prima dobbiamo definire l'elemento o insieme di elementi che vogliamo duplicare
		2. se e' un solo elemento, duplichiamo il relativo FormControl
		3. se abbiamo piu' elementi da diplicare, le mettiamo in una FormGroup innestata, e duplichiamo intera FormGroup
		4. facciamo refactoring di FormBuilder in modo da avere i metodi dedicati x eseguire la duplicazione (metodi a livello della classe del componente)
		5. creiamo FormArray x salvare le coppie di elementi creati (vedi sotto x dettagli)
		6. eseguiamo la duplicazione
	definizione una small group da duplicare
		intanto i benifici di creare una FormaGroup sono
			- facilita il binding tra la UI e il modello di dati
			- facilita il check di verifica se un insieme di controlli sono stati modificati (stato dirty)
			- rimanere in ascolto sulle modifiche e reagire di conseguenza
			- eseguire delle validazioni cross field
			- dinamicamente duplicare il gruppo di controlli
		una volta definita la formGroup a livello di codice typescript, impostiamo attributo formGroupName nel template, con il nome usato nel modello di componente
	il passo successivo e' fare refactoring in modo da avere un metodo dedicato alla creazione di una nuova porzione della formGroup
	creiamo FormArray, e' insieme di FormGroup e FormControl
		elementi all'interno di FormArray sono acceduti usando l'indice
		FormArray e' ok x un set di controlli dinamico, che cambia
		modi x creare
			new FormArray([])
			this.fb.array([]), usanod f
			orm builder
	vedi demo x la creaionz ei FormArray
Reactive forms in un contesto di una app reale
	vedi il codice nel repo github di Deborah (progetto ACME)
	architettura dell'app
		vedi slide, index.html + un componente x pagina/funzionalita'
		product service x recuperare i dati dal BE
		AppModule, ProductModule, SharedModule, un modulo per ogni macro funzionalita'
	vedi il corso "Angular getting started" per l'app sviluppata
		il corso di reactive forms fa riferimento pricipalmente alla form di modifica di un prodotto
			form module viene definito nel metodo ngOnInit del componente
	remind configurazione di un routing consiste in 
		- configurare rotte
		- attivare le rotte 
		- decidere dove renderizzare il contenuto relativo alla rotta richiesta
		per ogni rotta possiamo configurare le guardie di protezione (canActivate) e quelle di modifica ai dati con chiusura senza salvataggio (canDeactivate)
		possiamo rimanere in ascolto sul cambiamento delle rotte
			NOTA: ricordiamo di fare unsubscribe nel metodo  ngOnDestroy
	x la validazione possiamo definire funzioni che ritornano il tipo ValidatorFn 
		e' meglio sempre mettere le funzoini di validazoine in una classe shared 
		una fn di validazione puo' essere static all'interna della propria classe (se prevista)
CRUD usando HTTP
	viene creato il servizio dedicato alle chiamate verso le API di BE
		+ separazione dei compiti (servizio dedicato alle chiamate HTTP)
		+ riutilizzo del servizio in vari componenti
	il servizio applicativo usa Http Service di Angular x fare le chiamate al BE
		e' necessario importare HttpClientModule 
	un servizio viene definito in una classe
		decoratore @Injectable serve x registrare il servizio 
	x sviluppare i servizi angular serve al meno un server di BE finto
		qui si puo' usare la tecnologia che ci e' piu' famigliare (es. nodejs, asp.net web api, php etc.)
		possiamo usare anche i file JSON accessibili dal browser (ok x GET)
		invece e' consigliato usare angular-in-memory-web-api
			e' una dipendenza da aggiungere nel nostro package.json, sezione devDep*
			dopo possiamo aggiungere il InMemoryWebApiModule nel nostro modulo (dove ci serve il mock), va messo in imports array
			quando importiamo InMemoryWebApiModule dobbiamo specificare anche la classe che rappresenta i nostri dati mocked
				tale classe implementa InMemoryDbService
				implementiamo il metodo createDb()
				ogni oggetto moccato deve avere un campo id (x eseguire correttamente tutte le operazioni di manipolazione, tutto avviene in memoria!)
				tutte le nostre chiamate veranno gestite da questa classe 
			quando abbiamo il servizio di BE possiamo rimuovere l'import di InMemoryWebApiModule con relativa classe 
	popolare una form con dei dati
		il componente che mostra i dati inietta anche il servizio usato per recuperarli dal BE
		fa subscribe al metodo del servizio e processa i dati ricevuti usando operatori di RxJS
		NOTA: il servizio che fa GET controlla se e' stato passato ID della risorsa da richiedere al BE, se no, ritorna una risorsa vuota
		NOTA: il servizio usa pipe con operatori tap (x stampare la risposta, giusto x debug) e catchError (x gestire l'errore)
		lato componente facciamo subscribe al metodo del servizio
			subscribe usa operatori next (x processare la risposta del servizio) e error (x gestire errore)
			gestore della risposta esegue il reset() della form x resettare tutti i flag di tutti controlli (es. dirty)
			sulla form viene applicato il metodo patchValue({}) x settare i dati ricevuti dal servizio
	salvataggio dei dati modificati
		NOTA: usato operatore spread di JS possiamo facilmente copiare i valori da un oggetto (es. la form) in un'altro
			es: const p = { ...this.product, ...this.productForm.value}
		x aggiornare i dati usiamo una chiamata POST (x creare una risorsa) o PUT (x aggiornare una risorsa)
		lato componente possiamo fare un check se la form e' dirty, se si, e utente fa submit, possiamo chiamare il servizio di aggiornamento
			idem x il check di valid, eseguiamo la chiamata al srv solo se la form e' valida
		dopo la conferma dal servizio di avvenuto aggiornamento, possiamo resettare la form
	creazione di una nuova risorsa
		NOTA: e' meglio prevedere una inizializzare di un oggetto (risorsa) vuoto a FE
		e' meglio cmq mettere l'inizializzazione di una risorsa vuota a livello di servizio
	eliminazione di una risorsa
		viene usata la richiesta HTTP DELETE
		il servizio di eliminazone ritorna Observable<{}>, oggetto vuoto, DELETE non ritorna niente
END

		
		
		
			
		
	
		
		