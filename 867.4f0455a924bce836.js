"use strict";(self.webpackChunkBracketTournament_Web=self.webpackChunkBracketTournament_Web||[]).push([[867],{8867:(at,b,c)=>{c.r(b),c.d(b,{ViewTemplateModule:()=>et});var m=c(6814),u=c(776),t=c(9468),C=c(3610),p=c(95),M=c(2551);let O=(()=>{class n{constructor(e){this.contestantService=e}ngOnInit(){this.tournamentWinRate=this.contestantService.calculateTournamentWinRate(this.contestant),this.matchWinRate=this.contestantService.calculateMatchWinRate(this.contestant),this.contestantService.initializeUndefinedStatistics(this.contestant)}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(M.n))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-contestant-stat"]],inputs:{contestant:"contestant"},decls:16,vars:16,consts:[[1,"stats","row","m-1","rounded"],[1,"col","d-none","d-lg-block","d-xl-block","rounded-start","p-0",3,"src","alt"],[1,"col","col-md","mt-2"],[1,"col-3","col-md"],[1,"fs-6","my-2"],["role","progressbar","aria-label","Tournaments won percentage","aria-valuemin","0","aria-valuemax","100",1,"progress"],[1,"progress-bar"]],template:function(o,a){1&o&&(t.TgZ(0,"div",0),t._UZ(1,"img",1),t.TgZ(2,"p",2),t._uU(3),t.qZA(),t.TgZ(4,"div",3)(5,"p",4),t._uU(6),t.qZA(),t.TgZ(7,"div",5)(8,"div",6),t._uU(9),t.qZA()()(),t.TgZ(10,"div",3)(11,"p",4),t._uU(12),t.qZA(),t.TgZ(13,"div",5)(14,"div",6),t._uU(15),t.qZA()()()()),2&o&&(t.xp6(1),t.s9C("src",a.contestant.img,t.LSH),t.MGl("alt","",a.contestant.name," Imagen"),t.xp6(2),t.AsE("",a.contestant.name," (",a.contestant.date,")"),t.xp6(3),t.AsE("",a.contestant.tournamentsWon," de ",a.contestant.tournamentsPlayed," torneos ganados"),t.xp6(1),t.uIk("aria-valuenow",a.contestant.tournamentsWon),t.xp6(1),t.Udp("width",a.tournamentWinRate,"%"),t.xp6(1),t.hij("",a.tournamentWinRate,"%"),t.xp6(3),t.AsE("",a.contestant.matchesWon," de ",a.contestant.matchesPlayed," peleas ganadas"),t.xp6(1),t.uIk("aria-valuenow",a.contestant.matchesWon),t.xp6(1),t.Udp("width",a.matchWinRate,"%"),t.xp6(1),t.hij("",a.matchWinRate,"%"))},styles:[".stats[_ngcontent-%COMP%]{color:#000;background:rgba(255,255,255,.25);height:5rem;overflow:hidden}img[_ngcontent-%COMP%]{height:5rem;object-fit:cover;background-color:red;background-blend-mode:multiply}"]})}return n})(),A=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-contestant-minimal"]],inputs:{contestant:"contestant"},decls:7,vars:3,consts:[[1,"card-img",3,"src"],["id","test",1,"card-img-overlay","align-text-bottom","text-light"],[1,"card-title"],[1,"card-text"]],template:function(o,a){1&o&&(t._UZ(0,"img",0),t.TgZ(1,"div",1)(2,"h6",2),t._uU(3),t.qZA(),t.TgZ(4,"p",3)(5,"small"),t._uU(6),t.qZA()()()),2&o&&(t.s9C("src",a.contestant.img,t.LSH),t.xp6(3),t.Oqu(a.contestant.name),t.xp6(3),t.Oqu(a.contestant.date))},styles:["div[_ngcontent-%COMP%]{display:none;pointer-events:none}[_ngcontent-%COMP%]:hover + div[_ngcontent-%COMP%]{transition:all .2s ease-out;display:block;background-image:linear-gradient(to top,rgba(255,0,0,0),rgb(78,78,78))}img[_ngcontent-%COMP%]{height:200px;object-fit:cover}"]})}return n})();function N(n,r){if(1&n&&t._UZ(0,"img",21),2&n){const e=t.oxw();t.s9C("src",e.template.coverImg,t.LSH)}}function F(n,r){if(1&n&&(t.TgZ(0,"p",26),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.hij(" ",e.template.timesPlayed," veces jugado ")}}function I(n,r){if(1&n&&(t.TgZ(0,"p",26),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.hij(" ",e.template.timesPlayed," vez jugado ")}}function U(n,r){if(1&n&&(t.TgZ(0,"div",22)(1,"h2"),t._uU(2),t.qZA(),t.TgZ(3,"h3",23),t._uU(4),t.qZA(),t.TgZ(5,"p",24),t._uU(6),t.qZA(),t.YNc(7,F,2,1,"p",25),t.YNc(8,I,2,1,"p",25),t.qZA()),2&n){const e=t.oxw();t.xp6(2),t.Oqu(e.template.templateName),t.xp6(2),t.hij("Torneo de ",e.template.category,""),t.xp6(2),t.hij("",e.template.contestants.length," participantes"),t.xp6(1),t.Q6J("ngIf",e.template.timesPlayed&&e.template.timesPlayed>1),t.xp6(1),t.Q6J("ngIf",1===e.template.timesPlayed)}}function q(n,r){if(1&n&&(t.TgZ(0,"div",29)(1,"div",30),t._UZ(2,"app-contestant-minimal",31),t.qZA()()),2&n){const e=r.$implicit;t.xp6(2),t.Q6J("contestant",e)}}function R(n,r){if(1&n&&(t.TgZ(0,"section",27),t.YNc(1,q,3,1,"div",28),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.template.contestants)}}function S(n,r){1&n&&t._UZ(0,"app-contestant-stat",31),2&n&&t.Q6J("contestant",r.$implicit)}function J(n,r){if(1&n&&(t.TgZ(0,"section",32),t.YNc(1,S,1,1,"app-contestant-stat",33),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.template.contestants)}}function j(n,r){if(1&n&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.hij("y ",e.freePasses," pasan gratis")}}function k(n,r){if(1&n&&(t.TgZ(0,"li")(1,"a",34),t._uU(2),t.YNc(3,j,2,1,"span",35),t.qZA()()),2&n){const e=r.$implicit;t.xp6(1),t.MGl("routerLink","play-tournament/",e.round,""),t.xp6(1),t.AsE("",e.round," rondas con ",e.contestantsCount," participantes "),t.xp6(1),t.Q6J("ngIf",e.freePasses)}}let W=(()=>{class n{constructor(e,o,a,s){this.route=e,this.templatetService=o,this.router=a,this.fb=s,this.roundsInfo=[],this.form=this.fb.group({showStatistics:[!1]})}ngOnInit(){this.route.paramMap.subscribe({next:e=>{const o=e.get("templateName");this.templatetService.getTemplateByName(o).subscribe({next:a=>{this.roundsInfo=[],this.template=a;const s=this.templatetService.mapCategoryToLocale(this.template.category);s&&(this.template.category=s),this.template.coverImg=this.templatetService.searchForCoverImg(this.template);const i=this.templatetService.calculateMaxRoundCount(this.template.contestants.length);for(let d=2;d<i+1;d++)this.roundsInfo.push({round:d,contestantsCount:2**d});this.template.contestants.length<2**i&&(this.roundsInfo.at(-1).freePasses=2**i-this.template.contestants.length)},error:()=>{this.router.navigate(["404"])}})},error:e=>{console.log(e)}})}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(u.gz),t.Y36(C.E),t.Y36(u.F0),t.Y36(p.qu))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-view-template-page"]],inputs:{template:"template"},decls:24,vars:6,consts:[[1,"viewpage","container-fluid","py-3"],[1,"tournament-page","row","mx-3","mb-2","justify-content-between","rounded","shadow"],[1,"left-side","col-md-4","col-lg-3","p-4","border-end","rounded-start"],[1,"row"],[1,"col"],[1,"cover-img","card","bg-transparent","border-0","mb-3"],["class","img object-fit-cover rounded-2","alt","",3,"src",4,"ngIf"],[1,"info","row"],["class","col text-white",4,"ngIf"],[1,"right-side","col-md-8","col-lg-9","p-4","rounded-end"],["class","contestant-list row justify-content-start align-items-start g-2 gy-4",4,"ngIf"],["class","stat-list container",4,"ngIf"],[1,"play-button-area","row","justify-content-between","align-items-center","g-2","mt-1","border-top"],[1,"col-3","ms-5"],[1,"form-check","form-switch",3,"formGroup"],["for","flexSwitchCheckDefault",1,"form-check-label"],["type","checkbox","role","switch","id","flexSwitchCheckDefault","formControlName","showStatistics",1,"form-check-input"],["role","group",1,"btn-group","btn-group-lg"],["type","button","data-bs-toggle","dropdown","aria-expanded","false",1,"btn","btn-success","dropdown-toggle"],[1,"dropdown-menu"],[4,"ngFor","ngForOf"],["alt","",1,"img","object-fit-cover","rounded-2",3,"src"],[1,"col","text-white"],[1,"fs-4","text-white"],[1,"fw-semibold","mt-3","mb-0"],["class","fw-semibold",4,"ngIf"],[1,"fw-semibold"],[1,"contestant-list","row","justify-content-start","align-items-start","g-2","gy-4"],["class","col-4 col-sm-4 col-md-3 col-lg-2 card bg-transparent border-0 align-content-center border",4,"ngFor","ngForOf"],[1,"col-4","col-sm-4","col-md-3","col-lg-2","card","bg-transparent","border-0","align-content-center","border"],[1,"card-body","p-0","align-content-center"],[3,"contestant"],[1,"stat-list","container"],[3,"contestant",4,"ngFor","ngForOf"],[1,"dropdown-item",3,"routerLink"],[4,"ngIf"]],template:function(o,a){if(1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"section",2)(3,"div",3)(4,"div",4)(5,"div",5),t.YNc(6,N,1,1,"img",6),t.qZA()()(),t.TgZ(7,"div",7),t.YNc(8,U,9,5,"div",8),t.qZA()(),t.TgZ(9,"section",9),t.YNc(10,R,2,1,"section",10),t.YNc(11,J,2,1,"section",11),t.TgZ(12,"section",12)(13,"div",13)(14,"form",14)(15,"label",15),t._uU(16,"Mostrar estad\xedsticas"),t.qZA(),t._UZ(17,"input",16),t.qZA()(),t.TgZ(18,"div",13)(19,"div",17)(20,"button",18),t._uU(21," Jugar Torneo "),t.qZA(),t.TgZ(22,"ul",19),t.YNc(23,k,4,4,"li",20),t.qZA()()()()()()()),2&o){let s,i;t.xp6(6),t.Q6J("ngIf",a.template),t.xp6(2),t.Q6J("ngIf",a.template),t.xp6(2),t.Q6J("ngIf",a.template&&!(null!=(s=a.form.get("showStatistics"))&&s.value)),t.xp6(1),t.Q6J("ngIf",a.template&&(null==(i=a.form.get("showStatistics"))?null:i.value)),t.xp6(3),t.Q6J("formGroup",a.form),t.xp6(9),t.Q6J("ngForOf",a.roundsInfo)}},dependencies:[m.sg,m.O5,p._Y,p.Wl,p.JJ,p.JL,p.sg,p.u,u.rH,O,A],styles:[".viewpage[_ngcontent-%COMP%]{overflow-y:auto;overflow-x:hidden}.right-side[_ngcontent-%COMP%]{height:85vh;background:rgba(255,255,255,.25)}.left-side[_ngcontent-%COMP%]{height:85vh;background:rgba(16,0,56,.385)}.tournament-page[_ngcontent-%COMP%]{height:85vh;border-radius:.375rem}.cover-img[_ngcontent-%COMP%]{height:200px;width:200px}.cover-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;object-position:top}.contestant-list[_ngcontent-%COMP%]{height:90%;overflow-y:auto}.stat-list[_ngcontent-%COMP%]{height:85%;overflow-y:auto}.play-button-area[_ngcontent-%COMP%]{height:15%}"]})}return n})(),Y=(()=>{class n{constructor(){this.voteContestant=new t.vpe}onVoteContestant(){this.voteContestant.emit(this.contestant)}static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-contestant-card-big"]],inputs:{contestant:"contestant"},outputs:{voteContestant:"voteContestant"},standalone:!0,features:[t.jDz],decls:9,vars:4,consts:[[1,"card","text-bg-primary","bg-gradient",3,"click"],["alt","Cover Image",1,"card-img-top","object-fit-cover",3,"src"],[1,"card-body","text-center"],[1,"card-title"],[1,"card-text"]],template:function(o,a){1&o&&(t.TgZ(0,"div",0),t.NdJ("click",function(){return a.onVoteContestant()}),t._UZ(1,"img",1),t.TgZ(2,"div",2)(3,"h5",3),t._uU(4),t.qZA(),t.TgZ(5,"p",4),t._uU(6),t._UZ(7,"br"),t._uU(8),t.qZA()()()),2&o&&(t.xp6(1),t.s9C("src",a.contestant.img,t.LSH),t.xp6(3),t.Oqu(a.contestant.name),t.xp6(2),t.Oqu(a.contestant.date),t.xp6(2),t.Oqu(a.contestant.author))},dependencies:[m.ez],styles:["[_nghost-%COMP%]{display:block}.card[_ngcontent-%COMP%]{cursor:pointer;transition:all .3s}.card[_ngcontent-%COMP%]:hover{transform:scale(1.1)}.card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:350px}"],changeDetection:0})}return n})();var E=c(6208);let V=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-matchup-tracker"]],inputs:{currentMatch:"currentMatch",totalMatches:"totalMatches"},standalone:!0,features:[t.jDz],decls:4,vars:2,consts:[[1,"display-3"]],template:function(o,a){1&o&&(t.TgZ(0,"h3",0),t._uU(1,"VS"),t.qZA(),t.TgZ(2,"h2"),t._uU(3),t.qZA()),2&o&&(t.xp6(3),t.AsE("",a.currentMatch," / ",a.totalMatches,""))},dependencies:[m.ez],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0})}return n})();var T=c(7398),y=function(n){return n[n.Finales=1]="Finales",n[n.Semifinales=2]="Semifinales",n[n.Cuartos=3]="Cuartos",n[n.Octavos=4]="Octavos",n[n.Top_32=5]="Top_32",n[n.Top_64=6]="Top_64",n}(y||{});let P=(()=>{class n{constructor(e){this.templateService=e}getTournament(e){return this.templateService.getTemplateByName(e).pipe((0,T.U)(o=>({template:o,rounds:[]})))}postTournament(e){return this.templateService.putTemplate(e.template,e.template.id).pipe((0,T.U)(()=>!0))}initiateFirstRound(e,o){this.handleContestantIds(e.template.contestants);const s=(_=>{const f=[..._];for(let v=f.length-1;v>0;v--){const w=Math.floor(Math.random()*(v+1));[f[v],f[w]]=[f[w],f[v]]}return f})(e.template.contestants);e.template.contestants=s;const i=2**o,d=i/2,l={position:0,matches:[]};let h=0,g=0;for(;g<d;){const _={firstContestant:s[g]};this.handleTournamentsPlayed(_.firstContestant),l.matches.push(_),g++,h++}let Z=0;for(;h<s.length&&h<i;)l.matches[Z].secondContestant=s[g],this.handleTournamentsPlayed(l.matches[Z].secondContestant),Z++,g++,h++;e.rounds.push(l),e.rounds.push({position:1,matches:[]})}handleContestantIds(e){let o=1;e.forEach(a=>{void 0!==a.id&&a.id>o&&(o=a.id)}),e.forEach(a=>{void 0===a.id&&(a.id=o,o++)})}handleTournamentsPlayed(e){void 0===e.tournamentsPlayed&&(e.tournamentsPlayed=0),e.tournamentsPlayed++}spawnNewRoundIfNeeded(e,o,a){e.rounds[o].matches.length>1&&void 0===e.rounds.at(o+2)&&o+1<a-1&&e.rounds.push({position:o+2,matches:[]})}vote(e,o,a,s,i,d){0===e.rounds[a+1].matches.length||void 0!==e.rounds[a+1].matches.at(-1).secondContestant?e.rounds[a+1].matches.push({firstContestant:i}):e.rounds[a+1].matches.at(-1).secondContestant=i;const l=e.rounds[a].matches[o].firstContestant,h=e.rounds[a].matches[o].secondContestant;this.handleMatchesPlayed(l),this.handleMatchesPlayed(h),this.handleMatchesWon(i),this.handleTournamentResults(i,l,h,a,s,d),this.spawnNewRoundIfNeeded(e,a,s)}handleTournamentResults(e,o,a,s,i,d){if(a){const l={contestantName:"",contestantCoverImg:"",lostInRound:this.getRoundName(s,i),lostToContestant:e.name};o===e?(l.contestantName=a.name,l.contestantCoverImg=a.img):(l.contestantName=o.name,l.contestantCoverImg=o.img),d.losers.push(l)}}handleMatchesPlayed(e){void 0!==e&&(void 0===e.matchesPlayed&&(e.matchesPlayed=0),e.matchesPlayed++)}handleMatchesWon(e){void 0===e.matchesWon&&(e.matchesWon=0),e.matchesWon++}handleTournamentsWon(e){void 0===e.tournamentsWon&&(e.tournamentsWon=0),e.tournamentsWon++}isNotLastMatch(e,o){let a=!0;return e===o-1&&(a=!1),a}handleTimesPlayed(e){void 0===e.template.timesPlayed&&(e.template.timesPlayed=0),e.template.timesPlayed++}getRoundName(e,o){const a=o-e;return a>0&&a<=Object.keys(y).length/2?y[a]:"undefined"}static#t=this.\u0275fac=function(o){return new(o||n)(t.LFG(C.E))};static#e=this.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Q=(()=>{class n{constructor(e){this.service=e}ngOnInit(){this.roundName=this.service.getRoundName(this.currentRound,this.totalRounds)}ngOnChanges(e){e.currentRound&&(this.roundName=this.currentRound<5?this.service.getRoundName(this.currentRound,this.totalRounds):"Top "+2**this.currentRound)}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(P))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-tournament-progress"]],inputs:{totalRounds:"totalRounds",currentRound:"currentRound"},standalone:!0,features:[t.TTD,t.jDz],decls:3,vars:5,consts:[["role","progressbar","aria-label","Warning striped example","aria-valuemin","0",1,"progress"],[1,"progress-bar","progress-bar-striped","bg-warning","progress-bar-animated","text-black"]],template:function(o,a){1&o&&(t.TgZ(0,"div",0)(1,"div",1),t._uU(2),t.qZA()()),2&o&&(t.uIk("aria-valuenow",a.currentRound)("aria-valuemax",a.totalRounds),t.xp6(1),t.Udp("width",100*a.currentRound/(a.totalRounds-1),"%"),t.xp6(1),t.Oqu(a.roundName))},dependencies:[m.ez],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0})}return n})();function z(n,r){if(1&n&&(t.TgZ(0,"div",22)(1,"div",23)(2,"b"),t._uU(3),t.qZA(),t._uU(4),t.TgZ(5,"u"),t._uU(6),t.qZA()(),t._UZ(7,"hr"),t.qZA()),2&n){const e=r.$implicit;t.xp6(3),t.Oqu(e.contestantName),t.xp6(1),t.hij(" perdi\xf3 en ronda ",e.lostInRound," contra "),t.xp6(2),t.Oqu(e.lostToContestant)}}function D(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",3)(1,"div",4)(2,"div",5)(3,"div",6)(4,"div",7)(5,"div",8),t._UZ(6,"img",9),t.qZA(),t.TgZ(7,"p",10),t._uU(8),t.qZA(),t._UZ(9,"img",11),t.qZA()(),t.TgZ(10,"div",6)(11,"div",12)(12,"div",8),t._UZ(13,"img",13),t.qZA(),t.TgZ(14,"p",10),t._uU(15),t.qZA(),t._UZ(16,"img",14),t.qZA()(),t.TgZ(17,"div",6)(18,"div",15)(19,"div",8),t._UZ(20,"img",16),t.qZA(),t.TgZ(21,"p",10),t._uU(22),t.qZA(),t._UZ(23,"img",17),t.qZA()(),t.TgZ(24,"div",6)(25,"div",15)(26,"div",8),t._UZ(27,"img",16),t.qZA(),t.TgZ(28,"p",10),t._uU(29),t.qZA(),t._UZ(30,"img",17),t.qZA()()(),t.TgZ(31,"div",18),t.YNc(32,z,8,3,"div",19),t.qZA()(),t.TgZ(33,"div",20)(34,"button",21),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.onTournamentConcluded())}),t._uU(35,"Volver al torneo"),t.qZA()()()}if(2&n){const e=t.oxw();t.xp6(6),t.s9C("src",e.playedTournament.firstPlaceCoverImg,t.LSH),t.xp6(2),t.Oqu(e.playedTournament.firstPlaceName),t.xp6(5),t.s9C("src",e.playedTournament.secondPlace.contestantCoverImg,t.LSH),t.xp6(2),t.Oqu(e.playedTournament.secondPlace.contestantName),t.xp6(5),t.s9C("src",e.playedTournament.thirdPlaces[0].contestantCoverImg,t.LSH),t.xp6(2),t.Oqu(e.playedTournament.thirdPlaces[0].contestantName),t.xp6(5),t.s9C("src",e.playedTournament.thirdPlaces[1].contestantCoverImg,t.LSH),t.xp6(2),t.Oqu(e.playedTournament.thirdPlaces[1].contestantName),t.xp6(3),t.Q6J("ngForOf",e.playedTournament.losers)}}function B(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"app-contestant-card-big",33),t.NdJ("voteContestant",function(a){t.CHM(e);const s=t.oxw(2);return t.KtG(s.onVote(a))}),t.qZA()}if(2&n){const e=t.oxw(2);t.Q6J("contestant",e.leftContestant)}}function L(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"app-contestant-card-big",33),t.NdJ("voteContestant",function(a){t.CHM(e);const s=t.oxw(2);return t.KtG(s.onVote(a))}),t.qZA()}if(2&n){const e=t.oxw(2);t.Q6J("contestant",e.rightContestant)}}function H(n,r){if(1&n&&(t.TgZ(0,"div",24)(1,"div",25)(2,"div",26),t._UZ(3,"app-tournament-progress",27),t.qZA()(),t.TgZ(4,"div",28)(5,"div",29),t.YNc(6,B,1,1,"app-contestant-card-big",30),t.qZA(),t.TgZ(7,"div",31),t._UZ(8,"app-matchup-tracker",32),t.qZA(),t.TgZ(9,"div",29),t.YNc(10,L,1,1,"app-contestant-card-big",30),t.qZA()()()),2&n){const e=t.oxw();t.xp6(3),t.Q6J("totalRounds",e.totalRounds)("currentRound",e.currentRound),t.xp6(3),t.Q6J("ngIf",e.leftContestant),t.xp6(2),t.Q6J("currentMatch",e.currentMatch+1)("totalMatches",e.totalMatchesForCurrentRound),t.xp6(2),t.Q6J("ngIf",e.rightContestant)}}let G=(()=>{class n{constructor(e,o,a){this.tournamentService=e,this.activatedRoute=o,this.router=a,this.currentRound=0,this.currentMatch=0,this.totalMatchesForCurrentRound=0,this.tournamentEnded=!1;const s={contestantName:"",contestantCoverImg:"",lostInRound:"",lostToContestant:""};this.playedTournament={firstPlaceName:"",firstPlaceCoverImg:"",secondPlace:s,thirdPlaces:[s,s],losers:new Array}}ngOnInit(){let e=this.activatedRoute.snapshot.paramMap.get("templateName"),o=this.activatedRoute.snapshot.paramMap.get("totalRounds");null!==e&&null!==o&&(this.totalRounds=parseInt(o),this.tournamentService.getTournament(e).subscribe({next:a=>{this.tournament=a,this.tournamentService.handleTimesPlayed(this.tournament),this.tournamentService.initiateFirstRound(this.tournament,this.totalRounds),this.leftContestant=this.tournament.rounds[0].matches[0].firstContestant,this.rightContestant=this.tournament.rounds[0].matches[0].secondContestant,this.totalMatchesForCurrentRound=this.tournament.rounds[0].matches.length},error:a=>console.log(a)}))}onVote(e){if(this.tournamentService.isNotLastMatch(this.currentRound,this.totalRounds))this.tournamentService.vote(this.tournament,this.currentMatch,this.currentRound,this.totalRounds,e,this.playedTournament),this.currentMatch++,this.currentMatch===this.tournament.rounds[this.currentRound].matches.length&&(this.currentMatch=0,this.currentRound++,this.totalMatchesForCurrentRound=this.tournament.rounds[this.currentRound].matches.length),this.leftContestant=this.tournament.rounds[this.currentRound].matches[this.currentMatch].firstContestant,this.rightContestant=this.tournament.rounds[this.currentRound].matches[this.currentMatch].secondContestant;else{this.tournamentService.handleMatchesPlayed(this.leftContestant),this.tournamentService.handleMatchesPlayed(this.rightContestant),this.tournamentService.handleMatchesWon(e),this.tournamentService.handleTournamentsWon(e),this.tournamentService.handleTournamentResults(e,this.leftContestant,this.rightContestant,this.currentRound,this.currentMatch,this.playedTournament),this.leftContestant=void 0,this.rightContestant=void 0,this.playedTournament.firstPlaceName=e.name,this.playedTournament.firstPlaceCoverImg=e.img;let o=this.playedTournament.losers.pop();this.playedTournament.secondPlace=JSON.parse(JSON.stringify(o)),o=this.playedTournament.losers.pop(),this.playedTournament.thirdPlaces[0]=JSON.parse(JSON.stringify(o)),o=this.playedTournament.losers.pop(),this.playedTournament.thirdPlaces[1]=JSON.parse(JSON.stringify(o)),this.playedTournament.losers.reverse(),this.tournamentEnded=!0,this.tournamentService.postTournament(this.tournament).subscribe()}}onTournamentConcluded(){this.router.navigate([`view-template/${this.tournament.template.templateName}`])}static#t=this.\u0275fac=function(o){return new(o||n)(t.Y36(P),t.Y36(u.gz),t.Y36(u.F0))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-play-tournament"]],standalone:!0,features:[t.jDz],decls:4,vars:2,consts:[[1,"play-area","container"],["class","result-screen px-md-5 py-md-3",4,"ngIf","ngIfElse"],["displayVoting",""],[1,"result-screen","px-md-5","py-md-3"],[1,"results","rounded","container","pt-2"],[1,"row","justify-content-center","align-items-start","text-center"],[1,"col-3","justify-content-center"],[1,"card","result-card","winner-card","rounded-4","p-2"],[1,"card","result-cover","shadow-lg","contain-image","m-auto"],["alt","Winner Cover Image",1,"object-fit-cover","border-0",3,"src"],[1,"podium-title","fs-4","fw-bold","m-2"],["src","assets/number-1-square-svgrepo-com.svg","alt","",1,"placement"],[1,"card","result-card","second-place","rounded-4","p-2"],[1,"object-fit-cover","border-0",3,"src"],["src","assets/number-2-square-svgrepo-com.svg","alt","",1,"placement"],[1,"card","result-card","third-place","rounded-4","p-2"],["alt","",1,"object-fit-cover","border-0",3,"src"],["src","assets/number-3-square-svgrepo-com.svg","alt","",1,"placement"],[1,"row","p-4"],["class","row fs-4",4,"ngFor","ngForOf"],[1,"d-flex","justify-content-end","mt-3"],[1,"btn","bg-warning",3,"click"],[1,"row","fs-4"],[1,"col","mb-2"],[1,"p-4","p-md-5"],[1,"row","justify-content-center","align-items-center","g-2","mb-5"],[1,"col"],[3,"totalRounds","currentRound"],[1,"row","justify-content-center","align-items-center","g-2"],[1,"col-md-5"],[3,"contestant","voteContestant",4,"ngIf"],[1,"col-md-2","text-center","py-4"],[3,"currentMatch","totalMatches"],[3,"contestant","voteContestant"]],template:function(o,a){if(1&o&&(t.TgZ(0,"div",0),t.YNc(1,D,36,9,"div",1),t.YNc(2,H,11,6,"ng-template",null,2,t.W1O),t.qZA()),2&o){const s=t.MAs(3);t.xp6(1),t.Q6J("ngIf",a.tournamentEnded)("ngIfElse",s)}},dependencies:[m.ez,m.sg,m.O5,Y,E.m,V,Q],styles:["[_nghost-%COMP%]{display:block;height:90vh;overflow-y:auto;overflow-x:hidden}.play-area[_ngcontent-%COMP%]{height:90vh;overflow-y:hidden}.result-card[_ngcontent-%COMP%]   .result-cover[_ngcontent-%COMP%]{height:200px;width:200px}.result-card[_ngcontent-%COMP%]   .result-cover[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%}.result-card[_ngcontent-%COMP%]   .podium-title[_ngcontent-%COMP%]{font-size:x-large;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.result-card[_ngcontent-%COMP%]   .placement[_ngcontent-%COMP%]{width:60%;margin-left:auto;margin-right:auto}.result-card[_ngcontent-%COMP%]:hover   .podium-title[_ngcontent-%COMP%]{max-height:max-content;overflow:auto;white-space:normal}.winner-card[_ngcontent-%COMP%]{background:radial-gradient(ellipse farthest-corner at right bottom,#FEDB37 0%,#FDB931 8%,#9f7928 30%,#8A6E2F 40%,transparent 80%),radial-gradient(ellipse farthest-corner at left top,#FFFFFF 0%,#FFFFAC 8%,#D1B464 25%,#5d4a1f 62.5%,#5d4a1f 100%)}.second-place[_ngcontent-%COMP%]{background:radial-gradient(ellipse farthest-corner at right bottom,#E3e3e3 0%,#D7d7d8 8%,#C0c0c3 30%,#A8a9ad 40%,transparent 80%),radial-gradient(ellipse farthest-corner at left top,#FFFFFF 0%,#E3e3e3 8%,#D7d7d8 25%,#Cbcccd 62.5%,#B4b5b8 100%)}.third-place[_ngcontent-%COMP%]{background:radial-gradient(ellipse farthest-corner at right bottom,#d6873a 0%,#cc7e32 8%,#b86e20 30%,#ad6416 40%,transparent 80%),radial-gradient(ellipse farthest-corner at left top,#FFFFFF 0%,#d6873a 8%,#cc7e32 25%,#cd7f32 62.5%,#b86d20 100%)}.result-screen[_ngcontent-%COMP%]   .results[_ngcontent-%COMP%]{height:80vh;overflow-y:scroll;background:rgba(255,255,255,.25)}"]})}return n})();var X=c(6306),$=c(2096);const x=n=>{const r=(0,t.f3M)(u.F0),e=(0,t.f3M)(C.E),o=n.paramMap.get("totalRounds"),a=n.paramMap.get("templateName");return e.getTemplateByName(a??"").pipe((0,T.U)(s=>{if(o){const i=parseInt(o),d=e.calculateMaxRoundCount(s.contestants?.length??0);return!!(Number.isInteger(i)&&i>=2&&i<=d)||r.parseUrl("404")}return!0}),(0,X.K)(()=>(0,$.of)(r.parseUrl("404"))))},K=[{path:":templateName",component:W,canActivate:[x],loadChildren:()=>c.e(355).then(c.bind(c,3355)).then(n=>n.PlayTournamentModule)},{path:":templateName/play-tournament/:totalRounds",component:G,canActivate:[x]}];let tt=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(K),u.Bz]})}return n})(),et=(()=>{class n{static#t=this.\u0275fac=function(o){return new(o||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[m.ez,p.UX,tt]})}return n})()}}]);