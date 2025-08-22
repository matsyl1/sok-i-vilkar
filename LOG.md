### Logg

#### 21-Aug-2025 / Initielt oppsett og render.com
1. Opprettet skjelett for frontend med vite@latest (React + TS) og backend (node + express).
2. Konfigurert build scripts: innehold fra frontend /dist kopieres manuelt over til backend /public for tilfellet (for å holde build-filene separert). Endret index.ts i backend sånn at statisk build-fil fra front kan serves. Også lagt til en SPA-fallback her. 
3. Ønsker at appen skal være lett tilgjengelig utenfor eget/lokalt miljø. Tatt i bruk og konfigurert en web service via render.com for å deploy initielt oppsett. En del problemer med første deployment ("path-to-regexp" fra Render-logg). Problem løst til slutt med å endre til dynamisk portbruk (process.env.PORT || 3000) og nedgradert fra express v5 -> v4 (wildcard routing).

#### 07-Aug-2025 / Initiale tanker (2)
 - _Data_ / Starter med personbil for privatkunde (4x PDFer: ansvar/mini-kasko/kasko/topp-kasko) og vurderer veien videre når jeg har en fungerende front/back. 
 - _Tech_ / Stor del av prosjektet vil ta læring fra [FullStackOpen](https://fullstackopen.com/en/) som utgangspunkt rundt valg av teknologier.
 - _UI-komponenter og prioriteringer_ / Kommer ikke bruke tid på å bygge/style komponenter manuelt, vil ta i bruk noen form for komponentbibliotek (tbd) - prioritet vil være en flyt og funksjonalitet som gir mening. 
#### 06-Aug-2025 / Initiale tanker
 - _Backend_ / Regner med at vilkårstekster ligger internt via en/flere APIer for å gjøre oppdateringer/endringer/produksjon av vilkårsdokumenter (PDFer) enkelt. Vil bruke offentlig og lett tilgjengelig informasjon (f.eks. Topp Kasko PDF personbil: https://dokument.fremtind.no/vilkar/fremtind/pm/mobilitet/Vilkar_Toppkasko_Bil.pdf). Tanken er å samle flere dokumenter på et sted (tbd), lage en backend som henter dokumentene og en frontend som presenterer resultat av et søk på en enkel og oversiktlig måte. Det vil si, ved vilkårsendringer så må nyeste versjonen hentes og lagres manuelt. Anser dette ok i en proof-of-concept setting, men ville skalert dårlig i virkeligheten/på sikt. 
 - _Visuell layout og funksjonalitet_ / Et enkelt søkefelt (a), en oversikt over antall treffer per dokument (b). Mulighet for å expandere/minimere oversikt og lenke videre til fullsidesvisning av vilkårsdokument med søkeord highlighted (c). Vurdert kun extrahering/visning av rå tekst, men tenker at match av søkeord bør vises i full kontekst (dvs synlig i selve vilkårsdokumentet) - sånn at rådgiver ikke går glipp av noe viktig. 
