// ===================== NAVIGATION =====================
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.section).classList.add('active');
    if (btn.dataset.section === 'gis' && !window._mapInit) initMap();
  });
});
document.querySelectorAll('.game-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.game-area').forEach(a => a.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.game + '-game').classList.add('active');
  });
});

// ===================== GIS DATA =====================
const gisData = {
  ancient: {
    economic: [
      {coords:[30.0,31.2],name:"Egypt",info:{title:"Ancient Egypt",economy:"Agricultural surplus economy based on Nile flooding cycles. State-controlled granaries, corvée labor, taxation in grain. Trade networks to Punt, Levant, and Nubia.",market:"Barter-based with weighed metal standards (deben). State monopolies on mining and quarrying. International trade managed by royal merchants.",religion:"Polytheistic: Ra, Osiris, Isis. Pharaoh as living god. Ma'at (cosmic order/justice) governed all social relations. Elaborate afterlife beliefs drove monumental architecture.",society:"Rigid hierarchy: Pharaoh → Priests → Nobles → Scribes → Artisans → Farmers → Slaves. Women had property rights unusual for ancient world. Literacy confined to scribal class (~1%)."}},
      {coords:[33.3,44.4],name:"Mesopotamia",info:{title:"Mesopotamia (Sumer/Babylon)",economy:"Irrigation-based agriculture. Code of Hammurabi (1754 BCE) codified commercial law, interest rates, wages, and liability. First known written contracts and accounting.",market:"Silver-standard trade. Temple and palace economies coexisted with private enterprise. Sophisticated credit systems, promissory notes, and partnerships (tappûtum).",religion:"Polytheistic: Anu, Enlil, Marduk. City-patron deities. Epic of Gilgamesh explored mortality and meaning. Ziggurats as cosmic mountains connecting earth and heaven.",society:"City-states with lugal (king) rule. Three classes: awīlum (free), muškēnum (dependent), wardum (slave). Advanced legal codes. Women could own property and run businesses in early periods."}},
      {coords:[37.97,23.72],name:"Greece",info:{title:"Ancient Greece",economy:"Maritime trade economy. Olive oil, wine, pottery exports. Silver mining at Laurium funded Athenian navy. Colonial trade networks across Mediterranean.",market:"Coined money from ~600 BCE (Lydia/Ionia). Agora as marketplace and civic center. Banking (trapezitai) including deposits, loans, and money-changing. Maritime insurance (bottomry loans).",religion:"Olympic pantheon: Zeus, Athena, Apollo. Oracle at Delphi. Mystery cults (Eleusis, Dionysus). Philosophy challenged traditional religion — Socrates charged with impiety.",society:"Polis (city-state) as political unit. Athenian democracy (for male citizens ~15% of population). Sparta's military communalism. Slavery foundational. Philosophy flourished: Socrates, Plato, Aristotle."}},
      {coords:[41.9,12.5],name:"Rome",info:{title:"Roman Republic/Empire",economy:"Latifundia (plantation) agriculture. Provincial tribute system. Massive infrastructure (roads, aqueducts) enabled trade. Grain dole fed urban proletariat. GDP estimated $20B in today's terms.",market:"Denarius silver standard. Complex banking, credit, and investment systems. Publicani (tax farming corporations) were proto-joint-stock companies. Insurance, warehousing, shipping networks.",religion:"Syncretic polytheism absorbing Greek and Eastern cults. Emperor worship as political loyalty. Christianity emerged as persecuted sect, became state religion by 380 CE.",society:"Republic: Patricians vs Plebeians. Patronage networks (clientela). Citizenship expanded gradually. Bread and circuses. Roman law (jus civile, jus gentium) foundational for Western legal tradition."}},
      {coords:[34.0,108.9],name:"China",info:{title:"Ancient China (Zhou-Han)",economy:"Agricultural foundation with state intervention. Iron Age revolution in tools. Salt and iron state monopolies under Han. Silk Road trade began ~130 BCE connecting East to West.",market:"Cowrie shells → bronze coins → Wang Mang reforms. State granaries stabilized prices (Ever-Normal Granary system). Paper money not yet invented but credit instruments existed.",religion:"Confucianism: social harmony through ritual propriety (li), benevolence (ren), filial piety (xiao). Daoism: naturalness (ziran), non-action (wu wei). Buddhism arrived ~1st century CE.",society:"Mandate of Heaven legitimized rule. Scholar-gentry class (shi) rose via Confucian education. Legalism under Qin: strict law, standardization. Han synthesis combined Confucian ethics with Legalist administration."}},
      {coords:[20.6,78.9],name:"India",info:{title:"Ancient India (Maurya-Gupta)",economy:"Arthashastra (Kautilya, ~300 BCE): treatise on statecraft and economics. State mining, manufacturing, trade regulation. Agriculture taxed at 1/6 of produce. Extensive maritime trade.",market:"Punch-marked coins. Guild system (shreni) organized craft production with quality standards. Merchant associations managed trade routes. Indian Ocean maritime networks to Rome, Southeast Asia.",religion:"Vedic Hinduism → Upanishadic philosophy (Brahman/Atman). Buddhism (Siddhartha Gautama, ~500 BCE): Four Noble Truths, Eightfold Path. Jainism: non-violence (ahimsa). Bhagavad Gita synthesized multiple paths.",society:"Varna system (Brahmin, Kshatriya, Vaishya, Shudra) with jati sub-divisions. Dharma governed social obligations. Ashoka's edicts promoted tolerance and welfare. Nalanda University: intellectual center."}}
    ],
    religion: [], markets: [], society: []
  },
  medieval: {
    economic: [
      {coords:[48.85,2.35],name:"France",info:{title:"Medieval France/Europe",economy:"Feudal manorialism: land-for-service economy. Serfs tied to land, owed labor and produce. Three-field crop rotation increased yields. Guilds controlled urban production. Hanseatic League dominated northern trade.",market:"Weekly markets and annual fairs (Champagne fairs). Limited coinage — barter and kind payments common. Usury prohibited by Church, leading to Jewish/Lombard banking. Bills of exchange emerged for long-distance trade.",religion:"Roman Catholic Church dominated. Papal authority rivaled kings. Monasteries preserved knowledge and managed agriculture. Crusades (1095-1291) mixed religious zeal with commercial ambition. Scholasticism synthesized faith and reason (Aquinas).",society:"Three estates: Those who pray (clergy), fight (nobility), work (peasants). Chivalric codes. Universities founded (Paris, Bologna, Oxford). Black Death (1347-51) killed 1/3 of Europe, disrupting feudal order."}},
      {coords:[35.68,139.69],name:"Japan",info:{title:"Medieval Japan",economy:"Rice-based economy under shogunate. Daimyo (lords) controlled han (domains). Samurai received rice stipends. Tea ceremony culture drove luxury goods trade. Maritime trade with China and Korea.",market:"Rice as currency alongside coinage. Merchant class (chōnin) grew wealthy but ranked lowest in Neo-Confucian hierarchy. Osaka became 'kitchen of Japan' — commodity exchange center.",religion:"Shinto (indigenous nature worship) coexisted with Buddhism. Zen Buddhism influenced samurai culture, tea ceremony, garden design. Pure Land Buddhism offered salvation to common people.",society:"Feudal hierarchy: Emperor (symbolic) → Shogun → Daimyo → Samurai → Peasants → Artisans → Merchants. Bushido code. Women's status declined from Heian period. Literacy among samurai class."}},
      {coords:[33.5,36.3],name:"Islamic",info:{title:"Islamic Golden Age",economy:"Vast trade networks: Silk Road, Indian Ocean, trans-Saharan. Agricultural revolution brought new crops (citrus, sugarcane, cotton). Waqf (endowment) system funded public goods. Advanced mathematics (algebra) aided commerce.",market:"Dinar/dirham currency. Suftaja (bills of exchange), mudaraba (profit-sharing partnerships), hawala (informal money transfer). Bazaar system with specialized quarters. Prohibition of riba (interest) drove innovative financial instruments.",religion:"Islam: Five Pillars. Sunni/Shia split after 661 CE. Sufism added mystical dimension. Islamic law (Sharia) governed commerce, family, criminal matters. Scholars preserved and extended Greek philosophy.",society:"Ummah (community of believers) transcended tribal/ethnic lines. Dhimmi system for Christians and Jews. Education valued: madrasas, House of Wisdom (Baghdad). Ibn Khaldun: father of sociology. Advances in medicine, optics, astronomy."}}
    ],
    religion: [], markets: [], society: []
  },
  "early-modern": {
    economic: [
      {coords:[52.37,4.89],name:"Netherlands",info:{title:"Dutch Golden Age",economy:"First modern capitalist economy. VOC (Dutch East India Company, 1602): first publicly traded corporation. Tulip mania (1637): first recorded speculative bubble. Herring fishery and textile manufacturing.",market:"Amsterdam Stock Exchange (1602): continuous securities trading. Bank of Amsterdam (1609): deposit banking, clearinghouse. Futures contracts, options trading, short selling all practiced. Insurance markets.",religion:"Calvinist Reformed Church dominant but religious tolerance attracted persecuted minorities (Jews, Huguenots). Arminian controversy. Spinoza developed radical philosophy in Amsterdam's free intellectual climate.",society:"Republic governed by regents (wealthy merchants). High urbanization, literacy, and living standards. Golden Age art (Rembrandt, Vermeer). Tolerance and cosmopolitanism. Colonial empire in Indonesia, Americas."}},
      {coords:[51.5,-0.12],name:"Britain",info:{title:"British Empire Rise",economy:"Mercantilism → Industrial Revolution. Enclosure movement displaced peasants to cities. Coal, iron, textile manufacturing. East India Company controlled Indian trade. Atlantic slave trade financed development.",market:"Bank of England (1694). National debt as financial innovation. South Sea Bubble (1720). Adam Smith's 'Wealth of Nations' (1776) argued for free markets, division of labor, invisible hand.",religion:"Anglican Church (Henry VIII's break with Rome). Puritan revolution. Religious Dissenters (Quakers, Methodists) drove social reform. Deism and Enlightenment rationalism. Religious tolerance gradually expanded.",society:"Parliamentary constitutional monarchy after 1688. Landed aristocracy, growing middle class. Enlightenment philosophy (Locke, Hume). Abolition movement. Poor Laws. Industrial working class emerged."}},
      {coords:[35.7,51.4],name:"Persia",info:{title:"Safavid Persia",economy:"Silk production and export. Shah Abbas I's reforms centralized trade. Isfahan became commercial hub connecting Ottoman, Mughal, and European markets. Armenian merchants managed long-distance trade networks.",market:"Bazaar system with caravanserais. Royal monopolies on silk. Silver imports from Americas via European trade. Carpet production became major export industry.",religion:"Shia Islam made state religion (1501). Sufi orders initially supported then suppressed. Persecution of Sunnis. Religious scholars (ulema) gained institutional power. Zoroastrian and Jewish minorities persisted.",society:"Shah as shadow of God. Qizilbash tribal military elite. Persian cultural renaissance in art, architecture, poetry. Isfahan: 'half the world.' Bureaucratic state with provincial governors."}}
    ],
    religion: [], markets: [], society: []
  },
  modern: {
    economic: [
      {coords:[38.9,-77.0],name:"USA",info:{title:"United States",economy:"From agricultural to industrial to post-industrial economy. GDP ~$25 trillion. Federal Reserve (1913). New Deal transformed government role. Tech sector (Silicon Valley) drives innovation. Financialization since 1980s.",market:"NYSE (1792), NASDAQ. Free market capitalism with regulation. Antitrust law (Sherman Act 1890). Securities regulation after 1929 crash. Globalization, NAFTA/USMCA. Cryptocurrency emergence.",religion:"Constitutional separation of church and state. Protestant mainline → evangelical growth. Catholic immigration. Religious pluralism. 'In God We Trust' (1956). Culture wars over religion's public role.",society:"Constitutional republic. Immigration waves shaped identity. Civil rights movement. Suburbanization. Consumer culture. Income inequality rising since 1970s. Tech disruption of traditional institutions."}},
      {coords:[55.75,37.62],name:"Russia",info:{title:"Russia/USSR",economy:"Tsarist feudalism → Bolshevik revolution (1917) → central planning. Five-year plans industrialized rapidly. Cold War military-industrial complex. 1991 collapse → oligarchic capitalism → state capitalism under Putin.",market:"Communist planned economy eliminated private markets (1928-1991). Gosplan set prices, production quotas. Black markets thrived. Post-1991 shock therapy privatization. Voucher system led to oligarch concentration.",religion:"Russian Orthodox Church: symphonia with state. Bolsheviks suppressed religion. Post-1991 Orthodox revival as national identity. Islam in Caucasus and Tatarstan. Dostoevsky's religious existentialism.",society:"Tsarist autocracy → Soviet one-party state → managed democracy. Collectivization, urbanization. High education and literacy achievements. Gulag system. Intelligentsia tradition. Space program achievements."}},
      {coords:[35.7,139.7],name:"Japan-Modern",info:{title:"Modern Japan",economy:"Meiji Restoration (1868): rapid industrialization. Zaibatsu conglomerates. Post-WWII miracle: export-led growth, keiretsu system. Bubble economy (1989) and 'lost decades.' Third largest economy globally.",market:"Tokyo Stock Exchange. Ministry of Finance guided 'developmental state' model. Lifetime employment and seniority wages. Just-in-time manufacturing (Toyota). Aging population challenges growth.",religion:"State Shinto (1868-1945) promoted emperor worship and nationalism. Post-war religious freedom. Buddhism and Shinto coexist in daily life. New religious movements (Soka Gakkai). Secular in practice.",society:"Homogeneous society with strong group identity. Education-focused meritocracy. Corporate loyalty culture. Low crime, high social cohesion. Gender inequality persists. Declining birth rate crisis."}}
    ],
    religion: [], markets: [], society: []
  }
};

// ===================== MAP INIT =====================
window._mapInit = false;
function initMap() {
  window._mapInit = true;
  const map = L.map('map').setView([30, 40], 3);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO',maxZoom:18
  }).addTo(map);
  window._map = map;
  window._markers = [];
  loadGISLayer();
}

function loadGISLayer() {
  const era = document.getElementById('era-select').value;
  const layer = document.getElementById('layer-select').value;
  const map = window._map;
  window._markers.forEach(m => map.removeLayer(m));
  window._markers = [];
  const data = gisData[era]?.economic || [];
  data.forEach(loc => {
    const marker = L.circleMarker(loc.coords, {
      radius: 12, fillColor: '#a855f7', color: '#00d4ff', weight: 2, opacity: 1, fillOpacity: 0.6
    }).addTo(map);
    marker.bindTooltip(loc.name, {permanent: false, direction: 'top'});
    marker.on('click', () => showGISInfo(loc.info, layer));
    window._markers.push(marker);
  });
}

function showGISInfo(info, layer) {
  const panel = document.getElementById('gis-info-panel');
  document.getElementById('info-title').textContent = info.title;
  let html = '<div class="info-grid">';
  html += `<div class="info-card"><h4>Economic System</h4>${info.economy}</div>`;
  html += `<div class="info-card"><h4>Market Style</h4>${info.market}</div>`;
  html += `<div class="info-card"><h4>Religion & Philosophy</h4>${info.religion}</div>`;
  html += `<div class="info-card"><h4>Social Structure</h4>${info.society}</div>`;
  html += '</div>';
  document.getElementById('info-content').innerHTML = html;
}

document.getElementById('era-select')?.addEventListener('change', loadGISLayer);
document.getElementById('layer-select')?.addEventListener('change', loadGISLayer);
setTimeout(() => { if (document.getElementById('gis').classList.contains('active')) initMap(); }, 300);

// ===================== PHILOSOPHY DATA =====================
const philosophyData = {
  justice: [
    {name:"Plato",dates:"428-348 BCE",tradition:"western",stance:"Justice is the harmony of the soul and the state. Each class performs its proper function. The philosopher-king rules through knowledge of the Form of the Good. Democracy is flawed because the masses lack wisdom.",quote:"Justice means minding your own business and not meddling with other men's concerns."},
    {name:"Aristotle",dates:"384-322 BCE",tradition:"western",stance:"Justice is giving each person their due (distributive justice) and making fair exchanges (corrective justice). The virtuous middle path between extremes. The polis exists to promote the good life, not merely life.",quote:"The law is reason, free from passion."},
    {name:"John Rawls",dates:"1921-2002",tradition:"western",stance:"Justice as fairness: behind a 'veil of ignorance,' rational people would choose equal basic liberties and allow inequalities only if they benefit the least advantaged (difference principle). Social contract for modern democracies.",quote:"Justice is the first virtue of social institutions, as truth is of systems of thought."},
    {name:"Robert Nozick",dates:"1938-2002",tradition:"western",stance:"Libertarian justice: people have inviolable rights. Just distribution results from voluntary exchanges from just starting points. Taxation for redistribution is 'forced labor.' Minimal state only to protect against force, fraud, theft.",quote:"Individuals have rights, and there are things no person or group may do to them without violating their rights."},
    {name:"Confucius",dates:"551-479 BCE",tradition:"eastern",stance:"Justice (yi) is acting rightly based on social relationships and ritual propriety (li). The ruler must be virtuous to earn the people's loyalty. Rectification of names: things must correspond to their proper roles.",quote:"What you do not wish for yourself, do not do to others."},
    {name:"Mozi",dates:"470-391 BCE",tradition:"eastern",stance:"Impartial care (jian ai): justice requires treating all people equally regardless of relationship. Opposed Confucian partiality toward family. Consequentialist: right action produces the greatest benefit for the greatest number.",quote:"Partiality is to be replaced by universality."},
    {name:"Ibn Khaldun",dates:"1332-1406",tradition:"eastern",stance:"Justice is essential for civilization. Unjust taxation and oppression destroy asabiyyah (social cohesion) and cause civilizations to collapse. Cyclical theory: nomadic vigor conquers decadent civilization, then itself becomes decadent.",quote:"Injustice ruins civilization. The ruin of civilization means the ruin of the state."},
    {name:"Thomas Aquinas",dates:"1225-1274",tradition:"western",stance:"Natural law: justice is grounded in divine reason accessible through human reason. Law must serve the common good. Unjust laws are not truly laws. Just war theory: proportional, last resort, legitimate authority.",quote:"Justice is a certain rectitude of mind whereby a man does what he ought to do in the circumstances confronting him."}
  ],
  liberty: [
    {name:"John Stuart Mill",dates:"1806-1873",tradition:"western",stance:"The harm principle: liberty should only be restricted to prevent harm to others. Freedom of thought, speech, and action essential for human flourishing and truth-seeking. Tyranny of the majority is as dangerous as tyranny of rulers.",quote:"The only freedom which deserves the name is that of pursuing our own good in our own way."},
    {name:"John Locke",dates:"1632-1704",tradition:"western",stance:"Natural rights to life, liberty, and property precede government. Government exists only by consent of the governed. Right to revolution when government violates natural rights. Foundational for American Declaration of Independence.",quote:"Being all equal and independent, no one ought to harm another in his life, health, liberty, or possessions."},
    {name:"Jean-Jacques Rousseau",dates:"1712-1778",tradition:"western",stance:"'Man is born free, and everywhere he is in chains.' The social contract transforms natural liberty into civil liberty. The general will represents true freedom — obeying laws we give ourselves. Private property created inequality.",quote:"Man is born free, and everywhere he is in chains."},
    {name:"Isaiah Berlin",dates:"1909-1997",tradition:"western",stance:"Two concepts of liberty: Negative liberty (freedom FROM interference) vs. Positive liberty (freedom TO realize one's potential). Warned that positive liberty can be used to justify coercion 'for people's own good.' Value pluralism: no single correct way of life.",quote:"Freedom for the wolves has often meant death to the sheep."},
    {name:"Laozi",dates:"~6th cent BCE",tradition:"eastern",stance:"True freedom comes from following the Dao (Way) — naturalness, spontaneity, non-action (wu wei). Government that governs least governs best. Civilization's artificiality chains us. Return to simplicity.",quote:"Governing a great nation is like cooking a small fish — too much handling will spoil it."},
    {name:"Zhuangzi",dates:"369-286 BCE",tradition:"eastern",stance:"Radical freedom through releasing attachment to social conventions, fixed identity, and rational categories. Perspectivism: the butterfly dream questions the boundary between dreaming and waking. Uselessness as liberation.",quote:"Happiness is the absence of the striving for happiness."},
    {name:"Friedrich Hayek",dates:"1899-1992",tradition:"western",stance:"Liberty requires limits on government power. Central planning is the 'road to serfdom.' Spontaneous order of free markets produces better outcomes than designed systems. The rule of law, not rule of men. Knowledge is dispersed — no planner can possess it all.",quote:"The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design."},
    {name:"Simone de Beauvoir",dates:"1908-1986",tradition:"western",stance:"Existentialist freedom: we are 'condemned to be free.' Women's oppression as 'the Other' denies their freedom and transcendence. Liberation requires both structural change and transformation of consciousness.",quote:"One is not born, but rather becomes, a woman."}
  ],
  equality: [
    {name:"Karl Marx",dates:"1818-1883",tradition:"western",stance:"Capitalism creates class inequality through exploitation of surplus labor value. History is class struggle. Private property must be abolished. Communism: 'from each according to ability, to each according to needs.' The state will wither away.",quote:"The history of all hitherto existing society is the history of class struggles."},
    {name:"Mary Wollstonecraft",dates:"1759-1797",tradition:"western",stance:"Pioneer of feminist thought. Women's apparent inferiority results from denied education, not nature. Equal education and political rights for women. Reason, not sentiment, should guide moral and political life.",quote:"I do not wish women to have power over men, but over themselves."},
    {name:"Martin Luther King Jr.",dates:"1929-1968",tradition:"western",stance:"Racial equality through nonviolent resistance and moral persuasion. Injustice anywhere threatens justice everywhere. Integration over separatism. Economic justice alongside civil rights. The beloved community as political goal.",quote:"Injustice anywhere is a threat to justice everywhere."},
    {name:"B.R. Ambedkar",dates:"1891-1956",tradition:"eastern",stance:"Caste system is the most extreme form of inequality. Political democracy meaningless without social democracy. Constitutional rights and affirmative action needed to uplift oppressed castes. Converted to Buddhism rejecting Hindu caste hierarchy.",quote:"Political democracy cannot last unless there lies at the base of it social democracy."},
    {name:"Amartya Sen",dates:"1933-",tradition:"eastern",stance:"Capability approach: equality should be measured by what people are able to do and be, not just income. Development as freedom. Democracy prevents famines. Identity is plural — reducing people to single categories causes violence.",quote:"Poverty is not just a lack of money; it is not having the capability to realize one's full potential as a human being."},
    {name:"Friedrich Nietzsche",dates:"1844-1900",tradition:"western",stance:"Radical critic of equality. 'Slave morality' of Christianity and democracy suppresses human excellence. The Übermensch creates own values beyond good and evil. Equality is the leveling-down of the exceptional. Will to power drives all life.",quote:"The demand for equality is made only by those who feel themselves to be in some way inferior."}
  ],
  power: [
    {name:"Niccolò Machiavelli",dates:"1469-1527",tradition:"western",stance:"Political realism: the effective ruler must learn 'how not to be good.' It is better to be feared than loved. Virtu (skill/prowess) combined with fortuna (luck) determines political success. Republic is best government, but sometimes a prince is necessary.",quote:"Everyone sees what you appear to be, few experience what you really are."},
    {name:"Thomas Hobbes",dates:"1588-1679",tradition:"western",stance:"Without government, life is 'solitary, poor, nasty, brutish, and short.' Rational self-interest leads people to surrender freedom to a sovereign (Leviathan) for security. Absolute authority prevents civil war. Social contract is irreversible.",quote:"The condition of man is a condition of war of everyone against everyone."},
    {name:"Michel Foucault",dates:"1926-1984",tradition:"western",stance:"Power is not merely repressive but productive — it creates knowledge, norms, subjects. Disciplinary power operates through institutions (prisons, schools, hospitals). Knowledge and power are inseparable (power/knowledge). Resistance is always possible within power relations.",quote:"Where there is power, there is resistance."},
    {name:"Hannah Arendt",dates:"1906-1975",tradition:"western",stance:"Power belongs to the group, not the individual — it arises when people act together. Totalitarianism destroys the public realm and human plurality. The 'banality of evil': ordinary people enable atrocities through thoughtlessness. Political action is the highest human capacity.",quote:"The sad truth is that most evil is done by people who never make up their minds to be good or evil."},
    {name:"Chanakya (Kautilya)",dates:"~375-283 BCE",tradition:"eastern",stance:"Arthashastra: pragmatic statecraft. The king's duty is the welfare of subjects. Espionage, diplomacy, military strategy, economic management — all tools of rule. Mandala theory of interstate relations. Realpolitik 1800 years before Machiavelli.",quote:"A king who is not righteous in his conduct or whose subjects are not prosperous is destined to lose his kingdom."},
    {name:"Han Feizi",dates:"280-233 BCE",tradition:"eastern",stance:"Legalism: human nature is selfish. Clear laws with strict rewards and punishments, not virtue, maintain order. The ruler must be inscrutable and use techniques (shu) to control ministers. Institutional strength over personal virtue.",quote:"The intelligent ruler makes the law select men and makes no arbitrary promotions himself."}
  ],
  economics: [
    {name:"Adam Smith",dates:"1723-1790",tradition:"western",stance:"Free markets guided by self-interest ('invisible hand') produce optimal outcomes. Division of labor increases productivity. Government role limited to defense, justice, public works. But also warned against merchant conspiracies against the public.",quote:"It is not from the benevolence of the butcher that we expect our dinner, but from his regard to his own interest."},
    {name:"Karl Marx",dates:"1818-1883",tradition:"western",stance:"Capitalism exploits workers by extracting surplus value. Crises of overproduction are inherent. Historical materialism: economic base determines superstructure (law, politics, culture). Communism abolishes private ownership of means of production.",quote:"Capital is dead labor, which, vampire-like, lives only by sucking living labor."},
    {name:"John Maynard Keynes",dates:"1883-1946",tradition:"western",stance:"Markets can fail — aggregate demand can be insufficient. Government spending should fill gaps during recessions. 'In the long run we are all dead' — practical solutions needed now. Managed capitalism saves capitalism from itself.",quote:"The difficulty lies not so much in developing new ideas as in escaping from old ones."},
    {name:"Milton Friedman",dates:"1912-2006",tradition:"western",stance:"Monetarism: control money supply to manage economy. Free markets maximize freedom and efficiency. Government intervention causes more problems than it solves. School vouchers, volunteer military, floating exchange rates. Shareholder capitalism.",quote:"There is no such thing as a free lunch."},
    {name:"Amartya Sen",dates:"1933-",tradition:"eastern",stance:"Economics must focus on human capabilities and freedoms, not just GDP. Markets need regulation to ensure fairness. Public goods (education, healthcare) essential for development. Social choice theory shows no perfect voting system exists.",quote:"Development consists of the removal of various types of unfreedoms that leave people with little choice."},
    {name:"Muhammad Yunus",dates:"1940-",tradition:"eastern",stance:"Microfinance empowers the poor through small loans without collateral. Social business: enterprises that solve social problems without maximizing profit. Poverty is not created by the poor — it's created by the system. Grameen Bank model.",quote:"Poor people are bonsai people. There is nothing wrong with their seeds. Only society never gave them the base to grow on."}
  ],
  war: [
    {name:"Sun Tzu",dates:"~544-496 BCE",tradition:"eastern",stance:"War is vital to the state but must be approached with utmost gravity. Supreme excellence: winning without fighting. Deception, intelligence, and adaptability over brute force. Know yourself and know your enemy.",quote:"The supreme art of war is to subdue the enemy without fighting."},
    {name:"Carl von Clausewitz",dates:"1780-1831",tradition:"western",stance:"War is the continuation of politics by other means. The 'fog of war' and 'friction' make rational planning difficult. Total war vs. limited war. The 'remarkable trinity' of violence, chance, and reason. Moral forces dominate.",quote:"War is merely the continuation of politics by other means."},
    {name:"Immanuel Kant",dates:"1724-1804",tradition:"western",stance:"Perpetual peace through republican constitutions, federation of free states, and cosmopolitan law. Democratic peace theory: republics rarely war with each other. Standing armies should be abolished. No secret treaties or interference in other states.",quote:"Perpetual peace is guaranteed by no less an authority than the great artist Nature herself."},
    {name:"Mahatma Gandhi",dates:"1869-1948",tradition:"eastern",stance:"Ahimsa (non-violence) as both moral principle and political strategy. Satyagraha ('truth-force'): resist injustice through civil disobedience, non-cooperation, and suffering. Violence breeds more violence. Means must be consistent with ends.",quote:"An eye for an eye only ends up making the whole world blind."},
    {name:"Frantz Fanon",dates:"1925-1961",tradition:"western",stance:"Colonized peoples have the right to violent resistance. Colonialism is itself violence. Decolonization transforms both colonizer and colonized. National liberation requires cultural as well as political revolution. Violence can be cathartic for the oppressed.",quote:"For the colonized people the most essential value is first and foremost the land."},
    {name:"Thich Nhat Hanh",dates:"1926-2022",tradition:"eastern",stance:"Engaged Buddhism: mindfulness applied to social action. Peace begins within — inner transformation is prerequisite for outer peace. 'Interbeing': we are interconnected. Compassionate listening resolves conflicts. Opposed Vietnam War from Buddhist perspective.",quote:"Peace is not simply the absence of violence; it is the cultivation of understanding, insight, and compassion."}
  ],
  environment: [
    {name:"Henry David Thoreau",dates:"1817-1862",tradition:"western",stance:"'In wildness is the preservation of the world.' Simple living in nature cultivates moral clarity. Civil disobedience against unjust government. Walden: experiment in self-sufficiency. Nature has intrinsic value beyond human use.",quote:"In wildness is the preservation of the world."},
    {name:"Aldo Leopold",dates:"1887-1948",tradition:"western",stance:"Land ethic: extend moral consideration to soils, waters, plants, animals — the land community. 'A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community.' Conservation as moral duty.",quote:"We abuse land because we regard it as a commodity belonging to us. When we see land as a community to which we belong, we may begin to use it with love and respect."},
    {name:"Vandana Shiva",dates:"1952-",tradition:"eastern",stance:"Ecofeminism: patriarchal domination of nature and women are linked. Biodiversity and traditional knowledge must be protected against corporate monoculture. Seed sovereignty: farmers' right to save and share seeds. Earth democracy.",quote:"You are not Atlas carrying the world on your shoulder. It is good to remember that the planet is carrying you."},
    {name:"Arne Næss",dates:"1912-2009",tradition:"western",stance:"Deep ecology: nature has intrinsic value independent of human utility. Shallow environmentalism merely manages resources for human benefit. Self-realization expands the self to identify with all living beings. Biocentric equality.",quote:"The essence of deep ecology is to ask deeper questions... We ask why and how, where others do not."}
  ],
  education: [
    {name:"Plato",dates:"428-348 BCE",tradition:"western",stance:"Education turns the soul toward the light (Allegory of the Cave). Philosopher-kings require decades of mathematical and dialectical training. Education determines social class. Censorship of art that corrupts youth.",quote:"The direction in which education starts a man will determine his future life."},
    {name:"John Dewey",dates:"1859-1952",tradition:"western",stance:"Progressive education: learning by doing. Democracy requires educated, participatory citizens. Schools are laboratories for democracy. Experience, not rote memorization. Education is not preparation for life — it is life itself.",quote:"Education is not preparation for life; education is life itself."},
    {name:"Paulo Freire",dates:"1921-1997",tradition:"western",stance:"'Banking model' of education (depositing facts) oppresses. Critical pedagogy: students and teachers learn together through dialogue. Conscientização (critical consciousness) enables the oppressed to transform their reality.",quote:"Education either functions as an instrument to bring about conformity or as the practice of freedom."},
    {name:"Rabindranath Tagore",dates:"1861-1941",tradition:"eastern",stance:"Education must develop the whole person: intellectual, emotional, spiritual. Nature-based learning. Freedom of mind over rote memorization. Cultural exchange between East and West. Founded Visva-Bharati University as 'world university.'",quote:"The highest education is that which does not merely give us information but makes our life in harmony with all existence."},
    {name:"Confucius",dates:"551-479 BCE",tradition:"eastern",stance:"Education cultivates virtue (ren) and proper conduct (li). Learning is lifelong and transformative. Teacher-student relationship is sacred. Self-cultivation leads to social harmony. Education should be based on merit, not birth.",quote:"Education breeds confidence. Confidence breeds hope. Hope breeds peace."}
  ]
};

// ===================== PHILOSOPHY RENDER =====================
function renderPhilosophy() {
  const topic = document.getElementById('phil-topic').value;
  const tradition = document.getElementById('phil-tradition').value;
  const grid = document.getElementById('philosophy-grid');
  let data = philosophyData[topic] || [];
  if (tradition !== 'all') data = data.filter(p => p.tradition === tradition);
  grid.innerHTML = data.map(p => `
    <div class="phil-card">
      <div class="philosopher">${p.name}</div>
      <div class="dates">${p.dates}</div>
      <span class="tradition-tag ${p.tradition}">${p.tradition === 'western' ? 'Western' : 'Eastern'}</span>
      <div class="stance">${p.stance}</div>
      <div class="quote">"${p.quote}"</div>
    </div>
  `).join('');
}
document.getElementById('phil-topic')?.addEventListener('change', renderPhilosophy);
document.getElementById('phil-tradition')?.addEventListener('change', renderPhilosophy);
renderPhilosophy();

// ===================== POLITICAL IDEOLOGIES =====================
const ideologyData = {
  economy: [
    {label:"Far Left (Communism)",cls:"ideo-far-left",content:"<strong>Abolish private ownership</strong> of means of production. Central planning replaces markets. Workers collectively own factories, land, resources. 'From each according to ability, to each according to needs.' <strong>Thinkers:</strong> Marx, Engels, Lenin, Mao."},
    {label:"Left (Democratic Socialism)",cls:"ideo-left",content:"<strong>Mixed economy</strong> with strong public sector. Nationalize key industries (energy, transport, healthcare). Strong unions, worker cooperatives. Wealth redistribution through progressive taxation. <strong>Thinkers:</strong> Eugene Debs, Rosa Luxemburg, Bernie Sanders."},
    {label:"Center-Left (Social Democracy)",cls:"ideo-center-left",content:"<strong>Regulated capitalism</strong> with generous welfare state. Universal healthcare, education, childcare. Progressive taxation. Strong labor protections. Nordic model. Keynesian economics. <strong>Thinkers:</strong> Keynes, FDR, Olof Palme."},
    {label:"Center",cls:"ideo-center",content:"<strong>Pragmatic mixed approach.</strong> Market economy with targeted regulation. Balanced budgets with safety nets. Free trade with worker protections. Evidence-based policy over ideology. <strong>Thinkers:</strong> Anthony Giddens ('Third Way'), Macron."},
    {label:"Center-Right (Conservatism)",cls:"ideo-center-right",content:"<strong>Free enterprise</strong> with limited regulation. Lower taxes to stimulate growth. Fiscal responsibility. Property rights sacrosanct. Suspicion of government intervention. Tradition and institutional stability. <strong>Thinkers:</strong> Edmund Burke, Margaret Thatcher."},
    {label:"Right (Free Market)",cls:"ideo-right",content:"<strong>Minimal government</strong> in economy. Flat or low taxes. Deregulation. Privatize public services. Free trade. Supply-side economics ('trickle-down'). Individual responsibility over collective provision. <strong>Thinkers:</strong> Milton Friedman, Hayek, Reagan."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Maximum economic freedom.</strong> Eliminate most taxes, regulations, licensing. End the Federal Reserve. Gold standard or cryptocurrency. Voluntary exchange only. No minimum wage, no tariffs. <strong>Thinkers:</strong> Murray Rothbard, Ayn Rand, Ron Paul."}
  ],
  healthcare: [
    {label:"Far Left",cls:"ideo-far-left",content:"<strong>Universal public healthcare</strong> as human right. Eliminate private insurance entirely. Nationalize pharmaceutical companies. Healthcare workers as public employees. No profit motive in medicine."},
    {label:"Left",cls:"ideo-left",content:"<strong>Single-payer Medicare for All.</strong> Government provides insurance, private providers deliver care. Negotiate drug prices. Mental health parity. Cover dental, vision, long-term care."},
    {label:"Center-Left",cls:"ideo-center-left",content:"<strong>Public option</strong> alongside private insurance. Expand ACA/Medicaid. Subsidize premiums. Regulate drug prices. Pre-existing condition protections. Universal coverage goal."},
    {label:"Center",cls:"ideo-center",content:"<strong>Regulated market</strong> with safety net. Employer-based insurance with public backstop. Market competition to reduce costs. Targeted subsidies for low-income. Bipartisan reforms."},
    {label:"Center-Right",cls:"ideo-center-right",content:"<strong>Market-based reforms.</strong> Health savings accounts. Sell insurance across state lines. Tort reform. Block-grant Medicaid to states. Tax credits instead of mandates. Maintain employer-based system."},
    {label:"Right",cls:"ideo-right",content:"<strong>Free market healthcare.</strong> Deregulate insurance markets. Price transparency. Direct primary care. Eliminate employer mandate. Minimal government role. Charity for the poor."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Fully private healthcare.</strong> Eliminate Medicare/Medicaid. End FDA drug approval monopoly. Let markets set prices. Mutual aid societies and charity hospitals. No mandates whatsoever."}
  ],
  education: [
    {label:"Far Left",cls:"ideo-far-left",content:"<strong>Free public education</strong> from pre-K through graduate school. Abolish private schools. Cancel all student debt. Democratic control of curriculum. Education as liberation (Freire)."},
    {label:"Left",cls:"ideo-left",content:"<strong>Fully funded public schools.</strong> Free public college. Student debt cancellation. Increase teacher pay dramatically. Reduce standardized testing. Culturally responsive curriculum."},
    {label:"Center-Left",cls:"ideo-center-left",content:"<strong>Strong public education</strong> investment. Community college free. Subsidized 4-year tuition. Universal pre-K. Teacher training investment. Evidence-based reforms."},
    {label:"Center",cls:"ideo-center",content:"<strong>Improve existing systems.</strong> Merit pay for teachers. Public-private partnerships. STEM emphasis. Moderate tuition assistance. Accountability standards."},
    {label:"Center-Right",cls:"ideo-center-right",content:"<strong>School choice:</strong> charter schools, vouchers. Local control over curriculum. Parental rights in education. Standards and accountability. Limit federal role (dismantle Dept. of Education)."},
    {label:"Right",cls:"ideo-right",content:"<strong>Privatize education.</strong> Universal vouchers. Competition improves quality. Homeschooling freedom. Religious schools eligible for public funds. Parents decide curriculum."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Separate school and state.</strong> Fully private education market. No public schools, no compulsory attendance. Unschooling. Parents bear full responsibility. Market provides diverse options."}
  ],
  immigration: [
    {label:"Far Left",cls:"ideo-far-left",content:"<strong>Open borders.</strong> Freedom of movement as human right. Abolish ICE/border enforcement. Full rights for all residents regardless of status. Borders are tools of capitalist exploitation."},
    {label:"Left",cls:"ideo-left",content:"<strong>Path to citizenship</strong> for undocumented. Expand legal immigration. DACA protections. Reduce deportations. Welcome refugees. Address root causes (poverty, violence) in origin countries."},
    {label:"Center-Left",cls:"ideo-center-left",content:"<strong>Comprehensive reform:</strong> path to citizenship + border security. Increase legal immigration. Protect DREAMers. Humane detention standards. Guest worker programs."},
    {label:"Center",cls:"ideo-center",content:"<strong>Balanced approach.</strong> Secure borders + earned legalization. Merit-based and family-based immigration. E-Verify. Bipartisan compromise. Pragmatic enforcement."},
    {label:"Center-Right",cls:"ideo-center-right",content:"<strong>Legal immigration yes, illegal no.</strong> Secure borders first. Merit-based system favoring skills. End chain migration. Mandatory E-Verify. No amnesty. Reduce refugee admissions."},
    {label:"Right",cls:"ideo-right",content:"<strong>Strict enforcement.</strong> Build border wall. Reduce legal immigration. End birthright citizenship debate. Mandatory deportation. English as official language. Protect jobs and wages for citizens."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Free movement of people</strong> (like goods). Open immigration but no welfare state. Let markets determine labor needs. Government has no right to restrict peaceful movement. Ellis Island model."}
  ],
  guns: [
    {label:"Far Left",cls:"ideo-far-left",content:"<strong>Disarm civilian population.</strong> Ban and confiscate most firearms. Only police/military have guns. Repeal or reinterpret 2nd Amendment. Guns are tools of state and patriarchal violence. (Note: some far-left traditions support armed workers.)"},
    {label:"Left",cls:"ideo-left",content:"<strong>Strict gun control.</strong> Assault weapons ban. Universal background checks. Mandatory buybacks. Red flag laws. Gun violence as public health crisis. Limit magazine capacity. National registry."},
    {label:"Center-Left",cls:"ideo-center-left",content:"<strong>Common-sense gun safety.</strong> Universal background checks. Close gun show loophole. Red flag laws. Assault weapons restrictions. Research gun violence. Respect hunting traditions."},
    {label:"Center",cls:"ideo-center",content:"<strong>Moderate reforms.</strong> Improved background checks. Mental health focus. Enforce existing laws better. Some restrictions acceptable. Balance rights and safety. Bipartisan solutions."},
    {label:"Center-Right",cls:"ideo-center-right",content:"<strong>Protect 2nd Amendment</strong> with reasonable limits. Enforce existing laws. Mental health reform over gun restrictions. Armed security in schools. Concealed carry reciprocity. Oppose registries."},
    {label:"Right",cls:"ideo-right",content:"<strong>Shall not be infringed.</strong> Constitutional carry (no permit needed). Armed citizenry deters tyranny and crime. Oppose all new restrictions. More guns = less crime. Self-defense is fundamental right."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Absolute gun rights.</strong> No permits, registrations, or restrictions. 2nd Amendment is unlimited. Armed population checks government power. Abolish ATF. Individual sovereignty includes self-armament."}
  ],
  environment: [
    {label:"Far Left",cls:"ideo-far-left",content:"<strong>Ecosocialism:</strong> capitalism inherently destroys environment. Green New Deal with economic transformation. Degrowth economy. Public ownership of energy. Climate justice centers Global South. End fossil fuel extraction immediately."},
    {label:"Left",cls:"ideo-left",content:"<strong>Green New Deal.</strong> 100% renewable energy. Carbon tax. Massive public investment in green infrastructure. Environmental justice. Ban fracking. Protect public lands. International climate leadership."},
    {label:"Center-Left",cls:"ideo-center-left",content:"<strong>Paris Agreement compliance.</strong> Cap-and-trade or carbon tax. Clean energy incentives. Fuel efficiency standards. Protect EPA. Balance economy and environment. Nuclear as bridge fuel."},
    {label:"Center",cls:"ideo-center",content:"<strong>Market-based solutions.</strong> Carbon pricing. Innovation incentives. Natural gas as bridge fuel. International cooperation. Pragmatic, technology-driven approach. All-of-the-above energy strategy."},
    {label:"Center-Right",cls:"ideo-center-right",content:"<strong>Innovation over regulation.</strong> Clean energy R&D investment. Natural gas expansion. Nuclear power. Reduce regulations on energy production. Voluntary corporate sustainability. Skeptical of international agreements."},
    {label:"Right",cls:"ideo-right",content:"<strong>Energy independence.</strong> Expand fossil fuel production. Reduce EPA regulations. Withdraw from Paris Agreement. Climate skepticism. Free market will innovate. Protect energy industry jobs."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Property rights solve pollution.</strong> Eliminate EPA. Private courts handle environmental disputes. No subsidies for any energy source. Free markets develop clean technology when profitable. Government is the worst polluter."}
  ],
  foreign: [
    {label:"Far Left",cls:"ideo-far-left",content:"<strong>Anti-imperialism.</strong> Withdraw all foreign military bases. End NATO. International worker solidarity. Support global South liberation movements. Abolish World Bank/IMF. End arms sales."},
    {label:"Left",cls:"ideo-left",content:"<strong>Diplomacy first.</strong> Reduce military spending 50%+. End forever wars. Strengthen UN. Humanitarian intervention only multilaterally. Foreign aid increase. Close overseas bases."},
    {label:"Center-Left",cls:"ideo-center-left",content:"<strong>Liberal internationalism.</strong> Multilateral alliances (NATO, UN). Diplomacy with strength. Targeted sanctions. Humanitarian intervention when necessary. Development aid. Climate diplomacy."},
    {label:"Center",cls:"ideo-center",content:"<strong>Pragmatic engagement.</strong> Strong alliances. Adequate defense spending. Selective intervention. Balance values and interests. Free trade agreements. Strategic competition with rivals."},
    {label:"Center-Right",cls:"ideo-center-right",content:"<strong>Peace through strength.</strong> Strong military. NATO leadership. Protect national interests. Strategic alliances. Tough on adversaries. Free but fair trade. Democracy promotion selectively."},
    {label:"Right",cls:"ideo-right",content:"<strong>America First.</strong> Rebuild military. Bilateral deals over multilateral. Skeptical of UN. Tough on China/Russia. Secure borders. Reduce foreign aid. Protect sovereignty."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Non-interventionism.</strong> Bring all troops home. End all foreign wars. No foreign aid. Free trade with all, alliances with none. Armed neutrality. Founding fathers' foreign policy."}
  ],
  rights: [
    {label:"Far Left",cls:"ideo-far-left",content:"<strong>Radical equality.</strong> Abolish police/prisons (abolitionism). Reparations for slavery and colonialism. Full LGBTQ+ rights. Decriminalize all drugs. Intersectional liberation. Dismantle all systems of oppression."},
    {label:"Left",cls:"ideo-left",content:"<strong>Expansive civil rights.</strong> Systemic racism is real — structural reform needed. Affirmative action. LGBTQ+ protections. Criminal justice reform. Voting rights expansion. End mass incarceration."},
    {label:"Center-Left",cls:"ideo-center-left",content:"<strong>Equal protection</strong> under law. Anti-discrimination legislation. Marriage equality. Police reform. Restore Voting Rights Act. Address disparities through policy. Protect reproductive rights."},
    {label:"Center",cls:"ideo-center",content:"<strong>Equal opportunity</strong> for all. Anti-discrimination laws. Individual merit. Moderate police reform. Balanced approach to controversial social issues. Pragmatic progress."},
    {label:"Center-Right",cls:"ideo-center-right",content:"<strong>Individual rights</strong> over group rights. Colorblind constitution. Religious liberty protections. Parental rights. Oppose racial preferences. Traditional values compatible with tolerance. Law and order."},
    {label:"Right",cls:"ideo-right",content:"<strong>Traditional values.</strong> Religious freedom paramount. Protect unborn life. Traditional marriage. Oppose critical race theory. Support police. Strict constitutionalism. Parental rights over state."},
    {label:"Libertarian",cls:"ideo-libertarian",content:"<strong>Maximum individual liberty.</strong> Government out of marriage, drugs, personal choices entirely. Oppose both left and right social engineering. Non-aggression principle. Voluntary association. End drug war."}
  ]
};

function renderIdeologies() {
  const issue = document.getElementById('pol-issue').value;
  const spectrum = document.getElementById('ideology-spectrum');
  const data = ideologyData[issue] || [];
  spectrum.innerHTML = data.map(d => `
    <div class="ideology-row">
      <div class="ideology-label ${d.cls}">${d.label}</div>
      <div class="ideology-content">${d.content}</div>
    </div>
  `).join('');
}
document.getElementById('pol-issue')?.addEventListener('change', renderIdeologies);
renderIdeologies();

// ===================== COURT CASES =====================
const courtCases = [
  {name:"Marbury v. Madison (1803)",year:"1803",category:"executive",summary:"Established judicial review — the Supreme Court's power to declare laws unconstitutional. Chief Justice Marshall's landmark decision.",
    conservative:"Judicial review should be used sparingly and with restraint. Original intent of Founders guides interpretation. Courts should not legislate from the bench. Strict construction limits judicial overreach.",
    liberal:"Judicial review protects minority rights against majority tyranny. Living Constitution adapts to changing times. Courts are the last resort for the powerless. Essential check on legislative and executive overreach."},
  {name:"Dred Scott v. Sandford (1857)",year:"1857",category:"rights",summary:"Ruled that African Americans were not citizens and Congress couldn't prohibit slavery in territories. Widely considered the worst Supreme Court decision.",
    conservative:"Modern conservatives universally condemn this ruling. Demonstrates dangers of judicial activism and reading personal views into the Constitution. The 13th and 14th Amendments corrected this moral catastrophe.",
    liberal:"Demonstrates how the Constitution was used to uphold systemic oppression. Shows why originalism can be dangerous — the 'original' Constitution protected slavery. Living constitutionalism necessary to achieve justice."},
  {name:"Plessy v. Ferguson (1896)",year:"1896",category:"rights",summary:"Upheld racial segregation under 'separate but equal' doctrine, legalizing Jim Crow laws for nearly 60 years.",
    conservative:"Correctly overturned by Brown v. Board. Government-mandated segregation violated equal protection. However, forced integration can also go too far. Colorblind Constitution is the ideal.",
    liberal:"Showed how 'neutral' legal principles mask racial oppression. 'Separate but equal' was never equal. Justice Harlan's dissent ('our Constitution is color-blind') was prophetic. Structural racism requires structural solutions."},
  {name:"Brown v. Board of Education (1954)",year:"1954",category:"rights",summary:"Unanimously ruled school segregation unconstitutional, overturning Plessy v. Ferguson. Catalyzed the civil rights movement.",
    conservative:"Correctly decided — government-enforced segregation violates equal protection. However, subsequent busing mandates and racial balancing went too far. Focus on equal opportunity, not equal outcomes.",
    liberal:"Landmark victory but insufficient alone. Desegregation orders necessary because voluntary compliance failed. Schools have re-segregated due to housing patterns and policy choices. Integration improves outcomes for all students."},
  {name:"Miranda v. Arizona (1966)",year:"1966",category:"rights",summary:"Required police to inform suspects of their rights before interrogation (right to remain silent, right to attorney).",
    conservative:"Overly restrictive on law enforcement. Creates technicalities that let guilty criminals go free. The Constitution doesn't require specific warnings. Hampers effective policing and public safety.",
    liberal:"Essential protection against coerced confessions and police abuse. Protects the innocent and marginalized. Power imbalance between state and individual requires procedural safeguards. Democracy requires limits on state power."},
  {name:"Roe v. Wade (1973)",year:"1973",category:"privacy",summary:"Recognized constitutional right to abortion under implied right to privacy. One of the most debated decisions in history. Overturned by Dobbs v. Jackson (2022).",
    conservative:"Correctly overturned by Dobbs. No constitutional right to abortion exists in the text. Judicial overreach created a right from nothing. Issue belongs to democratic legislatures. Life begins at conception — unborn have rights.",
    liberal:"Fundamental right to bodily autonomy and reproductive freedom. Privacy rights are implicit in the Constitution. Women cannot be equal without control over reproduction. Overturning Roe endangers women's health and equality."},
  {name:"District of Columbia v. Heller (2008)",year:"2008",category:"speech",summary:"Ruled the 2nd Amendment protects an individual right to possess firearms for self-defense, unconnected to militia service.",
    conservative:"Correctly affirmed the plain text: 'the right of the people to keep and bear arms shall not be infringed.' Individual self-defense is a fundamental right. Founders intended armed citizenry as check on tyranny.",
    liberal:"Historically, 2nd Amendment was about militia service (collective right). Scalia's opinion ignored 'well regulated militia' clause. Heller prevents reasonable gun safety legislation. Original understanding was collective, not individual."},
  {name:"Citizens United v. FEC (2010)",year:"2010",category:"speech",summary:"Ruled that corporations and unions have First Amendment right to unlimited political spending. Opened the door to Super PACs.",
    conservative:"Free speech applies to associations of people (corporations, unions, nonprofits). Government censorship of political speech before elections is dangerous. More speech, not less, strengthens democracy.",
    liberal:"Corrupted democracy by equating money with speech. Allows billionaires and corporations to buy elections. Corporations are not people. Overwhelming public support for campaign finance limits. Undermines democratic equality."},
  {name:"Obergefell v. Hodges (2015)",year:"2015",category:"rights",summary:"Ruled that same-sex couples have a constitutional right to marry under the 14th Amendment's due process and equal protection clauses.",
    conservative:"Judicial overreach — marriage definition should be decided by voters and legislatures, not courts. Religious liberty concerns about compelled participation. Traditional marriage has millennia of precedent across cultures.",
    liberal:"Love is love. Marriage equality is a fundamental civil right. The 14th Amendment guarantees equal protection. Bans on same-sex marriage were motivated by animus. History will judge this like Loving v. Virginia (interracial marriage)."},
  {name:"Dobbs v. Jackson Women's Health (2022)",year:"2022",category:"privacy",summary:"Overturned Roe v. Wade, ruling there is no constitutional right to abortion. Returned abortion regulation to state legislatures.",
    conservative:"Correctly returned the issue to democratic process. Roe was poorly reasoned judicial legislation. Constitution is silent on abortion. Federalism: states can set their own policies reflecting local values. Protects unborn life.",
    liberal:"Devastating rollback of fundamental rights. Stare decisis (precedent) should protect established rights. Bodily autonomy is a liberty interest under the 14th Amendment. Will disproportionately harm poor women and women of color. Government forced birth."},
  {name:"Korematsu v. United States (1944)",year:"1944",category:"rights",summary:"Upheld Japanese American internment during WWII. Later formally repudiated by the Supreme Court in Trump v. Hawaii (2018).",
    conservative:"Now universally condemned. Demonstrates dangers of executive overreach during wartime. Individual rights must be protected even in emergencies. Government racial classifications are inherently suspect.",
    liberal:"Shameful example of racism embedded in law. Fear and prejudice overrode constitutional protections. National security cannot justify racial persecution. Parallels to modern surveillance and immigration enforcement."},
  {name:"New York Times v. Sullivan (1964)",year:"1964",category:"speech",summary:"Set 'actual malice' standard for public officials suing for defamation — must prove knowing falsity or reckless disregard for truth.",
    conservative:"Some argue the standard has gone too far, making it nearly impossible for public figures to protect their reputations. Media abuse this protection. Consider recalibrating to balance press freedom with accountability.",
    liberal:"Essential protection for free press and democratic debate. Without this standard, powerful officials could silence critics through litigation. Uninhibited, robust, wide-open debate on public issues is the core of the First Amendment."},
  {name:"Lochner v. New York (1905)",year:"1905",category:"commerce",summary:"Struck down maximum working hours law as violating 'liberty of contract.' Became symbol of judicial activism — the 'Lochner era' lasted until the New Deal.",
    conservative:"Split views: economic libertarians see merit in protecting freedom of contract. But most conservatives now see Lochner as judicial activism — inventing rights not in the Constitution. Judges should defer to legislatures on economic policy.",
    liberal:"Epitome of courts protecting wealthy interests over workers. 'Liberty of contract' is a fiction when employer and employee have vastly unequal bargaining power. Correctly overturned during New Deal. Holmes's dissent was right: Constitution doesn't enact laissez-faire."},
  {name:"Engel v. Vitale (1962)",year:"1962",category:"religion",summary:"Banned official school prayer, even if voluntary and non-denominational, as violating the Establishment Clause.",
    conservative:"Went too far in separating religion from public life. America was founded on Judeo-Christian principles. Voluntary prayer harms no one. Hostile secularism — the Founders intended accommodation of religion, not hostility to it.",
    liberal:"Correctly protects religious minorities and non-believers from government-sponsored religion. No child should feel coerced. True religious freedom means government neutrality. Students can still pray privately — the ban is on state-sponsored prayer."}
];

function renderCourtCases() {
  const cat = document.getElementById('court-category').value;
  const list = document.getElementById('court-cases-list');
  let cases = courtCases;
  if (cat !== 'all') cases = cases.filter(c => c.category === cat);
  list.innerHTML = cases.map(c => `
    <div class="court-case">
      <h3>${c.name}</h3>
      <div class="case-year">${c.year} | Category: ${c.category}</div>
      <div class="case-summary">${c.summary}</div>
      <div class="perspectives">
        <div class="perspective conservative">
          <h4>Conservative View</h4>
          ${c.conservative}
        </div>
        <div class="perspective liberal">
          <h4>Liberal View</h4>
          ${c.liberal}
        </div>
      </div>
    </div>
  `).join('');
}
document.getElementById('court-category')?.addEventListener('change', renderCourtCases);
renderCourtCases();

// ===================== GOLF GAME =====================
const golfCanvas = document.getElementById('golf-canvas');
const gCtx = golfCanvas?.getContext('2d');

// Club data: maxYards, loft(height factor), accuracy(0-1, 1=perfect), canUseFrom
const CLUBS = {
  driver:   {name:'Driver (1W)',    yards:230, loft:0.25, accuracy:0.82, from:['tee'],         type:'wood'},
  '3wood':  {name:'3-Wood',        yards:210, loft:0.30, accuracy:0.85, from:['tee','fairway'],type:'wood'},
  '5wood':  {name:'5-Wood',        yards:195, loft:0.35, accuracy:0.87, from:['tee','fairway','rough'],type:'wood'},
  '3hybrid':{name:'3-Hybrid',      yards:190, loft:0.38, accuracy:0.88, from:['tee','fairway','rough'],type:'hybrid'},
  '4hybrid':{name:'4-Hybrid',      yards:180, loft:0.40, accuracy:0.89, from:['tee','fairway','rough','bunker'],type:'hybrid'},
  '5iron':  {name:'5-Iron',        yards:170, loft:0.42, accuracy:0.85, from:['tee','fairway','rough'],type:'iron'},
  '6iron':  {name:'6-Iron',        yards:160, loft:0.45, accuracy:0.87, from:['fairway','rough'],type:'iron'},
  '7iron':  {name:'7-Iron',        yards:150, loft:0.50, accuracy:0.90, from:['tee','fairway','rough'],type:'iron'},
  '8iron':  {name:'8-Iron',        yards:140, loft:0.55, accuracy:0.92, from:['fairway','rough'],type:'iron'},
  '9iron':  {name:'9-Iron',        yards:130, loft:0.60, accuracy:0.93, from:['fairway','rough'],type:'iron'},
  pw:       {name:'Pitching Wedge', yards:120, loft:0.68, accuracy:0.94, from:['fairway','rough','fringe'],type:'wedge'},
  gw:       {name:'Gap Wedge (52°)',yards:100, loft:0.75, accuracy:0.95, from:['fairway','rough','fringe'],type:'wedge'},
  sw:       {name:'Sand Wedge (56°)',yards:80, loft:0.85, accuracy:0.90, from:['fairway','rough','fringe','bunker'],type:'wedge'},
  lw:       {name:'Lob Wedge (60°)',yards:60,  loft:0.95, accuracy:0.88, from:['fairway','rough','fringe','bunker'],type:'wedge'},
  putter:   {name:'Putter',         yards:30,  loft:0.0,  accuracy:0.97, from:['green','fringe'],type:'putter'}
};

// Pixels-per-yard scale factor for the canvas
const PX_PER_YARD = 2.2;

let golfState = {
  hole:1, strokes:0, total:0,
  ballX:80, ballY:420,
  inFlight:false, holes:[],
  scores:[] // per-hole scores
};

function generateHoles(){
  golfState.holes = [];
  const layouts = [
    {par:3, hx:550, hy:150, dist:160, name:"The Opener"},
    {par:4, hx:650, hy:120, dist:350, name:"Dogleg Right"},
    {par:4, hx:620, hy:200, dist:380, name:"Water Carry"},
    {par:3, hx:500, hy:100, dist:175, name:"Island Green"},
    {par:5, hx:700, hy:130, dist:520, name:"The Monster"},
    {par:4, hx:600, hy:180, dist:400, name:"Bunker Alley"},
    {par:3, hx:480, hy:120, dist:145, name:"Short & Sweet"},
    {par:4, hx:660, hy:160, dist:410, name:"The Ridge"},
    {par:5, hx:720, hy:140, dist:490, name:"Finishing Hole"}
  ];
  layouts.forEach((l,i) => {
    const hx = l.hx + (Math.random()*40-20);
    const hy = l.hy + (Math.random()*30-15);
    let water = null, sand = null, sand2 = null, tree = null;
    // Add hazards based on hole
    if(i>=2) water = {x:280+Math.random()*80, y:180+Math.random()*80, w:90+Math.random()*40, h:45+Math.random()*20};
    if(i>=1) sand = {x:hx-50+Math.random()*30, y:hy+50+Math.random()*20, r:22+Math.random()*8};
    if(i>=4) sand2 = {x:hx+40+Math.random()*20, y:hy-20+Math.random()*20, r:18+Math.random()*6};
    if(i>=3) tree = {x:350+Math.random()*100, y:100+Math.random()*200};
    golfState.holes.push({par:l.par, hx, hy, water, sand, sand2, tree, name:l.name, dist:l.dist});
  });
}
generateHoles();

function currentHoleData(){return golfState.holes[golfState.hole-1];}

function getBallLie(bx, by, h){
  const distToHole = Math.hypot(bx-h.hx, by-h.hy);
  if(distToHole < 50) return 'green';
  if(distToHole < 70) return 'fringe';
  // Check bunker
  if(h.sand && Math.hypot(bx-h.sand.x, by-h.sand.y) < h.sand.r) return 'bunker';
  if(h.sand2 && Math.hypot(bx-h.sand2.x, by-h.sand2.y) < h.sand2.r) return 'bunker';
  // Check fairway (simplified polygon check using distance to center line)
  const cx = (80 + h.hx)/2, cy = (420 + h.hy)/2;
  const lineAngle = Math.atan2(h.hy-420, h.hx-80);
  const perpDist = Math.abs(Math.sin(lineAngle)*(bx-80) - Math.cos(lineAngle)*(by-420));
  if(perpDist < 55) return 'fairway';
  // First shot
  if(Math.hypot(bx-80, by-420) < 20) return 'tee';
  return 'rough';
}

function distYards(x1,y1,x2,y2){ return Math.hypot(x2-x1,y2-y1)/PX_PER_YARD; }

// -------- PRO TIPS based on situation --------
const proTips = {
  tee_par3: [
    '"Take dead aim." — Harvey Penick. On a par 3, pick your club to land center-green.',
    'Par 3 strategy: club selection is everything. Most amateurs under-club. Take one more club than you think.',
    '"The most important shot in golf is the next one." — Ben Hogan. Smooth tempo off the tee.'
  ],
  tee_par4: [
    '"Swing easy, hit hard." Hit the fairway first — position beats distance on par 4s.',
    'Driver isn\'t always the play. A 3-wood in the fairway beats a driver in the rough.',
    '"Drive for show, putt for dough." — Bobby Locke. But a good drive sets up everything.'
  ],
  tee_par5: [
    'Par 5s are birdie opportunities. Grip it and rip it — get maximum distance off the tee.',
    '"The woods are full of long hitters." — Harvey Penick. Fairway position matters even on par 5s.',
    'Par 5 strategy: plan your three shots backward from the green.'
  ],
  fairway: [
    'You\'re sitting pretty in the fairway! Pick a club that reaches the green. Aim for the fat part.',
    '"Aim for the center of the green. The pin will come to you." — Jack Nicklaus',
    'From the fairway, commit to your club. Indecision is the #1 cause of bad approach shots.'
  ],
  rough: [
    'In the rough — take more club (one up). The grass grabs the clubhead and reduces distance.',
    '"When you\'re in the rough, just get back to the fairway." — Tiger Woods. Don\'t be a hero.',
    'Rough lie = less control. A hybrid or 5-wood cuts through rough better than long irons.'
  ],
  bunker: [
    'Bunker shot! Open the face of your sand wedge, aim 2 inches behind the ball, and splash through.',
    '"The bunker shot is the easiest shot in golf — you don\'t even have to hit the ball." — Gary Player',
    'In a greenside bunker: open stance, open face, hit the sand not the ball. Follow through!'
  ],
  green: [
    'On the green! Read the break. "Every putt is straight — you just have to find the line." — Jack Nicklaus',
    '"Putt like a kid — look at the hole, not the mechanics." Speed > line for most putts.',
    'The golden rule of putting: never leave it short. "Never up, never in." — Old Scottish saying'
  ],
  fringe: [
    'On the fringe — you can putt from here (smart play) or chip with a wedge for more control.',
    '"When in doubt on the fringe, putt. Your worst putt beats your worst chip." — Common tour advice',
    'From the fringe, a bump-and-run with a 7-iron or 8-iron is a high-percentage play.'
  ],
  water: [
    'Splash! Water hazard. You take a 1-stroke penalty and drop behind the hazard. Plan the carry next time.',
    '"Water attracts golf balls like a magnet. Lay up if there\'s any doubt." — Lee Trevino',
    'Water hazard tip: if you need 180 yards to carry water and your club max is 175, LAY UP. Course management!'
  ],
  sand_hit: [
    'In the bunker! Use your Sand Wedge (56°). Open the face, aim behind the ball.',
    'Bunker play: dig your feet in for stability, keep your weight forward, accelerate through the sand.'
  ],
  approach: [
    'This is your approach shot — the money shot. Pick a club that lands you pin-high.',
    '"The approach shot separates the pros from the amateurs." Commit to your target and swing smooth.'
  ]
};

function getProTip(lie, par, distToHole) {
  let pool;
  if(lie==='tee') pool = proTips['tee_par'+par] || proTips.tee_par4;
  else pool = proTips[lie] || proTips.fairway;
  return pool[Math.floor(Math.random()*pool.length)];
}

// -------- DRAWING --------
function drawGolf(){
  if(!gCtx) return;
  const c = golfCanvas, W=c.width, H=c.height;
  const h = currentHoleData();

  // Background rough
  gCtx.fillStyle='#1a6b1a'; gCtx.fillRect(0,0,W,H);

  // Fairway path (wider, follows tee to hole)
  const angle = Math.atan2(h.hy-420, h.hx-80);
  const perpX = Math.sin(angle)*50, perpY = -Math.cos(angle)*50;
  gCtx.fillStyle='#2d9c2d';
  gCtx.beginPath();
  gCtx.moveTo(80-perpX*0.6, 420-perpY*0.6);
  gCtx.lineTo(80+perpX*0.6, 420+perpY*0.6);
  // Midpoint — widen or curve for doglegs
  const mx=(80+h.hx)/2+(h.hole===2?40:0), my=(420+h.hy)/2;
  gCtx.lineTo(mx+perpX*1.1, my+perpY*1.1);
  gCtx.lineTo(h.hx+perpX*0.8, h.hy+perpY*0.8);
  gCtx.lineTo(h.hx-perpX*0.8, h.hy-perpY*0.8);
  gCtx.lineTo(mx-perpX*1.1, my-perpY*1.1);
  gCtx.closePath(); gCtx.fill();

  // Green
  gCtx.fillStyle='#3adf3a';
  gCtx.beginPath(); gCtx.arc(h.hx, h.hy, 50, 0, Math.PI*2); gCtx.fill();
  // Fringe ring
  gCtx.strokeStyle='#30b830'; gCtx.lineWidth=12;
  gCtx.beginPath(); gCtx.arc(h.hx, h.hy, 56, 0, Math.PI*2); gCtx.stroke();

  // Trees
  if(h.tree){
    gCtx.fillStyle='#0a4a0a';
    gCtx.beginPath(); gCtx.arc(h.tree.x, h.tree.y, 18, 0, Math.PI*2); gCtx.fill();
    gCtx.fillStyle='#1a7a1a';
    gCtx.beginPath(); gCtx.arc(h.tree.x, h.tree.y-8, 14, 0, Math.PI*2); gCtx.fill();
    gCtx.fillStyle='#5a3';
    gCtx.beginPath(); gCtx.arc(h.tree.x, h.tree.y-14, 10, 0, Math.PI*2); gCtx.fill();
    gCtx.fillStyle='#4a2800'; gCtx.fillRect(h.tree.x-3, h.tree.y+12, 6, 12);
  }

  // Water hazard
  if(h.water){
    gCtx.fillStyle='#1e6fff55'; gCtx.strokeStyle='#1e90ff'; gCtx.lineWidth=2;
    const wr=h.water;
    gCtx.beginPath();
    gCtx.ellipse(wr.x+wr.w/2, wr.y+wr.h/2, wr.w/2, wr.h/2, 0, 0, Math.PI*2);
    gCtx.fill(); gCtx.stroke();
    // Water ripples
    gCtx.strokeStyle='#4ea8ff44'; gCtx.lineWidth=1;
    for(let i=0;i<3;i++){
      gCtx.beginPath();
      gCtx.ellipse(wr.x+wr.w/2+i*8-8, wr.y+wr.h/2, 10+i*5, 4+i*2, 0, 0, Math.PI*2);
      gCtx.stroke();
    }
    gCtx.fillStyle='#8bf'; gCtx.font='bold 11px sans-serif';
    gCtx.fillText('WATER HAZARD', wr.x+wr.w/2-38, wr.y+wr.h+14);
  }

  // Bunkers
  function drawBunker(b){
    gCtx.fillStyle='#f5deb3';
    gCtx.beginPath(); gCtx.arc(b.x, b.y, b.r, 0, Math.PI*2); gCtx.fill();
    gCtx.strokeStyle='#c4a56a'; gCtx.lineWidth=2;
    gCtx.beginPath(); gCtx.arc(b.x, b.y, b.r, 0, Math.PI*2); gCtx.stroke();
    // Sand texture dots
    gCtx.fillStyle='#d4c49a';
    for(let i=0;i<5;i++){
      const sx=b.x+Math.random()*b.r*1.2-b.r*0.6, sy=b.y+Math.random()*b.r*1.2-b.r*0.6;
      gCtx.beginPath(); gCtx.arc(sx,sy,1.5,0,Math.PI*2); gCtx.fill();
    }
  }
  if(h.sand) drawBunker(h.sand);
  if(h.sand2) drawBunker(h.sand2);

  // Tee box
  gCtx.fillStyle='#4ac34a';
  gCtx.fillRect(60, 405, 40, 30);
  gCtx.strokeStyle='#2d8c2d'; gCtx.lineWidth=1;
  gCtx.strokeRect(60, 405, 40, 30);
  gCtx.fillStyle='#fff'; gCtx.font='9px sans-serif';
  gCtx.fillText('TEE', 70, 424);

  // Tee markers
  gCtx.fillStyle='#ff4444';
  gCtx.beginPath(); gCtx.arc(65, 410, 3, 0, Math.PI*2); gCtx.fill();
  gCtx.beginPath(); gCtx.arc(95, 410, 3, 0, Math.PI*2); gCtx.fill();

  // Hole + flag
  gCtx.fillStyle='#111';
  gCtx.beginPath(); gCtx.arc(h.hx, h.hy, 5, 0, Math.PI*2); gCtx.fill();
  gCtx.strokeStyle='#ddd'; gCtx.lineWidth=2;
  gCtx.beginPath(); gCtx.moveTo(h.hx, h.hy); gCtx.lineTo(h.hx, h.hy-45); gCtx.stroke();
  gCtx.fillStyle='#ff3333';
  gCtx.beginPath(); gCtx.moveTo(h.hx, h.hy-45); gCtx.lineTo(h.hx+22, h.hy-36); gCtx.lineTo(h.hx, h.hy-27); gCtx.fill();
  gCtx.fillStyle='#fff'; gCtx.font='bold 9px sans-serif';
  gCtx.fillText(golfState.hole+'', h.hx+5, h.hy-33);

  // Yardage markers on fairway
  const totalDist = Math.hypot(h.hx-80, h.hy-420);
  [50,100,150,200].forEach(yd => {
    const frac = (yd*PX_PER_YARD) / totalDist;
    if(frac > 0 && frac < 1) {
      const mx2 = h.hx + (80-h.hx)*frac, my2 = h.hy + (420-h.hy)*frac;
      gCtx.fillStyle='#ffffff55'; gCtx.font='10px sans-serif';
      gCtx.fillText(yd+'y', mx2-8, my2-8);
      gCtx.fillStyle='#ffffff33';
      gCtx.beginPath(); gCtx.arc(mx2,my2,3,0,Math.PI*2); gCtx.fill();
    }
  });

  // Ball shadow
  gCtx.fillStyle='#00000033';
  gCtx.beginPath(); gCtx.ellipse(golfState.ballX+2, golfState.ballY+2, 6, 4, 0, 0, Math.PI*2); gCtx.fill();
  // Ball
  gCtx.fillStyle='#fff';
  gCtx.beginPath(); gCtx.arc(golfState.ballX, golfState.ballY, 5, 0, Math.PI*2); gCtx.fill();
  gCtx.strokeStyle='#ccc'; gCtx.lineWidth=0.5; gCtx.stroke();
  // Ball dimple detail
  gCtx.strokeStyle='#ddd'; gCtx.lineWidth=0.3;
  gCtx.beginPath(); gCtx.arc(golfState.ballX-1, golfState.ballY-1, 2, 0, Math.PI*2); gCtx.stroke();

  // Aim line — THIS IS THE KEY FIX: aim line shows exactly where the ball will go
  if(!golfState.inFlight){
    const aimAngle = getAimAngle();
    const power = parseInt(document.getElementById('golf-power')?.value||75);
    const clubKey = document.getElementById('golf-club')?.value||'7iron';
    const club = CLUBS[clubKey];
    const distPx = (club.yards * (power/100)) * PX_PER_YARD;
    const lineLen = Math.min(distPx, 250); // cap visual length

    // Dotted aim line
    gCtx.strokeStyle='#ffff00aa'; gCtx.lineWidth=2; gCtx.setLineDash([6,4]);
    gCtx.beginPath();
    gCtx.moveTo(golfState.ballX, golfState.ballY);
    gCtx.lineTo(
      golfState.ballX + Math.cos(aimAngle)*lineLen,
      golfState.ballY + Math.sin(aimAngle)*lineLen
    );
    gCtx.stroke(); gCtx.setLineDash([]);

    // Landing zone circle
    const landX = golfState.ballX + Math.cos(aimAngle)*distPx;
    const landY = golfState.ballY + Math.sin(aimAngle)*distPx;
    const accRadius = (1-club.accuracy)*80 + 5;
    gCtx.strokeStyle='#ffff0066'; gCtx.lineWidth=1; gCtx.setLineDash([3,3]);
    gCtx.beginPath(); gCtx.arc(landX,landY, accRadius, 0, Math.PI*2); gCtx.stroke();
    gCtx.setLineDash([]);
    // Landing dot
    gCtx.fillStyle='#ffff0055';
    gCtx.beginPath(); gCtx.arc(landX,landY, 3, 0, Math.PI*2); gCtx.fill();
  }

  // HUD on canvas
  const lie = getBallLie(golfState.ballX, golfState.ballY, h);
  const dToHole = distYards(golfState.ballX, golfState.ballY, h.hx, h.hy);
  gCtx.fillStyle='#000000aa';
  gCtx.fillRect(0,0,W,28);
  gCtx.fillStyle='#fff'; gCtx.font='bold 13px sans-serif';
  gCtx.fillText(`Hole ${golfState.hole}: "${h.name}" | Par ${h.par} | Stroke ${golfState.strokes} | ${Math.round(dToHole)} yds to pin | Lie: ${lie.toUpperCase()}`, 10, 18);
}

function getAimAngle(){
  const h = currentHoleData();
  const angleDeg = parseInt(document.getElementById('golf-angle')?.value||0);
  // Base angle: from ball directly toward the hole
  const baseAngle = Math.atan2(h.hy - golfState.ballY, h.hx - golfState.ballX);
  // Player's aim offset in radians
  const offsetRad = angleDeg * (Math.PI/180);
  return baseAngle + offsetRad;
}

function swingGolf(){
  if(golfState.inFlight) return;
  const h = currentHoleData();
  const power = parseInt(document.getElementById('golf-power').value);
  const clubKey = document.getElementById('golf-club').value;
  const shape = document.getElementById('golf-shape').value;
  const club = CLUBS[clubKey];
  const lie = getBallLie(golfState.ballX, golfState.ballY, h);

  // Check if club is appropriate for the lie
  if(!club.from.includes(lie)){
    const lieNames = {tee:'the tee box',fairway:'the fairway',rough:'the rough',bunker:'a bunker',green:'the green',fringe:'the fringe'};
    showGolfTip(`Can't use ${club.name} from ${lieNames[lie]||lie}! ${lie==='green'?'Use your Putter on the green.':lie==='bunker'?'Use a Sand Wedge or Lob Wedge from bunkers.':'Choose a different club.'}`);
    return;
  }

  // Calculate distance
  let maxDist = club.yards * PX_PER_YARD;
  let dist = maxDist * (power/100);

  // Lie penalties
  if(lie==='rough') dist *= 0.80; // lose 20% from rough
  if(lie==='bunker') dist *= 0.55; // lose 45% from bunker

  // Shot shape modifiers
  let curveAngle = 0; // radians of curve applied during flight
  let distMod = 1.0;
  let loftMod = club.loft;
  if(shape==='fade'){ curveAngle = 0.08; distMod = 0.95; } // slight right curve, less distance
  if(shape==='draw'){ curveAngle = -0.08; distMod = 1.05; } // slight left curve, more roll
  if(shape==='punch'){ loftMod = Math.max(0.05, club.loft*0.3); distMod = 0.85; } // low shot
  if(shape==='flop'){ loftMod = Math.min(1.0, club.loft*1.5); distMod = 0.6; } // high soft shot
  dist *= distMod;

  // Accuracy — random scatter based on club accuracy and lie
  let accPenalty = 0;
  if(lie==='rough') accPenalty = 0.08;
  if(lie==='bunker') accPenalty = 0.15;
  const scatter = (1 - club.accuracy + accPenalty) * (Math.random()*2-1) * 0.15;

  // Final aim angle
  const aimAngle = getAimAngle() + scatter + curveAngle;

  // Target position
  const targetX = golfState.ballX + Math.cos(aimAngle)*dist;
  const targetY = golfState.ballY + Math.sin(aimAngle)*dist;

  golfState.inFlight = true;
  golfState.strokes++;

  // Check for water hazard along flight path and at landing
  let hitWater = false;
  if(h.water){
    const wcx=h.water.x+h.water.w/2, wcy=h.water.y+h.water.h/2;
    const wrx=h.water.w/2, wry=h.water.h/2;
    // Check landing point
    const dx=(targetX-wcx)/wrx, dy=(targetY-wcy)/wry;
    if(dx*dx+dy*dy < 1){
      // High loft shots can carry over water
      if(loftMod < 0.5){ hitWater = true; }
      else {
        // Check if ball path goes through water (low shots)
        const frac = 0.5; // midpoint of flight
        const midX=golfState.ballX+(targetX-golfState.ballX)*frac;
        const midY=golfState.ballY+(targetY-golfState.ballY)*frac;
        const mdx=(midX-wcx)/wrx, mdy=(midY-wcy)/wry;
        if(mdx*mdx+mdy*mdy < 1 && loftMod < 0.4) hitWater = true;
      }
    }
    // Also check midpoint for low shots
    if(!hitWater && loftMod < 0.35){
      const frac=0.5;
      const midX=golfState.ballX+(targetX-golfState.ballX)*frac;
      const midY=golfState.ballY+(targetY-golfState.ballY)*frac;
      const mdx=(midX-wcx)/wrx, mdy=(midY-wcy)/wry;
      if(mdx*mdx+mdy*mdy < 1) hitWater = true;
    }
  }

  // Check tree collision
  let hitTree = false;
  if(h.tree && loftMod < 0.5){
    // Check if flight path passes near tree
    const steps = 10;
    for(let i=1;i<steps;i++){
      const frac=i/steps;
      const px=golfState.ballX+(targetX-golfState.ballX)*frac;
      const py=golfState.ballY+(targetY-golfState.ballY)*frac;
      if(Math.hypot(px-h.tree.x, py-h.tree.y) < 22){
        hitTree = true; break;
      }
    }
  }

  // Animate the shot
  const startX=golfState.ballX, startY=golfState.ballY;
  let t=0;
  const ballTrail = [];

  const anim = setInterval(()=>{
    t += 0.025;
    if(t>=1){
      t=1; clearInterval(anim); golfState.inFlight=false;

      if(hitWater){
        golfState.strokes++; // penalty stroke
        // Drop behind water
        golfState.ballX = startX + (targetX-startX)*0.3;
        golfState.ballY = startY + (targetY-startY)*0.3;
        showGolfTip(proTips.water[Math.floor(Math.random()*proTips.water.length)]);
      } else if(hitTree){
        // Ball deflects and goes short
        golfState.ballX = startX + (targetX-startX)*0.25 + (Math.random()*30-15);
        golfState.ballY = startY + (targetY-startY)*0.25 + (Math.random()*30-15);
        showGolfTip('"The trees are 90% air." — Old golf joke. But yours found the 10%. Ball deflected into the rough.');
      } else {
        golfState.ballX = targetX;
        golfState.ballY = targetY;
        // Clamp to canvas
        golfState.ballX = Math.max(10, Math.min(golfCanvas.width-10, golfState.ballX));
        golfState.ballY = Math.max(10, Math.min(golfCanvas.height-10, golfState.ballY));

        const distToHole = Math.hypot(golfState.ballX-h.hx, golfState.ballY-h.hy);
        if(distToHole < 8){
          holeComplete(); return;
        }
        // Contextual tip based on new lie
        const newLie = getBallLie(golfState.ballX, golfState.ballY, h);
        const dYards = distYards(golfState.ballX, golfState.ballY, h.hx, h.hy);
        showGolfTip(getProTip(newLie, h.par, dYards) + ` (${Math.round(dYards)} yards to pin)`);
      }
      updateGolfUI(); drawGolf();
    } else {
      // Animated position with arc
      const arcHeight = loftMod * 60 * Math.sin(t * Math.PI); // ball rises and falls
      golfState.ballX = startX + (targetX-startX)*t;
      golfState.ballY = startY + (targetY-startY)*t - arcHeight;
      ballTrail.push({x:golfState.ballX, y:golfState.ballY});
      drawGolf();
      // Draw trail
      if(ballTrail.length > 2){
        gCtx.strokeStyle='#ffffff33'; gCtx.lineWidth=1;
        gCtx.beginPath(); gCtx.moveTo(ballTrail[0].x, ballTrail[0].y);
        ballTrail.forEach(p => gCtx.lineTo(p.x, p.y));
        gCtx.stroke();
      }
    }
  }, 25);

  updateGolfUI();
}

function holeComplete(){
  const h = currentHoleData();
  const diff = golfState.strokes - h.par;
  let name, emoji;
  if(golfState.strokes===1){ name='HOLE IN ONE (ACE)!!'; emoji='🏆'; }
  else if(diff<=-3){ name='Albatross (Double Eagle)!!'; emoji='🦅'; }
  else if(diff===-2){ name='Eagle!'; emoji='🦅'; }
  else if(diff===-1){ name='Birdie!'; emoji='🐦'; }
  else if(diff===0){ name='Par'; emoji='✓'; }
  else if(diff===1){ name='Bogey'; emoji='😤'; }
  else if(diff===2){ name='Double Bogey'; emoji='😬'; }
  else if(diff===3){ name='Triple Bogey'; emoji='💀'; }
  else if(golfState.strokes>=8){ name='Snowman'; emoji='⛄'; }
  else{ name=`+${diff}`; emoji='🏌️'; }

  const scoreStr = diff > 0 ? `+${diff}` : diff === 0 ? 'E' : `${diff}`;
  golfState.scores.push({hole:golfState.hole, strokes:golfState.strokes, par:h.par, diff, name:name});
  golfState.total += golfState.strokes;

  let msg = `${emoji} Hole ${golfState.hole} "${h.name}" complete! ${name} — ${golfState.strokes} strokes (par ${h.par}, ${scoreStr})`;

  if(golfState.hole < 9){
    golfState.hole++;
    golfState.strokes = 0;
    golfState.ballX = 80;
    golfState.ballY = 420;
    msg += ` | Next up: Hole ${golfState.hole} "${currentHoleData().name}" (Par ${currentHoleData().par})`;
  } else {
    const totalDiff = golfState.total - golfState.scores.reduce((s,h)=>s+h.par,0);
    const totalStr = totalDiff>0?`+${totalDiff}`:totalDiff===0?'Even par':`${totalDiff}`;
    msg += `\n\nROUND COMPLETE! Total: ${golfState.total} strokes (${totalStr}).`;
    if(totalDiff <= -5) msg += ' "One of the greatest rounds I\'ve ever seen!" — Jim Nantz';
    else if(totalDiff <= 0) msg += ' "Under par — you\'re ready for the club championship!"';
    else if(totalDiff <= 9) msg += ' "Solid round. Keep grinding — that\'s what golf is all about."';
    else msg += ' "Golf is a game of misses. The key is making your misses smaller." — Ben Hogan';
    // Scorecard
    msg += '\n\nScorecard: ' + golfState.scores.map(s=>`H${s.hole}:${s.strokes}(${s.diff>0?'+':''}${s.diff})`).join(' | ');
  }

  showGolfTip(msg);
  updateGolfUI();
  drawGolf();
}

function showGolfTip(msg){
  const el = document.getElementById('golf-tips');
  if(el) el.innerHTML = msg.replace(/\n/g,'<br>');
}

function updateGolfUI(){
  const h = currentHoleData();
  document.getElementById('golf-hole').textContent = golfState.hole;
  document.getElementById('golf-par').textContent = h.par;
  document.getElementById('golf-strokes').textContent = golfState.strokes;
  document.getElementById('golf-total').textContent = golfState.total;
  const lie = getBallLie(golfState.ballX, golfState.ballY, h);
  document.getElementById('golf-lie').textContent = lie.charAt(0).toUpperCase()+lie.slice(1);
  const d = distYards(golfState.ballX, golfState.ballY, h.hx, h.hy);
  document.getElementById('golf-dist').textContent = Math.round(d) + ' yds';
}

// Update displays when sliders change
document.getElementById('golf-power')?.addEventListener('input', ()=>{
  document.getElementById('power-display').textContent = document.getElementById('golf-power').value+'%';
  drawGolf();
});
document.getElementById('golf-angle')?.addEventListener('input', ()=>{
  const v = parseInt(document.getElementById('golf-angle').value);
  document.getElementById('angle-display').textContent = v===0?'0° (straight)': v<0?`${v}° left`:`+${v}° right`;
  drawGolf();
});
document.getElementById('golf-club')?.addEventListener('change', ()=>{
  const clubKey = document.getElementById('golf-club').value;
  const club = CLUBS[clubKey];
  const h = currentHoleData();
  const lie = getBallLie(golfState.ballX, golfState.ballY, h);
  const d = distYards(golfState.ballX, golfState.ballY, h.hx, h.hy);
  let tip = `${club.name}: max ${club.yards} yards.`;
  if(!club.from.includes(lie)) tip += ` ⚠ Not recommended from ${lie}!`;
  else tip += ` Good from this lie.`;
  tip += ` You're ${Math.round(d)} yards out.`;
  if(club.yards*0.85 < d && club.type!=='putter') tip += ' You may need more club.';
  showGolfTip(tip);
  drawGolf();
});

document.getElementById('golf-swing')?.addEventListener('click', swingGolf);
document.getElementById('golf-reset')?.addEventListener('click', ()=>{
  golfState = {hole:1, strokes:0, total:0, ballX:80, ballY:420, inFlight:false, holes:[], scores:[]};
  generateHoles(); updateGolfUI(); drawGolf();
  showGolfTip('"Every round is a new beginning." Tee it up! Pick your Driver for the first tee shot.');
});
drawGolf(); updateGolfUI();
showGolfTip('Welcome to the course! Select your Driver, set your power, and aim for the fairway. "Grip it and rip it!"');

// ===================== BLACKJACK =====================
const suits=['♠','♥','♦','♣'];
const ranks=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
function newDeck(){
  const d=[];suits.forEach(s=>ranks.forEach(r=>d.push({rank:r,suit:s})));
  for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}
  return d;
}
function cardVal(card){
  if(['J','Q','K'].includes(card.rank))return 10;
  if(card.rank==='A')return 11;
  return parseInt(card.rank);
}
function handVal(hand){
  let total=0,aces=0;
  hand.forEach(c=>{total+=cardVal(c);if(c.rank==='A')aces++;});
  while(total>21&&aces>0){total-=10;aces--;}
  return total;
}
function cardHTML(card,hidden=false){
  if(hidden)return '<div class="card hidden-card">?</div>';
  const red=['♥','♦'].includes(card.suit);
  return `<div class="card ${red?'red':''}">${card.rank}${card.suit}</div>`;
}

let bjDeck=[],bjPlayer=[],bjDealer=[],bjChips=1000,bjBet=25,bjGameOver=true;

function bjDeal(){
  bjBet=parseInt(document.getElementById('bj-bet').value)||25;
  if(bjBet>bjChips){document.getElementById('bj-tip').textContent="Not enough chips!";return;}
  bjDeck=newDeck();bjPlayer=[];bjDealer=[];bjGameOver=false;
  bjPlayer.push(bjDeck.pop(),bjDeck.pop());
  bjDealer.push(bjDeck.pop(),bjDeck.pop());
  document.getElementById('bj-result').textContent='';
  bjRender(true);
  document.getElementById('bj-hit').disabled=false;
  document.getElementById('bj-stand').disabled=false;
  document.getElementById('bj-double').disabled=bjBet*2>bjChips;
  // Strategy tip
  const pVal=handVal(bjPlayer),dUp=cardVal(bjDealer[0]);
  let tip='';
  if(pVal===21)tip="Blackjack! Natural 21!";
  else if(pVal>=17)tip="Strategy: Stand. You have a strong hand.";
  else if(pVal>=13&&dUp<=6)tip="Strategy: Stand. Dealer's upcard is weak — let them bust.";
  else if(pVal<=11)tip="Strategy: Hit (or Double Down)! You can't bust.";
  else tip="Strategy: This is a tough spot. Dealer shows "+bjDealer[0].rank+". Consider the odds carefully.";
  document.getElementById('bj-tip').textContent=tip;
  document.getElementById('bj-bet-display').textContent=bjBet;
  if(handVal(bjPlayer)===21){bjStand();}
}

function bjRender(hideDealer=true){
  document.getElementById('dealer-cards').innerHTML=bjDealer.map((c,i)=>hideDealer&&i===1?cardHTML(c,true):cardHTML(c)).join('');
  document.getElementById('player-cards').innerHTML=bjPlayer.map(c=>cardHTML(c)).join('');
  document.getElementById('dealer-score').textContent=hideDealer?cardVal(bjDealer[0])+'+ ?':handVal(bjDealer);
  document.getElementById('player-score').textContent=handVal(bjPlayer);
  document.getElementById('bj-chips').textContent=bjChips;
}

function bjHit(){
  if(bjGameOver)return;
  bjPlayer.push(bjDeck.pop());
  bjRender(true);
  if(handVal(bjPlayer)>21){bjEnd('bust');}
  else{
    const tip=handVal(bjPlayer)>=17?"You're at "+handVal(bjPlayer)+". Consider standing.":"You can still hit safely.";
    document.getElementById('bj-tip').textContent=tip;
  }
}
function bjStand(){if(bjGameOver)return;bjDealerPlay();}
function bjDouble(){
  if(bjGameOver)return;
  bjBet*=2;document.getElementById('bj-bet-display').textContent=bjBet;
  bjPlayer.push(bjDeck.pop());bjRender(true);
  if(handVal(bjPlayer)>21)bjEnd('bust');
  else bjDealerPlay();
}
function bjDealerPlay(){
  bjRender(false);
  const dealerDraw=()=>{
    if(handVal(bjDealer)<17){bjDealer.push(bjDeck.pop());bjRender(false);setTimeout(dealerDraw,500);}
    else{
      const pv=handVal(bjPlayer),dv=handVal(bjDealer);
      if(dv>21)bjEnd('dealer-bust');
      else if(pv>dv)bjEnd('win');
      else if(pv<dv)bjEnd('lose');
      else bjEnd('push');
    }
  };
  setTimeout(dealerDraw,500);
}
function bjEnd(result){
  bjGameOver=true;
  document.getElementById('bj-hit').disabled=true;
  document.getElementById('bj-stand').disabled=true;
  document.getElementById('bj-double').disabled=true;
  bjRender(false);
  const res=document.getElementById('bj-result');
  if(result==='bust'){res.textContent='Bust! You lose $'+bjBet;res.style.color='#f87171';bjChips-=bjBet;}
  else if(result==='dealer-bust'){res.textContent='Dealer busts! You win $'+bjBet+'!';res.style.color='#86efac';bjChips+=bjBet;}
  else if(result==='win'){res.textContent='You win $'+bjBet+'!';res.style.color='#86efac';bjChips+=bjBet;}
  else if(result==='lose'){res.textContent='Dealer wins. You lose $'+bjBet;res.style.color='#f87171';bjChips-=bjBet;}
  else{res.textContent='Push! Bet returned.';res.style.color='#fcd34d';}
  document.getElementById('bj-chips').textContent=bjChips;
  document.getElementById('bj-tip').textContent=result==='bust'?'Tip: Avoid hitting on 17+. The odds of busting are over 69%!':
    result==='win'?'Nice win! Remember: basic strategy reduces house edge to ~0.5%.':
    'Tip: Card counting is legal but frowned upon. Focus on basic strategy first.';
}

document.getElementById('bj-deal')?.addEventListener('click',bjDeal);
document.getElementById('bj-hit')?.addEventListener('click',bjHit);
document.getElementById('bj-stand')?.addEventListener('click',bjStand);
document.getElementById('bj-double')?.addEventListener('click',bjDouble);

// ===================== POKER (Simplified Texas Hold'em) =====================
let pokerDeck=[],yourHand=[],oppHand=[],community=[],pokerChips=1000,pokerPot=0,pokerStage='';

function pokerDeal(){
  pokerDeck=newDeck();yourHand=[];oppHand=[];community=[];pokerPot=0;
  yourHand.push(pokerDeck.pop(),pokerDeck.pop());
  oppHand.push(pokerDeck.pop(),pokerDeck.pop());
  pokerPot=20;pokerChips-=10; // blinds
  pokerStage='preflop';
  document.getElementById('poker-result').textContent='';
  pokerRender();
  enablePokerActions(true);
  // Tip based on hand
  const tip=evaluateStartingHand(yourHand);
  document.getElementById('poker-tip').textContent=tip;
  document.getElementById('poker-stage-info').textContent='Stage: Pre-Flop | Blinds posted ($10 each)';
}

function evaluateStartingHand(hand){
  const r1=ranks.indexOf(hand[0].rank),r2=ranks.indexOf(hand[1].rank);
  const suited=hand[0].suit===hand[1].suit;
  const pair=hand[0].rank===hand[1].rank;
  if(pair&&['A','K','Q','J','10'].includes(hand[0].rank))return`Premium pair (${hand[0].rank}s)! Raise aggressively. Top 2% of hands.`;
  if(pair)return`Pocket ${hand[0].rank}s — solid pair. Raise or call. Sets (three of a kind) hit ~12% of flops.`;
  if(['A','K'].includes(hand[0].rank)&&['A','K'].includes(hand[1].rank))return'Ace-King ("Big Slick")! Premium hand. Raise pre-flop. Wins ~65% heads-up.';
  if(hand[0].rank==='A'||hand[1].rank==='A')return`Ace-high${suited?' suited':''} — playable. Be cautious if you don't hit the flop. Position matters!`;
  if(suited&&Math.abs(r1-r2)<=2)return`Suited connectors — potential for straights and flushes. Good speculative hand. Play in position.`;
  if(r1>=10||r2>=10)return'High cards. Playable but be careful. Fold to heavy raises unless you improve on the flop.';
  return'Weak hand. Consider folding to raises. In real poker, folding ~70% of hands pre-flop is correct strategy.';
}

function pokerRender(){
  document.getElementById('your-cards').innerHTML=yourHand.map(c=>cardHTML(c)).join('');
  document.getElementById('opp-cards').innerHTML=oppHand.map((c,i)=>
    pokerStage==='showdown'?cardHTML(c):cardHTML(c,true)).join('');
  document.getElementById('community-cards').innerHTML=community.map(c=>cardHTML(c)).join('')||'<div style="color:#888;padding:20px">Cards will appear here</div>';
  document.getElementById('poker-pot').textContent=pokerPot;
  document.getElementById('poker-chips').textContent=pokerChips;
}

function enablePokerActions(on){
  document.getElementById('poker-call').disabled=!on;
  document.getElementById('poker-raise').disabled=!on;
  document.getElementById('poker-fold').disabled=!on;
  document.getElementById('poker-check').disabled=!on;
}

function pokerAdvance(){
  if(pokerStage==='preflop'){
    community.push(pokerDeck.pop(),pokerDeck.pop(),pokerDeck.pop());
    pokerStage='flop';
    document.getElementById('poker-stage-info').textContent='Stage: Flop (3 community cards revealed)';
    document.getElementById('poker-tip').textContent='Flop tip: You see 71% of your final hand now. Re-evaluate. Do your hole cards connect with the board?';
  } else if(pokerStage==='flop'){
    community.push(pokerDeck.pop());
    pokerStage='turn';
    document.getElementById('poker-stage-info').textContent='Stage: Turn (4th community card)';
    document.getElementById('poker-tip').textContent='Turn tip: One card left. Pot odds become crucial. Calculate: is your potential win worth the bet?';
  } else if(pokerStage==='turn'){
    community.push(pokerDeck.pop());
    pokerStage='river';
    document.getElementById('poker-stage-info').textContent='Stage: River (final community card)';
    document.getElementById('poker-tip').textContent='River tip: All cards are out. Either you have the best hand or you\'re bluffing. What would a pro do?';
  } else if(pokerStage==='river'){
    pokerStage='showdown';
    pokerShowdown();return;
  }
  pokerRender();
  enablePokerActions(true);
}

function pokerCall(){pokerChips-=10;pokerPot+=20;pokerAdvance();}
function pokerRaise(){pokerChips-=25;pokerPot+=50;pokerAdvance();
  document.getElementById('poker-tip').textContent+=' You raised! This shows strength (or a good bluff).';}
function pokerCheck(){pokerPot+=0;pokerAdvance();}
function pokerFold(){
  enablePokerActions(false);pokerStage='showdown';
  document.getElementById('poker-result').textContent='You folded. Opponent wins the pot ($'+pokerPot+').';
  document.getElementById('poker-result').style.color='#f87171';
  document.getElementById('poker-tip').textContent='Folding is often the right play. Discipline separates pros from amateurs. You fold to fight another hand.';
  pokerRender();
}

function simpleHandRank(hand, comm){
  const all=[...hand,...comm];
  const rs=all.map(c=>ranks.indexOf(c.rank));
  const ss=all.map(c=>c.suit);
  // Check pairs, trips, etc
  const counts={};rs.forEach(r=>{counts[r]=(counts[r]||0)+1;});
  const vals=Object.values(counts).sort((a,b)=>b-a);
  const maxRank=Math.max(...rs);
  if(vals[0]===4)return 700+maxRank;
  if(vals[0]===3&&vals[1]===2)return 600+maxRank;
  // Flush check
  const suitCounts={};ss.forEach(s=>{suitCounts[s]=(suitCounts[s]||0)+1;});
  const isFlush=Object.values(suitCounts).some(v=>v>=5);
  if(isFlush)return 500+maxRank;
  // Straight check (simplified)
  const unique=[...new Set(rs)].sort((a,b)=>a-b);
  let isStraight=false;
  for(let i=0;i<=unique.length-5;i++){if(unique[i+4]-unique[i]===4)isStraight=true;}
  if(isStraight)return 400+maxRank;
  if(vals[0]===3)return 300+maxRank;
  if(vals[0]===2&&vals[1]===2)return 200+maxRank;
  if(vals[0]===2)return 100+maxRank;
  return maxRank;
}

function pokerShowdown(){
  pokerStage='showdown';
  const yourScore=simpleHandRank(yourHand,community);
  const oppScore=simpleHandRank(oppHand,community);
  const res=document.getElementById('poker-result');
  enablePokerActions(false);
  pokerRender();
  if(yourScore>oppScore){res.textContent='You win $'+pokerPot+'!';res.style.color='#86efac';pokerChips+=pokerPot;}
  else if(yourScore<oppScore){res.textContent='Opponent wins. You lose the pot.';res.style.color='#f87171';}
  else{res.textContent='Split pot!';res.style.color='#fcd34d';pokerChips+=Math.floor(pokerPot/2);}
  document.getElementById('poker-chips').textContent=pokerChips;
  const handName=yourScore>=700?'Four of a Kind!':yourScore>=600?'Full House!':yourScore>=500?'Flush!':
    yourScore>=400?'Straight!':yourScore>=300?'Three of a Kind':yourScore>=200?'Two Pair':
    yourScore>=100?'One Pair':'High Card';
  document.getElementById('poker-tip').textContent=`Your hand: ${handName}. In poker, position is power. The later you act, the more information you have. Pros play 15-25% of hands.`;
}

document.getElementById('poker-deal')?.addEventListener('click',pokerDeal);
document.getElementById('poker-call')?.addEventListener('click',pokerCall);
document.getElementById('poker-raise')?.addEventListener('click',pokerRaise);
document.getElementById('poker-fold')?.addEventListener('click',pokerFold);
document.getElementById('poker-check')?.addEventListener('click',pokerCheck);
