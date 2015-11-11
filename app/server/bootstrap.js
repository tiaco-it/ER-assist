/**
 * This file builds the initial databases, if the collections are empty on server starup
 * The UPDATE variable is set to clear all collections and insert the initial data.
 */

var UPDATE = true; // set true to delete all records and insert all initial data


Meteor.startup(function () {

if (UPDATE == true) {
    // Remove existing collection
    Startcases.remove({});
    Laws.remove({});
    Filters.remove({});
    Links.remove({});
    Urls.remove({});
    Info.remove({});
    Numbers.remove({});
    Meteor.users.remove({});
}

if ( Meteor.users.find().count() === 0 || UPDATE == true) {
    Accounts.createUser({
        username: 'tiaco',
        email: '',
        password: 'tiaco',
    });
}

//STARTCASES
if (Startcases.find().count() === 0 || UPDATE == true) {
    var startcases = [
        {
            text: "Pasienten er suicidal"
        },
        {
            text: "Pasienten er voldelig"
        },
        {
            text: "Pasienten nekter behandling"
        },
        {
            text: "Pasienten skader seg selv"
        }
    ];
    _.each(startcases, function(list) {
        Startcases.insert({text: list.text})
    });
}

//LAWS
if (Laws.find().count() === 0 || UPDATE == true) {
    var laws = [
        {
            cat: "Pasienten er suicidal",
            law: "Straffeloven",
            paragraph: "§17. Nødrett",
            text: "En handling som ellers ville være straffbar, er lovlig når \ " +
            "a) den blir foretatt for å redde liv, helse, eiendom eller en annen interesse fra en fare for skade som ikke kan avverges på annen rimelig måte, og \ " +
            "b) denne skaderisikoen er langt større enn skaderisikoen ved handlingen.",
            summary: "Tiltak dokumenteres i den ordinære pasientjournalen. Henvisning til psykiatrisk vurdering anbefales.",
            example: "Helsepersonell kan holde fast en pasient som forsøker å hoppe ut av et vindu. \ " +
            " \ " +
            "Selvmordsatferd omfatter tanker om, planer for, trusler om og forsøk på å gjennomføre selvmord. Slik atferd kan være uttrykk for et virkelig ønske om å dø, \ " +
            "men er også ofte blandet med et ønske om å få hjelp eller ønske om endring i en uutholdelig livssituasjon. I enkelte tilfeller motiveres selvmordsatferd av et ubevisst \ " +
            "eller bevisst ønske om å kontrollere personer i omgivelsene. Noen mennesker lever med tilnærmet konstante selvmordstanker og -planer (kronisk suicidale). \ " +
            "Disse må ofte håndteres annerledes enn mennesker med akutt nyoppstått suicidalitet. \ " +
            "(ref. legevakthåndboken)",
            oneline: "Nødrett gir rett til å hindre med makt at pasienten tar livet sitt."
        },
        {
            cat: "Pasienten er voldelig",
            law: "Straffeloven",
            paragraph: "§18. Nødverge",
            text: "En handling som ellers ville være straffbar, er lovlig når den \ " +
            "a) blir foretatt for å avverge et ulovlig angrep, \ " +
            "b) ikke går lenger enn nødvendig, og \ " +
            "c) ikke går åpenbart ut over hva som er forsvarlig under hensyn til hvor farlig angrepet er, hva slags interesse som angrepet krenker, og angriperens skyld \ " +
            "Regelen i første ledd gjelder tilsvarende for den som iverksetter en lovlig pågripelse eller søker å hindre at noen unndrar seg varetektsfengsling eller gjennomføring av frihetsstraff. \ " +
            "Utøving av offentlig myndighet kan bare møtes med nødverge når myndighetsutøvingen er ulovlig, og den som gjennomfører den, opptrer forsettlig eller grovt uaktsomt.",
            summary:    "Hendelsen og tiltak dokumenteres i pasientens ordinære journal. \ " +
                        "Politianmeldelse bør vurderes. Skjema for politianmeldelse må fylles ut. \ " + 
                        "Kun sykehusdirektøren har lov til å anmelde saken på vegen av sykehuset.",

            example: "Pasienten utøver vold mot ansatte eller pasienter som er tilstede i mottak/kontor. Helsepersonell har lov til å holde fast/låse inn en voldelig pasient til politi/vakt ankommer.",
            oneline: "Gir mulighet til å holde fast/låse inn en utagerende pasient inntil politi/vakt ankommer."
        },
        {
            cat: "Pasienten skader seg selv",
            law: "Helsepersonelloven",
            paragraph: "§7. Øyeblikkelig hjelp",
            text: "Helsepersonell skal straks gi den helsehjelp de evner når det må antas at hjelpen er påtrengende nødvendig. Med de begrensninger som følger av pasient- og brukerrettighetsloven \ " +
            "§ 4-9, skal nødvendig helsehjelp gis selv om pasienten ikke er i stand til å samtykke, og selv om pasienten motsetter seg helsehjelpen. \ " +
            "Ved tvil om helsehjelpen er påtrengende nødvendig, skal helsepersonell foreta nødvendige undersøkelser. \ " +
            "Plikten gjelder ikke i den grad annet kvalifisert helsepersonell påtar seg ansvaret for å gi helsehjelpen.",
            summary:    "Dokumentasjon av nødvendig tiltak mot pasientens vilje i den ordinære journal.`\ " + 
                        "Henvisning til psykiatrisk vurdering anbefales.",
            example: "Helsepersonell kan utføre akutt livreddende behandling mot pasientens vilje om pasientens liv står i øyeblikkelig fare.",
            oneline: "Helsepersonell skal straks gi den helsehjelp de evner når det må antas at hjelpen er påtrengende nødvendig."
        },
        {
            cat: "Pasienten skader seg selv",
            law: "Pasient- og brukerrettighetsloven",
            paragraph: "§4-1. Hovedregel om samtykke",
            text: "Helsehjelp kan bare gis med pasientens samtykke, med mindre det foreligger lovhjemmel eller annet gyldig rettsgrunnlag for å gi helsehjelp uten samtykke. \ " +
            "For at samtykket skal være gyldig, må pasienten ha fått nødvendig informasjon om sin helsetilstand og innholdet i helsehjelpen. \ " +
            "Pasienten kan trekke sitt samtykke tilbake. Trekker pasienten samtykket tilbake, skal den som yter helsehjelp gi nødvendig informasjon om betydningen av at helsehjelpen ikke gis.",
            summary: "Dersom pasienten nekter/avbryter indisert behandling, så skal dette dokumenteres i journal. Det er ønskelig at pasienten underskriver at han/hun har fått grundig informasjon, men ikke ønsker helsehjelp alikevel.",
            example: "Pasienten har f.eks. en spiseforstyrrelse eller er selvskader, men er stabil og alle vitale parametre er ok. Man finner kanskje bifunn på røntgen som burde utredes nærmere, \ " +
            "men pasienten behøver ikke umiddelbar behandling. Pasienten har i dette tilfellet full rett til å nekte behandling.",
            oneline: "Helsehjelp kan bare gis med pasientens samtykke, med mindre det foreligger lovhjemmel eller annet gyldig rettsgrunnlag for å gi helsehjelp uten samtykke.",
            reldocs: [ "utskrivelse.pdf" ] 
        },
        {
            cat: "Pasienten skader seg selv",
            law: "Pasient- og brukerrettighetsloven",
            paragraph: "Kapittel 4A",
            text: "Før det kan ytes helsehjelp som pasienten motsetter seg, må tillitskapende tiltak ha vært forsøkt, med mindre det er åpenbart formålsløst å prøve dette. \ " +
            "Opprettholder pasienten sin motstand, eller vet helsepersonellet at vedkommende med stor sannsynlighet vil opprettholde sin motstand, kan det treffes vedtak om helsehjelp dersom \ " +
            "a) en unnlatelse av å gi helsehjelp kan føre til vesentlig helseskade for pasienten, og \ " +
            "b) helsehjelpen anses nødvendig, og \ " +
            "c) tiltakene står i forhold til behovet for helsehjelpen. \ " +
            "\ " +
            "Selv om vilkårene i første og andre ledd er oppfylt, kan helsehjelp bare gis der dette etter en helhetsvurdering framtrer som den klart beste løsningen for pasienten. \ " +
            "I vurderingen av om slik helsehjelp skal gis, skal det blant annet legges vekt på graden av motstand samt om det i nær fremtid kan forventes at pasienten vil kunne gjenvinne sin samtykkekompetanse.",
            summary: "Tiltak utover øyebklikkelig hjelp for en pasient som ikke er samtykkekompetent må begrunnes i et skriftlig vedtak i pasientens journal.",
            example: "-Vanskelig situasjon, ofte pga en blanding av psykiatri, rus og somatikk. Pasientene kan være bare periodevis ikke samtykkekompetent pga rus, underernæring eller psykiatrisk forverring, ofte er bare øyeblikkelig hjelp gjennomførbar mens videre tiltak er meget vanskelig realiserbar.",
            oneline: "Helsepersonell må sikre nødvendig somatisk helsehjelp til pasienter som mangler samtykkekompetanse og som motsetter seg helsehjelpen."
        },
        {
            cat: "Pasienten skader seg selv",
            law: "Psykisk helsevernloven",
            paragraph: "§3-2. Vedtak om tvungen observasjon",
            text: "På bakgrunn av opplysninger fra legeundersøkelsen etter § 3-1, foretar den faglig ansvarlige en vurdering av om de følgende vilkårene for tvungen observasjon er oppfylt: \ " +
            "1. Frivillig psykisk helsevern har vært forsøkt, uten at dette har ført fram, eller det er åpenbart formålsløst å forsøke dette. \ " +
            "2. Pasienten er undersøkt av to leger, hvorav én skal være uavhengig av den ansvarlige institusjon, jf. § 3-1. \ " +
            "3. Det er overveiende sannsynlig at pasienten fyller vilkårene for tvungent psykisk helsevern etter § 3-3. \ " +
            "4. Institusjonen er faglig og materielt i stand til å tilby pasienten tilfredsstillende behandling og omsorg og er godkjent i henhold til § 3-5. \ " +
            "5. Pasienten er gitt anledning til å uttale seg, jf. § 3-9. \ " +
            "6. Selv om lovens vilkår ellers er oppfylt, kan tvungen observasjon bare finne sted hvor dette etter en helhetsvurdering framtrer som den klart beste løsning for vedkommende, \ " +
            "med mindre han eller hun utgjør en nærliggende og alvorlig fare for andres liv eller helse. Ved vurderingen skal det legges særlig vekt på hvor stor belastning det tvangsmessige inngrepet vil medføre for vedkommende. \ " +
            "Den faglig ansvarlige treffer vedtak på grunnlag av foreliggende opplysninger og egen personlig undersøkelse av pasienten. Den faglig ansvarliges vedtak og grunnlaget for det skal straks nedtegnes. \ " +
            "Tvungen observasjon kan ikke vare ut over 10 dager fra undersøkelsens begynnelse uten pasientens samtykke. Dersom pasientens tilstand tilsier at det er strengt nødvendig, \ " +
            "kan fristen forlenges inntil 10 dager etter samtykke fra kontrollkommisjonens leder. Overføring til tvungent psykisk helsevern kan skje før eller ved utløpet av denne fristen, dersom vilkårene for slikt vern er til stede. \ " +
            "Pasienten, samt hans eller hennes nærmeste pårørende og eventuelt den myndighet som har framsatt begjæring etter § 3-6, kan påklage vedtak etter annet ledd til kontrollkommisjonen.",
            summary: "Pasienten skal undersøkes av helsepersonell etter §3-1 i psykisk helsevernloven og kan fatte vedtak om tvungen observasjon. Legen må fylle ut skjema for begjær om tvungen observasjon.",
            example: "Selvskading/personlighetsforstyrrelse teller vanligvis ikke som klassisk alvorlig sinnslidelse (som depresjon og psykose), men fremstår pasienten som dypt deprimert, akutt suicidal eller psykotisk, så må (ny) psykiatrisk vurdering overveies. ",
            oneline: "På bakgrunn av opplysninger fra legeundersøkelser, kan den faglige ansvarlige fatte vedtak om tvungen observasjon."
        },
        {
            cat: "Pasienten skader seg selv",
            law: "Psykisk helsevernloven",
            paragraph: "§3-3. Vedtak om tvungent psykisk helsevern",
            text: "På bakgrunn av opplysninger fra legeundersøkelsen etter § 3-1 og eventuell tvungen observasjon etter § 3-2, foretar den faglig ansvarlige en vurdering av om de følgende vilkårene for tvungent psykisk helsevern er oppfylt: \ " +
            "1. Frivillig psykisk helsevern har vært forsøkt, uten at dette har ført fram, eller det er åpenbart formålsløst å forsøke dette. \ " +
            "2. Pasienten er undersøkt av to leger, hvorav én skal være uavhengig av den ansvarlige institusjon, jf. § 3-1. \ " +
            "3. Pasienten har en alvorlig sinnslidelse og etablering av tvungent psykisk helsevern er nødvendig for å hindre at vedkommende på grunn av sinnslidelsen enten \ " +
            "a. får sin utsikt til helbredelse eller vesentlig bedring i betydelig grad redusert, eller det er stor sannsynlighet for at vedkommende i meget nær framtid får sin tilstand vesentlig forverret, eller \ " +
            "b. utgjør en nærliggende og alvorlig fare for eget eller andres liv eller helse. \ " +
            "4. Institusjonen er faglig og materielt i stand til å tilby pasienten tilfredsstillende behandling og omsorg og er godkjent i henhold til § 3-5. \ " +
            "5. Pasienten er gitt anledning til å uttale seg, jf. § 3-9. \ " +
            "6. Selv om lovens vilkår ellers er oppfylt, kan tvungent psykisk helsevern bare finne sted hvor dette etter en helhetsvurdering framtrer som den klart beste løsning for vedkommende, \ " +
            "med mindre han eller hun utgjør en nærliggende og alvorlig fare for andres liv eller helse. Ved vurderingen skal det legges særlig vekt på hvor stor belastning det tvangsmessige inngrepet vil medføre for vedkommende. \ " +
            "Den faglig ansvarlige treffer vedtak på grunnlag av foreliggende opplysninger og egen personlig undersøkelse av pasienten. Den faglig ansvarliges vedtak og grunnlaget for det skal straks nedtegnes. \ " +
            "Pasienten, samt hans eller hennes nærmeste pårørende og eventuelt den myndighet som har framsatt begjæring etter § 3-6, kan påklage vedtak etter denne bestemmelsen til kontrollkommisjonen. \ " +
            "Pasienten kan påklage vedtak om etablering av tvungent psykisk helsevern i inntil 3 måneder etter at vernet er opphørt.",
            summary: "Pasienten skal undersøkes av helsepersonell etter §3-1 i psykisk helsevernloven og kan fatte vedtak om tvungent psykisk helsevern. Legen må fylle ut skjema for begjær om tvungent psykisk helsevern.",
            example: "Pasienten har en kjent alvorlig sinnslidelse. Pasienter som går under denne klassifiseringen kan lide av: \ " +
            "- Schizofreni/psykose   \ " +
            "- Depresjon ",
            oneline: "På bakgrunn av opplysninger fra legeundersøkelser, kan den faglige ansvarlige fatte vedtak om tvungent psykisk helsevern."
        },
        {
            cat: "Pasienten nekter behandling",
            law: "Helsepersonelloven",
            paragraph: "§7. Øyeblikkelig hjelp",
            text: "Helsepersonell skal straks gi den helsehjelp de evner når det må antas at hjelpen er påtrengende nødvendig. Med de begrensninger som følger av pasient- og brukerrettighetsloven \ " +
            "§ 4-9, skal nødvendig helsehjelp gis selv om pasienten ikke er i stand til å samtykke, og selv om pasienten motsetter seg helsehjelpen. \ " +
            "Ved tvil om helsehjelpen er påtrengende nødvendig, skal helsepersonell foreta nødvendige undersøkelser. \ " +
            "Plikten gjelder ikke i den grad annet kvalifisert helsepersonell påtar seg ansvaret for å gi helsehjelpen.",
            summary: "Tiltak dokumenteres i pasientens ordinære journal. ",
            example: "Helsepersonell kan utføre akutt livreddende behandling mot pasientens vilje om pasientens liv står i øyeblikkelig fare.",
            oneline: "Helsepersonell skal straks gi den helsehjelp de evner når det må antas at hjelpen er påtrengende nødvendig."
        },
        {
            cat: "Pasienten nekter behandling",
            law: "Pasient- og brukerrettighetsloven",
            paragraph: "§4-1. Hovedregel om samtykke",
            text: "Helsehjelp kan bare gis med pasientens samtykke, med mindre det foreligger lovhjemmel eller annet gyldig rettsgrunnlag for å gi helsehjelp uten samtykke. \ " +
            "For at samtykket skal være gyldig, må pasienten ha fått nødvendig informasjon om sin helsetilstand og innholdet i helsehjelpen. \ " +
            "Pasienten kan trekke sitt samtykke tilbake. Trekker pasienten samtykket tilbake, skal den som yter helsehjelp gi nødvendig informasjon om betydningen av at helsehjelpen ikke gis.",
            summary: "Dersom pasienten nekter/avbryter indisert behandling, så skal dette dokumenteres i journal. Det er ønskelig at pasienten underskriver at han/hun har fått grundig informasjon, men ikke ønsker helsehjelp alikevel.",
            example: "Pasienten er klar og adekvat, alle vitale parametre er ok. Dersom man finner alikevel holdepunkter for malignitet eller annen mer eller mindre alvorlig patologi og pasienten ikke ønsker utredning/behandling, så har denne pasienten har i dette tilfellet full rett til å nekte behandling.",
            oneline: "Helsehjelp kan bare gis med pasientens samtykke, med mindre det foreligger lovhjemmel eller annet gyldig rettsgrunnlag for å gi helsehjelp uten samtykke."
        },
        {
            cat: "Pasienten nekter behandling",
            law: "Pasient- og brukerrettighetsloven",
            paragraph: "Kapittel 4A",
            text: "Før det kan ytes helsehjelp som pasienten motsetter seg, må tillitskapende tiltak ha vært forsøkt, med mindre det er åpenbart formålsløst å prøve dette. \ " +
            "Opprettholder pasienten sin motstand, eller vet helsepersonellet at vedkommende med stor sannsynlighet vil opprettholde sin motstand, kan det treffes vedtak om helsehjelp dersom \ " +
            "a) en unnlatelse av å gi helsehjelp kan føre til vesentlig helseskade for pasienten, og \ " +
            "b) helsehjelpen anses nødvendig, og \ " +
            "c) tiltakene står i forhold til behovet for helsehjelpen. \ " +
            "\ " +
            "Selv om vilkårene i første og andre ledd er oppfylt, kan helsehjelp bare gis der dette etter en helhetsvurdering framtrer som den klart beste løsningen for pasienten. \ " +
            "I vurderingen av om slik helsehjelp skal gis, skal det blant annet legges vekt på graden av motstand samt om det i nær fremtid kan forventes at pasienten vil kunne gjenvinne sin samtykkekompetanse.",
            summary: "Tiltak utover øyebklikkelig hjelp for en pasient som ikke er samtykkekompetent må begrunnes i et skriftlig vedtak i pasientens journal.",
            example: "-Vanskelig situasjon, ofte pga en blanding av psykiatri, rus og somatikk. Pasientene kan være bare periodevis ikke samtykkekompetent pga rus, underernæring eller psykiatrisk forverring, ofte er bare øyeblikkelig hjelp gjennomførbar mens videre tiltak er meget vanskelig realiserbar.",
            oneline: "Helsepersonell må sikre nødvendig somatisk helsehjelp til pasienter som mangler samtykkekompetanse og som motsetter seg helsehjelpen."
        },
        {
            cat: "Pasienten nekter behandling",
            law: "Psykisk helsevernloven",
            paragraph: "§3-2. Vedtak om tvungen observasjon",
            text: "På bakgrunn av opplysninger fra legeundersøkelsen etter § 3-1, foretar den faglig ansvarlige en vurdering av om de følgende vilkårene for tvungen observasjon er oppfylt: \ " +
            "1. Frivillig psykisk helsevern har vært forsøkt, uten at dette har ført fram, eller det er åpenbart formålsløst å forsøke dette. \ " +
            "2. Pasienten er undersøkt av to leger, hvorav én skal være uavhengig av den ansvarlige institusjon, jf. § 3-1. \ " +
            "3. Det er overveiende sannsynlig at pasienten fyller vilkårene for tvungent psykisk helsevern etter § 3-3. \ " +
            "4. Institusjonen er faglig og materielt i stand til å tilby pasienten tilfredsstillende behandling og omsorg og er godkjent i henhold til § 3-5. \ " +
            "5. Pasienten er gitt anledning til å uttale seg, jf. § 3-9. \ " +
            "6. Selv om lovens vilkår ellers er oppfylt, kan tvungen observasjon bare finne sted hvor dette etter en helhetsvurdering framtrer som den klart beste løsning for vedkommende, \ " +
            "med mindre han eller hun utgjør en nærliggende og alvorlig fare for andres liv eller helse. Ved vurderingen skal det legges særlig vekt på hvor stor belastning det tvangsmessige inngrepet vil medføre for vedkommende. \ " +
            "Den faglig ansvarlige treffer vedtak på grunnlag av foreliggende opplysninger og egen personlig undersøkelse av pasienten. Den faglig ansvarliges vedtak og grunnlaget for det skal straks nedtegnes. \ " +
            "Tvungen observasjon kan ikke vare ut over 10 dager fra undersøkelsens begynnelse uten pasientens samtykke. Dersom pasientens tilstand tilsier at det er strengt nødvendig, \ " +
            "kan fristen forlenges inntil 10 dager etter samtykke fra kontrollkommisjonens leder. Overføring til tvungent psykisk helsevern kan skje før eller ved utløpet av denne fristen, dersom vilkårene for slikt vern er til stede. \ " +
            "Pasienten, samt hans eller hennes nærmeste pårørende og eventuelt den myndighet som har framsatt begjæring etter § 3-6, kan påklage vedtak etter annet ledd til kontrollkommisjonen.",
            summary: "Pasienten skal undersøkes av helsepersonell etter §3-1 i psykisk helsevernloven og kan fatte vedtak om tvungen observasjon. Legen må fylle ut skjema for begjær om tvungen observasjon.",
            example: "Virker pasienten dypt deprimert eller psykotisk, så må psykiatrisk utredning overveies, om nødvendig med tvang.",
            oneline: "Ved klar mistanke om alvorlig depresjon eller psykose kan pasienten innlegges i psykiatrien til tvungen observasjon."
        },
        {
            cat: "Pasienten nekter behandling",
            law: "Psykisk helsevernloven",
            paragraph: "§3-3. Vedtak om tvungent psykisk helsevern",
            text: "På bakgrunn av opplysninger fra legeundersøkelsen etter § 3-1 og eventuell tvungen observasjon etter § 3-2, foretar den faglig ansvarlige en vurdering av om de følgende vilkårene for tvungent psykisk helsevern er oppfylt: \ " +
            "1. Frivillig psykisk helsevern har vært forsøkt, uten at dette har ført fram, eller det er åpenbart formålsløst å forsøke dette. \ " +
            "2. Pasienten er undersøkt av to leger, hvorav én skal være uavhengig av den ansvarlige institusjon, jf. § 3-1. \ " +
            "3. Pasienten har en alvorlig sinnslidelse og etablering av tvungent psykisk helsevern er nødvendig for å hindre at vedkommende på grunn av sinnslidelsen enten \ " +
            "a. får sin utsikt til helbredelse eller vesentlig bedring i betydelig grad redusert, eller det er stor sannsynlighet for at vedkommende i meget nær framtid får sin tilstand vesentlig forverret, eller \ " +
            "b. utgjør en nærliggende og alvorlig fare for eget eller andres liv eller helse. \ " +
            "4. Institusjonen er faglig og materielt i stand til å tilby pasienten tilfredsstillende behandling og omsorg og er godkjent i henhold til § 3-5. \ " +
            "5. Pasienten er gitt anledning til å uttale seg, jf. § 3-9. \ " +
            "6. Selv om lovens vilkår ellers er oppfylt, kan tvungent psykisk helsevern bare finne sted hvor dette etter en helhetsvurdering framtrer som den klart beste løsning for vedkommende, \ " +
            "med mindre han eller hun utgjør en nærliggende og alvorlig fare for andres liv eller helse. Ved vurderingen skal det legges særlig vekt på hvor stor belastning det tvangsmessige inngrepet vil medføre for vedkommende. \ " +
            "Den faglig ansvarlige treffer vedtak på grunnlag av foreliggende opplysninger og egen personlig undersøkelse av pasienten. Den faglig ansvarliges vedtak og grunnlaget for det skal straks nedtegnes. \ " +
            "Pasienten, samt hans eller hennes nærmeste pårørende og eventuelt den myndighet som har framsatt begjæring etter § 3-6, kan påklage vedtak etter denne bestemmelsen til kontrollkommisjonen. \ " +
            "Pasienten kan påklage vedtak om etablering av tvungent psykisk helsevern i inntil 3 måneder etter at vernet er opphørt.",
            summary: "Pasienten skal undersøkes av helsepersonell etter §3-1 i psykisk helsevernloven og kan fatte vedtak om tvungent psykisk helsevern. Legen må fylle ut skjema for begjær om tvungent psykisk helsevern.",
            example: "Pasienten har en kjent alvorlig sinnslidelse. Pasienter som går under denne klassifiseringen kan lide av: \ " +
            "- Schizofreni/psykose   \ " +
            "- Depresjon ",
            oneline: "En pasient med kjent sinnslidelse kan ved en alvorlig forverring innlegges i psykiatrien til tvungent psykisk helsevern."
        }
    ];
    _.each(laws, function(list) {
        Laws.insert({cat: list.cat, law: list.law, paragraph: list.paragraph, text: list.text,
            summary: list.summary, example: list.example, oneline: list.oneline, reldocs: list.reldocs})
    });
}

// FILTERS
if (Filters.find().count() === 0 || UPDATE == true) {
    var filters = [
        {
            text: "Behov for akutt hjelp?",
            number_of_outcomes: 2
        },
        {
            text: "Er pasienten samtykkekompetent?",
            number_of_outcomes: 2
        },
        {
            text: "Pasient trenger ikke øyeblikkelig hjelp og er ikke samtykkekompetent",
            number_of_outcomes: 3
        }
    ];
    _.each(filters, function(list) {
        Filters.insert({text: list.text, number_of_outcomes: list.number_of_outcomes})
    });
}

// LINKS
if (Links.find().count() === 0 || UPDATE == true) {
    var links = [
        {
            from: Startcases.findOne({text: "Pasienten er suicidal"}),
            mark: "",
            to: Laws.findOne({paragraph: "§17. Nødrett"})
        },
        {
            from: Startcases.findOne({text: "Pasienten er voldelig"}),
            mark: "",
            to: Laws.findOne({paragraph: "§18. Nødverge"})
        },
        {
            from: Startcases.findOne({text: "Pasienten nekter behandling"}),
            mark: "",
            to: Filters.findOne({text: "Behov for akutt hjelp?"})
        },
        {
            from: Filters.findOne({text: "Behov for akutt hjelp?"}),
            mark: "JA",
            to: Laws.findOne({paragraph: "§7. Øyeblikkelig hjelp"})
        },
        {
            from: Filters.findOne({text: "Behov for akutt hjelp?"}),
            mark: "NEI",
            to: Filters.findOne({text: "Er pasienten samtykkekompetent?"})
        },
        {
            from: Filters.findOne({text: "Er pasienten samtykkekompetent?"}),
            mark: "JA",
            to: Laws.findOne({paragraph: "§4-1. Hovedregel om samtykke"})
        },
        {
            from: Filters.findOne({text: "Er pasienten samtykkekompetent?"}),
            mark: "NEI",
            to: Filters.findOne({text: "Pasient trenger ikke øyeblikkelig hjelp og er ikke samtykkekompetent"})
        },
        {
            from: Filters.findOne({text: "Pasient trenger ikke øyeblikkelig hjelp og er ikke samtykkekompetent"}),
            mark: "og trenger somatisk behandling",
            to: Laws.findOne({paragraph: "Kapittel 4A"})
        },
        {
            from: Filters.findOne({text: "Pasient trenger ikke øyeblikkelig hjelp og er ikke samtykkekompetent"}),
            mark: "og har en mistenkt alvorlig sinnslidelse",
            to: Laws.findOne({paragraph: "§3-2. Vedtak om tvungen observasjon"})
        },
        {
            from: Filters.findOne({text: "Pasient trenger ikke øyeblikkelig hjelp og er ikke samtykkekompetent"}),
            mark: "og har en kjent alvorlig sinnslidelse",
            to: Laws.findOne({paragraph: "§3-3. Vedtak om tvungent psykisk helsevern"})
        },
        {
            from: Startcases.findOne({text: "Pasienten skader seg selv"}),
            mark: "",
            to: Filters.findOne({text: "Behov for akutt hjelp?"})
        }

    ];
    _.each(links, function(list) {
        Links.insert({from: list.from, mark:list.mark, to: list.to})
    });
}

// URLS
if (Urls.find().count() === 0 || UPDATE == true) {
    var urls = [
        {
            title: "Lovdata",
            link: "https://lovdata.no"
        },
        {
            title: "Sykehuset",
            link: "http://www.stolav.no"
        },
        {
            title: "Universitetet",
            link: "http://www.ntnu.no"
        },
        {
            title: "Helsenorge",
            link: "http://www.helsenorge.no"
        },
        {
            title: "Helsedirektoratet",
            link: "http://www.helsedirektoratet.no"
        },
        {
            title: "Giftinformasjonen",
            link: "https://helsenorge.no/giftinformasjon"
        }
    ];
    _.each(urls, function (list) {
        Urls.insert({title: list.title, link: list.link})
    });
}

// NUMBERS
if (Numbers.find().count() === 0 || UPDATE == true) {
    var numbers = [
        {
            title: "Østmarka ekspedisjon",
            number: 72823000,
            internal: false
        },
        {
            title: "Rus akutt",
            number: 73862929,
            internal: false
        },
        {
            title: "Sikkerhet/vekter",
            number: 67500,
            internal: true
        },
        {
            title: "AMK",
            number: 113,
            internal: false
        },
        {
            title: "Politi",
            number: 112,
            internal: false
        }
    ];
    _.each(numbers, function (list) {
        Numbers.insert({title: list.title, number: list.number, internal: list.internal})
    });
}

// INFO
if (Info.find().count() === 0 || UPDATE == true) {
    var elements = [
        {
            title: "Om appen",
            text: "Her finner du litt informasjon om selve appen"
        },
        {
            title: "Hvordan bruke appen",
            text: ".. f.eks. en brukerguide.."
        },
        {
            title: "Om utviklerne",
            text: ".. og litt informasjon om Tiaco.."
        }
    ];
    _.each(elements, function (list) {
        Info.insert({title: list.title, text: list.text})
    });
}

});