/**
 * This file builds the initial databases, if the collections are empty on server starup
 * The UPDATE variable is set to clear all collections and insert the initial data.
 */

var UPDATE = true; // set true to delete all records and insert all initial data

if (UPDATE == true) {
    // Remove existing collection
    Startcases.remove({});
    Laws.remove({});
    Filters.remove({});
    Links.remove({});
}

// STARTCASES
if (Startcases.find().count() === 0 || UPDATE == true) {
    var startcases = [
        {
            text: "Suicidal pasient"
        },
        {
            text: "Voldelig pasient"
        },
        {
            text: "Pasient nekter behandling"
        },
        {
            text: "Pasient skader seg selv"
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
            law: "Straffeloven",
            paragraph: "17. Nødrett",
            text: "En handling som ellers ville være straffbar, er lovlig når \ " +
            "a) den blir foretatt for å redde liv, helse, eiendom eller en annen interesse fra en fare for skade som ikke kan avverges på annen rimelig måte, og \ " +
            "b)	denne skaderisikoen er langt større enn skaderisikoen ved handlingen."
        },
        {
            law: "Straffeloven",
            paragraph: "18. Nødverge",
            text: "En handling som ellers ville være straffbar, er lovlig når den \ " +
            "a)	blir foretatt for å avverge et ulovlig angrep, \ " +
            "b)	ikke går lenger enn nødvendig, og \ " +
            "c)	ikke går åpenbart ut over hva som er forsvarlig under hensyn til hvor farlig angrepet er, hva slags interesse som angrepet krenker, og angriperens skyld \ " +
            "Regelen i første ledd gjelder tilsvarende for den som iverksetter en lovlig pågripelse eller søker å hindre at noen unndrar seg varetektsfengsling eller gjennomføring av frihetsstraff. \ " +
            "Utøving av offentlig myndighet kan bare møtes med nødverge når myndighetsutøvingen er ulovlig, og den som gjennomfører den, opptrer forsettlig eller grovt uaktsomt."
        },
        {
            law: "Helsepersonelloven",
            paragraph: "7. Øyeblikkelig hjelp",
            text: "Helsepersonell skal straks gi den helsehjelp de evner når det må antas at hjelpen er påtrengende nødvendig. Med de begrensninger som følger av pasient- og brukerrettighetsloven \ " +
            "§ 4-9, skal nødvendig helsehjelp gis selv om pasienten ikke er i stand til å samtykke, og selv om pasienten motsetter seg helsehjelpen. \ " +
            "Ved tvil om helsehjelpen er påtrengende nødvendig, skal helsepersonell foreta nødvendige undersøkelser. \ " +
            "Plikten gjelder ikke i den grad annet kvalifisert helsepersonell påtar seg ansvaret for å gi helsehjelpen."
        },
        {
            law: "Pasient- og brukerrettighetsloven",
            paragraph: "4-9.Pasientens rett til å nekte helsehjelp i særlige situasjoner",
            text: "Pasienten har på grunn av alvorlig overbevisning rett til å nekte å motta blod eller blodprodukter eller til å nekte å avbryte en pågående sultestreik. \ " +
            "En døende pasient har rett til å motsette seg livsforlengende behandling. Er en døende pasient ute av stand til å formidle et behandlingsønske, skal helsepersonellet unnlate å gi \ " +
            "helsehjelp dersom pasientens nærmeste pårørende tilkjennegir tilsvarende ønsker, og helsepersonellet etter en selvstendig vurdering finner at dette også er pasientens ønske og at ønsket åpenbart bør respekteres. \ " +
            "Helsepersonell må forsikre seg om at pasient som nevnt i første og annet ledd er over 18 år og ikke er fratatt rettslig handleevne på det personlige området, \ " +
            "og at vedkommende er gitt tilfredsstillende informasjon og har forstått konsekvensene for egen helse ved behandlingsnektelsen."
        },
        {
            law: "Pasient- og brukerrettighetsloven",
            paragraph: "Kapittel 4A",
            text: "Helsehjelp til pasienter uten samtykkekompetanse som motsetter seg helsehjelpen mv."
        },
        {
            law: "Psykisk helsevernloven",
            paragraph: "3-2.Vedtak om tvungen observasjon",
            text: "På bakgrunn av opplysninger fra legeundersøkelsen etter § 3-1, foretar den faglig ansvarlige en vurdering av om de følgende vilkårene for tvungen observasjon er oppfylt: \ " +
            "1.	Frivillig psykisk helsevern har vært forsøkt, uten at dette har ført fram, eller det er åpenbart formålsløst å forsøke dette. \ " +
            "2.	Pasienten er undersøkt av to leger, hvorav én skal være uavhengig av den ansvarlige institusjon, jf. § 3-1. \ " +
            "3.	Det er overveiende sannsynlig at pasienten fyller vilkårene for tvungent psykisk helsevern etter § 3-3. \ " +
            "4.	Institusjonen er faglig og materielt i stand til å tilby pasienten tilfredsstillende behandling og omsorg og er godkjent i henhold til § 3-5. \ " +
            "5.	Pasienten er gitt anledning til å uttale seg, jf. § 3-9. \ " +
            "6.	Selv om lovens vilkår ellers er oppfylt, kan tvungen observasjon bare finne sted hvor dette etter en helhetsvurdering framtrer som den klart beste løsning for vedkommende, \ " +
            "med mindre han eller hun utgjør en nærliggende og alvorlig fare for andres liv eller helse. Ved vurderingen skal det legges særlig vekt på hvor stor belastning det tvangsmessige inngrepet vil medføre for vedkommende. \ " +
            "Den faglig ansvarlige treffer vedtak på grunnlag av foreliggende opplysninger og egen personlig undersøkelse av pasienten. Den faglig ansvarliges vedtak og grunnlaget for det skal straks nedtegnes. \ " +
            "Tvungen observasjon kan ikke vare ut over 10 dager fra undersøkelsens begynnelse uten pasientens samtykke. Dersom pasientens tilstand tilsier at det er strengt nødvendig, \ " +
            "kan fristen forlenges inntil 10 dager etter samtykke fra kontrollkommisjonens leder. Overføring til tvungent psykisk helsevern kan skje før eller ved utløpet av denne fristen, dersom vilkårene for slikt vern er til stede. \ " +
            "Pasienten, samt hans eller hennes nærmeste pårørende og eventuelt den myndighet som har framsatt begjæring etter § 3-6, kan påklage vedtak etter annet ledd til kontrollkommisjonen."
        },
        {
            law: "Psykisk helsevernloven",
            paragraph: "3-3.Vedtak om tvungent psykisk helsevern",
            text: "På bakgrunn av opplysninger fra legeundersøkelsen etter § 3-1 og eventuell tvungen observasjon etter § 3-2, foretar den faglig ansvarlige en vurdering av om de følgende vilkårene for tvungent psykisk helsevern er oppfylt: \ " +
            "1.	Frivillig psykisk helsevern har vært forsøkt, uten at dette har ført fram, eller det er åpenbart formålsløst å forsøke dette. \ " +
            "2.	Pasienten er undersøkt av to leger, hvorav én skal være uavhengig av den ansvarlige institusjon, jf. § 3-1. \ " +
            "3.	Pasienten har en alvorlig sinnslidelse og etablering av tvungent psykisk helsevern er nødvendig for å hindre at vedkommende på grunn av sinnslidelsen enten \ " +
            "a.	får sin utsikt til helbredelse eller vesentlig bedring i betydelig grad redusert, eller det er stor sannsynlighet for at vedkommende i meget nær framtid får sin tilstand vesentlig forverret, eller \ " +
            "b.	utgjør en nærliggende og alvorlig fare for eget eller andres liv eller helse. \ " +
            "4.	Institusjonen er faglig og materielt i stand til å tilby pasienten tilfredsstillende behandling og omsorg og er godkjent i henhold til § 3-5. \ " +
            "5.	Pasienten er gitt anledning til å uttale seg, jf. § 3-9. \ " +
            "6.	Selv om lovens vilkår ellers er oppfylt, kan tvungent psykisk helsevern bare finne sted hvor dette etter en helhetsvurdering framtrer som den klart beste løsning for vedkommende, \ " +
            "med mindre han eller hun utgjør en nærliggende og alvorlig fare for andres liv eller helse. Ved vurderingen skal det legges særlig vekt på hvor stor belastning det tvangsmessige inngrepet vil medføre for vedkommende. \ " +
            "Den faglig ansvarlige treffer vedtak på grunnlag av foreliggende opplysninger og egen personlig undersøkelse av pasienten. Den faglig ansvarliges vedtak og grunnlaget for det skal straks nedtegnes. \ " +
            "Pasienten, samt hans eller hennes nærmeste pårørende og eventuelt den myndighet som har framsatt begjæring etter § 3-6, kan påklage vedtak etter denne bestemmelsen til kontrollkommisjonen. \ " +
            "Pasienten kan påklage vedtak om etablering av tvungent psykisk helsevern i inntil 3 måneder etter at vernet er opphørt."
        }
    ];
    _.each(laws, function(list) {
        Laws.insert({law: list.law, paragraph: list.paragraph, text: list.text})
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
            number_of_outcomes: 4
        },
        {
            text: "Pasienten trenger somatisk behandling",
            number_of_outcomes: 1
        },
        {
            text: "Mistenkt alvorlig sinnslidelse",
            number_of_outcomes: 1
        },
        {
            text: "Kjent alvorlig sinnslidelse",
            number_of_outcomes: 1
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
            from: Startcases.findOne({text: "Suicidal pasient"}),
            mark: "",
            to: Laws.findOne({paragraph: "17. Nødrett"})
        },
        {
            from: Startcases.findOne({text: "Voldelig pasient"}),
            mark: "",
            to: Laws.findOne({paragraph: "18. Nødverge"})
        },
        {
            from: Startcases.findOne({text: "Pasient nekter behandling"}),
            mark: "",
            to: Filters.findOne({text: "Behov for akutt hjelp?"})
        },
        {
            from: Filters.findOne({text: "Behov for akutt hjelp?"}),
            mark: "JA",
            to: Laws.findOne({paragraph: "7. Øyeblikkelig hjelp"})
        },
        {
            from: Filters.findOne({text: "Behov for akutt hjelp?"}),
            mark: "NEI",
            to: Filters.findOne({text: "Er pasienten samtykkekompetent?"})
        },
        {
            from: Filters.findOne({text: "Er pasienten samtykkekompetent?"}),
            mark: "JA",
            to: Laws.findOne({paragraph: "4-9.Pasientens rett til å nekte helsehjelp i særlige situasjoner"})
        },
        {
            from: Filters.findOne({text: "Er pasienten samtykkekompetent?"}),
            mark: "NEI",
            to: Filters.findOne({text: "Pasienten trenger somatisk behandling"})
        },
        {
            from: Filters.findOne({text: "Er pasienten samtykkekompetent?"}),
            mark: "NEI",
            to: Filters.findOne({text: "Mistenkt alvorlig sinnslidelse"})
        },
        {
            from: Filters.findOne({text: "Er pasienten samtykkekompetent?"}),
            mark: "NEI",
            to: Filters.findOne({text: "Kjent alvorlig sinnslidelse"})
        },
        {
            from: Filters.findOne({text: "Pasienten trenger somatisk behandling"}),
            mark: "",
            to: Laws.findOne({paragraph: "Kapittel 4A"})
        },
        {
            from: Filters.findOne({text: "Mistenkt alvorlig sinnslidelse"}),
            mark: "",
            to: Laws.findOne({paragraph: "3-2.Vedtak om tvungen observasjon"})
        },
        {
            from: Filters.findOne({text: "Kjent alvorlig sinnslidelse"}),
            mark: "",
            to: Laws.findOne({paragraph: "3-3.Vedtak om tvungent psykisk helsevern"})
        },

    ];
    _.each(links, function(list) {
        Links.insert({from: list.from, mark:list.mark, to: list.to})
    });
}